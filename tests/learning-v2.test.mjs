import assert from 'node:assert/strict';
import test from 'node:test';
import { DatabaseSync } from 'node:sqlite';
import { readFileSync, readdirSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { lessons, publicLessons, CONTENT_VERSION } from '../app/learning/catalog.ts';
import { cases, publicCase, evaluateCase } from '../app/learning/cases.ts';
import { netRisk, averageTrueRange } from '../app/learning/risk.ts';
import { GET, POST } from '../app/api/learning/route.ts';
import { GET as getImage, POST as uploadImage } from '../app/api/upload/route.ts';
import { GET as getState, POST as postState } from '../app/api/state/route.ts';
import { setRuntimeEnv, getRuntimeEnv } from '../lib/runtime-env.ts';
import { requireLearner, learnerUploadPrefix } from '../lib/access.ts';

// Real SQLite SQL execution with the small D1 interface used by the routes.
function fixture() {
  const sql = new DatabaseSync(':memory:');
  const migrations = readdirSync(new URL('../drizzle/', import.meta.url)).filter(f=>f.endsWith('.sql')).sort();
  for (const name of migrations.slice(0,2)) sql.exec(readFileSync(new URL(`../drizzle/${name}`,import.meta.url),'utf8'));
  sql.exec("INSERT INTO lesson_progress(user_key,lesson_id,module,completed,study_seconds) VALUES ('alice@example.test','legacy-lesson',1,1,45)");
  sql.exec(readFileSync(new URL(`../drizzle/${migrations[2]}`,import.meta.url),'utf8'));
  function prepare(query, values=[]) {
    const stmt=sql.prepare(query);
    return {
      bind(...args){return prepare(query,args);},
      async first(column){const row=stmt.get(...values);return column?row?.[column]??null:row??null;},
      async all(){return {results:stmt.all(...values),success:true};},
      async run(){const info=stmt.run(...values);return {success:true,meta:{changes:Number(info.changes)}};},
      async raw(){stmt.setReturnArrays(true);return stmt.all(...values);},
    };
  }
  const objects=new Map();
  setRuntimeEnv({DB:{prepare,async batch(statements){sql.exec('BEGIN');try{const values=[];for(const s of statements)values.push(await s.all());sql.exec('COMMIT');return values;}catch(e){sql.exec('ROLLBACK');throw e;}}},BUCKET:{async put(key,bytes,options){objects.set(key,{bytes,options});},async get(key){const item=objects.get(key);return item?{body:item.bytes,writeHttpMetadata(headers){headers.set('content-type',item.options.httpMetadata.contentType);}}:null;}}});
  process.env.NODE_ENV='production';process.env.ACADEMY_LOCAL_MODE='0';
  return sql;
}
const user='alice@example.test';
function request(body, email=user, path='/api/learning', extraHeaders={}) {
  return new Request(`http://localhost${path}`,{method:body?'POST':'GET',headers:{...(email?{'oai-authenticated-user-email':email}:{}),...(body?{'content-type':'application/json'}:{}),...extraHeaders},...(body?{body:JSON.stringify({version:CONTENT_VERSION,...body})}:{})});
}
const draft=(overrides={})=>({action:'draft',lessonId:lessons[0].id,revision:0,draft:'Mi explicación conserva evidencia, alternativa e invalidación.',reviewed:true,studied:true,seconds:30,...overrides});

test('24 explicit units have ordered prerequisites, source, example, counterexample and distinct questions',()=>{
  assert.equal(lessons.length,24);const seen=new Set();const prompts=new Set();const paragraphs=new Set();
  for(const lesson of lessons){assert.ok(!seen.has(lesson.id));for(const id of lesson.prerequisites)assert.ok(seen.has(id),`${lesson.id} requires a preceding ${id}`);seen.add(lesson.id);assert.ok(lesson.source.length>30);assert.ok(lesson.example.steps.length>=3);assert.ok(lesson.counterexample.length>40);assert.ok(lesson.exercise.length>30);assert.ok(lesson.solution.length>40);assert.ok(lesson.rubric.length>=2);assert.ok(lesson.bridge.length>20);for(const p of lesson.paragraphs){assert.ok(!paragraphs.has(p),'no rotated paragraphs');paragraphs.add(p);}for(const q of lesson.checks){assert.ok(!prompts.has(q.prompt));prompts.add(q.prompt);assert.ok(q.correct>=0&&q.correct<q.options.length);assert.ok(q.feedback.length>30);}}
  assert.equal(prompts.size,24);
});
test('public lesson payload contains no check answer keys',()=>{for(const l of publicLessons())for(const q of l.checks){assert.deepEqual(Object.keys(q).sort(),['options','prompt']);}});
test('38 original class extracts and 12 documents match their SHA-256 manifests',()=>{
  const library=JSON.parse(readFileSync(new URL('../public/course-library.json',import.meta.url),'utf8'));
  assert.equal(library.classes.length,38);assert.equal(library.files.length,12);assert.equal(new Set(library.classes.map(c=>c.id)).size,38);
  for(const file of library.files){const bytes=readFileSync(new URL(`../public${file.url}`,import.meta.url));assert.equal(createHash('sha256').update(bytes).digest('hex'),file.sha256);}
});
test('20 cases have individual sequences; public prefix excludes future and grading',()=>{
  assert.equal(cases.length,20);assert.equal(new Set(cases.map(c=>JSON.stringify(c.closes))).size,20);
  for(const item of cases){assert.ok(lessons.some(l=>l.id===item.lessonId));const payload=publicCase(item);for(const key of ['future','decision','correctReason','explanation','outcome','stopRange','targetLimit'])assert.equal(key in payload,false);assert.deepEqual(payload.closes,item.closes);}
});
test('valid case plans, abstentions and invalidation geometry score separately',()=>{
  for(const item of cases){const answer={decision:item.decision,reason:item.correctReason,budget:100};if(item.decision==='ejecutar'){answer.stop=item.direction==='Largo'?item.stopRange[1]:item.stopRange[0];answer.target=item.targetLimit;}assert.equal(evaluateCase(item,answer).score,100,item.id);if(item.decision==='ejecutar'){assert.equal(evaluateCase(item,{...answer,stop:item.closes.at(-1)}).score,70);assert.equal(evaluateCase(item,{...answer,budget:-1}).score,70);assert.equal(evaluateCase(item,{...answer,stop:String(answer.stop)}).score,70);}}
});
test('lineal net risk accounts for direction, costs and minimum step without exceeding budget',()=>{
  const base={entry:100,stop:98,target:106,account:10000,riskPercent:1,pointValue:1,cost:0.2,lotStep:1,direction:'Largo'};
  const result=netRisk(base);assert.equal(result.size,45);assert.ok(result.risk<=100);assert.ok(Math.abs(result.rr-5.8/2.2)<1e-10);
  assert.equal(netRisk({...base,direction:'Corto',stop:102,target:94}).size,45);
  for(const change of [{stop:100},{stop:101},{target:99},{entry:NaN},{riskPercent:0},{cost:-1},{lotStep:100},{account:Infinity},{pointValue:1e308}])assert.equal(netRisk({...base,...change}).valid,false);
});
test('ATR uses previous close gaps, rejects missing or malformed OHLC history',()=>{
  assert.equal(averageTrueRange([{high:10,low:8,close:9},{high:15,low:12,close:14},{high:14,low:10,close:11}],2),5);
  assert.equal(averageTrueRange([{high:10,low:8,close:9}],2),null);
  assert.equal(averageTrueRange([{high:10,low:8,close:9},{high:8,low:12,close:9}],1),null);
});
test('production rejects absent authentication, forwarded-user and localhost bypass',async()=>{
  const db=fixture();try{for(const headers of [{},{'x-forwarded-user':user},{host:'127.0.0.1'}])assert.equal((await GET(request(undefined,null,'/api/learning',headers))).status,401);process.env.ACADEMY_LOCAL_MODE='1';assert.throws(()=>requireLearner(request(undefined,null)),/Inicia sesión/);process.env.NODE_ENV='development';assert.equal(requireLearner(request(undefined,null)),'owner');}finally{db.close();process.env.NODE_ENV='production';process.env.ACADEMY_LOCAL_MODE='0';}
});
test('draft persistence, capped active time, CAS conflict and user separation; legacy preserved',async()=>{
  const db=fixture();try{
    const first=await POST(request(draft({seconds:900})));assert.equal(first.status,200);const row=(await first.json()).record;assert.equal(row.revision,1);assert.equal(row.study_seconds,120);assert.equal(row.practiced,1);
    assert.equal((await POST(request(draft({draft:'stale text'})))).status,409);
    const state=await (await GET(request())).json();assert.equal(state.records[0].draft,draft().draft);
    const other=await (await GET(request(undefined,'bob@example.test'))).json();assert.equal(other.records.length,0);
    assert.equal((await POST(request(draft({revision:1,draft:'Actualización confirmada.',seconds:5})))).status,200);
    const after=await (await GET(request())).json();assert.equal(after.records[0].revision,2);assert.equal(after.records[0].study_seconds,125);
    assert.equal(db.prepare('SELECT completed FROM lesson_progress').get().completed,1);assert.equal(db.prepare('SELECT COUNT(*) n FROM lesson_progress').get().n,1);
  }finally{db.close();}
});
test('version, lesson, JSON size and cross-origin validation',async()=>{
  const db=fixture();try{for(const [body,code] of [[draft({version:'old'}),409],[draft({lessonId:'unknown'}),400],[draft({action:'unknown'}),400],[draft({revision:-1}),400],[draft({draft:'x'.repeat(70000)}),413]])assert.equal((await POST(request(body))).status,code);assert.equal((await POST(request(draft(),user,'/api/learning',{origin:'https://evil.test'}))).status,403);}finally{db.close();}
});
test('concept checks use server answers and do not mark studied/practiced',async()=>{
  const db=fixture();try{const lesson=lessons[0];const right=lesson.checks.map(q=>q.correct);const wrong=lesson.checks.map(q=>(q.correct+1)%q.options.length);
    const result=await (await POST(request({action:'check',lessonId:lesson.id,answers:wrong,score:100,correct:true}))).json();assert.equal(result.score,0);assert.equal(result.record.check_passed,0);
    const passed=await (await POST(request({action:'check',lessonId:lesson.id,answers:right}))).json();assert.equal(passed.score,100);assert.equal(passed.record.check_passed,1);assert.equal(passed.record.studied,0);assert.equal(passed.record.practiced,0);
  }finally{db.close();}
});
test('case reveal requires registered decision, idempotent retries do not overwrite and IDs cannot leak other users',async()=>{
  const db=fixture();try{const item=cases[0];const prefix=await (await GET(request(undefined,null,`/api/learning?case=${item.id}`))).json();assert.equal('future' in prefix,false);
    const body={action:'case',caseId:item.id,attemptId:'test-attempt-0001',decision:item.decision,reason:item.correctReason,reasoning:'La referencia todavía no ha sido recuperada.'};
    assert.equal((await POST(request({...body,reasoning:'a'}))).status,400);
    const initial=await (await POST(request(body))).json();assert.equal(initial.score,100);assert.deepEqual(initial.future,item.future);
    const repeated=await (await POST(request({...body,decision:'descartar'}))).json();assert.deepEqual(repeated,initial);assert.equal(db.prepare('SELECT COUNT(*) n FROM case_attempts').get().n,1);
    assert.equal((await POST(request(body,'bob@example.test'))).status,409);const other=await (await GET(request(undefined,'bob@example.test'))).json();assert.equal(other.caseAttempts.length,0);
  }finally{db.close();}
});
test('legacy scores are read-only; journal records persist only for their user',async()=>{
  const db=fixture();try{assert.equal((await postState(request({lesson:{lessonId:'fake',completed:true}},user,'/api/state'))).status,409);
    const practice={module:1,instrument:'Caso de estudio',timeframe:'15m',direction:'Sin operación',plannedRr:'0',resultR:'0',notes:'Falta confirmación: no se registró una entrada.',invalidationDefined:true};
    assert.equal((await postState(request({practice},user,'/api/state'))).status,200);
    assert.equal((await postState(request({practice:{...practice,resultR:'5'}},user,'/api/state'))).status,400);
    const own=await (await getState(request(undefined,user,'/api/state'))).json();assert.equal(own.practices.length,1);assert.equal(own.lessons[0].lessonId,'legacy-lesson');
    const other=await (await getState(request(undefined,'bob@example.test','/api/state'))).json();assert.equal(other.practices.length,0);assert.equal(other.lessons.length,0);
  }finally{db.close();}
});
test('uploads reject SVG, enforce owner access and preserve authorized legacy capture access',async()=>{
  const db=fixture();try{
    const send=async(bytes,type)=>{const form=new FormData();form.append('file',new File([bytes],'image',{type}));return uploadImage(new Request('http://localhost/api/upload',{method:'POST',headers:{'oai-authenticated-user-email':user},body:form}));};
    assert.equal((await send('<svg><script/></svg>','image/svg+xml')).status,400);
    const png=Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+jRZkAAAAASUVORK5CYII=','base64');
    const uploaded=await send(png,'image/png');assert.equal(uploaded.status,200);const {key}=await uploaded.json();assert.ok(key.startsWith(await learnerUploadPrefix(user)));
    const own=await getImage(request(undefined,user,`/api/upload?key=${encodeURIComponent(key)}`));assert.equal(own.status,200);assert.match(own.headers.get('cache-control'),/no-store/);assert.equal(own.headers.get('x-content-type-options'),'nosniff');
    assert.equal((await getImage(request(undefined,'bob@example.test',`/api/upload?key=${encodeURIComponent(key)}`))).status,404);
    assert.equal((await getImage(request(undefined,null,`/api/upload?key=${encodeURIComponent(key)}`))).status,401);
    const legacyKey='charts/old-capture.png';
    await getRuntimeEnv().BUCKET.put(legacyKey,png,{httpMetadata:{contentType:'image/png'}});
    db.prepare('INSERT INTO practice_entries(user_key,module,instrument,timeframe,direction,planned_rr,result_r,notes,screenshot_key) VALUES (?,?,?,?,?,?,?,?,?)').run(user,1,'Legacy','15m','Largo','2','-1','Registro original',legacyKey);
    assert.equal((await getImage(request(undefined,user,`/api/upload?key=${legacyKey}`))).status,200);
    assert.equal((await getImage(request(undefined,'bob@example.test',`/api/upload?key=${legacyKey}`))).status,404);
  }finally{db.close();}
});
