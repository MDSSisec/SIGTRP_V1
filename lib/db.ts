import { Pool } from "pg"

let pool: Pool | null = null

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
    "Configure DATABASE_URL ou SUPABASE_PROJECT_ID + SUPABASE_DB_PASSWORD no .env.local",
  )
}

export function getDbPool() {
  if (!pool) {
    pool = new Pool({ connectionString: getConnectionString() })
  }

  return pool
}
