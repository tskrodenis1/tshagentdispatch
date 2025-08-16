export async function GET(request: Request) {
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "user", content: "Hello OpenAI, are you working?" }
        ]
      })
    });

    const data = await response.json();

    return new Response(
      JSON.stringify({
        answer: data.choices?.[0]?.message?.content ?? "⚠️ No answer"
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    return new Response(
      JSON.stringify({ answer: "❌ Failed to fetch from OpenAI", details: error }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}