import type { NextFunction, Request, Response } from "express";
import { getPool } from "../db.js";

export async function requireAdmin(req: Request, res: Response, next: NextFunction) {
  if (!req.user?.userId) {
    return res.status(401).json({ message: "Authentication required." });
  }

  const pool = getPool();
  if (!pool) return res.status(503).json({ message: "Database unavailable." });

  try {
    const result = await pool.query(
      "SELECT user_type, is_active FROM app_user WHERE user_id = $1",
      [req.user.userId],
    );
    const user = result.rows[0];
    if (!user || !user.is_active) {
      return res.status(401).json({ message: "Session invalid. Please log in again." });
    }
    if (user.user_type !== "admin") {
      return res.status(403).json({ message: "Admin access required." });
    }
    next();
  } catch (error) {
    console.error("[admin] Authorization error:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
}
