
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { ScanLine, Ticket } from "lucide-react";
import TransferTicketsDialog from "./TransferTicketsDialog";

interface TicketPreviewProps {
  ticketData: {
    sec: string;
    row: string;
    sit: string;
    title: string;
    venue: string;
    dateTime: string;
    ticketCount?: number;
    imageUrl: string;
  };
}

const TicketPreview = ({ ticketData }: TicketPreviewProps) => {
  const navigate = useNavigate();
  const [transferDialogOpen, setTransferDialogOpen] = useState(false);
  const [imageError, setImageError] = useState(false);

  const fallbackImage = "/lovable-uploads/5f96390f-e303-45cf-ae49-f5d1d9e67f6f.png";

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

  // Convert ticketCount to number and ensure it's at least 1
  const numberOfTickets = Math.max(1, parseInt(ticketData.ticketCount?.toString() || '1', 10));

  return (
    <Card className="w-full max-w-md mx-auto overflow-hidden bg-white shadow-lg animate-fade-in">
      <div className="bg-[#0066CC] text-white p-4">
        <h2 className="text-lg font-semibold text-center">Standard Ticket</h2>
      </div>

      <div className="bg-[#007AFF] text-white p-4">
        <div className="grid grid-cols-3 gap-2 text-center">
          <div>
            <p className="text-xs opacity-80 mb-1">SEC</p>
            <p className="font-bold">{ticketData.sec}</p>
          </div>
          <div>
            <p className="text-xs opacity-80 mb-1">ROW</p>
            <p className="font-bold">{ticketData.row}</p>
          </div>
          <div>
            <p className="text-xs opacity-80 mb-1">SEAT</p>
            <p className="font-bold">{ticketData.sit}</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="relative h-56">
          <img
            src={imageError ? fallbackImage : ticketData.imageUrl}
            alt="Event"
            className="w-full h-full object-cover"
            onError={() => setImageError(true)}
            style={{ objectPosition: 'center 20%' }}
          />
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4 text-center">
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

      <div className="p-4 bg-[#007AFF]">
        <div className="flex gap-4">
          <button 
            onClick={() => setTransferDialogOpen(true)}
            className="flex-1 py-4 text-center text-[#007AFF] font-medium bg-white rounded-md hover:bg-gray-50 transition-colors"
          >
            Transfer
          </button>
          <button 
            className="flex-1 py-4 text-center text-[#007AFF] font-medium bg-white rounded-md hover:bg-gray-50 transition-colors"
          >
            Sell
          </button>
        </div>
      </div>

      <TransferTicketsDialog
        open={transferDialogOpen}
        onOpenChange={setTransferDialogOpen}
        ticketCount={numberOfTickets}
        sec={ticketData.sec}
        row={ticketData.row}
      />
    </Card>
  );
};

export default TicketPreview;
