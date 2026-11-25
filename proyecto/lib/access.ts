export class HttpError extends Error {
  status: number;
  constructor(status: number, message: string) { super(message); this.status = status; }
}

export async function learnerUploadPrefix(user: string) {
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(user));
  return `charts/v2/${Array.from(new Uint8Array(digest), byte => byte.toString(16).padStart(2,'0')).join('')}/`;
}

export function requireLearner(request: Request): string {
  // Only the development runtime can enable this identity. Host headers alone
  // must never grant access to the former shared production "owner" records.
  if (process.env.NODE_ENV === 'development' && process.env.ACADEMY_LOCAL_MODE === '1') return 'owner';
  const email = request.headers.get('oai-authenticated-user-email')?.trim();
  if (!email || email.length > 254 || !email.includes('@')) throw new HttpError(401, 'Inicia sesión para guardar tu aprendizaje.');
  // Retain existing email keys; do not reassign old progress to a new identity.
  return email;
}

export function requireSameOrigin(request: Request) {
  const origin = request.headers.get('origin');
  if (origin && origin !== new URL(request.url).origin) throw new HttpError(403, 'Origen no permitido.');
}

export async function readJson(request: Request): Promise<Record<string, unknown>> {
  requireSameOrigin(request);
  if (!request.headers.get('content-type')?.includes('application/json')) throw new HttpError(415, 'Se requiere JSON.');
  const reader = request.body?.getReader();
  if (!reader) throw new HttpError(400, 'Falta el cuerpo de la solicitud.');
  let length = 0; const chunks: Uint8Array[] = [];
  while (true) {
    const { value, done } = await reader.read(); if (done) break;
    length += value.length;
    if (length > 65536) { await reader.cancel(); throw new HttpError(413, 'Solicitud demasiado grande.'); }
    chunks.push(value);
  }
  const bytes = new Uint8Array(length); let offset = 0;
  for (const part of chunks) { bytes.set(part, offset); offset += part.length; }
  let value;
  try { value = JSON.parse(new TextDecoder().decode(bytes)); } catch { throw new HttpError(400, 'JSON inválido.'); }
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new HttpError(400, 'Objeto JSON requerido.');
  return value;
}

export function apiError(error: unknown) {
  const status = error instanceof HttpError ? error.status : 500;
  if (status === 500) console.error(JSON.stringify({ event: 'academy_api_error', message: error instanceof Error ? error.message : 'unknown' }));
  return Response.json({ error: status === 500 ? 'No se pudo guardar o cargar. Comprueba la base de datos e inténtalo de nuevo.' : (error as Error).message }, { status, headers: { 'cache-control': 'no-store' } });
}
