export default function handler(req, res) {
  const agentKey = req.headers["x-agent-key"];
  if (agentKey !== process.env.AGENT_KEY) {
    return res.status(403).json({ status: "error", message: "Forbidden" });
  }

  res.status(200).json({ status: "ok", message: "pong" });
}
