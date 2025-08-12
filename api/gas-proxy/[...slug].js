export default async function handler(req, res) {
  const realIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  const pathParts = req.query.slug || [];

  if (pathParts[0] === 'ping') {
    console.log("=== TEST REQUEST ===");
    console.log("Client IP:", realIp);

    return res.status(200).json({
      status: "ok",
      message: "Proxy reachable",
      ip: realIp,
      timestamp: new Date().toISOString()
    });
  }

  res.status(404).json({ status: "error", message: "Unknown path" });
}
