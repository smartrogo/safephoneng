import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Smartphone, 
  AlertTriangle, 
  Shield, 
  Search, 
  Gift, 
  UserCheck,
  Zap,
  Globe
} from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: Smartphone,
      title: "Device Registration",
      description: "Register phones as non-transferable NFTs with IMEI, model, and owner details securely stored on-chain.",
      benefits: ["Immutable ownership records", "Cannot be forged or deleted", "Works after factory reset"]
    },
    {
      icon: AlertTriangle,
      title: "Instant Theft Reporting",
      description: "Report theft via app or USSD. Triggers smart contract events and alerts the security network immediately.",
      benefits: ["One-click reporting", "Real-time agent alerts", "Public theft flagging"]
    },
    {
      icon: UserCheck,
      title: "Security Agent Portal",
      description: "Verified agents access real-time theft reports, scan IMEIs for instant ownership verification.",
      benefits: ["Map-based theft tracking", "QR/IMEI scanning", "Tamper-proof logs"]
    },
    {
      icon: Search,
      title: "IMEI Blacklist & Checker",
      description: "Public database to check device status before purchase. Integrates with telecom providers.",
      benefits: ["'Is this phone stolen?' checker", "Prevents fence markets", "USSD access for all phones"]
    },
    {
      icon: Gift,
      title: "Recovery Rewards",
      description: "Earn SafeTokens for reporting theft, assisting recovery, or verifying clean devices.",
      benefits: ["Community incentives", "Redeemable for airtime/data", "Gamified security"]
    },
    {
      icon: Shield,
      title: "Privacy Protection",
      description: "Personal data stored off-chain. Only hashes and public keys on blockchain networks.",
      benefits: ["GDPR compliant", "Data sovereignty", "Selective disclosure"]
    }
  ];

  const stats = [
    { number: "10,000+", label: "Transactions per second", icon: Zap },
    { number: "$0.0001", label: "Cost per registration", icon: Globe },
    { number: "99.99%", label: "More efficient than Bitcoin", icon: Shield },
    { number: "24/7", label: "Network availability", icon: UserCheck }
  ];

  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Complete Phone Security Ecosystem
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From registration to recovery, SafePhone NG provides end-to-end protection powered by enterprise-grade blockchain technology.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <Card key={index} className="shadow-card border-0 bg-card hover:shadow-elegant transition-shadow">
              <CardContent className="p-6">
                <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground mb-4">{feature.description}</p>
                <ul className="space-y-2">
                  {feature.benefits.map((benefit, benefitIndex) => (
                    <li key={benefitIndex} className="flex items-center gap-2 text-sm">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="bg-card rounded-2xl p-8 shadow-card">
          <h3 className="text-2xl font-bold text-center mb-8">
            Powered by Multi-Chain Technology
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="mb-3 inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="text-2xl font-bold text-primary">{stat.number}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Button variant="hero" size="lg">
              Explore Technical Details
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;