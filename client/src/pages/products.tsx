import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { fetchProducts, fetchProductsByCategory } from "@/lib/api";

export default function Products() {
  const [location] = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Parse category from URL query params
  const urlParams = new URLSearchParams(location.split('?')[1] || '');
  const categoryFromUrl = urlParams.get('category');

  const actualCategory = categoryFromUrl || selectedCategory;

  const { data: products, isLoading } = useQuery({
    queryKey: actualCategory === "all" ? ["/api/products"] : ["/api/products/category", actualCategory],
    queryFn: () => actualCategory === "all" ? fetchProducts() : fetchProductsByCategory(actualCategory),
  });

  const categories = [
    { id: "all", name: "All Products" },
    { id: "juices", name: "Juices" },
    { id: "smoothies", name: "Smoothies" },
    { id: "cleanses", name: "Cleanses" },
    { id: "shots", name: "Wellness Shots" },
  ];

  const filteredProducts = products?.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    const url = categoryId === "all" ? "/products" : `/products?category=${categoryId}`;
    window.history.pushState({}, "", url);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-brand-green text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4">Our Products</h1>
          <p className="text-xl text-green-100 max-w-2xl mx-auto">
            Discover our complete collection of organic juices, smoothies, and wellness products designed to nourish your body and soul.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={actualCategory === category.id ? "default" : "outline"}
                  onClick={() => handleCategoryChange(category.id)}
                  className={actualCategory === category.id 
                    ? "bg-brand-green hover:bg-brand-dark-green text-white" 
                    : "border-brand-green text-brand-green hover:bg-brand-light-green"
                  }
                >
                  {category.name}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Results count */}
        {filteredProducts && (
          <div className="mb-6">
            <p className="text-gray-600">
              Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
              {searchTerm && ` for "${searchTerm}"`}
            </p>
          </div>
        )}

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {isLoading
            ? Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="h-48 w-full rounded-2xl" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-10 w-full" />
                </div>
              ))
            : filteredProducts?.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
        </div>

        {/* No results */}
        {!isLoading && filteredProducts?.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">No products found</h3>
            <p className="text-gray-600">
              {searchTerm 
                ? `No products match "${searchTerm}". Try adjusting your search.`
                : "No products found in this category."
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
