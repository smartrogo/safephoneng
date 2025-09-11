import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Zap, Shield, Globe } from "lucide-react";

const SolutionSection = () => {
  const benefits = [
    {
      icon: Shield,
      title: "Immutable Records",
      description: "Device ownership stored permanently on Multi-chain blockchain - can't be forged or deleted."
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
    <section className="py-24 bg-primary/5">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-6">
            <Shield className="h-5 w-5 text-primary" />
            <span className="text-primary font-medium">Hedera-Powered Solution</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Blockchain Security That Actually Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            SafePhone NG uses Hedera's enterprise-grade blockchain to create an unbreakable chain of device ownership, enabling instant verification and coordinated theft response.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {benefits.map((benefit, index) => (
            <Card key={index} className="text-center p-6 shadow-card border-0 bg-card">
              <CardContent className="p-0">
                <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10">
                  <benefit.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-3">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="bg-card rounded-2xl p-8 shadow-card">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4">Why Hedera?</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                  <span><strong>Enterprise-grade:</strong> Used by Google, IBM, and major corporations</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                  <span><strong>Lightning fast:</strong> 10,000+ transactions per second</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                  <span><strong>Ultra-low cost:</strong> Fractions of a penny per transaction</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                  <span><strong>Energy efficient:</strong> 99.99% more efficient than Bitcoin</span>
                </li>
              </ul>
            </div>
            <div className="text-center lg:text-right">
              <div className="text-4xl font-bold text-primary mb-2">$0.0001</div>
              <div className="text-muted-foreground mb-6">Average cost per device registration</div>
              <Button variant="hero" size="lg">
                Learn About Hedera
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;