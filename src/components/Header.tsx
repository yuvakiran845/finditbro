import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Search, MapPin, Menu, X, AlertTriangle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import ReportItemModal from "./ReportItemModal";

const Header = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [reportType, setReportType] = useState<"lost" | "found">("lost");
  const [showReportOptions, setShowReportOptions] = useState(false);

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/lost-items", label: "Lost Items" },
    { path: "/found-items", label: "Found Items" },
    { path: "/pending", label: "Pending" },
  ];

  const isActive = (path: string) => location.pathname === path;

  const openReportModal = (type: "lost" | "found") => {
    setReportType(type);
    setIsReportModalOpen(true);
    setShowReportOptions(false);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/30 group-hover:shadow-primary/50 transition-all duration-300">
                <MapPin className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">
                Find<span className="text-primary">It</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    isActive(link.path)
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="hidden md:flex items-center gap-3">
              <Button variant="outline" size="sm">
                <Search className="w-4 h-4" />
                Search
              </Button>
              
              {/* Report Dropdown */}
              <div className="relative">
                <Button 
                  variant="hero" 
                  size="sm"
                  onClick={() => setShowReportOptions(!showReportOptions)}
                >
                  Report Item
                </Button>
                
                {showReportOptions && (
                  <>
                    <div 
                      className="fixed inset-0 z-40" 
                      onClick={() => setShowReportOptions(false)} 
                    />
                    <div className="absolute right-0 mt-2 w-56 rounded-xl bg-card border border-border/50 shadow-lg shadow-background/50 overflow-hidden z-50 animate-scale-in">
                      <div className="p-1">
                        <button
                          onClick={() => openReportModal("lost")}
                          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left hover:bg-secondary/50 transition-colors group"
                        >
                          <div className="w-10 h-10 rounded-lg bg-destructive/20 flex items-center justify-center group-hover:bg-destructive/30 transition-colors">
                            <AlertTriangle className="w-5 h-5 text-destructive" />
                          </div>
                          <div>
                            <div className="font-medium text-foreground">Report Lost Item</div>
                            <div className="text-xs text-muted-foreground">I lost something</div>
                          </div>
                        </button>
                        <button
                          onClick={() => openReportModal("found")}
                          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left hover:bg-secondary/50 transition-colors group"
                        >
                          <div className="w-10 h-10 rounded-lg bg-success/20 flex items-center justify-center group-hover:bg-success/30 transition-colors">
                            <CheckCircle className="w-5 h-5 text-success" />
                          </div>
                          <div>
                            <div className="font-medium text-foreground">Report Found Item</div>
                            <div className="text-xs text-muted-foreground">I found something</div>
                          </div>
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-secondary transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-foreground" />
              ) : (
                <Menu className="w-6 h-6 text-foreground" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-border/50 animate-fade-in">
              <nav className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                      isActive(link.path)
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="flex flex-col gap-2 mt-4 px-4">
                  <Button variant="outline" size="sm" className="w-full justify-center">
                    <Search className="w-4 h-4" />
                    Search
                  </Button>
                  <Button 
                    variant="hero" 
                    size="sm" 
                    className="w-full justify-center"
                    onClick={() => {
                      setIsMenuOpen(false);
                      openReportModal("lost");
                    }}
                  >
                    <AlertTriangle className="w-4 h-4" />
                    Report Lost
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full justify-center border-success/50 text-success hover:bg-success/10"
                    onClick={() => {
                      setIsMenuOpen(false);
                      openReportModal("found");
                    }}
                  >
                    <CheckCircle className="w-4 h-4" />
                    Report Found
                  </Button>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      <ReportItemModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        type={reportType}
      />
    </>
  );
};

export default Header;
