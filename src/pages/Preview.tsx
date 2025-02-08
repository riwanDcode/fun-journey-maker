
import { useLocation, Navigate } from "react-router-dom";
import TicketPreview from "@/components/TicketPreview";

const Preview = () => {
  const location = useLocation();
  const ticketData = location.state;

  // Redirect to home if no ticket data is present
  if (!ticketData) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <TicketPreview ticketData={ticketData} />
    </div>
  );
};

export default Preview;
