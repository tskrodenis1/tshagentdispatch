export async function GET(request: Request) {
  return new Response(
    JSON.stringify({ envKey: process.env.OPENAI_API_KEY ? "✅ FOUND" : "⛔️ NOT FOUND" }),
    { status: 200 }
  );
}