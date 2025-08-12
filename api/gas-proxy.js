export default async function handler(req, res) {
  const realIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

  // Nuimame query string
  const cleanPath = req.url.split('?')[0];

  if (cleanPath === '/ping') {
    console.log("=== TEST REQUEST ===");
    console.log("Client IP:", realIp);
    console.log("Method:", req.method);
    console.log("URL:", req.url);
    console.log("Headers:", req.headers);

    res.setHeader('Content-Type', 'application/json');
    return res.status(200).json({
      status: "ok",
      message: "Proxy reachable",
      ip: realIp,
      timestamp: new Date().toISOString()
    });
  }

  res.status(404).json({ status: "error", message: "Unknown path" });
}