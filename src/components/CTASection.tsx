import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Smartphone, Shield, Users, ArrowRight } from "lucide-react";

const CTASection = () => {
  const userTypes = [
    {
      icon: Smartphone,
      title: "Phone Owners",
      description: "Register your device and get instant theft protection",
      cta: "Register My Phone",
      variant: "hero" as const
    },
    {
      icon: Shield,
      title: "Security Agents",
      description: "Join the network and help recover stolen devices",
      cta: "Agent Portal",
      variant: "secondary" as const
    },
    {
      icon: Users,
      title: "Buyers",
      description: "Check device status before purchasing used phones",
      cta: "Check IMEI",
      variant: "outline" as const
    }
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Secure Your Phone?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join thousands of Nigerians already protecting their devices with blockchain-powered security.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {userTypes.map((type, index) => (
            <Card key={index} className="text-center shadow-card border-0 bg-gradient-card hover:shadow-elegant transition-shadow">
              <CardContent className="p-8">
                <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10">
                  <type.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4">{type.title}</h3>
                <p className="text-muted-foreground mb-6">{type.description}</p>
                <Button variant={type.variant} size="lg" className="w-full">
                  {type.cta}
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="bg-gradient-hero rounded-2xl p-12 text-center text-white">
          <h3 className="text-2xl md:text-3xl font-bold mb-6">
            Be Part of the Solution
          </h3>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-white/90">
            Every device registered makes the entire network stronger. Help us build Nigeria's most trusted phone security system.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="lg" className="bg-white text-primary hover:bg-white/90">
              Get Started Now
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;