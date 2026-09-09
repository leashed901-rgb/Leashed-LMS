import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const token = req.headers.get('Authorization');
  if (!token) {
    return NextResponse.json({ error: 'Missing OAuth Authorization token' }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const formId = searchParams.get('formId');
  const includeResponses = searchParams.get('includeResponses') === 'true';

  if (!formId) {
    return NextResponse.json({ error: 'formId query parameter is required' }, { status: 400 });
  }

  try {
    const res = await fetch(`https://forms.googleapis.com/v1/forms/${formId}`, {
      headers: { Authorization: token },
    });
    const formData = await res.json();

    if (includeResponses && res.ok) {
      try {
        const respRes = await fetch(`https://forms.googleapis.com/v1/forms/${formId}/responses`, {
          headers: { Authorization: token },
        });
        if (respRes.ok) {
          formData.responsesData = await respRes.json();
        }
      } catch (e) {
        console.warn('Could not fetch form responses:', e);
      }
    }

    return NextResponse.json(formData, { status: res.status });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
