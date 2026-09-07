import { createTicket } from "../services/ticketService.js";

export function create(req, res) {
  const ticket = createTicket();
  res.status(201).json(ticket);
}
