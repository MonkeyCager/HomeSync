import { Pool } from "pg";

let pool: Pool | null = null;
let warnedMissingUrl = false;

function getDatabaseUrl(): string | undefined {
  const value = process.env.DATABASE_URL?.trim();
  return value ? value : undefined;
}

export function getPool(): Pool | null {
  const databaseUrl = getDatabaseUrl();

  if (!databaseUrl) {
    if (!warnedMissingUrl) {
      console.warn(
        "[backend] DATABASE_URL is not set. Continuing without a DB connection in development.",
      );
      warnedMissingUrl = true;
    }
    return null;
  }

  if (!pool) {
    pool = new Pool({ connectionString: databaseUrl });
    pool.on("error", (error) => {
      console.warn("[backend] PostgreSQL pool error:", error.message);
    });
  }

  return pool;
}

export async function verifyDatabaseConnection(): Promise<void> {
  const activePool = getPool();
  if (!activePool) {
    return;
  }

  try {
    await activePool.query("select 1");
    console.log("[backend] Connected to PostgreSQL.");
  } catch (error) {
    console.warn(
      "[backend] Unable to connect to PostgreSQL. Continuing without DB for now.",
    );
    if (error instanceof Error) {
      console.warn(`[backend] ${error.message}`);
    }
  }
}
