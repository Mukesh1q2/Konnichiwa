// Simple Razorpay stub for TypeScript
declare module 'razorpay' {
  interface RazorpayConfig {
    key_id: string;
    key_secret: string;
  }

  interface RazorpayOrder {
    amount: number;
    currency: string;
    receipt?: string;
    notes?: Record<string, any>;
  }

  interface RazorpayPayment {
    amount: number;
    currency: string;
    receipt?: string;
    notes?: Record<string, any>;
    email?: string;
    contact?: string;
  }

  class Razorpay {
    constructor(config: RazorpayConfig);
    orders: {
      create(data: RazorpayOrder): Promise<any>;
      fetch(order_id: string): Promise<any>;
    };
    payments: {
      capture(payment_id: string, amount: number, currency: string): Promise<any>;
      fetch(payment_id: string): Promise<any>;
    };
  }
}

export = Razorpay;