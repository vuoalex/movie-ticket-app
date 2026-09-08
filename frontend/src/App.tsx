import { useCallback, useEffect, useState } from 'react';
import {
  deleteTicket,
  getTickets,
  redeemTicket,
  type Ticket,
} from './api/tickets';
import CreateTicketButton from './components/CreateTicketButton';
import TicketList from './components/TicketList';

function App() {
  const [tickets, setTickets] = useState<Ticket[]>([]);

  const loadTickets = useCallback(async () => {
    setTickets(await getTickets());
  }, []);

  useEffect(() => {
    loadTickets();
  }, [loadTickets]);

  async function handleRedeem(id: number) {
    await redeemTicket(id);
    loadTickets();
  }

  async function handleDelete(id: number) {
    await deleteTicket(id);
    loadTickets();
  }

  return (
    <>
      <h1>Movie Tickets</h1>
      <CreateTicketButton onCreated={loadTickets} />
      <TicketList
        tickets={tickets}
        onRedeem={handleRedeem}
        onDelete={handleDelete}
      />
    </>
  );
}

export default App;