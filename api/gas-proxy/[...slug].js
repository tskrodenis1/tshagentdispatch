export default async function handler(req, res) {
  const slug = req.query.slug || [];
  const actionPathFromSlug = slug.length ? `/${slug.join('/')}` : null;
  const actionPathFromQuery = req.query.actionPath;
  
  // Užtikrinam, kad visada prasidėtų nuo "/"
  const actionPath = actionPathFromSlug || (actionPathFromQuery ? `/${actionPathFromQuery}` : null);

  // Specialus /ping atsakymas
  if (actionPath === '/ping') {
    return res.status(200).json({
      status: 'success',
      message: 'API is healthy',
      mode: 'READWRITE'
    });
  }

  if (!actionPath) {
    return res.status(400).json({ status: 'error', message: 'Unknown path' });
  }

  const targetUrl = `https://script.google.com/macros/s/AKfycbyWEhO7ewpOldUzZwZktmIlaiQh_-ATawzOr_QuCp86DH40cYWLcIL97EZSxFq_vs8a/exec`;

  try {
    const url = new URL(targetUrl);
    url.searchParams.set('actionPath', actionPath);
    for (const [key, value] of Object.entries(req.query)) {
      if (key !== 'slug' && key !== 'actionPath') {
        url.searchParams.set(key, value);
      }
    }

    const response = await fetch(url.toString(), {
      method: req.method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: req.method === 'POST' ? JSON.stringify(req.body) : undefined
    });

    const data = await response.text();
    res.status(response.status).send(data);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}