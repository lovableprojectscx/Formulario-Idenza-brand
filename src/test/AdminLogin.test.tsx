import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AdminLogin } from '../components/admin/AdminLogin';

describe('AdminLogin component', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('renders login form and password input', () => {
    render(<AdminLogin onSuccess={() => {}} onCancel={() => {}} />);
    expect(screen.getByPlaceholderText(/Contraseña.../i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Ingresar al Panel/i })).toBeInTheDocument();
  });

  it('shows error on invalid password', async () => {
    const user = userEvent.setup();
    render(<AdminLogin onSuccess={() => {}} onCancel={() => {}} />);

    const input = screen.getByPlaceholderText(/Contraseña.../i);
    await user.type(input, 'WRONG_PASS');
    await user.click(screen.getByRole('button', { name: /Ingresar al Panel/i }));

    expect(screen.getByText(/Contraseña incorrecta/i)).toBeInTheDocument();
    expect(localStorage.getItem('denza_admin_auth')).toBeNull();
  });

  it('authenticates successfully with ADMIN1223 password', async () => {
    const user = userEvent.setup();
    const onSuccess = vi.fn();
    render(<AdminLogin onSuccess={onSuccess} onCancel={() => {}} />);

    const input = screen.getByPlaceholderText(/Contraseña.../i);
    await user.type(input, 'ADMIN1223');
    await user.click(screen.getByRole('button', { name: /Ingresar al Panel/i }));

    expect(onSuccess).toHaveBeenCalledTimes(1);
    expect(localStorage.getItem('denza_admin_auth')).toBe('true');
  });

  it('toggles password visibility with eye icon', async () => {
    const user = userEvent.setup();
    render(<AdminLogin onSuccess={() => {}} onCancel={() => {}} />);

    const input = screen.getByPlaceholderText(/Contraseña.../i) as HTMLInputElement;
    expect(input.type).toBe('password');

    // Click toggle button
    const toggleBtn = input.nextElementSibling as HTMLButtonElement;
    await user.click(toggleBtn);
    expect(input.type).toBe('text');

    await user.click(toggleBtn);
    expect(input.type).toBe('password');
  });
});
