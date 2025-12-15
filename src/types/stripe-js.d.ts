// Simple Stripe.js stub for TypeScript
declare module '@stripe/stripe-js' {
  interface Stripe {
    confirmPayment(options: any): Promise<any>;
    confirmCardPayment(clientSecret: string, options?: any): Promise<any>;
    createPaymentMethod(type: string, options?: any): Promise<any>;
  }

  export function loadStripe(publishableKey: string): Promise<Stripe | null>;
  export { Stripe };
}