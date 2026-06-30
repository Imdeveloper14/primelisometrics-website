import Stripe from 'stripe';

interface Env {
  STRIPE_SECRET_KEY: string;
  STRIPE_WEBHOOK_SECRET: string;
  DB: D1Database;
}

export const onRequest: PagesFunction<Env> = async (context) => {
  const { request, env } = context;

  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method Not Allowed' }), { status: 405 });
  }

  const signature = request.headers.get('stripe-signature');
  if (!signature) {
    return new Response(JSON.stringify({ error: 'Missing stripe-signature header' }), { status: 400 });
  }

  const stripeKey = env.STRIPE_SECRET_KEY;
  const webhookSecret = env.STRIPE_WEBHOOK_SECRET;

  if (!stripeKey || !webhookSecret) {
    return new Response(
      JSON.stringify({ error: 'Server configuration error: Stripe secrets are missing' }),
      { status: 500 }
    );
  }

  try {
    const stripe = new Stripe(stripeKey, {
      apiVersion: '2023-10-16' as any,
      httpClient: Stripe.createFetchHttpClient(), // Cloudflare Workers fetch wrapper
    });

    const body = await request.text();
    const event = await stripe.webhooks.constructEventAsync(body, signature, webhookSecret);

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      const sessionId = session.metadata?.session_id;
      const paymentIntentId = typeof session.payment_intent === 'string' 
        ? session.payment_intent 
        : (session.payment_intent as any)?.id || null;

      if (sessionId && env.DB) {
        // Unlock database row
        await env.DB.prepare(
          `UPDATE calculator_access 
           SET paid_access = 1, 
               stripe_payment_intent_id = ?, 
               updated_at = CURRENT_TIMESTAMP 
           WHERE user_id = ?`
        ).bind(paymentIntentId, sessionId).run();
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
