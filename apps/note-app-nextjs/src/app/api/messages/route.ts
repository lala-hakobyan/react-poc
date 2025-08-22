import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json();
  const response = await fetch('http://localhost:3010/api/messages', {
    method: 'POST',
    credentials: 'include',
    headers: {
      contentType: 'application/json',
    },
    body: JSON.stringify(body)
  });
  const result = await response.json();

  return NextResponse.json(result, { status: response.status });
}
