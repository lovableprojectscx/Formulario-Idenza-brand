import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { IdenzaLogo } from '../components/IdenzaLogo';

describe('IdenzaLogo component', () => {
  it('renders the brand wordmark idenza cleanly', () => {
    render(<IdenzaLogo />);
    expect(screen.getByText('denza')).toBeInTheDocument();
    expect(screen.getByText('i')).toBeInTheDocument();
  });

  it('renders with different sizes', () => {
    const { rerender } = render(<IdenzaLogo size="sm" />);
    expect(screen.getByText('denza')).toBeInTheDocument();

    rerender(<IdenzaLogo size="lg" />);
    expect(screen.getByText('denza')).toBeInTheDocument();
  });
});
