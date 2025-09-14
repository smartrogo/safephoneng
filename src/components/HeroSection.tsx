/**
 * Hero Section Component
 * 
 * The main landing page header that introduces SafePhone NG's blockchain-powered
 * phone security solution. Features a compelling headline, value proposition,
 * call-to-action buttons, and key statistics about phone theft in Nigeria.
 */

import { Button } from "@/components/ui/button";
import { Shield, Smartphone, Users } from "lucide-react";
import heroImage from "@/assets/hero-shield.jpg";

const HeroSection = () => {
  return (
    // Full-screen hero section with gradient background
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-hero overflow-hidden pt-16">
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/20" />
      
      {/* Main content container */}
      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        {/* Two-column layout: text content and hero image */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left column: Main content and CTAs */}
          <div className="text-center lg:text-left">
            {/* Main headline emphasizing blockchain security */}
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Stop Phone Theft with 
              <span className="block text-primary-light">Blockchain Security</span>
            </h1>
            
            {/* Value proposition describing key features */}
            <p className="text-xl text-white/90 mb-8 max-w-2xl">
              Register your device on multiple blockchain networks. Report theft instantly. Empower security agents with verifiable ownership records. Built for Nigeria and other African countries.
            </p>
            
            {/* Call-to-action buttons for different user types */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              {/* Primary CTA for phone owners */}
              <Button variant="hero" size="lg" className="bg-white text-primary hover:bg-white/90">
                <Smartphone className="h-5 w-5" />
                Register My Phone
              </Button>
              
              {/* Secondary CTA for security agents */}
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                <Users className="h-5 w-5" />
                Security Agent Portal
              </Button>
            </div>
            
            {/* Key statistics highlighting the problem scale */}
            <div className="flex items-center justify-center lg:justify-start gap-8 mt-12 text-white/80">
              {/* Annual financial impact */}
              <div className="text-center">
                <div className="text-2xl font-bold">₦2.5B+</div>
                <div className="text-sm">Lost to phone theft annually</div>
              </div>
              
              {/* Monthly theft statistics for Kano */}
              <div className="text-center">
                <div className="text-2xl font-bold">15K+</div>
                <div className="text-sm">Phones stolen monthly in Kano</div>
              </div>
              
              {/* Recovery success rate */}
              <div className="text-center">
                <div className="text-2xl font-bold">80%</div>
                <div className="text-sm">Never recovered</div>
              </div>
            </div>
          </div>
          
          {/* Right column: Hero image */}
          <div className="relative">
            {/* Main hero image showcasing security concept */}
            <img 
              src={heroImage} 
              alt="Blockchain phone security visualization" 
              className="w-full h-auto rounded-2xl shadow-2xl"
            />
            
            {/* Subtle gradient overlay for visual enhancement */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;