// Simple testing library stubs for TypeScript
declare module '@testing-library/react' {
  import { ReactNode, ReactElement } from 'react';

  interface RenderOptions {
    wrapper?: React.ComponentType<{ children: ReactNode }>;
    [key: string]: any;
  }

  interface Screen {
    getByText(text: string): HTMLElement;
    queryByText(text: string): HTMLElement | null;
    getByRole(role: string, options?: { name: string | RegExp }): HTMLElement;
  }

  function render(
    element: ReactElement,
    options?: RenderOptions
  ): {
    unmount(): void;
    container: HTMLElement;
    debug(element?: HTMLElement | DocumentFragment): void;
    rerender(element: ReactElement): void;
  };

  function render(
    element: ReactElement,
    options: RenderOptions
  ): {
    unmount(): void;
    container: HTMLElement;
    debug(element?: HTMLElement | DocumentFragment): void;
    rerender(element: ReactElement): void;
  };

  const screen: Screen;

  export { render, screen };
}

declare const expect: {
  (value: any): {
    toBeInTheDocument(): void;
    toHaveClass(className: string): void;
    toBeVisible(): void;
    toBeDisabled(): void;
    toHaveTextContent(text: string): void;
    toBe(value: any): void;
    toEqual(value: any): void;
    toHaveLength(length: number): void;
    toContain(item: any): void;
  };
};

declare const describe: (name: string, fn: () => void) => void;
declare const it: (name: string, fn: () => void | Promise<void>) => void;
declare const test: (name: string, fn: () => void | Promise<void>) => void;

export { expect, describe, it, test };