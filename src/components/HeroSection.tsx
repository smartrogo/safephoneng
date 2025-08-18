import { Button } from "@/components/ui/button";
import { Shield, Smartphone, Users } from "lucide-react";
import heroImage from "@/assets/hero-shield.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-hero overflow-hidden pt-16">
      <div className="absolute inset-0 bg-black/20" />
      
      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-3 mb-6">
              <img 
                src="/lovable-uploads/57f7445f-ccaa-4b25-98fe-8cf026399711.png" 
                alt="SafePhone NG Logo" 
                className="h-16 w-auto"
              />
              <span className="text-3xl font-bold text-white">SafePhone NG</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Stop Phone Theft with 
              <span className="block text-primary-light">Blockchain Security</span>
            </h1>
            
            <p className="text-xl text-white/90 mb-8 max-w-2xl">
              Register your device on Hedera blockchain. Report theft instantly. Empower security agents with verifiable ownership records. Built for Nigeria and other African countries.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button variant="hero" size="lg" className="bg-white text-primary hover:bg-white/90">
                <Smartphone className="h-5 w-5" />
                Register My Phone
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                <Users className="h-5 w-5" />
                Security Agent Portal
              </Button>
            </div>
            
            <div className="flex items-center justify-center lg:justify-start gap-8 mt-12 text-white/80">
              <div className="text-center">
                <div className="text-2xl font-bold">₦2.5B+</div>
                <div className="text-sm">Lost to phone theft annually</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">15K+</div>
                <div className="text-sm">Phones stolen monthly in Kano</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">80%</div>
                <div className="text-sm">Never recovered</div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <img 
              src={heroImage} 
              alt="Blockchain phone security" 
              className="w-full h-auto rounded-2xl shadow-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;