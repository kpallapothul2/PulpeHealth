import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, ShoppingCart } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

export function Header() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Menu", href: "/products" },
    { name: "Juice Cleanse", href: "/products?category=cleanses" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/">
              <h1 className="text-2xl font-bold text-brand-green cursor-pointer">PulpE</h1>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navigation.map((item) => (
                <Link key={item.name} href={item.href}>
                  <span
                    className={`px-3 py-2 text-sm font-medium transition-colors cursor-pointer ${
                      location === item.href
                        ? "text-brand-green"
                        : "text-gray-700 hover:text-brand-green"
                    }`}
                  >
                    {item.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>
          
          {/* Cart and Mobile menu */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="text-gray-700 hover:text-brand-green">
              <ShoppingCart className="h-5 w-5" />
              <span className="ml-1 text-sm">Cart (0)</span>
            </Button>
            
            {/* Mobile menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col space-y-4 mt-8">
                  {navigation.map((item) => (
                    <Link key={item.name} href={item.href}>
                      <span
                        className={`block px-3 py-2 text-base font-medium transition-colors cursor-pointer ${
                          location === item.href
                            ? "text-brand-green"
                            : "text-gray-700 hover:text-brand-green"
                        }`}
                        onClick={() => setIsOpen(false)}
                      >
                        {item.name}
                      </span>
                    </Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  );
}
