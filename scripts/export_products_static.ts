import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function exportProducts() {
  try {
    const filePath = path.resolve(__dirname, "..", "client", "src", "data", "products.json");
    
    // In production build, use the existing products.json if DATABASE_URL is not set
    if (!process.env.DATABASE_URL) {
      if (fs.existsSync(filePath)) {
        console.log("Using existing products.json for build");
        return;
      }
      throw new Error("No DATABASE_URL and no existing products.json found");
    }

    // Only import database modules if DATABASE_URL is set
    const { db } = await import("../server/db");
    const { products } = await import("../shared/schema");

    // Get products from database
    const rows = await db.select().from(products);
    
    // Create directory if it doesn't exist
    await fs.promises.mkdir(path.dirname(filePath), { recursive: true });
    
    // Write products to JSON file
    await fs.promises.writeFile(filePath, JSON.stringify(rows, null, 2));
    console.log(`Wrote ${rows.length} products to ${filePath}`);
  } catch (err) {
    console.error("Failed to export products:", err);
    process.exit(1);
  }
}

exportProducts(); 