import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync, readdirSync } from 'node:fs';
import { lessons } from '../app/learning/catalog.ts';

const developmentPreviewMeta =
  /<meta(?=[^>]*\bname=["']codex-preview["'])(?=[^>]*\bcontent=["']development["'])[^>]*>/i;

test("renders the versioned learning route without legacy completion counts or server answer keys", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  const response = await worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );

  assert.equal(response.status, 200);
  assert.match(
    response.headers.get("content-type") ?? "",
    /^text\/html\b/i,
  );
  const html = await response.text();
  assert.match(html, developmentPreviewMeta);
  assert.match(html, /U WeAreTrades/);
  assert.match(html, /Laboratorio de decisiones/);
  assert.match(html, /Diagnóstico inicial/);
  assert.match(html, /Fundamentos/);
  assert.match(html, /Método y estrategias/);
  assert.match(html, /Práctica e integración/);
  assert.match(html, /Analítica/);
  assert.match(html, /24(?:<!-- -->)? unidades/);
  assert.match(html, /20(?:<!-- -->)? casos de replay/);
  assert.doesNotMatch(html, /127(?:<!-- -->)? lecciones completadas/);
  assert.doesNotMatch(html, /correctReason|expectedDecision|stopRange/);
  // Production must not inherit the local owner identity, even on localhost.
  const unauthenticated = await worker.fetch(new Request('http://localhost/api/learning'),{}, {waitUntil(){}});
  assert.equal(unauthenticated.status,401);
});

test('browser bundles do not contain the private question bank or case grading keys',()=>{
  const assets=new URL('../dist/client/assets/',import.meta.url);
  const javascript=readdirSync(assets).filter(name=>name.endsWith('.js')).map(name=>readFileSync(new URL(name,assets),'utf8')).join('\n');
  for(const lesson of lessons)for(const question of lesson.checks)assert.ok(!javascript.includes(question.feedback),`private feedback leaked: ${lesson.id}`);
  assert.doesNotMatch(javascript,/correctReason|expectedDecision|stopRange/);
});
