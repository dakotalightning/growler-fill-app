import { MapPin, Mail, Phone, Github, Twitter, Instagram } from 'lucide-react';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import { ImageWithFallback } from '../figma/ImageWithFallback';

export function Footer() {
  const footerSections = {
    company: {
      title: 'Company',
      links: [
        { label: 'About Us', href: '#' },
        { label: 'How It Works', href: '#' },
        { label: 'Careers', href: '#' },
        { label: 'Press Kit', href: '#' },
        { label: 'Blog', href: '#' }
      ]
    },
    breweries: {
      title: 'For Breweries',
      links: [
        { label: 'Partner Program', href: '#' },
        { label: 'Brewery Dashboard', href: '#' },
        { label: 'Marketing Tools', href: '#' },
        { label: 'Analytics', href: '#' },
        { label: 'Contact Sales', href: '#' }
      ]
    },
    support: {
      title: 'Support',
      links: [
        { label: 'Help Center', href: '#' },
        { label: 'Contact Support', href: '#' },
        { label: 'Token Guidelines', href: '#' },
        { label: 'Redemption Process', href: '#' },
        { label: 'Gift Cards', href: '#' }
      ]
    },
    legal: {
      title: 'Legal',
      links: [
        { label: 'Privacy Policy', href: '#' },
        { label: 'Terms of Service', href: '#' },
        { label: 'Cookie Policy', href: '#' },
        { label: 'Refund Policy', href: '#' },
        { label: 'Responsible Drinking', href: '#' }
      ]
    }
  };

  const socialLinks = [
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Github, href: '#', label: 'GitHub' }
  ];

  return (
    <footer className="bg-card border-t border-border mt-12 md:mt-16">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2 space-y-4">
            <div>
              <h3 className="text-lg font-medium mb-2">Growler Filler</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                The leading marketplace for craft beer lovers to pre-purchase growler fills 
                in bulk and redeem them at participating breweries across the Pacific Northwest.
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>Portland, OR & Seattle, WA</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>hello@growlerfiller.com</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>(503) 555-BEER</span>
              </div>
            </div>
            
            <div className="flex gap-2">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <Button
                    key={social.label}
                    variant="ghost"
                    size="sm"
                    className="w-8 h-8 p-0"
                    aria-label={social.label}
                  >
                    <Icon className="h-4 w-4" />
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerSections).map(([key, section]) => (
            <div key={key} className="space-y-3">
              <h4 className="font-medium">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Button
                      variant="link"
                      className="h-auto p-0 text-sm text-muted-foreground hover:text-foreground"
                    >
                      {link.label}
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-8" />

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <div className="text-center">
            <p className="text-2xl font-medium text-primary">150+</p>
            <p className="text-sm text-muted-foreground">Partner Breweries</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-medium text-primary">50K+</p>
            <p className="text-sm text-muted-foreground">Tokens Redeemed</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-medium text-primary">$2M+</p>
            <p className="text-sm text-muted-foreground">Total Savings</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-medium text-primary">15K+</p>
            <p className="text-sm text-muted-foreground">Happy Customers</p>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Newsletter Signup */}
        <div className="text-center space-y-4 mb-8">
          <h4 className="font-medium">Stay Updated</h4>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            Get notified about new brewery partnerships, special deals, and craft beer events in your area.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-3 py-2 text-sm bg-input-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <Button className="px-6">Subscribe</Button>
          </div>
        </div>

        <Separator className="mb-6" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <p>&copy; 2024 Growler Filler, Inc. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <Button variant="link" className="h-auto p-0 text-xs text-muted-foreground">
                Accessibility
              </Button>
              <Button variant="link" className="h-auto p-0 text-xs text-muted-foreground">
                Sitemap
              </Button>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-xs">Drink responsibly</span>
            <span className="text-xs">•</span>
            <span className="text-xs">Must be 21+</span>
          </div>
        </div>

        {/* App Store Badges */}
        <div className="flex justify-center gap-4 mt-8 pt-6 border-t border-border">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="h-12 w-36 bg-black rounded-lg flex items-center justify-center">
              <span className="text-white text-xs">Download on App Store</span>
            </div>
            <div className="h-12 w-36 bg-black rounded-lg flex items-center justify-center">
              <span className="text-white text-xs">Get it on Google Play</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}