
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { supabase } from "@/integrations/supabase/client";

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
    try {
      const { data, error } = await supabase.from('tickets').insert([{
        sec: formData.sec,
        row_number: formData.row,
        seat: formData.sit,
        title: formData.title,
        venue: formData.venue,
        date_time: formData.dateTime,
      }]).select();

      if (error) throw error;

      navigate("/preview", { state: formData });
    } catch (error) {
      console.error('Error creating ticket:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-md mx-auto p-6 animate-fade-in">
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="text-sm font-medium text-gray-700">SEC</label>
          <Input
            name="sec"
            value={formData.sec}
            onChange={handleChange}
            className="mt-1"
            placeholder="111"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700">ROW</label>
          <Input
            name="row"
            value={formData.row}
            onChange={handleChange}
            className="mt-1"
            placeholder="11"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700">SIT</label>
          <Input
            name="sit"
            value={formData.sit}
            onChange={handleChange}
            className="mt-1"
            placeholder="4"
          />
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700">how many tickets?</label>
        <Input
          name="ticketCount"
          value={formData.ticketCount}
          onChange={handleChange}
          className="mt-1"
          placeholder="3"
        />
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700">Other SIT (OPTIONAL)</label>
        <Input
          name="otherSit"
          value={formData.otherSit}
          onChange={handleChange}
          className="mt-1"
        />
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700">Title</label>
        <Input
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="mt-1"
          placeholder="Concert Name"
        />
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700">Venue</label>
        <Input
          name="venue"
          value={formData.venue}
          onChange={handleChange}
          className="mt-1"
          placeholder="Venue Name"
        />
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700">Date & Time</label>
        <Input
          name="dateTime"
          type="datetime-local"
          value={formData.dateTime}
          onChange={handleChange}
          className="mt-1"
        />
      </div>

      <Button
        type="submit"
        className="w-full bg-ticket-blue hover:bg-ticket-darkBlue text-white py-3 rounded-lg transition-colors"
      >
        Create
      </Button>
    </form>
  );
};

export default TicketForm;
