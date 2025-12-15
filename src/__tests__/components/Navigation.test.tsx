import React from 'react';
import { render, screen } from '../utils/test-utils';
import { Navigation } from '@/components/layout/Navigation';

describe('Navigation', () => {
  it('renders navigation links', () => {
    render(<Navigation />);
    
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Events')).toBeInTheDocument();
    expect(screen.getByText('AI Assistant')).toBeInTheDocument();
  });

  it('displays brand logo', () => {
    render(<Navigation />);
    
    const logo = screen.getByRole('link', { name: /konnichiwa japan|namaste india/i });
    expect(logo).toBeInTheDocument();
  });
});
