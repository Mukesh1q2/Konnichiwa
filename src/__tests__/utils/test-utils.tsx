import React from 'react';
import { render, RenderOptions, screen } from '@testing-library/react';
import { BrandProvider } from '@/lib/brand-context';
import { AuthProvider } from '@/lib/auth-context';

const AllTheProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <BrandProvider>
      <AuthProvider>
        {children}
      </AuthProvider>
    </BrandProvider>
  );
};

const customRender = (ui: React.ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render, screen };