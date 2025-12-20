import { X, MapPin, Clock, AlertTriangle, CheckCircle } from "lucide-react";
import { useReportedItems } from "@/hooks/useReportedItems";
import { useEffect, useState } from "react";

const RecentReportsNotification = () => {
  const { items, removeItem } = useReportedItems();
  const [visibleItems, setVisibleItems] = useState<string[]>([]);

  useEffect(() => {
    // Show new items with animation
    items.forEach((item) => {
      if (!visibleItems.includes(item.id)) {
        setTimeout(() => {
          setVisibleItems((prev) => [...prev, item.id]);
        }, 100);
      }
    });
  }, [items]);

  const handleDismiss = (id: string) => {
    setVisibleItems((prev) => prev.filter((itemId) => itemId !== id));
    setTimeout(() => {
      removeItem(id);
    }, 300);
  };

  // Auto-dismiss after 30 seconds
  useEffect(() => {
    const timers = items.map((item) => {
      return setTimeout(() => {
        handleDismiss(item.id);
      }, 30000);
    });

    return () => timers.forEach(clearTimeout);
  }, [items]);

  if (items.length === 0) return null;

  return (
    <div className="fixed bottom-6 left-6 right-6 z-40 flex flex-wrap gap-4 justify-center pointer-events-none">
      {items.slice(0, 5).map((item) => (
        <div
          key={item.id}
          className={`pointer-events-auto transition-all duration-500 ${
            visibleItems.includes(item.id)
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 translate-y-8 scale-95"
          }`}
        >
          <div className="relative group">
            {/* Glow effect */}
            <div className={`absolute -inset-1 rounded-2xl blur-lg opacity-60 ${
              item.type === "lost" 
                ? "bg-gradient-to-r from-destructive/50 to-destructive/20" 
                : "bg-gradient-to-r from-success/50 to-success/20"
            }`} />
            
            {/* Card */}
            <div className="relative bg-card/95 backdrop-blur-xl border border-border/50 rounded-2xl shadow-2xl overflow-hidden max-w-xs">
              {/* Top shimmer */}
              <div className={`absolute top-0 left-0 right-0 h-0.5 ${
                item.type === "lost" 
                  ? "bg-gradient-to-r from-transparent via-destructive to-transparent" 
                  : "bg-gradient-to-r from-transparent via-success to-transparent"
              }`} />
              
              <div className="p-4">
                {/* Header with type badge and dismiss */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                    item.type === "lost"
                      ? "bg-destructive/20 text-destructive border border-destructive/30"
                      : "bg-success/20 text-success border border-success/30"
                  }`}>
                    {item.type === "lost" ? (
                      <AlertTriangle className="w-3 h-3" />
                    ) : (
                      <CheckCircle className="w-3 h-3" />
                    )}
                    {item.type === "lost" ? "Lost" : "Found"}
                  </div>
                  
                  <button
                    onClick={() => handleDismiss(item.id)}
                    className="w-6 h-6 rounded-lg bg-secondary/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-all duration-200"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>

                {/* Content with image */}
                <div className="flex gap-3">
                  {item.image ? (
                    <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 border border-border/30">
                      <img 
                        src={item.image} 
                        alt={item.itemName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className={`w-16 h-16 rounded-xl flex-shrink-0 flex items-center justify-center ${
                      item.type === "lost" 
                        ? "bg-destructive/10 border border-destructive/20" 
                        : "bg-success/10 border border-success/20"
                    }`}>
                      {item.type === "lost" ? (
                        <AlertTriangle className="w-6 h-6 text-destructive/60" />
                      ) : (
                        <CheckCircle className="w-6 h-6 text-success/60" />
                      )}
                    </div>
                  )}
                  
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-foreground text-sm truncate">
                      {item.itemName}
                    </h4>
                    <p className="text-xs text-muted-foreground line-clamp-2 mt-0.5">
                      {item.description}
                    </p>
                    <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {item.location.split(',')[0]}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {item.time}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Reporter info */}
                <div className="mt-3 pt-3 border-t border-border/30">
                  <p className="text-xs text-muted-foreground">
                    Reported by <span className="text-foreground font-medium">{item.reporterName}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecentReportsNotification;
