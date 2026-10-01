import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Step1Business } from '../components/steps/Step1Business';
import { Step2Clients } from '../components/steps/Step2Clients';
import { Step4Personality } from '../components/steps/Step4Personality';
import { Step7Contact } from '../components/steps/Step7Contact';
import { INITIAL_BRIEFING_DATA } from '../types/briefing';

describe('Form Step Components', () => {
  it('Step1: updates business name and toggles products sold', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Step1Business data={INITIAL_BRIEFING_DATA} onChange={onChange} />);

    // Check title
    expect(screen.getByText('El negocio')).toBeInTheDocument();

    // Type business name
    const input = screen.getByPlaceholderText(/Ej. Industrias Metálicas Denza/i);
    await user.type(input, 'Taller Metal');
    expect(onChange).toHaveBeenCalled();

    // Click product
    const productBtn = screen.getByRole('button', { name: /Escritorios/i });
    await user.click(productBtn);
    expect(onChange).toHaveBeenCalledWith({ products_sold: ['Escritorios'] });
  });

  it('Step2: updates pricing comparison and target clients', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Step2Clients data={INITIAL_BRIEFING_DATA} onChange={onChange} />);

    expect(screen.getByText('Sus clientes')).toBeInTheDocument();

    // Click client
    const clientBtn = screen.getByRole('button', { name: /Empresas y oficinas/i });
    await user.click(clientBtn);
    expect(onChange).toHaveBeenCalledWith({ target_clients: ['Empresas y oficinas'] });

    // Click pricing
    const pricingBtn = screen.getByRole('button', { name: /Más caros, mejor calidad/i });
    await user.click(pricingBtn);
    expect(onChange).toHaveBeenCalledWith({ pricing_comparison: 'Más caros, mejor calidad' });
  });

  it('Step4: renders personality traits sliders and words input', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Step4Personality data={INITIAL_BRIEFING_DATA} onChange={onChange} />);

    expect(screen.getByText('La personalidad')).toBeInTheDocument();
    expect(screen.getByText('Tradicional')).toBeInTheDocument();
    expect(screen.getByText('Moderno')).toBeInTheDocument();

    const wordsInput = screen.getByPlaceholderText(/Ej. Resistente, puntual, serio/i);
    await user.type(wordsInput, 'Solidez');
    expect(onChange).toHaveBeenCalled();
  });

  it('Step7: requires contact name and whatsapp before submission', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    const onChange = vi.fn();

    render(
      <Step7Contact
        data={INITIAL_BRIEFING_DATA}
        onChange={onChange}
        onSubmit={onSubmit}
        isSubmitting={false}
        submitError="Por favor ingrese su nombre para identificar sus respuestas."
      />
    );

    expect(screen.getByText('Sus datos')).toBeInTheDocument();
    expect(screen.getByText(/Por favor ingrese su nombre/i)).toBeInTheDocument();

    const submitBtn = screen.getByRole('button', { name: /Terminar y enviar mis respuestas/i });
    await user.click(submitBtn);
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });
});
