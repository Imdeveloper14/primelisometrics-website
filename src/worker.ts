import { onRequest as statusHandler } from '../functions/api/status';
import { onRequest as createQrHandler } from '../functions/api/create-razorpay-qr';
import { onRequest as webhookHandler } from '../functions/api/razorpay/webhook';
import { onRequest as paymentStatusHandler } from '../functions/api/razorpay/payment-status';

export interface Env {
  DB: D1Database;
  RAZORPAY_KEY_ID: string;
  RAZORPAY_KEY_SECRET: string;
  RAZORPAY_WEBHOOK_SECRET: string;
  APP_URL: string;
  ASSETS: { fetch: typeof fetch };
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);
    const path = url.pathname;

    // Create pages context mimic
    const context = {
      request,
      env,
      ctx,
      next: () => env.ASSETS.fetch(request),
      data: {},
      params: {}
    } as any;

    if (path === '/api/status') {
      return statusHandler(context);
    }
    if (path === '/api/create-razorpay-qr') {
      return createQrHandler(context);
    }
    if (path === '/api/razorpay/payment-status') {
      return paymentStatusHandler(context);
    }
    if (path === '/api/razorpay/webhook') {
      return webhookHandler(context);
    }

    // Default: Fallback to serving static assets
    if (env.ASSETS && typeof env.ASSETS.fetch === 'function') {
      return env.ASSETS.fetch(request);
    }
    return new Response("Not Found", { status: 404 });
  }
};
