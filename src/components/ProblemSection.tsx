import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, CreditCard, Database, Users } from "lucide-react";

const ProblemSection = () => {
  const problems = [
    {
      icon: AlertTriangle,
      title: "Rampant Phone Theft"
    },
    {
      icon: CreditCard,
      title: "Financial Losses"
    },
    {
      icon: Database,
      title: "Weak Recovery Systems"
    },
    {
      icon: Users,
      title: "Disconnected Enforcement"
    }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            The Phone Theft Crisis in Nigeria
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Every day, Nigerians lose more than devices – they lose their digital lives, financial access, and sense of security. Current solutions aren't enough.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {problems.map((problem, index) => (
            <Card key={index} className="text-center p-6 shadow-card border-0 bg-gradient-card">
              <CardContent className="p-0">
                <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-destructive/10">
                  <problem.icon className="h-8 w-8 text-destructive" />
                </div>
                <h3 className="text-lg font-semibold mb-3">{problem.title}</h3>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;