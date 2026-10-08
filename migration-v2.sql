-- IMPORTANT: only use this migration if the old schema.sql was already applied.
-- SQLite cannot directly change orders.user_id from NOT NULL to nullable.
PRAGMA foreign_keys=OFF;
CREATE TABLE IF NOT EXISTS orders_v2(id INTEGER PRIMARY KEY AUTOINCREMENT,order_number TEXT NOT NULL UNIQUE,user_id INTEGER,guest_name TEXT,guest_contact TEXT,subtotal REAL NOT NULL,discount REAL NOT NULL DEFAULT 0,total REAL NOT NULL,payment_method TEXT NOT NULL,payment_status TEXT NOT NULL DEFAULT 'awaiting_payment',fulfillment_status TEXT NOT NULL DEFAULT 'pending',notes TEXT DEFAULT '',created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE SET NULL);
INSERT INTO orders_v2(id,order_number,user_id,subtotal,discount,total,payment_method,payment_status,fulfillment_status,notes,created_at,updated_at)
SELECT id,order_number,user_id,subtotal,discount,total,payment_method,payment_status,fulfillment_status,notes,created_at,updated_at FROM orders;
DROP TABLE orders;
ALTER TABLE orders_v2 RENAME TO orders;
PRAGMA foreign_keys=ON;
