import { type Ticket } from '../api/tickets';

interface TicketListProps {
  tickets: Ticket[];
  onRedeem: (id: number) => void;
  onDelete: (id: number) => void;
}

function TicketList({ tickets, onRedeem, onDelete }: TicketListProps) {
  const unused = tickets.filter((ticket) => !ticket.is_redeemed);
  const redeemed = tickets.filter((ticket) => ticket.is_redeemed);

  return (
    <>
      <section>
        <h2>Unused</h2>
        {unused.length === 0 ? (
          <p className="empty">No unused tickets.</p>
        ) : (
          <ul>
            {unused.map((ticket) => (
              <li key={ticket.id} className="ticket">
                <code>{ticket.code}</code>
                <button onClick={() => onRedeem(ticket.id)}>Redeem</button>
                <button onClick={() => onDelete(ticket.id)}>Delete</button>
              </li>
            ))}
          </ul>
        )}
      </section>

      {redeemed.length > 0 && (
        <section>
          <h2>Redeemed</h2>
          <ul>
            {redeemed.map((ticket) => (
              <li key={ticket.id} className="ticket redeemed">
                <code>{ticket.code}</code>
                <span className="status">
                  Redeemed {ticket.redeemed_at?.slice(0, 10)}
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
}

export default TicketList;