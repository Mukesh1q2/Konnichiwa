// Simple PayPal SDK stub for TypeScript
declare module '@paypal/checkout-server-sdk' {
  namespace core {
    class PayPalHttpClient {
      constructor(environment: any);
      execute(request: any): Promise<any>;
    }

    class LiveEnvironment {
      constructor(clientId: string, clientSecret: string);
    }

    class SandboxEnvironment {
      constructor(clientId: string, clientSecret: string);
    }
  }

  namespace orders {
    class CreateOrderRequest {
      constructor();
      requestBody(data: any): void;
    }

    class CaptureOrderRequest {
      constructor(orderId: string);
      requestBody(data?: any): void;
    }
  }

  const paypal: {
    core: typeof core;
    orders: typeof orders;
  };

  export = paypal;
}