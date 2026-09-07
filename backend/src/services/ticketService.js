import db from "../config/db.js";
import { generateCode } from "../utils/ticketCode.js";

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

export function createTicket() {
  const code = generateUniqueCode();

  return db
    .prepare("INSERT INTO tickets (code) VALUES (?) RETURNING *")
    .get(code);
}
