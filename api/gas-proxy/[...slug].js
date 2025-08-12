export default async function handler(req, res) {
  try {
    const slug = Array.isArray(req.query.slug) ? req.query.slug : [req.query.slug].filter(Boolean);

    if (slug[0] === "ping") {
      return res.status(200).json({ status: "ok", message: "pong" });
    }

    if (slug[0] === "test-openai") {
      const { default: OpenAI } = await import("openai"); // <-- importas čia

      const apiKey = process.env.OPENAI_API_KEY;
      if (!apiKey) {
        return res.status(500).json({ status: "error", message: "OPENAI_API_KEY missing" });
      }

      const client = new OpenAI({ apiKey });
      const chat = await client.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: "Pasakyk labas" }],
      });

      return res.status(200).json({
        status: "ok",
        reply: chat.choices[0].message.content,
      });
    }

    res.status(404).json({ status: "error", message: "Unknown endpoint" });

  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
}