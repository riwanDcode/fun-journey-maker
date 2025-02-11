
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import { Info } from "lucide-react";

interface TransferTicketsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  ticketCount: number;
  sec: string;
  row: string;
}

const TransferTicketsDialog = ({
  open,
  onOpenChange,
  ticketCount,
  sec,
  row,
}: TransferTicketsDialogProps) => {
  const navigate = useNavigate();
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);

  const handleSeatToggle = (seatNumber: number) => {
    setSelectedSeats((prev) =>
      prev.includes(seatNumber)
        ? prev.filter((seat) => seat !== seatNumber)
        : [...prev, seatNumber]
    );
  };

  const handleTransfer = () => {
    if (selectedSeats.length > 0) {
      navigate("/success");
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl text-center mb-4">
            SELECT TICKETS TO TRANSFER
          </AlertDialogTitle>
        </AlertDialogHeader>
        
        <div className="bg-gray-50 p-4 rounded-lg mb-4 flex items-start gap-3">
          <Info className="w-5 h-5 text-gray-600 mt-0.5" />
          <p className="text-sm text-gray-700">
            Only transfer tickets to people you know and trust to ensure everyone stays safe and socially distanced
          </p>
        </div>

        <div className="mb-4">
          <p className="text-gray-600 mb-2">
            Sec {sec}, Row {row}
            <span className="float-right">{ticketCount} tickets</span>
          </p>
          
          <div className="flex gap-2 mb-4">
            {Array.from({ length: ticketCount }, (_, i) => i + 1).map((seat) => (
              <div key={seat} className="flex flex-col items-center gap-2">
                <button
                  onClick={() => handleSeatToggle(seat)}
                  className={`px-4 py-2 rounded ${
                    selectedSeats.includes(seat)
                      ? "bg-[#007AFF] text-white"
                      : "bg-[#007AFF] text-white opacity-80 hover:opacity-100"
                  }`}
                >
                  SEAT {seat}
                </button>
                <div className="w-6 h-6 border rounded flex items-center justify-center">
                  {selectedSeats.includes(seat) && (
                    <div className="w-4 h-4 bg-[#007AFF] rounded-sm" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between border-t pt-4">
          <p className="font-medium">
            {selectedSeats.length} selected
          </p>
          <button
            onClick={handleTransfer}
            className={`text-[#007AFF] font-medium flex items-center gap-1 ${
              selectedSeats.length === 0 ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={selectedSeats.length === 0}
          >
            TRANSFER TO
            <span className="text-lg">›</span>
          </button>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default TransferTicketsDialog;
