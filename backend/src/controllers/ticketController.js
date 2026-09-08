import {
  createTicket,
  getAllTickets,
  getTicketById,
} from "../services/ticketService.js";

export function create(req, res) {
  const ticket = createTicket();
  res.status(201).json(ticket);
}

export function getAll(req, res) {
  const tickets = getAllTickets();
  res.status(200).json(tickets);
}

export function getById(req, res) {
  const ticket = getTicketById(req.params.id);

  if (!ticket) {
    return res.status(404).json({ error: "Ticket not found" });
  }

  res.json(ticket);
}
