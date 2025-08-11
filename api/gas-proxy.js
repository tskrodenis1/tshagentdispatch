export default async function handler(req, res) {
  const targetBase = "https://script.google.com/macros/s/AKfycbyWEhO7ewpOldUzZwZktmIlaiQh_-ATawzOr_QuCp86DH40cYWLcIL97EZSxFq_vs8a/exec";

  // Pasiimam query string'ą iš pradinės užklausos
  const queryString = req.url.includes('?') ? req.url.split('?')[1] : '';
  const targetUrl = queryString ? `${targetBase}?${queryString}` : targetBase;

  console.log("Incoming method:", req.method);
  console.log("Incoming URL:", req.url);
  console.log("Forwarding to:", targetUrl);
  console.log("Incoming headers:", req.headers);

  try {
    const response = await fetch(targetUrl, {
      method: req.method,
      headers: req.headers, // persiunčiam visas antraštes
      body: req.method !== "GET" ? JSON.stringify(req.body) : undefined
    });

    const text = await response.text();
    console.log("Response from Google:", text);

    res.status(response.status).send(text);
  } catch (error) {
    console.error("Proxy error:", error);
    res.status(500).json({ error: error.message });
  }
}