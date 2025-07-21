import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { parse } from 'csv-parse/sync';
import { Pool } from '@neondatabase/serverless';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

async function importProducts() {
  const csvPath = path.join(__dirname, '../products.csv');
  const fileContent = fs.readFileSync(csvPath, 'utf-8');
  const records = parse(fileContent, {
    columns: true,
    skip_empty_lines: true,
  });

  for (const record of records) {
    // Cast record to any to avoid TypeScript issues with CSV parsing
    const csvRecord = record as any;
    
    // Prepare values for insertion
    let ingredients: string[] | null = null;
    if (csvRecord.ingredients) {
      try {
        // Parse the JSON string and convert to PostgreSQL array format
        const ingredientsArray = JSON.parse(csvRecord.ingredients);
        ingredients = ingredientsArray;
      } catch (e) {
        console.warn(`Failed to parse ingredients for ${csvRecord.name}:`, csvRecord.ingredients);
        ingredients = [];
      }
    }
    
    const values = [
      csvRecord.name,
      csvRecord.slug,
      csvRecord.description,
      csvRecord.price ? parseFloat(csvRecord.price) : null,
      csvRecord.original_price ? parseFloat(csvRecord.original_price) : null,
      csvRecord.calories ? parseInt(csvRecord.calories) : null,
      csvRecord.category,
      csvRecord.image_url,
      ingredients,
      csvRecord.featured === 'true',
      csvRecord.in_stock === 'true',
    ];
    await pool.query(
      `INSERT INTO products (name, slug, description, price, original_price, calories, category, image_url, ingredients, featured, in_stock)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
       ON CONFLICT (slug) DO NOTHING`,
      values
    );
  }
  await pool.end();
  console.log('Products imported successfully!');
}

importProducts().catch(console.error);
