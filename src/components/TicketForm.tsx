import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { supabase } from "@/integrations/supabase/client";
import { parse } from "date-fns";
import { useToast } from "./ui/use-toast";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";

const TicketForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [formData, setFormData] = useState({
    sec: "",
    row: "",
    sit: "",
    ticketCount: "",
    otherSit: "",
    title: "",
    venue: "",
    imageUrl: "",
    dateTime: "",
  });

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    if (date) {
      const formattedDate = format(date, 'EEE, MMM d h:mm a');
      setFormData(prev => ({ ...prev, dateTime: formattedDate }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.dateTime) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Date and time is required",
      });
      return;
    }

    try {
      // Parse the input date string with error handling
      let parsedDate;
      try {
        parsedDate = parse(formData.dateTime, 'EEE, MMM d h:mm a', new Date());
        if (isNaN(parsedDate.getTime())) {
          throw new Error('Invalid date format');
        }
      } catch (dateError) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Please enter date in format: Mon, Feb 03 7:30 PM",
        });
        return;
      }

      const formattedDate = parsedDate.toISOString();

      const { error } = await supabase.from('tickets').insert([{
        sec: formData.sec,
        row_number: formData.row,
        seat: formData.sit,
        title: formData.title,
        venue: formData.venue,
        date_time: formattedDate,
      }]);

      if (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to create ticket. Please try again.",
        });
        return;
      }

      // If successful, navigate to preview
      navigate("/preview", { state: formData });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
      });
      console.error('Error creating ticket:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl animate-fade-in">
      <div className="grid grid-cols-3 gap-4">
        <div className="group">
          <label className="text-sm font-medium text-gray-700 group-hover:text-ticket-blue transition-colors">SEC</label>
          <Input
            name="sec"
            value={formData.sec}
            onChange={handleChange}
            className="mt-1 transition-all duration-300 hover:border-ticket-blue focus:ring-2 focus:ring-ticket-blue"
            placeholder="GA Floor"
            required
          />
        </div>
        <div className="group">
          <label className="text-sm font-medium text-gray-700 group-hover:text-ticket-blue transition-colors">ROW</label>
          <Input
            name="row"
            value={formData.row}
            onChange={handleChange}
            className="mt-1 transition-all duration-300 hover:border-ticket-blue focus:ring-2 focus:ring-ticket-blue"
            placeholder="GA"
            required
          />
        </div>
        <div className="group">
          <label className="text-sm font-medium text-gray-700 group-hover:text-ticket-blue transition-colors">SEAT</label>
          <Input
            name="sit"
            value={formData.sit}
            onChange={handleChange}
            className="mt-1 transition-all duration-300 hover:border-ticket-blue focus:ring-2 focus:ring-ticket-blue"
            placeholder="-"
            required
          />
        </div>
      </div>

      <div className="group">
        <label className="text-sm font-medium text-gray-700 group-hover:text-ticket-blue transition-colors">Title</label>
        <Input
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="mt-1 transition-all duration-300 hover:border-ticket-blue focus:ring-2 focus:ring-ticket-blue"
          placeholder="Justin Timberlake - Forget Tomorrow World Tour"
          required
        />
      </div>

      <div className="group">
        <label className="text-sm font-medium text-gray-700 group-hover:text-ticket-blue transition-colors">Venue</label>
        <Input
          name="venue"
          value={formData.venue}
          onChange={handleChange}
          className="mt-1 transition-all duration-300 hover:border-ticket-blue focus:ring-2 focus:ring-ticket-blue"
          placeholder="Moody Center - Austin"
          required
        />
      </div>

      <div className="group">
        <label className="text-sm font-medium text-gray-700 group-hover:text-ticket-blue transition-colors">Image URL</label>
        <Input
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleChange}
          className="mt-1 transition-all duration-300 hover:border-ticket-blue focus:ring-2 focus:ring-ticket-blue"
          placeholder="https://example.com/image.jpg"
        />
      </div>

      <div className="group flex flex-col">
        <label className="text-sm font-medium text-gray-700 group-hover:text-ticket-blue transition-colors mb-1">
          Date & Time
        </label>
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          showTimeSelect
          dateFormat="EEE, MMM d h:mm aa"
          placeholderText="Mon, Feb 03 7:30 PM"
          className="w-full p-2 border rounded-md transition-all duration-300 hover:border-ticket-blue focus:ring-2 focus:ring-ticket-blue"
          required
        />
      </div>

      <Button
        type="submit"
        className="w-full bg-ticket-blue hover:bg-ticket-darkBlue text-white py-3 rounded-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
      >
        Create
      </Button>
    </form>
  );
};

export default TicketForm;
