import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, ShoppingCart, Star, Leaf, Heart, Clock } from "lucide-react";
import { Link } from "wouter";
import { fetchProductBySlug } from "@/lib/api";

export default function Product() {
  const { slug } = useParams();
  
  const { data: product, isLoading, error } = useQuery({
    queryKey: ["/api/products", slug],
    queryFn: () => fetchProductBySlug(slug!),
    enabled: !!slug,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <Skeleton className="h-96 w-full rounded-2xl" />
            <div className="space-y-6">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-4 w-1/4" />
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md mx-4">
          <CardContent className="pt-6 text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
            <p className="text-gray-600 mb-6">The product you're looking for doesn't exist.</p>
            <Link href="/products">
              <Button className="bg-brand-green hover:bg-brand-dark-green">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Products
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const categoryColors = {
    juices: "bg-brand-green",
    smoothies: "bg-purple-500",
    cleanses: "bg-blue-500",
    shots: "bg-brand-orange",
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back button */}
        <div className="mb-8">
          <Link href="/products">
            <Button variant="ghost" className="text-brand-green hover:text-brand-dark-green">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Products
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="relative">
            <img 
              src={product.imageUrl} 
              alt={product.name} 
              className="w-full h-96 object-cover rounded-2xl shadow-xl" 
            />
            {product.originalPrice && (
              <Badge className="absolute top-4 right-4 bg-red-500 text-white">
                Sale
              </Badge>
            )}
            {!product.inStock && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-2xl">
                <Badge variant="destructive" className="text-lg px-6 py-3">
                  Sold Out
                </Badge>
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <Badge 
                className={`${categoryColors[product.category as keyof typeof categoryColors] || 'bg-gray-500'} text-white mb-3`}
              >
                {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
              </Badge>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>
              <p className="text-lg text-gray-600">{product.description}</p>
            </div>

            {/* Pricing */}
            <div className="flex items-center space-x-4">
              <span className="text-3xl font-bold text-brand-green">${product.price}</span>
              {product.originalPrice && (
                <span className="text-xl text-gray-400 line-through">${product.originalPrice}</span>
              )}
            </div>

            {/* Calories */}
            {product.calories && (
              <div className="flex items-center space-x-2">
                <Heart className="h-5 w-5 text-red-500" />
                <span className="text-gray-600">{product.calories} Calories</span>
              </div>
            )}

            {/* Ingredients */}
            {product.ingredients && product.ingredients.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Ingredients</h3>
                <div className="flex flex-wrap gap-2">
                  {product.ingredients.map((ingredient, index) => (
                    <Badge key={index} variant="outline" className="border-brand-green text-brand-green">
                      {ingredient}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Add to Cart */}
            <div className="space-y-4">
              <Button 
                size="lg" 
                className="w-full bg-brand-orange hover:bg-orange-600 text-white py-4 text-lg font-semibold"
                disabled={!product.inStock}
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                {product.inStock ? "Add to Cart" : "Sold Out"}
              </Button>
              <p className="text-sm text-gray-500 text-center">Free shipping on orders over $50</p>
            </div>

            {/* Product Features */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-brand-light-green rounded-lg">
                <Leaf className="h-6 w-6 text-brand-green mx-auto mb-2" />
                <p className="text-sm font-medium text-brand-green">100% Organic</p>
              </div>
              <div className="text-center p-4 bg-brand-light-green rounded-lg">
                <Clock className="h-6 w-6 text-brand-green mx-auto mb-2" />
                <p className="text-sm font-medium text-brand-green">Cold-Pressed</p>
              </div>
              <div className="text-center p-4 bg-brand-light-green rounded-lg">
                <Star className="h-6 w-6 text-brand-green mx-auto mb-2" />
                <p className="text-sm font-medium text-brand-green">Premium Quality</p>
              </div>
            </div>
          </div>
        </div>

        {/* Health Benefits Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Health Benefits</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="bg-brand-light-green p-3 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                  <Leaf className="h-6 w-6 text-brand-green" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Rich in Nutrients</h3>
                <p className="text-gray-600">Packed with essential vitamins, minerals, and antioxidants for optimal health.</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <div className="bg-brand-light-green p-3 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                  <Heart className="h-6 w-6 text-brand-green" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Boosts Energy</h3>
                <p className="text-gray-600">Natural sugars and nutrients provide sustained energy throughout the day.</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <div className="bg-brand-light-green p-3 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                  <Star className="h-6 w-6 text-brand-green" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Supports Immunity</h3>
                <p className="text-gray-600">High vitamin C content helps strengthen your immune system naturally.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
