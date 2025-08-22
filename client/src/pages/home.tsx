import { useQuery } from "@tanstack/react-query";
import { Hero } from "../components/hero";
import { ProductCard } from "../components/product-card";
import { Button } from "../components/ui/button";
import { Skeleton } from "../components/ui/skeleton";
import { Link } from "wouter";
import { fetchFeaturedProducts } from "../lib/api";
import { Leaf, Heart, Clock, Shield, Award, Sprout } from "lucide-react";

export default function Home() {
  const { data: featuredProducts, isLoading } = useQuery({
    queryKey: ["/api/products/featured"],
    queryFn: fetchFeaturedProducts,
  });

  return (
    <div className="min-h-screen">
      <Hero />
      
      {/* Featured Banner */}
      <section className="bg-gradient-to-br from-brand-green to-brand-dark-green text-white py-20 relative overflow-hidden">
        <div className="whitespace-nowrap animate-scroll-fast">
          <span className="text-5xl font-extrabold mr-24 tracking-wide">FRESHNESS DELIVERED, WELLNESS ELEVATED.</span>
          <span className="text-5xl font-extrabold mr-24 tracking-wide">FRESHNESS DELIVERED, WELLNESS ELEVATED.</span>
          <span className="text-5xl font-extrabold mr-24 tracking-wide">FRESHNESS DELIVERED, WELLNESS ELEVATED.</span>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
          <h3 className="text-center text-xl font-bold mb-10 text-white/90">Trusted by Leading Publications</h3>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-80">
            <div className="flex flex-col items-center p-3 bg-white/10 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <span className="text-lg font-semibold">HEALTH</span>
            </div>
            <div className="flex flex-col items-center p-3 bg-white/10 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <span className="text-lg font-semibold">VOGUE</span>
            </div>
            <div className="flex flex-col items-center p-3 bg-white/10 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <span className="text-lg font-semibold">WELLNESS</span>
            </div>
            <div className="flex flex-col items-center p-3 bg-white/10 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <Leaf className="h-8 w-8 text-white" />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Products</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover our most popular cold-pressed juices, smoothies, and wellness shots crafted with premium fresh ingredients.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {isLoading
              ? Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="space-y-4">
                    <Skeleton className="h-48 w-full rounded-2xl" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                ))
              : featuredProducts?.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
          </div>
          
          <div className="text-center mt-12">
            <Link href="/products">
              <Button size="lg" className="bg-gradient-to-br from-brand-green to-brand-dark-green hover:from-brand-dark-green hover:to-brand-green text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300">
                View All Products
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Juice Cleanse Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="lg:order-2">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Transform Your Health with Our Juice Cleanses</h2>
              <p className="text-lg text-gray-600 mb-8">
                Reset your body and mind with our scientifically crafted juice cleanse programs. Each cleanse is designed to detoxify, energize, and rejuvenate your system with premium fresh ingredients.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4 group">
                  <div className="bg-brand-light-green p-3 rounded-full transition-all duration-300 group-hover:bg-brand-green">
                    <Leaf className="text-brand-green h-6 w-6 transition-all duration-300 group-hover:text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Fresh Ingredients</h3>
                    <p className="text-gray-600">Every bottle contains hand-selected fruits and vegetables, cold-pressed to preserve maximum nutrients.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 group">
                  <div className="bg-brand-light-green p-3 rounded-full transition-all duration-300 group-hover:bg-brand-green">
                    <Heart className="text-brand-green h-6 w-6 transition-all duration-300 group-hover:text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Scientifically Designed</h3>
                    <p className="text-gray-600">Our cleanse programs are carefully crafted to provide optimal nutrition while supporting natural detoxification.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 group">
                  <div className="bg-brand-light-green p-3 rounded-full transition-all duration-300 group-hover:bg-brand-green">
                    <Clock className="text-brand-green h-6 w-6 transition-all duration-300 group-hover:text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Flexible Programs</h3>
                    <p className="text-gray-600">Choose from 1-day, 3-day, or 5-day cleanse programs designed to fit your lifestyle and wellness goals.</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <Link href="/products?category=cleanses">
                  <Button size="lg" className="bg-gradient-to-br from-brand-orange to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300">
                    Explore Cleanse Programs
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="relative lg:order-1">
              <img 
                src="https://images.unsplash.com/photo-1622597467836-f3285f2131b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400" 
                alt="Juice cleanse collection with various organic juices" 
                className="rounded-2xl shadow-2xl w-full transform scale-105 hover:scale-110 transition-transform duration-500" 
              />
              
              <div className="absolute top-4 right-4 bg-white text-brand-green px-4 py-2 rounded-full text-sm font-semibold shadow-lg border-2 border-brand-green animate-float">
                22 Bottles
              </div>
              <div className="absolute bottom-4 left-4 bg-brand-orange text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg animate-float" style={{ animationDelay: "2s" }}>
                3-Day Program
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">Why Choose Pulpe?</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              We're committed to bringing you the highest quality fresh juices and smoothies that nourish your body and elevate your wellness journey.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            <div className="text-center group">
              <div className="bg-brand-light-green p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center transition-all duration-300 group-hover:bg-brand-green">
                <Sprout className="text-brand-green h-8 w-8 transition-all duration-300 group-hover:text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Fresh & Natural</h3>
              <p className="text-gray-600">Every ingredient is sourced from trusted farms and cold-pressed within hours of harvest to preserve maximum nutrition and flavor.</p>
            </div>
            
            <div className="text-center group">
              <div className="bg-brand-light-green p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center transition-all duration-300 group-hover:bg-brand-green">
                <Shield className="text-brand-green h-8 w-8 transition-all duration-300 group-hover:text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">No Preservatives</h3>
              <p className="text-gray-600">Our juices contain zero artificial preservatives, additives, or sugars - just pure, natural goodness in every bottle.</p>
            </div>
            
            <div className="text-center group">
              <div className="bg-brand-light-green p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center transition-all duration-300 group-hover:bg-brand-green">
                <Award className="text-brand-green h-8 w-8 transition-all duration-300 group-hover:text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Award Winning</h3>
              <p className="text-gray-600">Recognized by leading wellness publications and trusted by health professionals for our commitment to quality and nutrition.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
