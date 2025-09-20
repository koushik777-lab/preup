import { Link, useLocation } from "wouter";
import { useState } from "react";
import { Menu, X, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth";
import { useModal } from "@/lib/modal-context";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();
  const { user, logout, isAdmin } = useAuth();
  const { openLoginModal, openRegisterModal } = useModal();

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Store", href: "/store" },
    { name: "Travel", href: "/travel" },
    { name: "Accommodation", href: "/accommodation" },
    { name: "Shraddha Kriya", href: "/shraddha-kriya" },
  ];

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50" data-testid="navbar">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" data-testid="logo-link">
              <div className="flex items-center cursor-pointer">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">ॐ</span>
                </div>
                <span className="ml-3 text-xl font-bold text-primary">Shiva Sadhana</span>
              </div>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link key={item.name} href={item.href} data-testid={`nav-${item.name.toLowerCase().replace(' ', '-')}`}>
                <span className={`text-gray-700 hover:text-primary transition-colors cursor-pointer ${
                  location === item.href ? 'text-primary font-medium' : ''
                }`}>
                  {item.name}
                </span>
              </Link>
            ))}
            
            {/* Auth Section */}
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-gray-700" data-testid="user-welcome">Welcome, {user.name}</span>
                {isAdmin ? (
                  <Link href="/admin" data-testid="admin-dashboard-link">
                    <Button variant="outline" size="sm">Admin</Button>
                  </Link>
                ) : (
                  <Link href="/dashboard" data-testid="user-dashboard-link">
                    <Button variant="outline" size="sm">
                      <User className="w-4 h-4 mr-2" />
                      Dashboard
                    </Button>
                  </Link>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={logout}
                  data-testid="logout-button"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Button variant="ghost" onClick={openLoginModal} data-testid="login-button">Login</Button>
                <Button onClick={openRegisterModal} data-testid="register-button">Register</Button>
              </div>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-500 hover:text-primary"
              data-testid="mobile-menu-button"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200" data-testid="mobile-menu">
            <div className="space-y-2">
              {navigation.map((item) => (
                <Link key={item.name} href={item.href}>
                  <div className="block px-3 py-2 text-gray-700 hover:text-primary cursor-pointer">
                    {item.name}
                  </div>
                </Link>
              ))}
              {user ? (
                <div className="px-3 py-2 space-y-2">
                  <div className="text-gray-700">Welcome, {user.name}</div>
                  <Link href={isAdmin ? "/admin" : "/dashboard"}>
                    <Button variant="outline" size="sm" className="w-full">
                      {isAdmin ? "Admin Panel" : "Dashboard"}
                    </Button>
                  </Link>
                  <Button variant="outline" size="sm" onClick={logout} className="w-full">
                    Logout
                  </Button>
                </div>
              ) : (
                <div className="px-3 py-2 space-y-2">
                  <Button variant="ghost" onClick={openLoginModal} className="w-full" data-testid="mobile-login-button">Login</Button>
                  <Button onClick={openRegisterModal} className="w-full" data-testid="mobile-register-button">Register</Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
