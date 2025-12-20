import { useState, useMemo } from "react";
import { Search, Filter, MapPin } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ItemCard, { Item } from "@/components/ItemCard";
import ItemModal from "@/components/ItemModal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { mockLostItems } from "@/data/mockData";

const LostItems = () => {
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");

  const handleContact = (item: Item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const locations = useMemo(() => {
    const uniqueLocations = [...new Set(mockLostItems.map((item) => item.location))];
    return uniqueLocations;
  }, []);

  const filteredItems = useMemo(() => {
    return mockLostItems.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesLocation =
        !selectedLocation || item.location === selectedLocation;
      return matchesSearch && matchesLocation;
    });
  }, [searchQuery, selectedLocation]);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-destructive/10 border border-destructive/20 text-destructive text-sm mb-4">
              <span className="w-2 h-2 rounded-full bg-destructive animate-pulse" />
              Lost Items
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Lost Items Directory
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Browse through reported lost items. If you've found any of these, please reach out to help reunite them with their owners.
            </p>
          </div>

          {/* Filters */}
          <div className="glass-card p-4 md:p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Search lost items..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-secondary border-border h-12"
                />
              </div>
              <div className="relative w-full md:w-64">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full h-12 pl-10 pr-4 rounded-lg bg-secondary border border-border text-foreground appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="">All Locations</option>
                  {locations.map((location) => (
                    <option key={location} value={location}>
                      {location}
                    </option>
                  ))}
                </select>
              </div>
              <Button variant="outline" className="h-12">
                <Filter className="w-5 h-5" />
                More Filters
              </Button>
            </div>
          </div>

          {/* Results Count */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-muted-foreground">
              Showing <span className="text-foreground font-medium">{filteredItems.length}</span> lost items
            </p>
          </div>

          {/* Items Grid */}
          {filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredItems.map((item, index) => (
                <div
                  key={item.id}
                  className="animate-fade-up"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <ItemCard item={item} onContact={handleContact} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4">
                <Search className="w-10 h-10 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">No items found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />

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

export default LostItems;
