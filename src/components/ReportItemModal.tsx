import { useState, useRef } from "react";
import { X, MapPin, Calendar, User, Package, Clock, Sparkles, AlertTriangle, CheckCircle, Camera, Image, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useReportedItems, ReportedItem } from "@/hooks/useReportedItems";

interface ReportItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: "lost" | "found";
}

const ReportItemModal = ({ isOpen, onClose, type }: ReportItemModalProps) => {
  const [formData, setFormData] = useState({
    reporterName: "",
    itemName: "",
    description: "",
    location: "",
    date: "",
    time: "",
    contactEmail: "",
    contactPhone: "",
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { addItem } = useReportedItems();

  if (!isOpen) return null;

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image too large", { description: "Please select an image under 5MB" });
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Add item to reported items
    const newItem: ReportedItem = {
      id: Date.now().toString(),
      type,
      itemName: formData.itemName,
      description: formData.description,
      location: formData.location,
      date: formData.date,
      time: formData.time,
      reporterName: formData.reporterName,
      image: imagePreview || undefined,
      createdAt: new Date().toISOString(),
    };
    
    addItem(newItem);

    toast.success(
      type === "lost" 
        ? "Lost item reported successfully!" 
        : "Found item reported successfully!",
      {
        description: "We'll notify you when there's a match.",
      }
    );

    setFormData({
      reporterName: "",
      itemName: "",
      description: "",
      location: "",
      date: "",
      time: "",
      contactEmail: "",
      contactPhone: "",
    });
    setImagePreview(null);
    setCurrentStep(1);
    setIsSubmitting(false);
    onClose();
  };

  const isStep1Valid = formData.reporterName && formData.itemName && formData.description;
  const isStep2Valid = formData.location && formData.date && formData.time;
  const isStep3Valid = formData.contactEmail;

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Animated Background Overlay */}
      <div 
        className="absolute inset-0 bg-background/90 backdrop-blur-xl animate-fade-in"
        onClick={onClose}
      >
        {/* Floating particles effect */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-info/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
          <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-destructive/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />
        </div>
      </div>

      {/* Modal Container */}
      <div className="relative w-full max-w-2xl animate-scale-in max-h-[90vh] overflow-y-auto">
        {/* Glow border effect */}
        <div className={`absolute -inset-1 rounded-3xl blur-xl opacity-50 ${
          type === "lost" 
            ? "bg-gradient-to-r from-destructive via-primary to-destructive" 
            : "bg-gradient-to-r from-success via-primary to-success"
        }`} />
        
        {/* Main Modal */}
        <div className="relative bg-gradient-to-b from-card via-card to-background border border-border/50 rounded-3xl shadow-2xl overflow-hidden">
          {/* Shimmer effect on top */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent animate-shimmer" style={{ backgroundSize: "200% 100%" }} />

          {/* Header */}
          <div className="relative p-6 border-b border-border/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center animate-pulse-glow ${
                  type === "lost" 
                    ? "bg-destructive/20 border border-destructive/30" 
                    : "bg-success/20 border border-success/30"
                }`}>
                  {type === "lost" ? (
                    <AlertTriangle className="w-7 h-7 text-destructive" />
                  ) : (
                    <CheckCircle className="w-7 h-7 text-success" />
                  )}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground">
                    Report {type === "lost" ? "Lost" : "Found"} Item
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {type === "lost" 
                      ? "Help us find your missing item" 
                      : "Help reunite this item with its owner"}
                  </p>
                </div>
              </div>
              
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-xl bg-secondary/50 backdrop-blur-sm flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-all duration-300 hover:rotate-90"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Progress Steps */}
            <div className="flex items-center justify-center gap-2 mt-6">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentStep(step)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-300 ${
                      currentStep === step
                        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30 scale-110"
                        : currentStep > step
                        ? "bg-success text-success-foreground"
                        : "bg-secondary text-muted-foreground hover:bg-secondary/80"
                    }`}
                  >
                    {currentStep > step ? <CheckCircle className="w-5 h-5" /> : step}
                  </button>
                  {step < 3 && (
                    <div className={`w-16 h-1 rounded-full transition-all duration-500 ${
                      currentStep > step ? "bg-success" : "bg-secondary"
                    }`} />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between text-xs text-muted-foreground mt-2 px-2">
              <span className={currentStep >= 1 ? "text-primary" : ""}>Item Details</span>
              <span className={currentStep >= 2 ? "text-primary" : ""}>Location & Time</span>
              <span className={currentStep >= 3 ? "text-primary" : ""}>Contact Info</span>
            </div>
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit} className="p-6">
            {/* Step 1: Item Details */}
            <div className={`space-y-5 transition-all duration-500 ${currentStep === 1 ? "block animate-fade-in" : "hidden"}`}>
              {/* Image Upload Section */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground flex items-center gap-2">
                  <Camera className="w-4 h-4 text-primary" />
                  Item Photo
                  <span className="text-muted-foreground text-xs">(Recommended)</span>
                </label>
                
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                
                {imagePreview ? (
                  <div className="relative group">
                    <div className="relative w-full h-48 rounded-2xl overflow-hidden border-2 border-primary/30 bg-secondary/30">
                      <img 
                        src={imagePreview} 
                        alt="Preview" 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-3">
                        <Button
                          type="button"
                          size="sm"
                          variant="outline"
                          onClick={() => fileInputRef.current?.click()}
                          className="rounded-xl"
                        >
                          <Upload className="w-4 h-4 mr-2" />
                          Change
                        </Button>
                        <Button
                          type="button"
                          size="sm"
                          variant="destructive"
                          onClick={handleRemoveImage}
                          className="rounded-xl"
                        >
                          <X className="w-4 h-4 mr-2" />
                          Remove
                        </Button>
                      </div>
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-success rounded-full flex items-center justify-center shadow-lg">
                      <CheckCircle className="w-5 h-5 text-success-foreground" />
                    </div>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full h-48 rounded-2xl border-2 border-dashed border-border/50 hover:border-primary/50 bg-secondary/20 hover:bg-secondary/40 transition-all duration-300 flex flex-col items-center justify-center gap-3 group"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Image className="w-8 h-8 text-primary" />
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-foreground">Click to upload image</p>
                      <p className="text-xs text-muted-foreground">PNG, JPG up to 5MB</p>
                    </div>
                  </button>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground flex items-center gap-2">
                  <User className="w-4 h-4 text-primary" />
                  Your Name
                </label>
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/50 to-primary/0 rounded-xl opacity-0 group-focus-within:opacity-100 blur transition-opacity duration-300" />
                  <Input
                    placeholder="Enter your full name"
                    value={formData.reporterName}
                    onChange={(e) => setFormData({ ...formData, reporterName: e.target.value })}
                    className="relative bg-secondary/50 border-border/50 h-12 rounded-xl focus:border-primary transition-all duration-300 placeholder:text-muted-foreground/50"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground flex items-center gap-2">
                  <Package className="w-4 h-4 text-primary" />
                  Item Name
                </label>
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/50 to-primary/0 rounded-xl opacity-0 group-focus-within:opacity-100 blur transition-opacity duration-300" />
                  <Input
                    placeholder={type === "lost" ? "What did you lose?" : "What did you find?"}
                    value={formData.itemName}
                    onChange={(e) => setFormData({ ...formData, itemName: e.target.value })}
                    className="relative bg-secondary/50 border-border/50 h-12 rounded-xl focus:border-primary transition-all duration-300 placeholder:text-muted-foreground/50"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-primary" />
                  Description
                </label>
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/50 to-primary/0 rounded-xl opacity-0 group-focus-within:opacity-100 blur transition-opacity duration-300" />
                  <Textarea
                    placeholder="Describe the item in detail (color, brand, distinguishing features...)"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="relative bg-secondary/50 border-border/50 min-h-[100px] rounded-xl focus:border-primary transition-all duration-300 placeholder:text-muted-foreground/50 resize-none"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Location & Time */}
            <div className={`space-y-5 transition-all duration-500 ${currentStep === 2 ? "block animate-fade-in" : "hidden"}`}>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  {type === "lost" ? "Last Seen Location" : "Found Location"}
                </label>
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/50 to-primary/0 rounded-xl opacity-0 group-focus-within:opacity-100 blur transition-opacity duration-300" />
                  <Input
                    placeholder="Enter the location (e.g., Central Park, Main Street...)"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="relative bg-secondary/50 border-border/50 h-12 rounded-xl focus:border-primary transition-all duration-300 placeholder:text-muted-foreground/50"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-primary" />
                    {type === "lost" ? "Date Lost" : "Date Found"}
                  </label>
                  <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/50 to-primary/0 rounded-xl opacity-0 group-focus-within:opacity-100 blur transition-opacity duration-300" />
                    <Input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="relative bg-secondary/50 border-border/50 h-12 rounded-xl focus:border-primary transition-all duration-300"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground flex items-center gap-2">
                    <Clock className="w-4 h-4 text-primary" />
                    Approximate Time
                  </label>
                  <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/50 to-primary/0 rounded-xl opacity-0 group-focus-within:opacity-100 blur transition-opacity duration-300" />
                    <Input
                      type="time"
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      className="relative bg-secondary/50 border-border/50 h-12 rounded-xl focus:border-primary transition-all duration-300"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Location tip */}
              <div className="p-4 rounded-xl bg-info/10 border border-info/20">
                <p className="text-sm text-info flex items-start gap-2">
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>Be as specific as possible with the location to increase the chances of finding a match.</span>
                </p>
              </div>
            </div>

            {/* Step 3: Contact Info */}
            <div className={`space-y-5 transition-all duration-500 ${currentStep === 3 ? "block animate-fade-in" : "hidden"}`}>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Email Address <span className="text-destructive">*</span>
                </label>
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/50 to-primary/0 rounded-xl opacity-0 group-focus-within:opacity-100 blur transition-opacity duration-300" />
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    value={formData.contactEmail}
                    onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                    className="relative bg-secondary/50 border-border/50 h-12 rounded-xl focus:border-primary transition-all duration-300 placeholder:text-muted-foreground/50"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Phone Number <span className="text-muted-foreground">(Optional)</span>
                </label>
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/50 to-primary/0 rounded-xl opacity-0 group-focus-within:opacity-100 blur transition-opacity duration-300" />
                  <Input
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={formData.contactPhone}
                    onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                    className="relative bg-secondary/50 border-border/50 h-12 rounded-xl focus:border-primary transition-all duration-300 placeholder:text-muted-foreground/50"
                  />
                </div>
              </div>

              {/* Privacy notice */}
              <div className="p-4 rounded-xl bg-secondary/30 border border-border/30">
                <p className="text-xs text-muted-foreground">
                  Your contact information will only be shared with verified matches. We respect your privacy and will never share your details with third parties.
                </p>
              </div>

              {/* Summary Preview */}
              <div className="p-4 rounded-xl bg-gradient-to-br from-primary/10 to-transparent border border-primary/20">
                <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-primary" />
                  Report Summary
                </h4>
                <div className="flex gap-4">
                  {imagePreview && (
                    <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 border border-border/30">
                      <img src={imagePreview} alt="Item" className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div className="grid grid-cols-2 gap-2 text-sm flex-1">
                    <div>
                      <span className="text-muted-foreground">Item:</span>
                      <span className="ml-2 text-foreground">{formData.itemName || "—"}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Location:</span>
                      <span className="ml-2 text-foreground">{formData.location || "—"}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Date:</span>
                      <span className="ml-2 text-foreground">{formData.date || "—"}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Time:</span>
                      <span className="ml-2 text-foreground">{formData.time || "—"}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex gap-3 mt-8">
              {currentStep > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 h-12 rounded-xl border-border/50 hover:border-primary/50 hover:bg-secondary/50 transition-all duration-300"
                  onClick={prevStep}
                >
                  Back
                </Button>
              )}
              
              {currentStep < 3 ? (
                <Button
                  type="button"
                  variant="glow"
                  className={`flex-1 h-12 rounded-xl ${
                    (currentStep === 1 && !isStep1Valid) || (currentStep === 2 && !isStep2Valid)
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                  onClick={nextStep}
                  disabled={(currentStep === 1 && !isStep1Valid) || (currentStep === 2 && !isStep2Valid)}
                >
                  Continue
                  <Sparkles className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  variant="glow"
                  className={`flex-1 h-12 rounded-xl ${!isStep3Valid ? "opacity-50 cursor-not-allowed" : ""}`}
                  disabled={!isStep3Valid || isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin mr-2" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      Submit Report
                      {type === "lost" ? (
                        <AlertTriangle className="w-4 h-4 ml-2" />
                      ) : (
                        <CheckCircle className="w-4 h-4 ml-2" />
                      )}
                    </>
                  )}
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReportItemModal;
