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
  try {
    const { request, env } = context;

    if (request.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'Method Not Allowed' }), { status: 405 });
    }

    const sessionId = getCookie(request, 'session_id');
    if (!sessionId) {
      return new Response(JSON.stringify({ error: 'Unauthorized: No active session found' }), { status: 401 });
    }

    if (!env.DB) {
      return new Response(JSON.stringify({ error: "Database DB binding is missing." }), { status: 500 });
    }

    const userRecord: any = await env.DB.prepare('SELECT email FROM calculator_access WHERE user_id = ?').bind(sessionId).first();
    if (!userRecord || !userRecord.email) {
      return new Response(JSON.stringify({ error: 'Email address is required before generating payment QR.' }), { status: 400 });
    }

    // Trim keys and strip any accidental enclosing quotes
    const keyId = env.RAZORPAY_KEY_ID?.trim().replace(/^["']|["']$/g, '');
    const keySecret = env.RAZORPAY_KEY_SECRET?.trim().replace(/^["']|["']$/g, '');

    if (!keyId) {
      console.error("[Razorpay QR API] Error: RAZORPAY_KEY_ID is missing.");
      return new Response(
        JSON.stringify({ error: 'Server configuration error: RAZORPAY_KEY_ID is missing' }),
        { status: 500 }
      );
    }

    if (!keySecret) {
      console.error("[Razorpay QR API] Error: RAZORPAY_KEY_SECRET is missing.");
      return new Response(
        JSON.stringify({ error: 'Server configuration error: RAZORPAY_KEY_SECRET is missing' }),
        { status: 500 }
      );
    }

    // Mask keys safely for debugging
    const maskedKeyId = keyId.slice(0, 8) + '...' + keyId.slice(-4);
    const maskedKeySecret = keySecret.slice(0, 4) + '...' + keySecret.slice(-4);
    console.log(`[Razorpay QR API] Using Key ID: ${maskedKeyId}, Key Secret length: ${keySecret.length} (${maskedKeySecret})`);

    const authHeader = 'Basic ' + btoa(`${keyId}:${keySecret}`);
    
    // First, attempt to create a direct UPI QR code
    const qrEndpoint = 'https://api.razorpay.com/v1/payments/qr_codes';
    const qrReqBody = {
      type: 'upi_qr',
      name: 'Primelisometrics Catamaran Access',
      usage: 'single_use',
      fixed_amount: true,
      payment_amount: 19900, // ₹199 INR in paise
      description: 'Insel & Molland Calculator Access',
      notes: {
        product: 'Insel & Molland Calculator Access',
        user_key: sessionId
      }
    };

    console.log(`[Razorpay QR API] Attempting QR Codes API: ${qrEndpoint}`);
    const qrResponse = await fetch(qrEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authHeader
      },
      body: JSON.stringify(qrReqBody)
    });

    console.log(`[Razorpay QR API] QR Codes API Status: ${qrResponse.status}`);
    const qrData: any = await qrResponse.json();

    if (qrResponse.ok) {
      console.log("[Razorpay QR API] QR Code created successfully.");
      if (env.DB) {
        await env.DB.prepare(
          'UPDATE calculator_access SET razorpay_qr_id = ?, updated_at = CURRENT_TIMESTAMP WHERE user_id = ?'
        ).bind(qrData.id, sessionId).run();
      }
      return new Response(JSON.stringify({ 
        qr_id: qrData.id, 
        image_url: qrData.image_url,
        amount: qrData.payment_amount,
        currency: 'INR'
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // If direct QR code API fails (commonly 404 Route Not Matched due to feature not enabled on merchant account)
    console.warn(`[Razorpay QR API] Direct QR failed (${qrResponse.status}). Error:`, JSON.stringify(qrData));
    console.log("[Razorpay QR API] Falling back to Payment Links API to generate a scanable UPI link QR...");

    const linkEndpoint = 'https://api.razorpay.com/v1/payment_links';
    const linkReqBody = {
      amount: 19900, // ₹199 INR in paise
      currency: 'INR',
      accept_partial: false,
      description: 'Insel & Molland Calculator Access',
      notes: {
        product: 'Insel & Molland Calculator Access',
        user_key: sessionId
      }
    };

    const linkResponse = await fetch(linkEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authHeader
      },
      body: JSON.stringify(linkReqBody)
    });

    console.log(`[Razorpay QR API] Payment Links API Status: ${linkResponse.status}`);
    const linkData: any = await linkResponse.json();

    if (!linkResponse.ok) {
      console.error("[Razorpay QR API] Payment Links Fallback also failed:", JSON.stringify(linkData));
      let errMsg = linkData.error?.description || 'Razorpay order creation failed';
      if (linkResponse.status === 401) {
        errMsg = `Razorpay authentication failed. Verify Key ID (${maskedKeyId}) and Key Secret.`;
      }
      return new Response(JSON.stringify({ error: errMsg }), { status: linkResponse.status });
    }

    console.log("[Razorpay QR API] Payment Link created successfully. Generating QR from short URL.");
    const linkQrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(linkData.short_url)}`;

    // Save payment link ID as qr_id in D1
    if (env.DB) {
      await env.DB.prepare(
        'UPDATE calculator_access SET razorpay_qr_id = ?, updated_at = CURRENT_TIMESTAMP WHERE user_id = ?'
      ).bind(linkData.id, sessionId).run();
    }

    return new Response(JSON.stringify({ 
      qr_id: linkData.id, 
      image_url: linkQrUrl,
      amount: linkData.amount,
      currency: 'INR'
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    console.error("[Razorpay QR API] Handler Exception:", err);
    return new Response(JSON.stringify({ error: err.message || 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
