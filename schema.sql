CREATE TABLE IF NOT EXISTS calculator_access (
  user_id TEXT PRIMARY KEY,
  free_use_consumed INTEGER DEFAULT 0, -- 0 = false, 1 = true
  paid_access INTEGER DEFAULT 0,        -- 0 = false, 1 = true
  razorpay_order_id TEXT,
  razorpay_payment_id TEXT,
  razorpay_signature TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
