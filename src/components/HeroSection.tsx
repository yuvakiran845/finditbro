import { useState } from "react";
import { AlertCircle, CheckCircle, MapPin, Clock, Sparkles } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import ReportItemModal from "./ReportItemModal";

const HeroSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reportType, setReportType] = useState<'lost' | 'found'>('lost');

  const handleOpenModal = (type: 'lost' | 'found') => {
    setReportType(type);
    setIsModalOpen(true);
  };

  return (
    <section className="relative min-h-[100vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt="Lost and Found Hero"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-background/80 backdrop-blur-[3px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/60 to-background" />
      </div>

      {/* Animated Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-primary/20 blur-[150px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-accent/15 blur-[120px] animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary/10 blur-[200px]" />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary/40 rounded-full animate-float-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 text-center z-10">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-secondary/60 to-secondary/40 border border-primary/30 text-sm text-foreground mb-8 animate-fade-up backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-primary animate-pulse" />
            <span>Trusted by thousands of users</span>
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          </div>

          {/* Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 animate-fade-up leading-tight tracking-tight">
            Lost Something?{" "}
            <span className="text-gradient bg-clip-text">We'll Help You Find It</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground mb-12 animate-fade-up max-w-2xl mx-auto leading-relaxed" style={{ animationDelay: "0.1s" }}>
            Report lost or found items and connect with others in your community. 
            Together, we make reuniting belongings simple and quick.
          </p>

          {/* Premium Report Cards */}
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto animate-fade-up" style={{ animationDelay: "0.2s" }}>
            {/* Report Lost Item Card */}
            <button
              onClick={() => handleOpenModal('lost')}
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-secondary/80 to-secondary/40 border border-border/50 p-8 transition-all duration-500 hover:scale-[1.02] hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/20 backdrop-blur-sm"
            >
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-red-500/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-red-500/20 to-orange-500/20 border border-red-500/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <AlertCircle className="w-8 h-8 text-red-400 group-hover:animate-pulse" />
                </div>
                
                <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                  Report Lost Item
                </h3>
                
                <p className="text-muted-foreground text-sm mb-5 leading-relaxed">
                  Lost something valuable? Report it here and let our community help you find it.
                </p>

                <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-primary" />
                    Add Location
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-primary" />
                    Time & Date
                  </span>
                </div>

                <div className="mt-6 py-3 px-6 rounded-xl bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30 text-primary font-semibold group-hover:from-primary group-hover:to-accent group-hover:text-primary-foreground transition-all duration-300">
                  Start Reporting →
                </div>
              </div>
            </button>

            {/* Report Found Item Card */}
            <button
              onClick={() => handleOpenModal('found')}
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-secondary/80 to-secondary/40 border border-border/50 p-8 transition-all duration-500 hover:scale-[1.02] hover:border-green-500/50 hover:shadow-2xl hover:shadow-green-500/20 backdrop-blur-sm"
            >
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/0 to-green-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-green-500/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <CheckCircle className="w-8 h-8 text-green-400 group-hover:animate-pulse" />
                </div>
                
                <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-green-400 transition-colors">
                  Report Found Item
                </h3>
                
                <p className="text-muted-foreground text-sm mb-5 leading-relaxed">
                  Found someone's belongings? Help them reunite with their lost items.
                </p>

                <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-green-400" />
                    Add Location
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-green-400" />
                    Time & Date
                  </span>
                </div>

                <div className="mt-6 py-3 px-6 rounded-xl bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 text-green-400 font-semibold group-hover:from-green-500 group-hover:to-emerald-500 group-hover:text-white transition-all duration-300">
                  Start Reporting →
                </div>
              </div>
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-16 animate-fade-up" style={{ animationDelay: "0.4s" }}>
            {[
              { value: "5,000+", label: "Items Reunited" },
              { value: "10,000+", label: "Active Users" },
              { value: "98%", label: "Success Rate" },
            ].map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="text-2xl md:text-4xl font-bold text-gradient group-hover:scale-110 transition-transform duration-300">
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

      {/* Report Modal */}
      <ReportItemModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        type={reportType}
      />
    </section>
  );
};

export default HeroSection;
