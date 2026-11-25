import { CONTENT_VERSION } from './metadata';

export async function learningRequest(body: Record<string, unknown>) {
  const response = await fetch('/api/learning', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ ...body, version: CONTENT_VERSION }) });
  const payload = await response.json() as { error?: string; [key: string]: unknown };
  if (!response.ok) throw new Error(payload.error ?? 'No se pudo completar la solicitud.');
  return payload;
}
