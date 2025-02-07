
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const TransferForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    contact: "",
    note: "",
    ticketCount: 2,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase.from('transfers').insert([{
        first_name: formData.firstName,
        last_name: formData.lastName,
        contact: formData.contact,
        note: formData.note,
        quantity: formData.ticketCount,
      }]).select();

      if (error) throw error;
      navigate("/success");
    } catch (error) {
      console.error('Error creating transfer:', error);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-4 animate-fade-in">
      <div className="flex items-center mb-6">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="text-ticket-blue"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          BACK
        </Button>
      </div>

      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">TRANSFER TICKETS</h2>
        <p className="text-gray-600 mb-6 text-center">{formData.ticketCount} Tickets Selected</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="text-sm font-medium text-gray-700">First Name</label>
            <Input
              name="firstName"
              value={formData.firstName}
              onChange={(e) =>
                setFormData({ ...formData, firstName: e.target.value })
              }
              className="mt-1"
              placeholder="First Name"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Last Name</label>
            <Input
              name="lastName"
              value={formData.lastName}
              onChange={(e) =>
                setFormData({ ...formData, lastName: e.target.value })
              }
              className="mt-1"
              placeholder="Last Name"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              Email or Mobile Number
            </label>
            <Input
              name="contact"
              value={formData.contact}
              onChange={(e) =>
                setFormData({ ...formData, contact: e.target.value })
              }
              className="mt-1"
              placeholder="email@example.com"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Note</label>
            <Input
              name="note"
              value={formData.note}
              onChange={(e) => setFormData({ ...formData, note: e.target.value })}
              className="mt-1"
              placeholder="Add a note (optional)"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-ticket-blue hover:bg-ticket-darkBlue text-white py-3 rounded-lg transition-colors"
          >
            Transfer {formData.ticketCount} Tickets
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default TransferForm;
