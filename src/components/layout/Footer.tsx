import { Link } from 'react-router-dom';
import { Cake, Facebook, Instagram, Mail, MapPin, Phone, Twitter } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <Cake className="h-8 w-8 text-primary" />
              <span className="font-serif text-xl font-bold text-foreground">
                Sweet Celebrations
              </span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Handcrafted cakes made with love for your special moments. 
              Every celebration deserves a perfect cake.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/cakes" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Our Cakes
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  My Orders
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/cakes?category=birthday" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Birthday Cakes
                </Link>
              </li>
              <li>
                <Link to="/cakes?category=wedding" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Wedding Cakes
                </Link>
              </li>
              <li>
                <Link to="/cakes?category=custom" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Custom Designs
                </Link>
              </li>
              <li>
                <Link to="/cakes?category=seasonal" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Seasonal Specials
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary shrink-0" />
                <span className="text-sm text-muted-foreground">
                  123 Bakery Lane, Sweet City, SC 12345
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary shrink-0" />
                <span className="text-sm text-muted-foreground">
                  (555) 123-4567
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary shrink-0" />
                <span className="text-sm text-muted-foreground">
                  hello@sweetcelebrations.com
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Sweet Celebrations Bakery. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
