import { getRuntimeEnv } from '../../../lib/runtime-env.ts';
import { apiError, HttpError, learnerUploadPrefix, requireLearner, requireSameOrigin } from '../../../lib/access.ts';
const MAX_BYTES = 8 * 1024 * 1024;
function imageFormat(bytes: Uint8Array): { extension: string; mime: string } | null {
  if ([137,80,78,71,13,10,26,10].every((v,i)=>bytes[i]===v)) return {extension:'png',mime:'image/png'};
  if (bytes[0]===255 && bytes[1]===216 && bytes[2]===255) return {extension:'jpg',mime:'image/jpeg'};
  if (new TextDecoder().decode(bytes.slice(0,4))==='RIFF' && new TextDecoder().decode(bytes.slice(8,12))==='WEBP') return {extension:'webp',mime:'image/webp'};
  return null;
}
export async function POST(request: Request) {
  try {
    const user=requireLearner(request);requireSameOrigin(request);
    if (Number(request.headers.get('content-length')??0)>MAX_BYTES+65536) throw new HttpError(413,'La imagen supera 8 MB.');
    const reader=request.body?.getReader();if(!reader)throw new HttpError(400,'Falta la captura.');
    const parts:Uint8Array[]=[];let total=0;
    while(true){const {done,value}=await reader.read();if(done)break;total+=value.length;if(total>MAX_BYTES+65536){await reader.cancel();throw new HttpError(413,'La imagen supera 8 MB.');}parts.push(value);}
    const bytes=new Uint8Array(total);let offset=0;for(const part of parts){bytes.set(part,offset);offset+=part.length;}
    const bounded=new Request(request.url,{method:'POST',headers:request.headers,body:bytes});
    const form=await bounded.formData();const file=form.get('file');
    if(!(file instanceof File)||file.size===0)throw new HttpError(400,'Selecciona una imagen.');
    if(file.size>MAX_BYTES)throw new HttpError(413,'La imagen supera 8 MB.');
    const data=new Uint8Array(await file.arrayBuffer());const format=imageFormat(data);
    if(!format)throw new HttpError(400,'Solo se admiten archivos PNG, JPEG o WebP válidos.');
    const prefix=await learnerUploadPrefix(user);const key=`${prefix}${crypto.randomUUID()}.${format.extension}`;
    await getRuntimeEnv().BUCKET.put(key,data,{httpMetadata:{contentType:format.mime},customMetadata:{ownerPrefix:prefix}});
    return Response.json({key,url:`/api/upload?key=${encodeURIComponent(key)}`},{headers:{'cache-control':'no-store'}});
  }catch(error){return apiError(error);}
}
export async function GET(request: Request) {
  try {
    const user=requireLearner(request);const env=getRuntimeEnv();const key=new URL(request.url).searchParams.get('key');
    if(!key||key.length>300||!key.startsWith('charts/'))throw new HttpError(400,'Clave de captura inválida.');
    const prefix=await learnerUploadPrefix(user);
    if(!key.startsWith(prefix)) {
      // Existing journal ownership authorizes legacy captures without reassigning them.
      const legacy=await env.DB.prepare('SELECT id FROM practice_entries WHERE user_key=? AND screenshot_key=? LIMIT 1').bind(user,key).first();
      if(!legacy || key.startsWith('charts/v2/')) throw new HttpError(404,'Captura no encontrada.');
    }
    const object=await env.BUCKET.get(key);
    if(!object)throw new HttpError(404,'Captura no encontrada.');
    const headers=new Headers();object.writeHttpMetadata(headers);
    headers.set('cache-control','private, no-store');headers.set('x-content-type-options','nosniff');headers.set('content-security-policy',"default-src 'none'; sandbox");
    return new Response(object.body,{headers});
  }catch(error){return apiError(error);}
}
