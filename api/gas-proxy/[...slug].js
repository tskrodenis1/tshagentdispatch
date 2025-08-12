export default async function handler(req, res) {
  const { slug } = req.query;

  // Sujungiame URL kelią
  const path = slug.join('/');

  try {
    const openaiResponse = await fetch(`https://api.openai.com/v1/${path}`, {
      method: req.method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: req.method !== 'GET' ? JSON.stringify(req.body) : undefined
    });

    const data = await openaiResponse.json();
    res.status(openaiResponse.status).json(data);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}