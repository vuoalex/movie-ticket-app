import { useCallback, useEffect, useState } from 'react';
import { getTickets, type Ticket } from './api/tickets';
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

  return (
    <>
      <h1>Movie Tickets</h1>
      <CreateTicketButton onCreated={loadTickets} />
      <TicketList tickets={tickets} />
    </>
  );
}

export default App;