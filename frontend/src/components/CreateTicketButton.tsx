import { createTicket } from '../api/tickets';

interface CreateTicketButtonProps {
  onCreated: () => void;
}

function CreateTicketButton({ onCreated }: CreateTicketButtonProps) {
  async function handleClick() {
    await createTicket();
    onCreated();
  }

  return <button onClick={handleClick}>Create ticket</button>;
}

export default CreateTicketButton;