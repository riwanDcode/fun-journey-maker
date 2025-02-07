
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

  const images = [
    "/lovable-uploads/eff634fc-bc01-4e98-abe0-e0835f2f6494.png",
    "/lovable-uploads/4797d1cc-167a-4abc-89b8-103acc55c78e.png",
    "/lovable-uploads/8b3d6153-ba2d-4bd6-ae91-7058dc827e23.png"
  ];

  return (
    <Card className="w-full max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden animate-fade-in hover:shadow-xl transition-all duration-300">
      <Carousel className="w-full">
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index}>
              <div className="relative aspect-[4/3] w-full overflow-hidden group">
                <img
                  src={image}
                  alt={`Justin Timberlake ${index + 1}`}
                  className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-2 hover:bg-ticket-blue hover:text-white transition-colors" />
        <CarouselNext className="right-2 hover:bg-ticket-blue hover:text-white transition-colors" />
      </Carousel>

      <div className="bg-ticket-blue text-white p-4 transition-colors duration-300 hover:bg-ticket-darkBlue">
        <h2 className="text-xl font-semibold text-center">Standard Ticket</h2>
        <div className="grid grid-cols-3 gap-4 mt-2 text-center">
          <div className="hover:transform hover:scale-105 transition-transform duration-300">
            <p className="text-sm opacity-80">SEC</p>
            <p className="font-bold">{ticketData.sec}</p>
          </div>
          <div className="hover:transform hover:scale-105 transition-transform duration-300">
            <p className="text-sm opacity-80">ROW</p>
            <p className="font-bold">{ticketData.row}</p>
          </div>
          <div className="hover:transform hover:scale-105 transition-transform duration-300">
            <p className="text-sm opacity-80">SEAT</p>
            <p className="font-bold">{ticketData.sit}</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 hover:text-ticket-blue transition-colors">{ticketData.title}</h3>
        <p className="text-gray-600 mb-4 hover:text-ticket-blue transition-colors">{ticketData.venue}</p>
        <p className="text-gray-600 mb-6 hover:text-ticket-blue transition-colors">{new Date(ticketData.dateTime).toLocaleString()}</p>
        
        <div className="border-t border-gray-200 pt-4">
          <div className="bg-gray-100 p-4 rounded-lg flex flex-col items-center hover:bg-gray-200 transition-colors duration-300">
            <div className="w-full h-16 bg-gradient-to-r from-gray-800 to-gray-900 mb-2 rounded"></div>
            <p className="text-sm text-gray-500">Scan barcode at venue</p>
          </div>
        </div>
      </div>

      <div className="p-4 border-t border-gray-200 flex gap-4">
        <Button
          onClick={() => navigate("/transfer")}
          className="flex-1 bg-ticket-blue hover:bg-ticket-darkBlue text-white transform transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
        >
          Transfer
        </Button>
        <Button
          className="flex-1 bg-ticket-blue hover:bg-ticket-darkBlue text-white transform transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
        >
          Sell
        </Button>
      </div>
    </Card>
  );
};

export default TicketPreview;
