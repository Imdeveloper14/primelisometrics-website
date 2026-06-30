interface Env {
  RAZORPAY_WEBHOOK_SECRET: string;
  DB: D1Database;
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

  const signature = request.headers.get('x-razorpay-signature');
  if (!signature) {
    return new Response(JSON.stringify({ error: 'Missing x-razorpay-signature header' }), { status: 400 });
  }

  const webhookSecret = env.RAZORPAY_WEBHOOK_SECRET;
  if (!webhookSecret) {
    return new Response(
      JSON.stringify({ error: 'Server configuration error: RAZORPAY_WEBHOOK_SECRET is missing' }),
      { status: 500 }
    );
  }

  try {
    const rawBody = await request.text();
    const expectedSignature = await hmacSha256(webhookSecret, rawBody);

    if (expectedSignature !== signature) {
      return new Response(JSON.stringify({ error: 'Signature verification failed: Invalid webhook signature' }), { status: 400 });
    }

    const payload = JSON.parse(rawBody);
    const eventType = payload.event;

    if (eventType === 'payment.captured' || eventType === 'order.paid') {
      const paymentEntity = payload.payload?.payment?.entity;
      const orderEntity = payload.payload?.order?.entity;

      const orderId = paymentEntity?.order_id || orderEntity?.id;
      const paymentId = paymentEntity?.id;
      const sessionId = paymentEntity?.notes?.user_key || orderEntity?.notes?.user_key;

      if (sessionId && env.DB) {
        // Query the current database record to check if already unlocked.
        // Doing this ensures we avoid duplicate unlock overhead, though UPDATE is idempotent.
        await env.DB.prepare(
          `UPDATE calculator_access 
           SET paid_access = 1, 
               razorpay_order_id = ?, 
               razorpay_payment_id = ?, 
               updated_at = CURRENT_TIMESTAMP 
           WHERE user_id = ?`
        ).bind(orderId || null, paymentId || null, sessionId).run();
      }
    }

    return new Response(JSON.stringify({ received: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
