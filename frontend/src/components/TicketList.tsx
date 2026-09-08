import { type Ticket } from '../api/tickets';

interface TicketListProps {
  tickets: Ticket[];
  onRedeem: (id: number) => void;
  onDelete: (id: number) => void;
}

function TicketList({ tickets, onRedeem, onDelete }: TicketListProps) {
  return (
    <ul>
      {tickets.map((ticket) => (
        <li key={ticket.id}>
          {ticket.code} — {ticket.is_redeemed ? 'Redeemed' : 'Unused'}
          {!ticket.is_redeemed && (
            <>
              <button onClick={() => onRedeem(ticket.id)}>Redeem</button>
              <button onClick={() => onDelete(ticket.id)}>Delete</button>
            </>
          )}
        </li>
      ))}
    </ul>
  );
}

export default TicketList;