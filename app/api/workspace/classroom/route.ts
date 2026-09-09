import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const token = req.headers.get('Authorization');
  if (!token) {
    return NextResponse.json({ error: 'Missing OAuth Authorization token' }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const courseId = searchParams.get('courseId');

  try {
    if (courseId) {
      // Fetch coursework for specific course
      const res = await fetch(`https://classroom.googleapis.com/v1/courses/${courseId}/courseWork`, {
        headers: { Authorization: token },
      });
      const data = await res.json();
      return NextResponse.json(data);
    }

    // Fetch user courses
    const res = await fetch('https://classroom.googleapis.com/v1/courses?courseStates=ACTIVE', {
      headers: { Authorization: token },
    });
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
    const { courseId, title, description, maxPoints, workType, materials } = body;

    if (!courseId || !title) {
      return NextResponse.json({ error: 'courseId and title are required' }, { status: 400 });
    }

    const payload = {
      title,
      description: description || '',
      maxPoints: maxPoints || 100,
      workType: workType || 'ASSIGNMENT',
      state: 'PUBLISHED',
      materials: materials || [],
    };

    const res = await fetch(`https://classroom.googleapis.com/v1/courses/${courseId}/courseWork`, {
      method: 'POST',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
