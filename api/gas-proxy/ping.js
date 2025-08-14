export default async function handler(req, res) {
  // Step 1 – Debug log everything about the request
  console.log("DEBUG: Incoming request", {
    method: req.method,
    headers: req.headers,
    query: req.query,
    body: req.body
  });

  try {
    // Step 2 – OPTIONAL: Auth check (uncomment only if you want to test it)
    /*
    const clientKey = req.headers["x-api-key"];
    if (clientKey !== process.env.SECRET_KEY) {
      console.warn("DEBUG: API key mismatch", { clientKey });
      return res.status(403).json({ error: "Forbidden (invalid key)" });
    }
    */

    // Step 3 – OPTIONAL: External API call (currently disabled for testing)
    /*
    const upstreamResponse = await fetch("https://api.example.com/ping", {
      method: "GET",
      headers: { Authorization: `Bearer ${process.env.UPSTREAM_KEY}` }
    });

    if (!upstreamResponse.ok) {
      console.warn("DEBUG: Upstream API returned error", upstreamResponse.status);
      return res.status(upstreamResponse.status).json({ error: "Upstream error" });
    }

    const upstreamData = await upstreamResponse.json();
    */

    // Step 4 – Temporary debug success response
    return res.status(200).json({
      message: "ping success (debug mode)",
      time: new Date().toISOString()
      // upstream: upstreamData // Uncomment if upstream call is re-enabled
    });

  } catch (error) {
    console.error("DEBUG: Handler threw error", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
