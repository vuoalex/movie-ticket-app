import { createTicket, getAllTickets } from "../services/ticketService.js";

export function create(req, res) {
  const ticket = createTicket();
  res.status(201).json(ticket);
}

export function getAll(req, res) {
  const tickets = getAllTickets();
  res.status(200).json(tickets);
}
