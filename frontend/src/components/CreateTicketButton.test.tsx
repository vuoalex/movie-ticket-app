import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CreateTicketButton from './CreateTicketButton';

describe('CreateTicketButton', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('posts to the tickets endpoint when clicked', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      status: 201,
      json: async () => ({
        id: 1,
        code: 'A3F2-9B01-4C7D',
        is_redeemed: 0,
        redeemed_at: null,
        created_at: '2026-09-08 12:34:56',
      }),
    });
    vi.stubGlobal('fetch', fetchMock);

    render(<CreateTicketButton />);
    await userEvent.click(screen.getByRole('button', { name: /create ticket/i }));

    expect(fetchMock).toHaveBeenCalledWith(
      'http://localhost:3000/api/tickets',
      expect.objectContaining({ method: 'POST' }),
    );
  });
});