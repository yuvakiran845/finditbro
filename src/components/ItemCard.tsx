import { Calendar, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface Item {
  id: string;
  title: string;
  description: string;
  image: string;
  date: string;
  location: string;
  status?: "pending" | "confirmed" | "resolved";
  type: "lost" | "found";
}

interface ItemCardProps {
  item: Item;
  onContact: (item: Item) => void;
}

const ItemCard = ({ item, onContact }: ItemCardProps) => {
  const statusStyles = {
    pending: "status-pending",
    confirmed: "status-confirmed",
    resolved: "status-resolved",
  };

  return (
    <div className="glass-card card-hover overflow-hidden group">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
        
        {/* Status Badge */}
        {item.status && (
          <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-medium capitalize ${statusStyles[item.status]}`}>
            {item.status}
          </div>
        )}

        {/* Type Badge */}
        <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-medium ${
          item.type === "lost" 
            ? "bg-destructive/20 text-destructive border border-destructive/30"
            : "bg-success/20 text-success border border-success/30"
        }`}>
          {item.type === "lost" ? "Lost" : "Found"}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-1 group-hover:text-primary transition-colors">
          {item.title}
        </h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {item.description}
        </p>

        {/* Meta */}
        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
          <div className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            <span>{item.date}</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5" />
            <span className="truncate max-w-[120px]">{item.location}</span>
          </div>
        </div>

        {/* Action */}
        <Button
          variant="outline"
          size="sm"
          className="w-full group-hover:border-primary/50 group-hover:text-primary"
          onClick={() => onContact(item)}
        >
          <Send className="w-4 h-4" />
          Send to Someone
        </Button>
      </div>
    </div>
  );
};

export default ItemCard;
