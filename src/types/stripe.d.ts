// Simple Stripe stub for TypeScript
declare module 'stripe' {
  interface StripeConfig {
    apiVersion?: string;
  }

  interface StripePaymentIntent {
    amount: number;
    currency: string;
    metadata?: Record<string, string>;
    description?: string;
  }

  class Stripe {
    constructor(apiKey: string, config?: StripeConfig);
    paymentIntents: {
      create(data: StripePaymentIntent): Promise<any>;
      retrieve(id: string): Promise<any>;
      update(id: string, data: Partial<StripePaymentIntent>): Promise<any>;
    };
    webhooks: {
      constructEvent(body: string, signature: string, endpointSecret: string): any;
    };
  }
}

export = Stripe;