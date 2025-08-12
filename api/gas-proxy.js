export default async function handler(req, res) {
  // Loginame užklausos kilmės IP ir kitą informaciją
  const realIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  console.log("=== TEST REQUEST ===");
  console.log("Client IP:", realIp);
  console.log("Method:", req.method);
  console.log("URL:", req.url);
  console.log("Headers:", req.headers);

  // Grąžiname paprastą JSON atsakymą
  res.setHeader('Content-Type', 'application/json');
  res.status(200).json({
    status: "ok",
    message: "Proxy reachable",
    ip: realIp,
    timestamp: new Date().toISOString()
  });
}