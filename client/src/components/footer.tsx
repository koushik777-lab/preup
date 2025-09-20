import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16" data-testid="footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">ॐ</span>
              </div>
              <span className="ml-3 text-xl font-bold text-primary">Shiva Sadhana</span>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              Your Spiritual Partner - Connecting faith, culture, and travel experiences together.
            </p>
            <div className="space-y-2 text-gray-300">
              <p>B 37/171, Birdopur, Dr. Usha Gupta Lane</p>
              <p>Mahmoorganj, Varanasi – 221010</p>
              <p>Uttar Pradesh, India</p>
              <p>Phone: +91-8069377929</p>
              <p>Email: team@shivasadhana.in</p>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about-us" data-testid="footer-about-link">
                  <span className="text-gray-300 hover:text-primary transition-colors cursor-pointer">About Us</span>
                </Link>
              </li>
              <li>
                <Link href="/squad" data-testid="footer-squad-link">
                  <span className="text-gray-300 hover:text-primary transition-colors cursor-pointer">Squad</span>
                </Link>
              </li>
              <li>
                <Link href="/articles" data-testid="footer-articles-link">
                  <span className="text-gray-300 hover:text-primary transition-colors cursor-pointer">Articles</span>
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" data-testid="footer-privacy-link">
                  <span className="text-gray-300 hover:text-primary transition-colors cursor-pointer">Privacy Policy</span>
                </Link>
              </li>
              <li>
                <Link href="/refund-policy" data-testid="footer-refund-link">
                  <span className="text-gray-300 hover:text-primary transition-colors cursor-pointer">Refund Policy</span>
                </Link>
              </li>
              <li>
                <Link href="/terms-conditions" data-testid="footer-terms-link">
                  <span className="text-gray-300 hover:text-primary transition-colors cursor-pointer">Terms & Conditions</span>
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Stay Updated */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
            <p className="text-gray-300 mb-4">Subscribe to receive spiritual insights and updates</p>
            <div className="flex">
              <Input 
                type="email" 
                placeholder="Your email" 
                className="flex-1 bg-gray-800 border-gray-700 text-white"
                data-testid="newsletter-email"
              />
              <Button 
                className="ml-2 bg-primary hover:bg-accent"
                data-testid="newsletter-subscribe"
              >
                Subscribe
              </Button>
            </div>
            <div className="mt-6">
              <p className="text-gray-300 mb-2">Call Now</p>
              <Button 
                className="bg-secondary hover:bg-secondary/80"
                data-testid="call-now-button"
                onClick={() => window.open('tel:+918069377929')}
              >
                +91-8069377929
              </Button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-300">© 2024 Shiva Sadhana. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
