import { Search, AlertCircle, CheckCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt="Lost and Found Hero"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-background/70 backdrop-blur-[2px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
      </div>

      {/* Glow Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/10 blur-[120px] pointer-events-none" />

      {/* Content */}
      <div className="relative container mx-auto px-4 text-center">
        <div className="max-w-3xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-border/50 text-sm text-muted-foreground mb-8 animate-fade-up">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Trusted by thousands of users
          </div>

          {/* Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 animate-fade-up leading-tight">
            Lost Something?{" "}
            <span className="text-gradient">We'll Help You Find It</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground mb-10 animate-fade-up max-w-2xl mx-auto" style={{ animationDelay: "0.1s" }}>
            Report lost or found items and connect with others in your community. 
            Together, we make reuniting belongings simple and quick.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up" style={{ animationDelay: "0.2s" }}>
            <Link to="/lost-items">
              <Button variant="hero" size="xl">
                <AlertCircle className="w-5 h-5" />
                Report Lost Item
              </Button>
            </Link>
            <Link to="/found-items">
              <Button variant="hero-outline" size="xl">
                <CheckCircle className="w-5 h-5" />
                Report Found Item
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-16 animate-fade-up" style={{ animationDelay: "0.3s" }}>
            {[
              { value: "5,000+", label: "Items Reunited" },
              { value: "10,000+", label: "Active Users" },
              { value: "98%", label: "Success Rate" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-gradient">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2">
            <div className="w-1 h-3 rounded-full bg-primary animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
