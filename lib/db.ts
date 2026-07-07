import { Pool, type PoolConfig } from "pg"

const globalForDb = globalThis as typeof globalThis & {
  sigtrpDbPool?: Pool
}

function buildSupabaseDatabaseUrl() {
  const projectId = process.env.SUPABASE_PROJECT_ID
  const password = process.env.SUPABASE_DB_PASSWORD
  const poolerHost =
    process.env.SUPABASE_POOLER_HOST ?? "aws-0-sa-east-1.pooler.supabase.com"

  if (!projectId || !password) {
    return null
  }

  const encodedPassword = encodeURIComponent(password)

  return `postgresql://postgres.${projectId}:${encodedPassword}@${poolerHost}:6543/postgres?pgbouncer=true`
}

function getConnectionString() {
  const databaseUrl = process.env.DATABASE_URL?.trim()

  if (databaseUrl && !databaseUrl.includes("[YOUR-PASSWORD]")) {
    return databaseUrl
  }

  const supabaseUrl = buildSupabaseDatabaseUrl()

  if (supabaseUrl) {
    return supabaseUrl
  }

  throw new Error(
    "Configure DATABASE_URL ou SUPABASE_PROJECT_ID + SUPABASE_DB_PASSWORD nas variáveis de ambiente.",
  )
}

function getPoolConfig(): PoolConfig {
  const connectionString = getConnectionString()

  return {
    connectionString,
    max: 1,
    idleTimeoutMillis: 20_000,
    connectionTimeoutMillis: 10_000,
    ssl: connectionString.includes("supabase.com")
      ? { rejectUnauthorized: false }
      : undefined,
  }
}

export function getDbPool() {
  if (!globalForDb.sigtrpDbPool) {
    globalForDb.sigtrpDbPool = new Pool(getPoolConfig())
  }

  return globalForDb.sigtrpDbPool
}
