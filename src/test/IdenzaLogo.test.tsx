import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { IdenzaLogo } from '../components/IdenzaLogo';

describe('IdenzaLogo component', () => {
  it('renders the brand wordmark idenza', () => {
    render(<IdenzaLogo />);
    expect(screen.getByText('denza')).toBeInTheDocument();
    expect(screen.getByText('i')).toBeInTheDocument();
  });

  it('renders tagline when showTagline is true', () => {
    render(<IdenzaLogo showTagline={true} />);
    expect(screen.getByText(/Demanda real antes que diseño/i)).toBeInTheDocument();
  });

  it('hides tagline when showTagline is false', () => {
    render(<IdenzaLogo showTagline={false} />);
    expect(screen.queryByText(/Demanda real antes que diseño/i)).not.toBeInTheDocument();
  });
});
