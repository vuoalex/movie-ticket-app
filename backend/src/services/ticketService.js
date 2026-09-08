import db from "../config/db.js";
import { generateCode } from "../utils/ticketCode.js";

export function createTicket() {
  const code = generateUniqueCode();

  return db
    .prepare("INSERT INTO tickets (code) VALUES (?) RETURNING *")
    .get(code);
}

export function getAllTickets() {
  return db.prepare("SELECT * FROM tickets").all();
}

export function getTicketById(id) {
  return db.prepare("SELECT * FROM tickets WHERE id = ?").get(id);
}

export function redeemTicket(id) {
  const ticket = getTicketById(id);

  if (!ticket) {
    return { error: "NOT_FOUND" };
  }

  if (ticket.is_redeemed) {
    return { error: "ALREADY_REDEEMED" };
  }

  const updated = db
    .prepare(
      `UPDATE tickets
       SET is_redeemed = 1, redeemed_at = datetime('now')
       WHERE id = ?
       RETURNING *`,
    )
    .get(id);

  return { ticket: updated };
}

// ----- Helpers -----

function codeExists(code) {
  return (
    db.prepare("SELECT id FROM tickets WHERE code = ?").get(code) !== undefined
  );
}

function generateUniqueCode() {
  const maxAttempts = 100;

  for (let i = 0; i < maxAttempts; i++) {
    const code = generateCode();

    if (!codeExists(code)) {
      return code;
    }
  }

  throw new Error("Could not generate a unique ticket code");
}
