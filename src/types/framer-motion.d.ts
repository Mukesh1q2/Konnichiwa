// Simple framer-motion stubs for TypeScript
declare module 'framer-motion' {
  import { ReactNode } from 'react';

  export const AnimatePresence: React.FC<{ 
    children: ReactNode;
    mode?: 'sync' | 'popLayout' | 'wait';
  }>;

  export const motion: {
    div: React.ComponentType<any>;
    span: React.ComponentType<any>;
    section: React.ComponentType<any>;
    article: React.ComponentType<any>;
    header: React.ComponentType<any>;
    footer: React.ComponentType<any>;
    nav: React.ComponentType<any>;
    main: React.ComponentType<any>;
    aside: React.ComponentType<any>;
    button: React.ComponentType<any>;
    img: React.ComponentType<any>;
    svg: React.ComponentType<any>;
    path: React.ComponentType<any>;
    circle: React.ComponentType<any>;
    rect: React.ComponentType<any>;
    g: React.ComponentType<any>;
  };

  export const useAnimation: () => {
    start: (definition: any) => Promise<any>;
    stop: () => void;
    set: (definition: any) => void;
  };

  export const useMotionValue: (initial: number) => {
    get: () => number;
    set: (v: number) => void;
    onChange: (fn: (v: number) => void) => () => void;
  };

  export const useTransform: (
    motionValue: any,
    inputRange: number[],
    outputRange: number[]
  ) => any;
}