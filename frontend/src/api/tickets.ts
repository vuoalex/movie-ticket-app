const API_URL = `${import.meta.env.VITE_API_URL}/tickets`;

export interface Ticket {
  id: number;
  code: string;
  is_redeemed: 0 | 1;
  redeemed_at: string | null;
  created_at: string;
}

export async function createTicket(): Promise<Ticket> {
  const response = await fetch(API_URL, { method: 'POST' });

  if (!response.ok) {
    throw new Error('Failed to create ticket');
  }

  return response.json();
}

export async function getTickets(): Promise<Ticket[]> {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error('Failed to fetch tickets');
  }

  return response.json();
}