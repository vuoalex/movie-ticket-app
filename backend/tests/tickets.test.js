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
