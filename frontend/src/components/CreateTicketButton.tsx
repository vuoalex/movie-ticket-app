import { createTicket } from '../api/tickets';

function CreateTicketButton() {
  async function handleClick() {
    await createTicket();
  }

  return <button onClick={handleClick}>Create ticket</button>;
}

export default CreateTicketButton;