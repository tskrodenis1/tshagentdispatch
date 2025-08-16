import { NextApiRequest, NextApiResponse } from "next";

/**
 * Vercel API route: /api/gas-proxy/ping
 * This endpoint returns a simple health check message.
 * Includes full CORS headers to support GPT Builder and iOS Safari.
 */
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // ✅ Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*"); // Allow any origin
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS"); // Support these methods
  res.setHeader("Access-Control-Allow-Headers", "Content-Type"); // Allow content-type headers

  // ✅ Handle preflight OPTIONS request
  if (req.method === "OPTIONS") {
    res.status(200).end(); // Stop here for preflight
    return;
  }

  // ✅ Actual response for GET or POST
  res.status(200).json({
    status: "ok",
    message: "PING from Vercel API – everything works correctly.",
  });
}