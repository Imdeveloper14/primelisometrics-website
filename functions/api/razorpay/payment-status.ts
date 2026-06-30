interface Env {
  DB: D1Database;
}

function getCookie(request: Request, name: string) {
  const cookieString = request.headers.get('Cookie');
  if (!cookieString) return null;
  const cookies = cookieString.split(';').map(c => c.trim().split('='));
  const cookie = cookies.find(c => c[0] === name);
  return cookie ? decodeURIComponent(cookie[1]) : null;
}

export const onRequest: PagesFunction<Env> = async (context) => {
  const { request, env } = context;

  if (request.method !== 'GET') {
    return new Response(JSON.stringify({ error: 'Method Not Allowed' }), { status: 405 });
  }

  const sessionId = getCookie(request, 'session_id');
  if (!sessionId) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  if (!env.DB) {
    // If D1 binding is not defined, mock false state.
    return new Response(JSON.stringify({ paid_access: false }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const record: any = await env.DB.prepare(
      'SELECT paid_access, paid_calculations_remaining FROM calculator_access WHERE user_id = ?'
    ).bind(sessionId).first();

    const isPaid = record ? (record.paid_access === 1 || record.paid_calculations_remaining > 0) : false;

    return new Response(JSON.stringify({ 
      paid_access: isPaid
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
