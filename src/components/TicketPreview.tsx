import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from 'react';  // Add useEffect
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";
import { ScanLine, Ticket } from "lucide-react";  // Changed imports

interface TicketPreviewProps {
  ticketData: {
    sec: string;
    row: string;
    sit: string;
    title: string;
    venue: string;
    dateTime: string;
    ticketCount?: number; // Add ticketCount
  };
}

const TicketPreview = ({ ticketData }: TicketPreviewProps) => {
  const navigate = useNavigate();
  const [activeSlide, setActiveSlide] = useState(0);
  const scrollRef = useRef(null);
  const [imageError, setImageError] = useState(false);

  const imageUrl = "https://res.cloudinary.com/del59phog/image/upload/v1739030225/Justin_Timberlake_Lists_127-Acre_Nashville_Area_Property_for_10_Million_r1dsid.jpg";
  const fallbackImage = "/lovable-uploads/5f96390f-e303-45cf-ae49-f5d1d9e67f6f.png";

  // Preload image
  useEffect(() => {
    const img = new Image();
    img.src = imageUrl;
  }, []);

  const scrollToSlide = (index: number) => {
    setActiveSlide(index);
    const container = scrollRef.current;
    if (container) {
      const slideWidth = container.offsetWidth;
      container.scrollTo({
        left: slideWidth * index,
        behavior: 'smooth'
      });
    }
  };

  const renderTicket = () => (
    <div className="flex-none w-screen max-w-full px-4">
      <div className="border-2 border-[#007AFF] rounded-2xl overflow-hidden">
        <div className="bg-[#0066CC] text-white p-4">
          <h2 className="text-lg font-semibold text-center">Standard Ticket</h2>
        </div>

        <div className="bg-[#007AFF] text-white p-4">
          <div className="grid grid-cols-3 gap-2 text-center">
            <div>
              <p className="text-[10px] opacity-80 mb-1">SEC</p>
              <p className="font-bold text-xs">{ticketData.sec}</p>
            </div>
            <div>
              <p className="text-[10px] opacity-80 mb-1">ROW</p>
              <p className="font-bold text-xs">{ticketData.row}</p>
            </div>
            <div>
              <p className="text-[10px] opacity-80 mb-1">SEAT</p>
              <p className="font-bold text-xs">{ticketData.sit}</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="relative h-56"> {/* Keep the height */}
            <img
              src={imageError ? fallbackImage : imageUrl}
              alt="Event"
              className="w-full h-full object-cover" // Changed back to object-cover and removed bg-gray-100
              onError={() => {
                console.error('Image failed to load, falling back to default');
                setImageError(true);
              }}
              style={{ objectPosition: 'center 20%' }} // Added to control focus point of image
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4">
              <h3 className="text-lg font-semibold">{ticketData.title}</h3>
              <p className="text-sm mt-1">{ticketData.dateTime} • {ticketData.venue}</p>
            </div>
          </div>

          <div className="px-4">
            <button className="w-full bg-[#007AFF] text-white py-3 flex items-center justify-center gap-2">
              <ScanLine className="w-5 h-5" />
              <span>View Barcode</span>
            </button>
            
            <p className="text-[#007AFF] text-center mt-3">
              Ticket Details
            </p>
          </div>

          <div className="bg-[#007AFF] mt-4 w-full">
            <div className="flex items-center justify-center gap-2 py-4 text-white">
              <Ticket className="w-5 h-5" />
              <span className="text-sm">Ticketmaster.Verified</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (!ticketData || !ticketData.sec) {
    return (
      <Card className="w-full max-w-md mx-auto p-6 text-center">
        <p className="text-gray-600">No ticket data available</p>
        <Button 
          onClick={() => navigate("/")}
          className="mt-4 bg-ticket-blue hover:bg-ticket-darkBlue text-white"
        >
          Go to Home
        </Button>
      </Card>
    );
  }

  return (
    <Card className="w-screen max-w-full mx-auto overflow-hidden bg-white shadow-lg animate-fade-in">
      <div 
        ref={scrollRef}
        className="overflow-x-auto scrollbar-hide snap-x snap-mandatory w-full"
      >
        <div className="inline-flex w-full">
          {[0, 1, 2].map((_, index) => (
            <div key={index} className="snap-start w-full flex-none">
              {renderTicket()}
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center space-x-2 py-4">
        {[0, 1, 2].map((index) => (
          <button
            key={index}
            onClick={() => scrollToSlide(index)}
            className={`h-2 w-2 rounded-full transition-all ${
              activeSlide === index ? 'bg-[#007AFF] w-4' : 'bg-gray-300'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      <div className="p-4 flex gap-4">
        <button 
          onClick={() => navigate("/transfer", { 
            state: { ticketCount: ticketData.ticketCount } 
          })}
          className="flex-1 py-4 text-center text-white font-medium bg-[#007AFF] rounded-md hover:bg-[#0066CC] transition-colors"
        >
          Transfer
        </button>
        <button 
          className="flex-1 py-4 text-center text-white font-medium bg-[#007AFF] rounded-md hover:bg-[#0066CC] transition-colors"
        >
          Sell
        </button>
      </div>
    </Card>
  );
};

export default TicketPreview;
