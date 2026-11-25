export type RuntimeEnv = {
  ASSETS: Fetcher;
  DB: D1Database;
  BUCKET: R2Bucket;
  OPENAI_API_KEY?: string;
  OPENAI_MODEL?: string;
  IMAGES?: unknown;
};

let activeEnv: RuntimeEnv | null = null;

export function setRuntimeEnv(env: RuntimeEnv) {
  activeEnv = env;
}

export function getRuntimeEnv() {
  if (!activeEnv) {
    throw new Error("El entorno de la aplicación aún no está disponible.");
  }
  return activeEnv;
}
