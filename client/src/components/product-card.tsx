import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import type { Product } from "@shared/schema";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group">
      <div className="relative">
        <img 
          src={product.imageUrl} 
          alt={product.name} 
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" 
        />
        {product.originalPrice && (
          <Badge className="absolute top-2 right-2 bg-red-500 text-white">
            Sale
          </Badge>
        )}
        {!product.inStock && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <Badge variant="destructive" className="text-lg px-4 py-2">
              Sold Out
            </Badge>
          </div>
        )}
      </div>
      <CardContent className="p-6">
        <Link href={`/product/${product.slug}`}>
          <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-brand-green transition-colors cursor-pointer">
            {product.name}
          </h3>
        </Link>
        <p className="text-sm text-gray-600 mb-3">{product.description}</p>
        {product.calories && (
          <p className="text-xs text-gray-500 mb-4">{product.calories} Calories</p>
        )}
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold text-brand-green">₹{product.price}</span>
            {product.originalPrice && (
              <span className="text-sm text-gray-400 line-through">₹{product.originalPrice}</span>
            )}
          </div>
          <Button 
            className="bg-brand-orange hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            disabled={!product.inStock}
          >
            {product.inStock ? "Add to Cart" : "Sold Out"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
