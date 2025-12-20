import { useState, useMemo } from "react";
import { Search, Filter, Clock, CheckCircle, AlertCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ItemCard, { Item } from "@/components/ItemCard";
import ItemModal from "@/components/ItemModal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { mockPendingItems } from "@/data/mockData";

const Pending = () => {
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("");

  const handleContact = (item: Item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const filteredItems = useMemo(() => {
    return mockPendingItems.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus =
        !selectedStatus || item.status === selectedStatus;
      return matchesSearch && matchesStatus;
    });
  }, [searchQuery, selectedStatus]);

  const statusCounts = useMemo(() => {
    return {
      all: mockPendingItems.length,
      pending: mockPendingItems.filter((i) => i.status === "pending").length,
      confirmed: mockPendingItems.filter((i) => i.status === "confirmed").length,
      resolved: mockPendingItems.filter((i) => i.status === "resolved").length,
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-warning/10 border border-warning/20 text-warning text-sm mb-4">
              <Clock className="w-4 h-4" />
              Pending Status
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Pending Confirmations
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Track the status of items that are awaiting confirmation, verification, or pickup coordination.
            </p>
          </div>

          {/* Status Summary Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { key: "", label: "All Items", count: statusCounts.all, color: "primary" },
              { key: "pending", label: "Pending", count: statusCounts.pending, color: "warning" },
              { key: "confirmed", label: "Confirmed", count: statusCounts.confirmed, color: "info" },
              { key: "resolved", label: "Resolved", count: statusCounts.resolved, color: "success" },
            ].map((status) => (
              <button
                key={status.key}
                onClick={() => setSelectedStatus(status.key)}
                className={`glass-card p-4 text-left transition-all duration-300 ${
                  selectedStatus === status.key
                    ? "ring-2 ring-primary"
                    : "hover:bg-secondary/50"
                }`}
              >
                <div className={`text-2xl font-bold text-${status.color}`}>
                  {status.count}
                </div>
                <div className="text-sm text-muted-foreground">{status.label}</div>
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="glass-card p-4 md:p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Search pending items..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-secondary border-border h-12"
                />
              </div>
              <Button variant="outline" className="h-12">
                <Filter className="w-5 h-5" />
                More Filters
              </Button>
            </div>
          </div>

          {/* Status Legend */}
          <div className="flex flex-wrap gap-4 mb-8">
            <div className="flex items-center gap-2 text-sm">
              <div className="w-3 h-3 rounded-full bg-warning" />
              <span className="text-muted-foreground">Pending - Awaiting verification</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="w-3 h-3 rounded-full bg-info" />
              <span className="text-muted-foreground">Confirmed - Owner verified</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="w-3 h-3 rounded-full bg-success" />
              <span className="text-muted-foreground">Resolved - Successfully returned</span>
            </div>
          </div>

          {/* Results Count */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-muted-foreground">
              Showing <span className="text-foreground font-medium">{filteredItems.length}</span> pending items
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
                <CheckCircle className="w-10 h-10 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">No pending items</h3>
              <p className="text-muted-foreground">
                All items have been resolved or try adjusting your filters
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

export default Pending;
