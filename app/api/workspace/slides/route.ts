import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const token = req.headers.get('Authorization');
  if (!token) {
    return NextResponse.json({ error: 'Missing OAuth Authorization token' }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const presentationId = searchParams.get('presentationId');

  if (!presentationId) {
    return NextResponse.json({ error: 'presentationId query parameter is required' }, { status: 400 });
  }

  try {
    const res = await fetch(`https://slides.googleapis.com/v1/presentations/${presentationId}`, {
      headers: { Authorization: token },
    });
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
