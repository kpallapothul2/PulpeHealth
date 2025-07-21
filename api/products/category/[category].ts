import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import { eq } from 'drizzle-orm';
import ws from "ws";
import * as schema from "../../../shared/schema";

neonConfig.webSocketConstructor = ws;

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const db = drizzle({ client: pool, schema });

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { category } = req.query;

  if (!category || typeof category !== 'string') {
    return res.status(400).json({ message: 'Category parameter is required' });
  }

  try {
    const products = await db.select().from(schema.products).where(eq(schema.products.category, category));
    res.json(products);
  } catch (error) {
    console.error('Error fetching products by category:', error);
    res.status(500).json({ message: "Failed to fetch products by category" });
  }
}
