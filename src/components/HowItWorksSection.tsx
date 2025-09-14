/**
 * How It Works Section Component
 * 
 * Explains the three-step process of using SafePhone NG:
 * 1. Register device with blockchain
 * 2. Report theft instantly
 * 3. Verify and recover through agents
 * 
 * Uses alternating layout for visual interest and detailed feature breakdown.
 */

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

// Step illustration images
import phoneRegisterImg from "@/assets/phone-register-realistic.jpg";
import theftReportImg from "@/assets/theft-report-realistic.jpg";
import agentVerifyImg from "@/assets/agent-verify-realistic.jpg";

const HowItWorksSection = () => {
  const navigate = useNavigate();

  /**
   * Handles button clicks to navigate to authentication page
   * Centralized handler for all step CTA buttons
   */
  const handleButtonClick = () => {
    navigate('/auth');
  };

  // Three main steps of the SafePhone NG process
  const steps = [
    {
      number: "01",
      title: "Register Your Device",
      description: "Upload IMEI, model, and ownership details. Create an immutable NFT on your preferred blockchain network.",
      features: ["Secure IMEI recording", "Encrypted personal data", "Non-transferable ownership token"],
      image: phoneRegisterImg,
      cta: "Register Now"
    },
    {
      number: "02", 
      title: "Report Theft Instantly",
      description: "One-click reporting via app or USSD. Instantly alerts security network and flags device.",
      features: ["Real-time agent alerts", "Public theft flag", "IMEI blacklist update"],
      image: theftReportImg,
      cta: "Demo Reporting"
    },
    {
      number: "03",
      title: "Verify & Recover",
      description: "Security agents scan IMEI to verify ownership. Coordinate recovery with blockchain proof.",
      features: ["Instant ownership proof", "Recovery coordination", "Tamper-proof evidence"],
      image: agentVerifyImg,
      cta: "Agent Portal"
    }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-6 lg:px-8">
        
        {/* Section header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            How SafePhone NG Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Three simple steps to protect your device and enable rapid recovery through blockchain-verified ownership.
          </p>
        </div>
        
        {/* Steps container with generous spacing */}
        <div className="space-y-32">
          {steps.map((step, index) => (
            /*
              Alternating layout: even steps (0,2) show text-left/image-right, 
              odd steps (1) show image-left/text-right using grid-flow-col-dense 
            */
            <div key={index} className={`grid lg:grid-cols-2 gap-16 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
              
              {/* Text content column */}
              <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                
                {/* Step number indicator */}
                <div className="text-primary text-xl font-mono mb-6 flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-lg">
                    {step.number}
                  </div>
                  Step {step.number}
                </div>
                
                {/* Step title and description */}
                <h3 className="text-3xl md:text-4xl font-bold mb-8">{step.title}</h3>
                <p className="text-xl text-muted-foreground mb-10 leading-relaxed">{step.description}</p>
                
                {/* Key features card */}
                <Card className="mb-10 shadow-card border-0 bg-gradient-card">
                  <CardContent className="p-8">
                    <h4 className="font-semibold text-lg mb-6">Key Features:</h4>
                    
                    {/* Feature list with bullet points */}
                    <ul className="space-y-4">
                      {step.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center gap-4">
                          {/* Custom bullet point using primary color */}
                          <div className="w-3 h-3 bg-primary rounded-full flex-shrink-0" />
                          <span className="text-lg">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
                
                {/* Step-specific call-to-action button */}
                <Button variant="hero" size="lg" onClick={handleButtonClick} className="text-lg px-8 py-4">
                  {step.cta}
                </Button>
              </div>
              
              {/* Image column - positioning alternates for visual variety */}
              <div className={index % 2 === 1 ? 'lg:col-start-1' : ''}>
                <div className="relative group">
                  {/* Step illustration image with hover effect */}
                  <img 
                    src={step.image} 
                    alt={`${step.title} illustration`}
                    className="w-full h-[500px] object-cover rounded-3xl shadow-elegant transition-transform duration-300 group-hover:scale-105"
                  />
                  
                  {/* Step number overlay on image */}
                  <div className="absolute top-6 left-6 bg-primary text-primary-foreground px-6 py-3 rounded-full font-mono font-bold text-xl shadow-lg">
                    {step.number}
                  </div>
                  
                  {/* Subtle gradient overlay for visual enhancement */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-3xl" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;