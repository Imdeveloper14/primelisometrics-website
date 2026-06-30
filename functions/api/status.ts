interface Env {
  DB: D1Database;
  FORMSPREE_ENDPOINT?: string;
}

function getCookie(request: Request, name: string) {
  const cookieString = request.headers.get('Cookie');
  if (!cookieString) return null;
  const cookies = cookieString.split(';').map(c => c.trim().split('='));
  const cookie = cookies.find(c => c[0] === name);
  return cookie ? decodeURIComponent(cookie[1]) : null;
}

function validateEmail(email: string) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
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

  if (!env.DB) {
    return new Response(
      JSON.stringify({ error: "Database binding 'DB' is missing." }),
      { status: 500 }
    );
  }

  const ensureRecordExists = async (id: string) => {
    const existing = await env.DB.prepare('SELECT * FROM calculator_access WHERE user_id = ?').bind(id).first();
    if (!existing) {
      await env.DB.prepare(
        'INSERT INTO calculator_access (user_id, free_used, paid_calculations_remaining) VALUES (?, 0, 0)'
      ).bind(id).run();
      return { user_id: id, free_used: 0, paid_calculations_remaining: 0, email: null };
    }
    return existing;
  };

  try {
    let record: any = await ensureRecordExists(sessionId);

    if (method === 'POST') {
      const body: any = await request.json().catch(() => ({}));
      
      if (body.action === 'consume_free') {
        if (record.free_used !== 1) {
          await env.DB.prepare(
            'UPDATE calculator_access SET free_used = 1, free_use_consumed = 1, updated_at = CURRENT_TIMESTAMP WHERE user_id = ?'
          ).bind(sessionId).run();
          record.free_used = 1;
        }
      } 
      else if (body.action === 'consume_calculation') {
        if (record.paid_calculations_remaining > 0) {
          const newRemaining = record.paid_calculations_remaining - 1;
          await env.DB.prepare(
            'UPDATE calculator_access SET paid_calculations_remaining = ?, updated_at = CURRENT_TIMESTAMP WHERE user_id = ?'
          ).bind(newRemaining, sessionId).run();
          record.paid_calculations_remaining = newRemaining;
        } else {
          return new Response(JSON.stringify({ error: 'No remaining calculations' }), { status: 403 });
        }
      }
      else if (body.action === 'store_email') {
        const email = body.email?.trim();
        if (!email || !validateEmail(email)) {
          return new Response(JSON.stringify({ error: 'Invalid email address format' }), { status: 400 });
        }

        // Store email in D1
        await env.DB.prepare(
          'UPDATE calculator_access SET email = ?, updated_at = CURRENT_TIMESTAMP WHERE user_id = ?'
        ).bind(email, sessionId).run();
        record.email = email;

        // Collect metadata
        const ip = request.headers.get('cf-connecting-ip') || 'Unknown';
        const userAgent = request.headers.get('user-agent') || 'Unknown';
        const dateTimeStr = new Date().toISOString();

        // Dispatch Email Lead using Formspree
        const formspreeUrl = env.FORMSPREE_ENDPOINT?.trim();
        if (formspreeUrl && formspreeUrl.startsWith('http')) {
          try {
            const formResponse = await fetch(formspreeUrl, {
              method: 'POST',
              headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Referer': env.APP_URL || 'https://royal-feather-b793.chandrunavalarch.workers.dev',
                'Origin': env.APP_URL || 'https://royal-feather-b793.chandrunavalarch.workers.dev'
              },
              body: JSON.stringify({
                email: email,
                customer_email: email,
                product: 'Insel & Molland Calculator',
                payment_plan: '2 calculations for ₹199',
                timestamp: dateTimeStr,
                session_key: sessionId,
                user_ip: ip,
                user_agent: userAgent
              })
            });
            if (!formResponse.ok) {
              console.error("[Formspree Lead] Response error status:", formResponse.status);
            }
          } catch (formError) {
            console.error("[Formspree Lead] Failed to dispatch API request:", formError);
          }
        } else {
          console.warn("[Formspree Lead] FORMSPREE_ENDPOINT is missing or invalid in environment vars.");
        }
      }
    }

    const headers: HeadersInit = { 'Content-Type': 'application/json' };
    if (isNewSession) {
      headers['Set-Cookie'] = `session_id=${sessionId}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=31536000`;
    }

    return new Response(
      JSON.stringify({
        user_id: record.user_id,
        email: record.email,
        free_used: record.free_used === 1 || record.free_used === true,
        paid_calculations_remaining: record.paid_calculations_remaining || 0,
      }),
      { status: 200, headers }
    );
  } catch (err: any) {
    console.error("[Status Endpoint] Error handler:", err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
};
