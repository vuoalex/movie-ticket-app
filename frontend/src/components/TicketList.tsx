import { useEffect, useState } from 'react';
import { getTickets, type Ticket } from '../api/tickets';

function TicketList() {
  const [tickets, setTickets] = useState<Ticket[]>([]);

  useEffect(() => {
    getTickets().then(setTickets);
  }, []);

  return (
    <ul>
      {tickets.map((ticket) => (
        <li key={ticket.id}>
          {ticket.code} — {ticket.is_redeemed ? 'Redeemed' : 'Unused'}
        </li>
      ))}
    </ul>
  );
}

export default TicketList;