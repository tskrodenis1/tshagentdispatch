import { NextResponse, type NextRequest } from 'next/server';

export const runtime = 'nodejs'; // arba 'edge' jei nori, bet tuomet nenaudok Node-only API

export async function GET(_req: NextRequest) {
  return NextResponse.json(
    { ok: true, message: 'pong' },
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store',
      },
    }
  );
}
