-- Run once if you don't want to wait for the auto-migration (skip if it errors with "duplicate column name").
ALTER TABLE users ADD COLUMN points_redeemed INTEGER NOT NULL DEFAULT 0;
