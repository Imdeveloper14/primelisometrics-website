CREATE TABLE IF NOT EXISTS calculator_access (
  user_id TEXT PRIMARY KEY,
  email TEXT,
  free_use_consumed INTEGER DEFAULT 0, -- Legacy support
  paid_access INTEGER DEFAULT 0,        -- Legacy support
  razorpay_order_id TEXT,
  razorpay_payment_id TEXT,
  razorpay_signature TEXT,
  razorpay_qr_id TEXT,
  free_used INTEGER DEFAULT 0,
  paid_calculations_remaining INTEGER DEFAULT 0,
  last_payment_id TEXT,
  last_payment_time DATETIME,
  session_key TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
