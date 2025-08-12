export default async function handler(req, res) {
  try {
    const { slug } = req.query;

    return res.status(200).json({
      rawSlug: slug,
      isArray: Array.isArray(slug),
      url: req.url
    });

  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
}