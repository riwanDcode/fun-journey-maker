
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { supabase } from "@/integrations/supabase/client";
import { format, parse } from "date-fns";

const TicketForm = () => {
  const navigate = useNavigate();
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.dateTime) {
      console.error('Date and time is required');
      return;
    }

    try {
      // Parse the formatted date back to ISO string for database storage
      const parsedDate = parse(formData.dateTime, "EEE MMM d, h:mm a", new Date());
      
      const { data, error } = await supabase.from('tickets').insert([{
        sec: formData.sec,
        row_number: formData.row,
        seat: formData.sit,
        title: formData.title,
        venue: formData.venue,
        date_time: parsedDate.toISOString(),
      }]).select();

      if (error) throw error;

      navigate("/preview", { state: formData });
    } catch (error) {
      console.error('Error creating ticket:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name === 'dateTime' && value) {
      // Convert the input datetime-local value to our desired format
      const date = new Date(value);
      const formattedDate = format(date, "EEE MMM d, h:mm a");
      setFormData({ ...formData, [name]: formattedDate });
    } else {
      setFormData({ ...formData, [name]: value });
    }
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
            placeholder="111"
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
            placeholder="11"
            required
          />
        </div>
        <div className="group">
          <label className="text-sm font-medium text-gray-700 group-hover:text-ticket-blue transition-colors">SIT</label>
          <Input
            name="sit"
            value={formData.sit}
            onChange={handleChange}
            className="mt-1 transition-all duration-300 hover:border-ticket-blue focus:ring-2 focus:ring-ticket-blue"
            placeholder="4"
            required
          />
        </div>
      </div>

      <div className="group">
        <label className="text-sm font-medium text-gray-700 group-hover:text-ticket-blue transition-colors">How many tickets?</label>
        <Input
          name="ticketCount"
          value={formData.ticketCount}
          onChange={handleChange}
          className="mt-1 transition-all duration-300 hover:border-ticket-blue focus:ring-2 focus:ring-ticket-blue"
          placeholder="3"
          required
        />
      </div>

      <div className="group">
        <label className="text-sm font-medium text-gray-700 group-hover:text-ticket-blue transition-colors">Other SIT (OPTIONAL)</label>
        <Input
          name="otherSit"
          value={formData.otherSit}
          onChange={handleChange}
          className="mt-1 transition-all duration-300 hover:border-ticket-blue focus:ring-2 focus:ring-ticket-blue"
        />
      </div>

      <div className="group">
        <label className="text-sm font-medium text-gray-700 group-hover:text-ticket-blue transition-colors">Title</label>
        <Input
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="mt-1 transition-all duration-300 hover:border-ticket-blue focus:ring-2 focus:ring-ticket-blue"
          placeholder="Concert Name"
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
          placeholder="Venue Name"
          required
        />
      </div>

      <div className="group">
        <label className="text-sm font-medium text-gray-700 group-hover:text-ticket-blue transition-colors">Date & Time</label>
        <Input
          name="dateTime"
          type="datetime-local"
          value={formData.dateTime}
          onChange={handleChange}
          className="mt-1 transition-all duration-300 hover:border-ticket-blue focus:ring-2 focus:ring-ticket-blue"
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
