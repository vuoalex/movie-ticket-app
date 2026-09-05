import { describe, test, expect } from 'vitest';
import request from 'supertest';
import app from '../src/app.js';

describe('POST /tickets', () => {
  test('creates a ticket and returns a code', async () => {
    const response = await request(app).post('/tickets');

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('code');
  });
});