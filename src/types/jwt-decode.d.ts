// Simple JWT decode stub for TypeScript
declare module 'jwt-decode' {
  interface JwtPayload {
    exp?: number;
    iat?: number;
    sub?: string;
    [key: string]: any;
  }

  export function jwtDecode(token: string): JwtPayload;
}