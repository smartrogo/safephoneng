/**
 * Footer Component
 * 
 * Comprehensive site footer containing:
 * - Company branding and contact information  
 * - Organized navigation links for different user types
 * - Partner/trust signals
 * - Copyright and legal information
 * 
 * Uses a multi-column responsive layout with clear categorization.
 */

import { Shield, Smartphone, Users, Mail, MapPin, Phone } from "lucide-react";

const Footer = () => {
  // Organized navigation links by category for different user types
  const links = {
    // General platform information and features
    platform: [
      { name: "How It Works", href: "#" },
      { name: "Security Features", href: "#" },
      { name: "Pricing", href: "#" },
      { name: "API Documentation", href: "#" }
    ],
    
    // Links for phone owners and general users
    users: [
      { name: "Register Device", href: "#" },
      { name: "Report Theft", href: "#" },
      { name: "Check IMEI", href: "#" },
      { name: "Download App", href: "#" }
    ],
    
    // Links specifically for security agents
    agents: [
      { name: "Agent Portal", href: "#" },
      { name: "Verification Tools", href: "#" },
      { name: "Training Resources", href: "#" },
      { name: "Join Network", href: "#" }
    ],
    
    // Company and legal information
    company: [
      { name: "About Us", href: "#" },
      { name: "Privacy Policy", href: "#" },
      { name: "Terms of Service", href: "#" },
      { name: "Contact", href: "#" }
    ]
  };

  // List of trusted partners for credibility
  const partners = [
    "Kano State Police",
    "NCC Nigeria", 
    "Blockchain Council",
    "Nigeria Blockchain Alliance"
  ];

  return (
    <footer className="bg-card border-t">
      <div className="container mx-auto px-6 lg:px-8 py-16">
        
        {/* Main footer content grid - 6 columns on large screens */}
        <div className="grid lg:grid-cols-6 gap-8">
          
          {/* Company branding and contact info - spans 2 columns */}
          <div className="lg:col-span-2">
            
            {/* Logo and company name */}
            <div className="flex items-center gap-3 mb-6">
              <img 
                src="/logo-blue.png" 
                alt="SafePhone NG Logo" 
                className="h-12 w-auto"
              />
              <span className="text-2xl font-bold text-primary">SafePhone NG</span>
            </div>
            
            {/* Company description */}
            <p className="text-muted-foreground mb-6 max-w-md">
              Protecting Nigerian mobile devices with blockchain-powered security. 
              Immutable ownership records, instant theft reporting, and coordinated recovery.
            </p>
            
            {/* Contact information with icons */}
            <div className="space-y-3 text-sm">
              {/* Physical location */}
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                <span>Kano, Nigeria</span>
              </div>
              
              {/* Email contact */}
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                <span>safephoneng@gmail.com</span>
              </div>
              
              {/* Phone/WhatsApp contact */}
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                <span>+2348087633060 (WhatsApp)</span>
              </div>
            </div>
          </div>
          
          {/* Platform links section */}
          <div>
            <h4 className="font-semibold mb-4 flex items-center gap-2">
              <Smartphone className="h-4 w-4" />
              Platform
            </h4>
            <ul className="space-y-2">
              {links.platform.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-muted-foreground hover:text-primary transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* User-focused links section */}
          <div>
            <h4 className="font-semibold mb-4 flex items-center gap-2">
              <Users className="h-4 w-4" />
              For Users
            </h4>
            <ul className="space-y-2">
              {links.users.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-muted-foreground hover:text-primary transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Security agent links section */}
          <div>
            <h4 className="font-semibold mb-4 flex items-center gap-2">
              <Shield className="h-4 w-4" />
              For Agents
            </h4>
            <ul className="space-y-2">
              {links.agents.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-muted-foreground hover:text-primary transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Company and legal links section */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              {links.company.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-muted-foreground hover:text-primary transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Footer bottom section with copyright and partners */}
        <div className="mt-12 pt-8 border-t">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            
            {/* Copyright notice */}
            <div className="text-sm text-muted-foreground">
              © 2024 SafePhone NG. All rights reserved. Multi-Chain Powered.
            </div>
            
            {/* Trusted partners for credibility */}
            <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
              <span>Trusted Partners:</span>
              {partners.map((partner, index) => (
                <span key={index} className="hover:text-primary cursor-pointer">
                  {partner}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;