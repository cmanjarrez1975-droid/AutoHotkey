import { getRuntimeEnv } from "../../../lib/runtime-env";

const MAX_BYTES = 8 * 1024 * 1024;

function safeUserKey(request: Request) {
  return (
    request.headers.get("oai-authenticated-user-email") ?? "owner"
  ).replace(/[^a-zA-Z0-9._-]/g, "_");
}

export async function POST(request: Request) {
  try {
    const env = getRuntimeEnv();
    const form = await request.formData();
    const file = form.get("file");
    if (!(file instanceof File)) {
      return Response.json({ error: "Selecciona una imagen." }, { status: 400 });
    }
    if (!file.type.startsWith("image/")) {
      return Response.json(
        { error: "Solo se permiten capturas en formato de imagen." },
        { status: 400 },
      );
    }
    if (file.size > MAX_BYTES) {
      return Response.json(
        { error: "La imagen supera el límite de 8 MB." },
        { status: 400 },
      );
    }

    const extension = file.name.split(".").pop()?.toLowerCase() || "png";
    const key = `charts/${safeUserKey(request)}/${crypto.randomUUID()}.${extension}`;
    await env.BUCKET.put(key, await file.arrayBuffer(), {
      httpMetadata: { contentType: file.type },
      customMetadata: { originalName: file.name },
    });

    return Response.json({ key, url: `/api/upload?key=${encodeURIComponent(key)}` });
  } catch (error) {
    return Response.json(
      {
        error:
          error instanceof Error ? error.message : "No se pudo subir la captura.",
      },
      { status: 500 },
    );
  }
}

export async function GET(request: Request) {
  const env = getRuntimeEnv();
  const key = new URL(request.url).searchParams.get("key");
  if (!key || !key.startsWith("charts/")) {
    return new Response("Archivo no válido", { status: 400 });
  }
  const object = await env.BUCKET.get(key);
  if (!object) return new Response("No encontrado", { status: 404 });

  const headers = new Headers();
  object.writeHttpMetadata(headers);
  headers.set("etag", object.httpEtag);
  headers.set("cache-control", "private, max-age=3600");
  return new Response(object.body, { headers });
}
