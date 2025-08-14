export default function handler(req, res) {
  // Skip authentication
  // Allow all origins for CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "*");

  // Handle OPTIONS preflight
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // Return test response
  res.status(200).json({
    status: "ok",
    message: "ping-test successful",
    environment: process.env.VERCEL_ENV || "unknown"
  });
}
