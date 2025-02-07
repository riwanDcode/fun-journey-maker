
import { useLocation } from "react-router-dom";
import TicketPreview from "@/components/TicketPreview";

const Preview = () => {
  const location = useLocation();
  const ticketData = location.state;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <TicketPreview ticketData={ticketData} />
    </div>
  );
};

export default Preview;
