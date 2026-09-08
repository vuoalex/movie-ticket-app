import { type Ticket } from '../api/tickets';

interface TicketListProps {
  tickets: Ticket[];
}

function TicketList({ tickets }: TicketListProps) {
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