/**
 * Problem Section Component
 * 
 * Highlights the current phone theft crisis in Nigeria by presenting
 * key problems that SafePhone NG aims to solve. Uses visual icons
 * and clear messaging to establish the need for the solution.
 */

import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, CreditCard, Database, Users } from "lucide-react";

const ProblemSection = () => {
  // Array of key problems that the platform addresses
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
    // Section container with consistent padding
    <section className="py-16 bg-background">
      <div className="container mx-auto px-6 lg:px-8">
        
        {/* Section header introducing the problem */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            The Phone Theft Crisis in Nigeria
          </h2>
          
          {/* Problem statement emphasizing broader impact beyond just device loss */}
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Every day, Nigerians lose more than devices – they lose their digital lives, financial access, and sense of security. Current solutions aren't enough.
          </p>
        </div>
        
        {/* Grid layout for problem cards - responsive from 2 to 4 columns */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {problems.map((problem, index) => (
            // Individual problem card
            <Card key={index} className="text-center p-6 shadow-card border-0 bg-gradient-card">
              <CardContent className="p-0">
                {/* Icon container with destructive color to emphasize problems */}
                <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-destructive/10">
                  <problem.icon className="h-8 w-8 text-destructive" />
                </div>
                
                {/* Problem title */}
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