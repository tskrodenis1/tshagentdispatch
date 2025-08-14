export default function handler(req, res) {
  // Debug: log what’s coming in
  console.log({
    method: req.method,
    headers: req.headers,
    query: req.query,
    body: req.body
  });

  // Always respond success
  res.status(200).json({
    message: "pong (no auth)",
    time: new Date().toISOString()
  });
}
