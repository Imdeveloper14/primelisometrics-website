import { onRequest as statusHandler } from '../functions/api/status';
import { onRequest as createOrderHandler } from '../functions/api/create-razorpay-order';
import { onRequest as verifyPaymentHandler } from '../functions/api/razorpay/verify-payment';
import { onRequest as webhookHandler } from '../functions/api/razorpay/webhook';

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
    if (path === '/api/create-razorpay-order') {
      return createOrderHandler(context);
    }
    if (path === '/api/razorpay/verify-payment') {
      return verifyPaymentHandler(context);
    }
    if (path === '/api/razorpay/webhook') {
      return webhookHandler(context);
    }

    // Default: Fallback to serving static assets
    return env.ASSETS.fetch(request);
  }
};
