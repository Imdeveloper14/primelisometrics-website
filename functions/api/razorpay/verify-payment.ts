interface Env {
  RAZORPAY_KEY_SECRET: string;
  DB: D1Database;
}

function getCookie(request: Request, name: string) {
  const cookieString = request.headers.get('Cookie');
  if (!cookieString) return null;
  const cookies = cookieString.split(';').map(c => c.trim().split('='));
  const cookie = cookies.find(c => c[0] === name);
  return cookie ? decodeURIComponent(cookie[1]) : null;
}

async function hmacSha256(secret: string, message: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: { name: "SHA-256" } },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    enc.encode(message)
  );
  return Array.from(new Uint8Array(signature))
    .map(b => b.toString(16).padStart(2, "0"))
    .join("");
}

export const onRequest: PagesFunction<Env> = async (context) => {
  const { request, env } = context;

  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method Not Allowed' }), { status: 405 });
  }

  const sessionId = getCookie(request, 'session_id');
  if (!sessionId) {
    return new Response(JSON.stringify({ error: 'Unauthorized: No active session' }), { status: 401 });
  }

  const keySecret = env.RAZORPAY_KEY_SECRET;
  if (!keySecret) {
    return new Response(
      JSON.stringify({ error: 'Server configuration error: RAZORPAY_KEY_SECRET is missing' }),
      { status: 500 }
    );
  }

  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await request.json() as any;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return new Response(JSON.stringify({ error: 'Missing payment signature parameters' }), { status: 400 });
    }

    const message = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expectedSignature = await hmacSha256(keySecret, message);

    if (expectedSignature !== razorpay_signature) {
      return new Response(JSON.stringify({ error: 'Signature verification failed: Invalid payment signature' }), { status: 400 });
    }

    // Secure database update upon verification
    if (env.DB) {
      await env.DB.prepare(
        `UPDATE calculator_access 
         SET paid_access = 1, 
             razorpay_payment_id = ?, 
             razorpay_signature = ?, 
             updated_at = CURRENT_TIMESTAMP 
         WHERE user_id = ?`
      ).bind(razorpay_payment_id, razorpay_signature, sessionId).run();
    }

    return new Response(JSON.stringify({ verified: true, message: 'Payment verified and unlocked successfully' }), {
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
