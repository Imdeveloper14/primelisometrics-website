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

    // Default: Fallback to serving static assets with clean URL / HTML fallback
    if (env.ASSETS && typeof env.ASSETS.fetch === 'function') {
      let assetResponse = await env.ASSETS.fetch(request);
      
      // If direct match failed (e.g. 404 for /calculators or /froude-calculator)
      if (assetResponse.status === 404) {
        const cleanPath = path.replace(/\/$/, '');
        if (cleanPath) {
          // 1. Try path/index.html
          const indexUrl = new URL(`${cleanPath}/index.html`, request.url);
          let tryResp = await env.ASSETS.fetch(new Request(indexUrl.toString(), request));
          if (tryResp.status === 200) return tryResp;

          // 2. Try path.html
          const htmlUrl = new URL(`${cleanPath}.html`, request.url);
          tryResp = await env.ASSETS.fetch(new Request(htmlUrl.toString(), request));
          if (tryResp.status === 200) return tryResp;

          // 3. Fallbacks for direct core calculator files
          if (cleanPath === '/froude-calculator' || cleanPath === '/william-froude-calculator') {
            const fcUrl = new URL('/froude-calculator.html', request.url);
            tryResp = await env.ASSETS.fetch(new Request(fcUrl.toString(), request));
            if (tryResp.status === 200) return tryResp;
          }
          if (cleanPath === '/calculator') {
            const imUrl = new URL('/insel-molland-calculator.html', request.url);
            tryResp = await env.ASSETS.fetch(new Request(imUrl.toString(), request));
            if (tryResp.status === 200) return tryResp;
          }
          if (cleanPath === '/savitsky-calculator') {
            const scUrl = new URL('/savitsky-calculator.html', request.url);
            tryResp = await env.ASSETS.fetch(new Request(scUrl.toString(), request));
            if (tryResp.status === 200) return tryResp;
          }
          if (cleanPath === '/holtrop-calculator') {
            const hcUrl = new URL('/holtrop-calc-core.html', request.url);
            tryResp = await env.ASSETS.fetch(new Request(hcUrl.toString(), request));
            if (tryResp.status === 200) return tryResp;
          }
        }
      }
      
      return assetResponse;
    }
    return new Response("Not Found", { status: 404 });
  }
};
