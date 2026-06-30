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
  const method = request.method;

  let sessionId = getCookie(request, 'session_id');
  let isNewSession = false;

  if (!sessionId) {
    sessionId = crypto.randomUUID();
    isNewSession = true;
  }

  // Ensure DB binding exists. Fallback to local memory mock if not available to prevent crashes.
  if (!env.DB) {
    return new Response(
      JSON.stringify({
        error: "Database binding 'DB' is missing. Please configure D1 in wrangler.jsonc or Cloudflare Dashboard.",
        user_id: sessionId,
        free_use_consumed: false,
        paid_access: false,
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Set-Cookie': `session_id=${sessionId}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=31536000`
        }
      }
    );
  }

  // Helper to ensure the database record exists for the session ID
  const ensureRecordExists = async (id: string) => {
    const existing = await env.DB.prepare('SELECT * FROM calculator_access WHERE user_id = ?').bind(id).first();
    if (!existing) {
      await env.DB.prepare(
        'INSERT INTO calculator_access (user_id, free_use_consumed, paid_access) VALUES (?, 0, 0)'
      ).bind(id).run();
      return { user_id: id, free_use_consumed: 0, paid_access: 0 };
    }
    return existing;
  };

  try {
    let record = await ensureRecordExists(sessionId);

    // If consuming free trial (POST request)
    if (method === 'POST') {
      const body: any = await request.json().catch(() => ({}));
      if (body.action === 'consume_free') {
        await env.DB.prepare(
          'UPDATE calculator_access SET free_use_consumed = 1, updated_at = CURRENT_TIMESTAMP WHERE user_id = ?'
        ).bind(sessionId).run();
        record.free_use_consumed = 1;
      }
    }

    const headers: HeadersInit = { 'Content-Type': 'application/json' };
    if (isNewSession) {
      headers['Set-Cookie'] = `session_id=${sessionId}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=31536000`;
    }

    return new Response(
      JSON.stringify({
        user_id: record.user_id,
        free_use_consumed: record.free_use_consumed === 1 || record.free_use_consumed === true,
        paid_access: record.paid_access === 1 || record.paid_access === true,
      }),
      { status: 200, headers }
    );
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
};
