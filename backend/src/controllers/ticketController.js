import {
  createTicket,
  getAllTickets,
  getTicketById,
  redeemTicket,
  deleteTicket,
} from "../services/ticketService.js";
import { AppError } from "../utils/AppError.js";

export function create(req, res) {
  res.status(201).json(createTicket());
}

export function getAll(req, res) {
  res.json(getAllTickets());
}

export function getById(req, res) {
  const ticket = getTicketById(req.params.id);

  if (!ticket) throw new AppError("Ticket not found", 404);

  res.json(ticket);
}

export function redeem(req, res) {
  res.json(redeemTicket(req.params.id));
}

export function remove(req, res) {
  deleteTicket(req.params.id);
  res.status(204).end();
}
