import OpenAI from "openai";

export default async function handler(req, res) {
  try {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ status: "error", message: "OPENAI_API_KEY missing" });
    }

    const client = new OpenAI({ apiKey });
    const chat = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: "Pasakyk labas" }],
    });

    res.status(200).json({ status: "ok", reply: chat.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
}
