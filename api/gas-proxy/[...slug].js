export default async function handler(req, res) {
  try {
    const { slug } = req.query;

    // Užtikrinam, kad slug yra masyvas
    const parts = Array.isArray(slug) ? slug : [slug].filter(Boolean);

    if (parts[0] === 'ping') {
      return res.status(200).json({ status: 'ok', message: 'pong' });
    }

    if (parts[0] === 'test-openai') {
      const apiKey = process.env.OPENAI_API_KEY;

      if (!apiKey) {
        return res.status(500).json({ status: 'error', message: 'OPENAI_API_KEY missing' });
      }

      return res.status(200).json({ status: 'ok', keyLength: apiKey.length });
    }

    res.status(404).json({ status: 'error', message: 'Unknown endpoint' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
}