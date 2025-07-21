import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Leaf, Heart, Award, Shield, Users, Target } from "lucide-react";
import { Link } from "wouter";

export default function About() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-brand-light-green to-green-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">About PulpE</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Founded on the belief that wellness should be accessible, delicious, and transformative, 
            PulpE is your partner in the journey toward optimal health and vitality.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-lg text-gray-600">
                <p>
                  PulpE was born from a simple yet powerful vision: to make premium organic nutrition 
                  accessible to everyone. Our founders, passionate about health and wellness, recognized 
                  the transformative power of cold-pressed juices and wanted to share this gift with the world.
                </p>
                <p>
                  Starting from a small kitchen with a single cold-press machine, we've grown into a 
                  trusted wellness brand while maintaining our commitment to quality, freshness, and 
                  nutritional excellence. Every bottle we create tells a story of careful sourcing, 
                  meticulous preparation, and unwavering dedication to your health.
                </p>
                <p>
                  Today, PulpE stands as a beacon of wellness in the community, helping thousands of 
                  people discover the incredible benefits of organic, cold-pressed nutrition.
                </p>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1506368249639-73a05d6f6488?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400" 
                alt="Fresh organic fruits and vegetables" 
                className="rounded-2xl shadow-2xl w-full" 
              />
              <div className="absolute -bottom-4 -right-4 bg-brand-orange text-white px-6 py-3 rounded-full font-semibold shadow-lg">
                Est. 2020
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission & Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Mission & Values</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything we do is guided by our core mission and values that shape our approach to wellness.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="bg-brand-light-green p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                  <Target className="h-8 w-8 text-brand-green" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Our Mission</h3>
                <p className="text-gray-600">
                  To empower people to live healthier, more vibrant lives through accessible, 
                  premium organic nutrition that nourishes the body and soul.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="bg-brand-light-green p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                  <Leaf className="h-8 w-8 text-brand-green" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Sustainability</h3>
                <p className="text-gray-600">
                  We're committed to sustainable practices, from organic farming partnerships 
                  to eco-friendly packaging, protecting our planet for future generations.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="bg-brand-light-green p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                  <Heart className="h-8 w-8 text-brand-green" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Wellness First</h3>
                <p className="text-gray-600">
                  Your health and wellness are at the center of everything we do. 
                  We never compromise on quality or nutritional value.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="bg-brand-light-green p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                  <Shield className="h-8 w-8 text-brand-green" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Transparency</h3>
                <p className="text-gray-600">
                  We believe in complete transparency about our ingredients, processes, 
                  and sourcing so you know exactly what you're putting in your body.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="bg-brand-light-green p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                  <Users className="h-8 w-8 text-brand-green" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Community</h3>
                <p className="text-gray-600">
                  We're more than a juice company - we're a community of health-conscious 
                  individuals supporting each other on the wellness journey.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="bg-brand-light-green p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                  <Award className="h-8 w-8 text-brand-green" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Excellence</h3>
                <p className="text-gray-600">
                  We strive for excellence in every aspect of our business, from ingredient 
                  selection to customer service, ensuring the best possible experience.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Cold-Pressed */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Cold-Pressed?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our cold-press method preserves the maximum amount of nutrients, enzymes, and 
              flavors in every bottle.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400" 
                alt="Cold-press juice extraction process" 
                className="rounded-2xl shadow-xl w-full" 
              />
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Maximum Nutrition</h3>
                <p className="text-gray-600">
                  Unlike traditional juicing methods that use heat and high-speed blades, 
                  cold-pressing extracts juice without generating heat, preserving vital nutrients and enzymes.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Superior Taste</h3>
                <p className="text-gray-600">
                  The gentle extraction process maintains the natural flavors of fruits and vegetables, 
                  resulting in a more vibrant, fresh taste in every sip.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Longer Shelf Life</h3>
                <p className="text-gray-600">
                  Cold-pressed juices naturally last longer without compromising nutritional value, 
                  giving you more time to enjoy your purchase.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-brand-green text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Start Your Wellness Journey?</h2>
          <p className="text-xl text-green-100 mb-8">
            Discover the difference that premium organic nutrition can make in your life. 
            Join thousands of satisfied customers who have transformed their health with Pulpe.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products">
              <Button size="lg" className="bg-white text-brand-green hover:bg-gray-100 px-8 py-4 rounded-full font-semibold text-lg">
                Shop Now
              </Button>
            </Link>
            <Link href="/contact">
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-white text-white hover:bg-white hover:text-brand-green px-8 py-4 rounded-full font-semibold text-lg"
              >
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
