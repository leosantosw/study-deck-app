import { neon, neonConfig } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'

neonConfig.fetchConnectionCache = false

const sql = neon(process.env.DATABASE_URL!)

export const db = drizzle(sql)
