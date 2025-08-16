import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(_req: NextApiRequest, res: NextApiResponse) {
  res
    .status(200)
    .setHeader('Content-Type', 'application/json')
    .setHeader('Cache-Control', 'no-store')
    .json({ ok: true, message: 'pong' });
}
