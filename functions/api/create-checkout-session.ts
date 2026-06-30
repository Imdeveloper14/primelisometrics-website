import Stripe from 'stripe';

interface Env {
  STRIPE_SECRET_KEY: string;
  APP_URL: string;
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

  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method Not Allowed' }), { status: 405 });
  }

  const sessionId = getCookie(request, 'session_id');
  if (!sessionId) {
    return new Response(JSON.stringify({ error: 'Unauthorized: No active session found' }), { status: 401 });
  }

  const stripeKey = env.STRIPE_SECRET_KEY;
  if (!stripeKey) {
    return new Response(
      JSON.stringify({ error: 'Server configuration error: STRIPE_SECRET_KEY is missing' }),
      { status: 500 }
    );
  }

  const appUrl = env.APP_URL || 'https://royal-feather-b793.chandrunavalarch.workers.dev';

  try {
    const stripe = new Stripe(stripeKey, {
      apiVersion: '2023-10-16' as any,
      httpClient: Stripe.createFetchHttpClient(), // Required for Cloudflare Workers/Pages edge runtime
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Insel & Molland Calculator Access',
              description: 'Lifetime unlimited access to catamaran interference resistance calculator',
            },
            unit_amount: 1000, // $10 USD in cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      metadata: {
        session_id: sessionId,
      },
      success_url: `${appUrl}/calculator?success=true`,
      cancel_url: `${appUrl}/calculator?canceled=true`,
    });

    // Update checkout session ID in D1
    if (env.DB) {
      await env.DB.prepare(
        'UPDATE calculator_access SET stripe_checkout_session_id = ?, updated_at = CURRENT_TIMESTAMP WHERE user_id = ?'
      ).bind(session.id, sessionId).run();
    }

    return new Response(JSON.stringify({ url: session.url }), {
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
