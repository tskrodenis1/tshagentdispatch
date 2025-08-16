export default function handler(req, res) {
  try {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
      return res.status(200).end();
    }

    return res.status(200).json({
      status: "ok",
      message: "ping success",
      time: new Date().toISOString()
    });
  } catch (err) {
    console.error("ERROR in ping.js:", err);
    return res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
}