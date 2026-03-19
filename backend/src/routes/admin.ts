import { Router } from "express";
import { getPool } from "../db.js";
import { adminUpdateUserSchema } from "../validation.js";

const router = Router();

router.get("/users", async (_req, res) => {
  const pool = getPool();
  if (!pool) return res.status(503).json({ message: "Database unavailable." });

  try {
    const { rows } = await pool.query(
      `SELECT user_id, first_name, last_name, email, user_type, is_active, created_at
       FROM app_user
       ORDER BY created_at DESC`,
    );

    return res.json(
      rows.map((r) => ({
        userId: r.user_id,
        firstName: r.first_name,
        lastName: r.last_name,
        email: r.email,
        userType: r.user_type,
        isActive: r.is_active,
        createdAt: r.created_at,
      })),
    );
  } catch (error) {
    console.error("[admin] Error fetching users:", error);
    return res.status(500).json({ message: "Unable to load users." });
  }
});

router.patch("/users/:id", async (req, res) => {
  const userId = Number(req.params.id);
  if (!Number.isInteger(userId) || userId <= 0) {
    return res.status(400).json({ message: "Invalid user ID." });
  }

  const parsed = adminUpdateUserSchema.safeParse(req.body);
  if (!parsed.success) {
    const msg = parsed.error.errors.map((e) => e.message).join(", ");
    return res.status(400).json({ message: msg });
  }

  if (req.user?.userId === userId && parsed.data.isActive === false) {
    return res.status(400).json({ message: "Admins cannot deactivate their own account." });
  }
  if (req.user?.userId === userId && parsed.data.userType && parsed.data.userType !== "admin") {
    return res.status(400).json({ message: "Admins cannot remove their own admin role." });
  }

  const pool = getPool();
  if (!pool) return res.status(503).json({ message: "Database unavailable." });

  try {
    const setClauses: string[] = [];
    const values: unknown[] = [];
    let idx = 1;

    if (parsed.data.userType !== undefined) {
      setClauses.push(`user_type = $${idx++}`);
      values.push(parsed.data.userType);
    }
    if (parsed.data.isActive !== undefined) {
      setClauses.push(`is_active = $${idx++}`);
      values.push(parsed.data.isActive);
    }

    if (setClauses.length === 0) {
      return res.status(400).json({ message: "No fields to update." });
    }

    setClauses.push("updated_at = NOW()");
    values.push(userId);

    const result = await pool.query(
      `UPDATE app_user
       SET ${setClauses.join(", ")}
       WHERE user_id = $${idx}
       RETURNING user_id, first_name, last_name, email, user_type, is_active, created_at`,
      values,
    );

    if (!result.rowCount) {
      return res.status(404).json({ message: "User not found." });
    }

    const updated = result.rows[0];
    return res.json({
      message: "User updated.",
      user: {
        userId: updated.user_id,
        firstName: updated.first_name,
        lastName: updated.last_name,
        email: updated.email,
        userType: updated.user_type,
        isActive: updated.is_active,
        createdAt: updated.created_at,
      },
    });
  } catch (error) {
    console.error("[admin] Error updating user:", error);
    return res.status(500).json({ message: "Unable to update user." });
  }
});

export default router;
