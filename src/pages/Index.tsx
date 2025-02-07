
import TicketForm from "@/components/TicketForm";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-8">Create Ticket</h1>
        <TicketForm />
      </div>
    </div>
  );
};

export default Index;
