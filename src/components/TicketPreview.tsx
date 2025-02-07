
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
    "https://asset.cloudinary.com/del59phog/01a7224285dd52a09cbb8d2fce3c9518",
    "https://asset.cloudinary.com/del59phog/32694d3b68aeb490010beb1420f2aa3f",
    "https://asset.cloudinary.com/del59phog/06ba239f573b08c6fbb97797f4e6d065",
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
                  alt={`Justin Timberlake ${index + 1}`}
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
