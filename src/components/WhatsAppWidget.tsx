import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

const WhatsAppWidget = () => {
  const [showPrompt, setShowPrompt] = useState(false);
  
  useEffect(() => {
    // Show prompt after 3 seconds
    const timer = setTimeout(() => {
      setShowPrompt(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleWhatsAppClick = () => {
    const phoneNumber = "2348087633060";
    const message = "Hello! I'm interested in SafePhone NG blockchain security for my device. Can you help me get started?";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    setShowPrompt(false);
  };

  const closePrompt = () => {
    setShowPrompt(false);
  };

  return (
    <>
      {/* WhatsApp floating button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={handleWhatsAppClick}
          className="rounded-full w-14 h-14 bg-green-500 hover:bg-green-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 animate-pulse"
          size="sm"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </div>

      {/* Chat prompt popup */}
      {showPrompt && (
        <div className="fixed bottom-24 right-6 z-50 max-w-sm">
          <div className="bg-card border rounded-lg shadow-lg p-4 relative animate-in slide-in-from-right-5 duration-300">
            <button
              onClick={closePrompt}
              className="absolute top-2 right-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              ×
            </button>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                <MessageCircle className="h-5 w-5 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-sm mb-1">Need Help?</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Have questions about device security? Chat with us on WhatsApp!
                </p>
                <Button
                  onClick={handleWhatsAppClick}
                  size="sm"
                  className="bg-green-500 hover:bg-green-600 text-white"
                >
                  Start Chat
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default WhatsAppWidget;