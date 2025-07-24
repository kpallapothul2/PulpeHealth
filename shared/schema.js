import { pgTable, text, serial, integer, boolean, decimal } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
export const products = pgTable("products", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    slug: text("slug").notNull().unique(),
    description: text("description").notNull(),
    price: decimal("price", { precision: 10, scale: 2 }).notNull(),
    originalPrice: decimal("original_price", { precision: 10, scale: 2 }),
    calories: integer("calories"),
    category: text("category").notNull(),
    imageUrl: text("image_url").notNull(),
    ingredients: text("ingredients").array(),
    featured: boolean("featured").default(false),
    inStock: boolean("in_stock").default(true),
}, (table) => ({ schema: "puple" }));
export const contacts = pgTable("contacts", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull(),
    message: text("message").notNull(),
    createdAt: text("created_at").notNull(),
}, (table) => ({ schema: "puple" }));
export const insertProductSchema = createInsertSchema(products).omit({
    id: true,
});
export const insertContactSchema = createInsertSchema(contacts).omit({
    id: true,
    createdAt: true,
});
export const users = pgTable("users", {
    id: serial("id").primaryKey(),
    username: text("username").notNull().unique(),
    password: text("password").notNull(),
}, (table) => ({ schema: "puple" }));
export const insertUserSchema = createInsertSchema(users).pick({
    username: true,
    password: true,
});
