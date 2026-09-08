import { describe, test, expect, beforeEach } from "vitest";
import request from "supertest";
import app from "../src/app.js";
import db from "../src/config/db.js";

beforeEach(() => {
  if (process.env.DB_PATH !== ":memory:") {
    throw new Error("Tests must run on an in-memory database");
  }
  db.exec("DELETE FROM tickets");
});

describe("POST /api/tickets", () => {
  test("creates a ticket and returns a code", async () => {
    const response = await request(app).post("/api/tickets");

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("code");
    expect(response.body.code).toMatch(/^[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}$/);
  });
});

describe("GET /api/tickets", () => {
  test("returns an empty array when there are no tickets", async () => {
    const response = await request(app).get("/api/tickets");

    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  test("returns created tickets", async () => {
    await request(app).post("/api/tickets");
    await request(app).post("/api/tickets");

    const response = await request(app).get("/api/tickets");

    expect(response.body).toHaveLength(2);
  });
});

describe("GET /api/tickets/:id", () => {
  test("returns a ticket by id", async () => {
    const created = await request(app).post("/api/tickets");
    const { id } = created.body;

    const response = await request(app).get(`/api/tickets/${id}`);

    expect(response.status).toBe(200);
    expect(response.body.id).toBe(id);
  });

  test("returns 404 when the ticket does not exist", async () => {
    const response = await request(app).get("/api/tickets/999999");

    expect(response.status).toBe(404);
  });
});

describe("PATCH /api/tickets/:id/redeem", () => {
  test("redeems an unused ticket", async () => {
    const created = await request(app).post("/api/tickets");
    const { id } = created.body;

    const response = await request(app).patch(`/api/tickets/${id}/redeem`);

    expect(response.status).toBe(200);
    expect(response.body.is_redeemed).toBe(1);
    expect(response.body.redeemed_at).not.toBeNull();
  });

  test("returns 409 when the ticket is already redeemed", async () => {
    const created = await request(app).post("/api/tickets");
    const { id } = created.body;

    await request(app).patch(`/api/tickets/${id}/redeem`);
    const response = await request(app).patch(`/api/tickets/${id}/redeem`);

    expect(response.status).toBe(409);
  });

  test("returns 404 when the ticket does not exist", async () => {
    const response = await request(app).patch("/api/tickets/999999/redeem");

    expect(response.status).toBe(404);
  });
});