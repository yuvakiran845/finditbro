import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Shield, Clock, AlertTriangle, CheckCircle, MapPin, Package } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import ItemCard, { Item } from "@/components/ItemCard";
import ItemModal from "@/components/ItemModal";
import { Button } from "@/components/ui/button";
import { useReportedItems } from "@/hooks/useReportedItems";

const Index = () => {
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { items } = useReportedItems();

  const handleContact = (item: Item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const recentLost = items.filter(item => item.type === "lost").slice(0, 6);
  const recentFound = items.filter(item => item.type === "found").slice(0, 6);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Section */}
        <HeroSection />

        {/* Features Section */}
        <section className="py-20 bg-gradient-to-b from-background to-card">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                How It Works
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our platform makes it simple to report and recover lost items
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: Sparkles,
                  title: "Report Your Item",
                  description: "Quickly submit details about your lost or found item with photos and location.",
                },
                {
                  icon: Shield,
                  title: "Secure Matching",
                  description: "Our system helps connect lost items with their rightful owners securely.",
                },
                {
                  icon: Clock,
                  title: "Fast Recovery",
                  description: "Get notified instantly when there's a match and coordinate pickup.",
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="glass-card p-8 text-center card-hover animate-fade-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                    <feature.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Recently Lost Items */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-destructive/20 border border-destructive/30 flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-destructive" />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                    Recently Lost Items
                  </h2>
                  <p className="text-muted-foreground text-sm">
                    Help reunite these items with their owners
                  </p>
                </div>
              </div>
              <Link to="/lost-items">
                <Button variant="outline" className="hidden sm:flex">
                  View All
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>

            {recentLost.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recentLost.map((item, index) => (
                  <div
                    key={item.id}
                    className="animate-fade-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <ReportedItemCard item={item} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="glass-card p-12 text-center">
                <div className="w-20 h-20 rounded-3xl bg-destructive/10 border border-destructive/20 flex items-center justify-center mx-auto mb-6">
                  <AlertTriangle className="w-10 h-10 text-destructive/50" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">No Lost Items Reported</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  When someone reports a lost item, it will appear here. Use the "Report Lost Item" button above to get started.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Recently Found Items */}
        <section className="py-20 bg-card/50">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-success/20 border border-success/30 flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-success" />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                    Recently Found Items
                  </h2>
                  <p className="text-muted-foreground text-sm">
                    Check if any of these belong to you
                  </p>
                </div>
              </div>
              <Link to="/found-items">
                <Button variant="outline" className="hidden sm:flex">
                  View All
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>

            {recentFound.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recentFound.map((item, index) => (
                  <div
                    key={item.id}
                    className="animate-fade-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <ReportedItemCard item={item} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="glass-card p-12 text-center">
                <div className="w-20 h-20 rounded-3xl bg-success/10 border border-success/20 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-success/50" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">No Found Items Reported</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  When someone reports a found item, it will appear here. Use the "Report Found Item" button above to get started.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="glass-card p-12 text-center relative overflow-hidden">
              {/* Glow */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-primary/20 blur-[100px] rounded-full" />
              
              <div className="relative">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Found Something? Report It Now!
                </h2>
                <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                  Your honesty can make someone's day. Help us build a community of trust by reporting found items.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link to="/found-items">
                    <Button variant="hero" size="lg">
                      Report Found Item
                    </Button>
                  </Link>
                  <Link to="/lost-items">
                    <Button variant="outline" size="lg">
                      Report Lost Item
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Item Modal */}
      <ItemModal
        item={selectedItem}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedItem(null);
        }}
      />
    </div>
  );
};

// Reported Item Card Component
const ReportedItemCard = ({ item }: { item: ReturnType<typeof useReportedItems>['items'][0] }) => {
  return (
    <div className="group relative">
      {/* Glow effect */}
      <div className={`absolute -inset-1 rounded-3xl blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-500 ${
        item.type === "lost" 
          ? "bg-gradient-to-r from-destructive/50 to-destructive/20" 
          : "bg-gradient-to-r from-success/50 to-success/20"
      }`} />
      
      <div className="relative glass-card overflow-hidden card-hover">
        {/* Type Badge */}
        <div className={`absolute top-4 left-4 z-10 flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-sm ${
          item.type === "lost"
            ? "bg-destructive/80 text-destructive-foreground"
            : "bg-success/80 text-success-foreground"
        }`}>
          {item.type === "lost" ? (
            <AlertTriangle className="w-3 h-3" />
          ) : (
            <CheckCircle className="w-3 h-3" />
          )}
          {item.type}
        </div>

        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          {item.image ? (
            <img
              src={item.image}
              alt={item.itemName}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <div className={`w-full h-full flex items-center justify-center ${
              item.type === "lost" 
                ? "bg-gradient-to-br from-destructive/20 to-destructive/5" 
                : "bg-gradient-to-br from-success/20 to-success/5"
            }`}>
              <Package className="w-16 h-16 text-muted-foreground/30" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-1 group-hover:text-primary transition-colors">
            {item.itemName}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
            {item.description}
          </p>

          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3 text-primary" />
              {item.location.split(',')[0]}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-primary" />
              {item.date}
            </span>
          </div>

          {/* Reporter */}
          <div className="mt-4 pt-4 border-t border-border/30 flex items-center justify-between">
            <span className="text-xs text-muted-foreground">
              By <span className="text-foreground font-medium">{item.reporterName}</span>
            </span>
            <span className="text-xs text-muted-foreground">
              {item.time}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
