import { Card, CardContent } from "./ui/card";
import { 
  Lightbulb, 
  Award, 
  Brain, 
  Users
} from "lucide-react";
import { Dictionary } from "@/dictionaries/es";

interface ApproachProps {
  dict: Dictionary;
}

export function Approach({ dict }: ApproachProps) {
  const values = [
    {
      icon: Award,
      title: dict.approach.items.practices.title,
      description: dict.approach.items.practices.description,
    },
    {
      icon: Brain,
      title: dict.approach.items.ai.title,
      description: dict.approach.items.ai.description,
    },
    {
      icon: Lightbulb,
      title: dict.approach.items.tech.title,
      description: dict.approach.items.tech.description,
    },
    {
      icon: Users,
      title: dict.approach.items.team.title,
      description: dict.approach.items.team.description,
    },
  ];

  return (
    <section id="enfoque" className="min-h-[calc(100vh-4rem)] flex items-center bg-background">
      <div className="container mx-auto px-4 py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl tracking-tight mb-4 font-bold text-foreground">
            {dict.approach.title}
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
            {dict.approach.subtitle}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {values.map((value, index) => (
            <Card key={index} className="border-border text-center hover:shadow-lg transition-shadow bg-card">
              <CardContent className="pt-8 pb-6">
                <div className="mb-4 inline-flex p-4 bg-primary rounded-2xl">
                  <value.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl mb-3 font-semibold text-card-foreground">{value.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}