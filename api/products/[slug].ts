import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import { eq } from 'drizzle-orm';
import ws from "ws";
import * as schema from "../../shared/schema";

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

  const { slug } = req.query;

  if (!slug || typeof slug !== 'string') {
    return res.status(400).json({ message: 'Slug parameter is required' });
  }

  try {
    const products = await db.select().from(schema.products).where(eq(schema.products.slug, slug));
    
    if (products.length === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(products[0]);
  } catch (error) {
    console.error('Error fetching product by slug:', error);
    res.status(500).json({ message: "Failed to fetch product" });
  }
}
