
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";
import { Shield } from "lucide-react";

interface TicketPreviewProps {
  ticketData: {
    sec: string;
    row: string;
    sit: string;
    title: string;
    venue: string;
    dateTime: string;
  };
}

const TicketPreview = ({ ticketData }: TicketPreviewProps) => {
  const navigate = useNavigate();

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
    <Card className="w-full max-w-md mx-auto overflow-hidden bg-white shadow-lg animate-fade-in">
      {/* Dark header section */}
      <div className="bg-[#222222] text-white p-6">
        <h2 className="text-xl font-semibold text-center mb-4">Standard Ticket</h2>
      </div>

      {/* Ticket info section */}
      <div className="bg-[#007AFF] text-white p-6">
        <div className="grid grid-cols-3 gap-8 text-center">
          <div>
            <p className="text-sm opacity-80">SEC</p>
            <p className="font-bold text-lg">{ticketData.sec}</p>
          </div>
          <div>
            <p className="text-sm opacity-80">ROW</p>
            <p className="font-bold text-lg">{ticketData.row}</p>
          </div>
          <div>
            <p className="text-sm opacity-80">SEAT</p>
            <p className="font-bold text-lg">{ticketData.sit}</p>
          </div>
        </div>
      </div>

      {/* Scrollable content area */}
      <ScrollArea className="h-[400px] w-full">
        <div className="p-4 space-y-4">
          <div className="relative h-48">
            <img
              src="https://asset.cloudinary.com/del59phog/06ba239f573b08c6fbb97797f4e6d065"
              alt="Event"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4">
              <h3 className="text-lg font-semibold">{ticketData.title}</h3>
              <p className="text-sm mt-1">{ticketData.dateTime} • {ticketData.venue}</p>
            </div>
          </div>

          <button className="w-full bg-[#007AFF] text-white py-3 rounded-md text-center mb-4">
            View Barcode
          </button>
          <button className="w-full border border-[#007AFF] text-[#007AFF] py-3 rounded-md text-center">
            Ticket Details
          </button>

          {/* Ticketmaster verification */}
          <div className="flex items-center justify-center gap-2 py-4 text-gray-600">
            <Shield className="w-5 h-5" />
            <span className="text-sm">Ticketmaster.Verified</span>
          </div>
        </div>
      </ScrollArea>

      {/* Bottom action buttons in blue container */}
      <div className="bg-[#0EA5E9]">
        <div className="flex">
          <button 
            onClick={() => navigate("/transfer")}
            className="flex-1 py-4 text-center text-white font-medium hover:bg-[#0284C7] transition-colors border-r border-white/20"
          >
            Transfer
          </button>
          <button className="flex-1 py-4 text-center text-white font-medium hover:bg-[#0284C7] transition-colors">
            Sell
          </button>
        </div>
      </div>
    </Card>
  );
};

export default TicketPreview;
