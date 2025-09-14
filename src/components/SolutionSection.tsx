/**
 * Solution Section Component
 * 
 * Presents SafePhone NG's blockchain-based solution to phone theft problems.
 * Highlights key benefits of the multi-chain approach and explains why
 * blockchain technology is ideal for device security and ownership verification.
 */

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Zap, Shield, Globe } from "lucide-react";

const SolutionSection = () => {
  // Key benefits of the blockchain solution
  const benefits = [
    {
      icon: Shield,
      title: "Immutable Records",
      description: "Device ownership stored permanently on multiple blockchains - can't be forged or deleted."
    },
    {
      icon: Zap,
      title: "Instant Verification",
      description: "Security agents verify ownership in seconds, even after factory resets."
    },
    {
      icon: CheckCircle,
      title: "Trustless System",
      description: "No single point of failure or corruption - powered by decentralized consensus."
    },
    {
      icon: Globe,
      title: "Mass Adoption Ready",
      description: "Fast, low-cost transactions perfect for millions of Nigerian users."
    }
  ];

  return (
    // Section with subtle primary background tint
    <section className="py-16 bg-primary/5">
      <div className="container mx-auto px-6 lg:px-8">
        
        {/* Section header with badge and main content */}
        <div className="text-center mb-16">
          {/* Badge highlighting multi-chain approach */}
          <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-6">
            <Shield className="h-5 w-5 text-primary" />
            <span className="text-primary font-medium">Multi-Chain Solution</span>
          </div>
          
          {/* Main section heading */}
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Blockchain Security That Actually Works
          </h2>
          
          {/* Detailed explanation of the solution approach */}
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            SafePhone NG uses multiple enterprise-grade blockchains to create an unbreakable chain of device ownership, enabling instant verification and coordinated theft response across different networks.
          </p>
        </div>
        
        {/* Benefits grid - showcases key advantages */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {benefits.map((benefit, index) => (
            // Individual benefit card
            <Card key={index} className="text-center p-6 shadow-card border-0 bg-card">
              <CardContent className="p-0">
                {/* Benefit icon with primary color theme */}
                <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10">
                  <benefit.icon className="h-8 w-8 text-primary" />
                </div>
                
                {/* Benefit title and description */}
                <h3 className="text-lg font-semibold mb-3">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Multi-chain explanation and cost information */}
        <div className="bg-card rounded-2xl p-8 shadow-card">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            
            {/* Left column: Multi-chain advantages */}
            <div>
              <h3 className="text-2xl font-bold mb-4">Why Multi-Chain?</h3>
              
              {/* List of multi-chain benefits */}
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                  <span><strong>Network Flexibility:</strong> Choose the best blockchain for each use case</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                  <span><strong>High Performance:</strong> Leverage fast networks like Hedera, Polygon, BSC, and Solana</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                  <span><strong>Cost Efficient:</strong> Ultra-low fees across multiple networks</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                  <span><strong>Future Proof:</strong> Not dependent on a single blockchain ecosystem</span>
                </li>
              </ul>
            </div>
            
            {/* Right column: Cost highlight and CTA */}
            <div className="text-center lg:text-right">
              {/* Extremely low cost highlight */}
              <div className="text-4xl font-bold text-primary mb-2">$0.0001</div>
              <div className="text-muted-foreground mb-6">Average cost per device registration</div>
              
              {/* Call-to-action button */}
              <Button variant="hero" size="lg">
                Explore Networks
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;