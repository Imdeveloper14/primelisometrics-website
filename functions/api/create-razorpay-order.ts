interface Env {
  RAZORPAY_KEY_ID: string;
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

export const onRequest: PagesFunction<Env> = async (context) => {
  const { request, env } = context;

  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method Not Allowed' }), { status: 405 });
  }

  const sessionId = getCookie(request, 'session_id');
  if (!sessionId) {
    return new Response(JSON.stringify({ error: 'Unauthorized: No active session found' }), { status: 401 });
  }

  const keyId = env.RAZORPAY_KEY_ID;
  const keySecret = env.RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret) {
    return new Response(
      JSON.stringify({ error: 'Server configuration error: Razorpay keys are missing' }),
      { status: 500 }
    );
  }

  try {
    const receiptId = `rcpt_${crypto.randomUUID().slice(0, 18)}`;
    const authHeader = 'Basic ' + btoa(`${keyId}:${keySecret}`);

    const razorpayResponse = await fetch('https://api.razorpay.com/v1/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authHeader
      },
      body: JSON.stringify({
        amount: 1000, // ₹10 INR in paise
        currency: 'INR',
        receipt: receiptId,
        notes: {
          product: 'Insel & Molland Calculator Access',
          user_key: sessionId
        }
      })
    });

    const orderData: any = await razorpayResponse.json();

    if (!razorpayResponse.ok) {
      return new Response(
        JSON.stringify({ error: orderData.error?.description || 'Razorpay order creation failed' }),
        { status: razorpayResponse.status }
      );
    }

    // Save order ID in D1
    if (env.DB) {
      await env.DB.prepare(
        'UPDATE calculator_access SET razorpay_order_id = ?, updated_at = CURRENT_TIMESTAMP WHERE user_id = ?'
      ).bind(orderData.id, sessionId).run();
    }

    return new Response(JSON.stringify({ 
      order_id: orderData.id, 
      amount: orderData.amount,
      currency: orderData.currency,
      key_id: keyId 
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
