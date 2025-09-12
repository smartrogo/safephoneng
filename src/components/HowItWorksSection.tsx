import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import phoneRegisterImg from "@/assets/phone-register-realistic.jpg";
import theftReportImg from "@/assets/theft-report-realistic.jpg";
import agentVerifyImg from "@/assets/agent-verify-realistic.jpg";

const HowItWorksSection = () => {
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
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            How SafePhone NG Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Three simple steps to protect your device and enable rapid recovery through blockchain-verified ownership.
          </p>
        </div>
        
        <div className="space-y-24">
          {steps.map((step, index) => (
            <div key={index} className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
              <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                <div className="text-primary text-lg font-mono mb-4">Step {step.number}</div>
                <h3 className="text-2xl md:text-3xl font-bold mb-6">{step.title}</h3>
                <p className="text-lg text-muted-foreground mb-8">{step.description}</p>
                
                <Card className="mb-8 shadow-card border-0 bg-gradient-card">
                  <CardContent className="p-6">
                    <h4 className="font-semibold mb-4">Key Features:</h4>
                    <ul className="space-y-2">
                      {step.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
                
                <Button variant="hero" size="lg">
                  {step.cta}
                </Button>
              </div>
              
              <div className={index % 2 === 1 ? 'lg:col-start-1' : ''}>
                <div className="relative">
                  <img 
                    src={step.image} 
                    alt={step.title}
                    className="w-full h-80 object-cover rounded-2xl shadow-elegant"
                  />
                  <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-4 py-2 rounded-full font-mono font-bold">
                    {step.number}
                  </div>
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