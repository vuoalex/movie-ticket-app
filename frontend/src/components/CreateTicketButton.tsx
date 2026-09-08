const API_URL = 'http://localhost:3000/api/tickets';

function CreateTicketButton() {
  async function handleClick() {
    await fetch(API_URL, { method: 'POST' });
  }

  return <button onClick={handleClick}>Create ticket</button>;
}

export default CreateTicketButton;