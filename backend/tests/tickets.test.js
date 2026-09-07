import { describe, test, expect } from 'vitest';
import request from 'supertest';
import app from '../src/app.js';

describe('POST /api/tickets', () => {
  test('creates a ticket and returns a code', async () => {
    const response = await request(app).post('/api/tickets');

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('code');
  });
});