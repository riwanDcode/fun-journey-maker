
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { useState } from "react";

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
  const [currentImage, setCurrentImage] = useState(0);

  // Placeholder images - replace with actual Justin Timberlake images
  const images = [
    "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
  ];

  return (
    <Card className="w-full max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden animate-fade-in">
      <Carousel className="w-full">
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index}>
              <div className="relative aspect-[4/3] w-full">
                <img
                  src={image}
                  alt={`Event ${index + 1}`}
                  className="object-cover w-full h-full"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-2" />
        <CarouselNext className="right-2" />
      </Carousel>

      <div className="bg-ticket-blue text-white p-4">
        <h2 className="text-xl font-semibold text-center">Standard Ticket</h2>
        <div className="grid grid-cols-3 gap-4 mt-2 text-center">
          <div>
            <p className="text-sm opacity-80">SEC</p>
            <p className="font-bold">{ticketData.sec}</p>
          </div>
          <div>
            <p className="text-sm opacity-80">ROW</p>
            <p className="font-bold">{ticketData.row}</p>
          </div>
          <div>
            <p className="text-sm opacity-80">SEAT</p>
            <p className="font-bold">{ticketData.sit}</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{ticketData.title}</h3>
        <p className="text-gray-600 mb-4">{ticketData.venue}</p>
        <p className="text-gray-600 mb-6">{new Date(ticketData.dateTime).toLocaleString()}</p>
        
        {/* Barcode Section */}
        <div className="border-t border-gray-200 pt-4">
          <div className="bg-gray-100 p-4 rounded-lg flex flex-col items-center">
            {/* Placeholder barcode - replace with actual barcode implementation */}
            <div className="w-full h-16 bg-gradient-to-r from-gray-800 to-gray-900 mb-2"></div>
            <p className="text-sm text-gray-500">Scan barcode at venue</p>
          </div>
        </div>
      </div>

      <div className="p-4 border-t border-gray-200 flex gap-4">
        <Button
          onClick={() => navigate("/transfer")}
          className="flex-1 bg-ticket-blue hover:bg-ticket-darkBlue text-white"
        >
          Transfer
        </Button>
        <Button
          className="flex-1 bg-ticket-blue hover:bg-ticket-darkBlue text-white"
        >
          Sell
        </Button>
      </div>
    </Card>
  );
};

export default TicketPreview;
