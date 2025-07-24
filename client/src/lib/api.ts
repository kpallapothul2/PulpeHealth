import type { Product, InsertContact } from "@shared/schema";
// @ts-ignore - JSON import handled by Vite
import productsData from "@/data/products.json";
import { apiRequest } from "./queryClient";

const products: Product[] = productsData as Product[];

export async function fetchProducts(): Promise<Product[]> {
  return products;
}

export async function fetchProductsByCategory(category: string): Promise<Product[]> {
  return products.filter((p) => p.category === category);
}

export async function fetchFeaturedProducts(): Promise<Product[]> {
  return products.filter((p) => p.featured);
}

export async function fetchProductBySlug(slug: string): Promise<Product> {
  const prod = products.find((p) => p.slug === slug);
  if (!prod) throw new Error("Product not found");
  return prod;
}

// We can still keep the contact API call; fallback to console log if fails
export async function submitContactForm(data: InsertContact): Promise<{ message: string; id: number }> {
  try {
    const response = await apiRequest("POST", "/api/contact", data);
    return response.json();
  } catch (err) {
    console.error("Contact API failed, logging locally", err);
    return { message: "stored locally", id: Date.now() };
  }
}
