export default async function handler(req, res) {
  const targetBase = "https://script.google.com/macros/s/AKfycbyWEhO7ewpOldUzZwZktmIlaiQh_-ATawzOr_QuCp86DH40cYWLcIL97EZSxFq_vs8a/exec";

  // Išsaugom query string'ą
  const queryString = req.url.includes('?') ? req.url.split('?')[1] : '';
  const targetUrl = queryString ? `${targetBase}?${queryString}` : targetBase;

  console.log("Incoming method:", req.method);
  console.log("Incoming URL:", req.url);
  console.log("Forwarding to:", targetUrl);

  try {
    const response = await fetch(targetUrl, {
      method: req.method,
      headers: req.headers,
      body: req.method !== "GET" ? JSON.stringify(req.body) : undefined
    });

    const text = await response.text();

    // Bandome suprasti, ar tai JSON
    try {
      const jsonData = JSON.parse(text);
      res.setHeader('Content-Type', 'application/json');
      res.status(response.status).json(jsonData);
    } catch (e) {
      // Jei ne JSON — vis tiek grąžinam kaip tekstą
      res.setHeader('Content-Type', 'text/plain');
      res.status(response.status).send(text);
    }
  } catch (error) {
    console.error("Proxy error:", error);
    res.setHeader('Content-Type', 'application/json');
    res.status(500).json({ error: error.message });
  }
}