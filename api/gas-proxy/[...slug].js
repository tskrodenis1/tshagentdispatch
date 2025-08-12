export default async function handler(req, res) {
  const slug = req.query.slug || [];

  // Jei kelias yra tik "ping" — atsakom lokaliai
  if (slug.length === 1 && slug[0] === 'ping') {
    return res.status(200).json({
      status: 'success',
      message: 'API is healthy',
      mode: 'READWRITE'
    });
  }

  // Jei ne /ping, grąžinam klaidą (nes nenorim nieko siųsti į Google Script)
  return res.status(400).json({
    status: 'error',
    message: 'Only /ping endpoint is supported in this mode'
  });
}