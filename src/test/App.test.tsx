import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('App wizard flow and navigation', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('renders initial step 1 with header and Denza logo', () => {
    render(<App />);

    expect(screen.getByText(/Cuéntenos de su negocio para diseñar su marca/i)).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'El negocio' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Siguiente parte/i })).toBeInTheDocument();
  });

  it('navigates from Step 1 to Step 2 and back', async () => {
    const user = userEvent.setup();
    render(<App />);

    // Step 1 is active
    expect(screen.getByRole('heading', { name: 'El negocio' })).toBeInTheDocument();

    // Click next
    const nextBtn = screen.getByRole('button', { name: /Siguiente parte/i });
    await user.click(nextBtn);

    // Step 2 should now be visible
    expect(screen.getByRole('heading', { name: 'Sus clientes' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Anterior/i })).toBeInTheDocument();

    // Click prev
    const prevBtn = screen.getByRole('button', { name: /Anterior/i });
    await user.click(prevBtn);

    // Should be back to Step 1
    expect(screen.getByRole('heading', { name: 'El negocio' })).toBeInTheDocument();
  });

  it('opens Admin Login modal when clicking Acceso del equipo', async () => {
    const user = userEvent.setup();
    render(<App />);

    const adminButtons = screen.getAllByRole('button', { name: /Acceso del equipo/i });
    await user.click(adminButtons[0]);

    // Modal should be displayed
    expect(screen.getByRole('heading', { name: 'Panel de Recepción' })).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Contraseña.../i)).toBeInTheDocument();
  });
});
