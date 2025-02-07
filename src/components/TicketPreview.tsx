
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

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

  return (
    <Card className="w-full max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden animate-fade-in">
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
        <p className="text-gray-600">{new Date(ticketData.dateTime).toLocaleString()}</p>
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
