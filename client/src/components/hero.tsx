import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-brand-light-green to-green-50 min-h-screen flex items-center">
      {/* Organic wave background */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 320" className="w-full h-auto text-white fill-current">
          <path d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Organic. Natural. 
              <span className="text-brand-green"> Raw</span>
            </h1>
            <h2 className="text-2xl lg:text-3xl font-semibold text-gray-700 mb-8">
              Think Healthy, Think <span className="text-brand-orange">Pulpe</span>
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-lg mx-auto lg:mx-0">
              Experience wellness in every sip with our premium collection of cold-pressed juices, nutrient-packed smoothies, and transformative cleanse programs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/products">
                <Button size="lg" className="bg-brand-green hover:bg-brand-dark-green text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl">
                  See Our Menu
                </Button>
              </Link>
              <Link href="/about">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-2 border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white px-8 py-4 rounded-full font-semibold text-lg"
                >
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="relative">
            {/* Fresh juice bottles arranged in an artistic layout */}
            <div className="grid grid-cols-2 gap-4 transform rotate-3 hover:rotate-0 transition-transform duration-500">
              <img 
                src="https://images.unsplash.com/photo-1622597467836-f3285f2131b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=600" 
                alt="Fresh green juice bottle" 
                className="rounded-2xl shadow-xl" 
              />
              <img 
                src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=600" 
                alt="Orange carrot juice" 
                className="rounded-2xl shadow-xl transform translate-y-8" 
              />
            </div>
            
            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 bg-brand-orange text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg animate-float">
              100% Organic
            </div>
            <div className="absolute -bottom-4 -left-4 bg-white text-brand-green px-4 py-2 rounded-full text-sm font-semibold shadow-lg border-2 border-brand-green animate-float" style={{ animationDelay: "2s" }}>
              Cold-Pressed
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
