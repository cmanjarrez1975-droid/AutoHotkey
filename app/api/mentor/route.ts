export async function POST() {
  return Response.json(
    {
      error:
        "Paso 4 pendiente: el análisis de capturas con IA no está activado.",
      status: "pending",
    },
    { status: 501 },
  );
}
