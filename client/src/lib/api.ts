import { apiRequest } from "./queryClient";
import type { Product, InsertContact } from "@shared/schema";

export async function fetchProducts(): Promise<Product[]> {
  const response = await apiRequest("GET", "/api/products");
  return response.json();
}

export async function fetchProductsByCategory(category: string): Promise<Product[]> {
  const response = await apiRequest("GET", `/api/products/category/${category}`);
  return response.json();
}

export async function fetchFeaturedProducts(): Promise<Product[]> {
  const response = await apiRequest("GET", "/api/products/featured");
  return response.json();
}

export async function fetchProductBySlug(slug: string): Promise<Product> {
  const response = await apiRequest("GET", `/api/products/${slug}`);
  return response.json();
}

export async function submitContactForm(data: InsertContact): Promise<{ message: string; id: number }> {
  const response = await apiRequest("POST", "/api/contact", data);
  return response.json();
}
