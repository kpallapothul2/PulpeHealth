import { db } from "../server/db";
import { products } from "../shared/schema";
import fs from "fs";
import path from "path";

(async () => {
  try {
    let rows = await db.select().from(products);
    // sanitize descriptions: replace 'organic' -> 'fresh'
    rows = rows.map((p) => ({
      ...p,
      description: p.description?.replace(/organic/gi, "fresh"),
    }));
    const filePath = path.resolve(import.meta.dirname, "..", "client", "src", "data", "products.json");
    await fs.promises.mkdir(path.dirname(filePath), { recursive: true });
    await fs.promises.writeFile(filePath, JSON.stringify(rows, null, 2));
    console.log(`Wrote ${rows.length} products to ${filePath}`);
  } catch (err) {
    console.error("Failed to export products", err);
    process.exit(1);
  }
})(); 