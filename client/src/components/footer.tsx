import { Link } from "wouter";
import { Instagram, Facebook, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold text-brand-green mb-4">PulpE</h3>
            <p className="text-gray-400 max-w-sm">
              Premium fresh juices and smoothies crafted for your wellness journey. Experience the power of pure, natural nutrition.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-brand-green transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-brand-green transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-brand-green transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Products</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link href="/products?category=juices">
                  <a className="hover:text-brand-green transition-colors">Cold-Pressed Juices</a>
                </Link>
              </li>
              <li>
                <Link href="/products?category=smoothies">
                  <a className="hover:text-brand-green transition-colors">Fresh Smoothies</a>
                </Link>
              </li>
              <li>
                <Link href="/products?category=shots">
                  <a className="hover:text-brand-green transition-colors">Wellness Shots</a>
                </Link>
              </li>
              <li>
                <Link href="/products?category=cleanses">
                  <a className="hover:text-brand-green transition-colors">Juice Cleanses</a>
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link href="/about">
                  <a className="hover:text-brand-green transition-colors">About Us</a>
                </Link>
              </li>
              <li><a href="#" className="hover:text-brand-green transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-brand-green transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-brand-green transition-colors">Press</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-brand-green transition-colors">FAQ</a></li>
              <li>
                <Link href="/contact">
                  <a className="hover:text-brand-green transition-colors">Contact Support</a>
                </Link>
              </li>
              <li><a href="#" className="hover:text-brand-green transition-colors">Shipping Info</a></li>
              <li><a href="#" className="hover:text-brand-green transition-colors">Returns</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">&copy; 2024 PulpE. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-brand-green text-sm transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-brand-green text-sm transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-brand-green text-sm transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
