import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Shield, Clock } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import ItemCard, { Item } from "@/components/ItemCard";
import ItemModal from "@/components/ItemModal";
import { Button } from "@/components/ui/button";
import { mockLostItems, mockFoundItems } from "@/data/mockData";

const Index = () => {
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleContact = (item: Item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const recentLost = mockLostItems.slice(0, 3);
  const recentFound = mockFoundItems.slice(0, 3);

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

        {/* Recent Lost Items */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                  Recently Lost Items
                </h2>
                <p className="text-muted-foreground">
                  Help reunite these items with their owners
                </p>
              </div>
              <Link to="/lost-items">
                <Button variant="outline">
                  View All
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentLost.map((item, index) => (
                <div
                  key={item.id}
                  className="animate-fade-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <ItemCard item={item} onContact={handleContact} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Recent Found Items */}
        <section className="py-20 bg-card/50">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                  Recently Found Items
                </h2>
                <p className="text-muted-foreground">
                  Check if any of these belong to you
                </p>
              </div>
              <Link to="/found-items">
                <Button variant="outline">
                  View All
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentFound.map((item, index) => (
                <div
                  key={item.id}
                  className="animate-fade-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <ItemCard item={item} onContact={handleContact} />
                </div>
              ))}
            </div>
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

export default Index;
