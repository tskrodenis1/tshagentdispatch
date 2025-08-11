export default async function handler(req, res) {
  const targetBase = "https://script.google.com/macros/s/AKfycbyWEhO7ewpOldUzZwZktmIlaiQh_-ATawzOr_QuCp86DH40cYWLcIL97EZSxFq_vs8a/exec";

  // Query string iš pradinės užklausos
  const queryString = req.url.includes('?') ? req.url.split('?')[1] : '';
  const targetUrl = queryString ? `${targetBase}?${queryString}` : targetBase;

  // Loginam kilmės IP
  const realIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  console.log("=== Incoming request ===");
  console.log("Client IP (x-forwarded-for):", realIp);
  console.log("Method:", req.method);
  console.log("Original URL:", req.url);
  console.log("Forwarding to:", targetUrl);
  console.log("Headers:", req.headers);

  try {
    const response = await fetch(targetUrl, {
      method: req.method,
      headers: req.headers,
      body: req.method !== "GET" ? JSON.stringify(req.body) : undefined
    });

    const text = await response.text();

    // Tikrinam ar atsakymas yra JSON
    try {
      const jsonData = JSON.parse(text);
      res.setHeader('Content-Type', 'application/json');
      res.status(response.status).json(jsonData);
    } catch (e) {
      res.setHeader('Content-Type', 'text/plain');
      res.status(response.status).send(text);
    }
  } catch (error) {
    console.error("Proxy error:", error);
    res.setHeader('Content-Type', 'application/json');
    res.status(500).json({ error: error.message });
  }
}