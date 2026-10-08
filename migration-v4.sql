-- V4 is intentionally non-destructive. The existing V2/V3 D1 schema already contains
-- every field required by the V4 application. Run this only as a marker migration.
INSERT OR IGNORE INTO settings(key,value) VALUES
('store_name','Kardivo'),
('store_currency','EGP'),
('support_text','Send your payment screenshot and order number to Kardivo Support.');
