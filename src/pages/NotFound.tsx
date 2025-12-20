import { Link } from "react-router-dom";
import { Home, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        {/* Logo */}
        <Link to="/" className="inline-flex items-center gap-2 mb-8">
          <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/30">
            <MapPin className="w-6 h-6 text-primary-foreground" />
          </div>
          <span className="text-2xl font-bold text-foreground">
            Find<span className="text-primary">It</span>
          </span>
        </Link>

        {/* 404 */}
        <div className="relative mb-8">
          <div className="text-[150px] md:text-[200px] font-bold text-gradient leading-none">
            404
          </div>
          <div className="absolute inset-0 bg-primary/20 blur-[80px] rounded-full -z-10" />
        </div>

        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
          Page Not Found
        </h1>
        <p className="text-muted-foreground mb-8">
          Looks like this page got lost too. Let's help you find your way back home.
        </p>

        <Link to="/">
          <Button variant="hero" size="lg">
            <Home className="w-5 h-5" />
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
