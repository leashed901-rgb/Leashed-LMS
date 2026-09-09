import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const token = req.headers.get('Authorization');
  if (!token) {
    return NextResponse.json({ error: 'Missing OAuth Authorization token' }, { status: 401 });
  }

  try {
    const timeMin = new Date().toISOString();
    const res = await fetch(
      `https://www.googleapis.com/calendar/v3/calendars/primary/events?timeMin=${encodeURIComponent(
        timeMin
      )}&maxResults=20&orderBy=startTime&singleEvents=true`,
      {
        headers: { Authorization: token },
      }
    );
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const token = req.headers.get('Authorization');
  if (!token) {
    return NextResponse.json({ error: 'Missing OAuth Authorization token' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { summary, description, startDateTime, endDateTime, location } = body;

    if (!summary || !startDateTime || !endDateTime) {
      return NextResponse.json({ error: 'summary, startDateTime, and endDateTime are required' }, { status: 400 });
    }

    const eventPayload = {
      summary,
      description: description || '',
      location: location || 'CogniFlow Virtual LMS Classroom',
      start: { dateTime: startDateTime },
      end: { dateTime: endDateTime },
      reminders: {
        useDefault: true,
      },
    };

    const res = await fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
      method: 'POST',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(eventPayload),
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
