// Fixed payment processing integration
import Razorpay from 'razorpay';
import Stripe from 'stripe';
import { loadStripe } from '@stripe/stripe-js';
import * as paypal from '@paypal/checkout-server-sdk';
import { DatabaseService } from './database-compat';

// Payment configuration
const paymentConfig = {
  razorpay: {
    key_id: process.env.RAZORPAY_KEY_ID!,
    key_secret: process.env.RAZORPAY_KEY_SECRET!,
    webhook_secret: process.env.RAZORPAY_WEBHOOK_SECRET!
  },
  stripe: {
    secret_key: process.env.STRIPE_SECRET_KEY!,
    publishable_key: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
    webhook_secret: process.env.STRIPE_WEBHOOK_SECRET!
  },
  paypal: {
    client_id: process.env.PAYPAL_CLIENT_ID!,
    client_secret: process.env.PAYPAL_CLIENT_SECRET!,
    webhook_id: process.env.PAYPAL_WEBHOOK_ID!
  }
};

// Initialize payment gateways
const razorpay = new Razorpay({
  key_id: paymentConfig.razorpay.key_id,
  key_secret: paymentConfig.razorpay.key_secret,
});

// Fix Stripe API version to match installed SDK
const stripe = new Stripe(paymentConfig.stripe.secret_key, {
  apiVersion: '2023-10-16', // Updated to match installed SDK
});

// Initialize PayPal client
const environment = process.env.NODE_ENV === 'production'
  ? new paypal.core.LiveEnvironment(
    paymentConfig.paypal.client_id,
    paymentConfig.paypal.client_secret
  )
  : new paypal.core.SandboxEnvironment(
    paymentConfig.paypal.client_id,
    paymentConfig.paypal.client_secret
  );

const paypalClient = new paypal.core.PayPalHttpClient(environment);

export interface PaymentIntent {
  id: string;
  amount: number;
  currency: string;
  status: string;
  client_secret?: string;
  payment_method?: string;
  metadata?: Record<string, string>;
}

export interface PaymentResult {
  success: boolean;
  payment_id?: string;
  order_id?: string;
  transaction_id?: string;
  status?: string;
  error?: string;
  redirect_url?: string;
  client_secret?: string;
}

export class PaymentService {
  // Razorpay Integration
  static async createRazorpayOrder(
    amount: number,
    currency: string = 'INR',
    receipt: string,
    notes: Record<string, string> = {}
  ): Promise<{ order_id: string; amount: number; currency: string; key: string }> {
    try {
      const options = {
        amount: Math.round(amount * 100), // Razorpay expects amount in paise
        currency,
        receipt,
        notes,
      };

      const order = await razorpay.orders.create(options);

      return {
        order_id: order.id,
        amount: Number(order.amount), // Convert to number
        currency: order.currency,
        key: paymentConfig.razorpay.key_id
      };
    } catch (error) {
      console.error('Razorpay order creation failed:', error);
      throw new Error('Failed to create Razorpay order');
    }
  }

  static async verifyRazorpayPayment(
    order_id: string,
    payment_id: string,
    signature: string
  ): Promise<boolean> {
    try {
      const expected_signature = require('crypto')
        .createHmac('sha256', paymentConfig.razorpay.key_secret)
        .update(order_id + '|' + payment_id)
        .digest('hex');

      return expected_signature === signature;
    } catch (error) {
      console.error('Razorpay payment verification failed:', error);
      return false;
    }
  }

  // Stripe Integration
  static async createStripePaymentIntent(
    amount: number,
    currency: string = 'inr',
    metadata: Record<string, string> = {}
  ): Promise<PaymentIntent> {
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100), // Stripe expects amount in smallest currency unit (paise/cents)
        currency,
        metadata,
        automatic_payment_methods: {
          enabled: true,
        },
      });

      return {
        id: paymentIntent.id,
        amount: paymentIntent.amount,
        currency: paymentIntent.currency,
        status: paymentIntent.status,
        client_secret: paymentIntent.client_secret ?? undefined, // Fixed type
        metadata: paymentIntent.metadata,
      };
    } catch (error) {
      console.error('Stripe payment intent creation failed:', error);
      throw new Error('Failed to create Stripe payment intent');
    }
  }

  static async confirmStripePayment(payment_intent_id: string): Promise<boolean> {
    try {
      const paymentIntent = await stripe.paymentIntents.retrieve(payment_intent_id);
      return paymentIntent.status === 'succeeded';
    } catch (error) {
      console.error('Stripe payment confirmation failed:', error);
      return false;
    }
  }

  // PayPal Integration - Fixed with proper type handling
  static async createPayPalOrder(
    amount: number,
    currency: string = 'USD',
    description: string
  ): Promise<{ order_id: string; approve_url: string }> {
    try {
      const request = new (paypal.orders as any).CreateOrderRequest();
      // Fixed: Use type assertion for methods that don't exist in types
      (request as any).prefer("return=representation");
      request.requestBody({
        intent: 'CAPTURE',
        purchase_units: [{
          amount: {
            currency_code: currency,
            value: amount.toString()
          },
          description
        }]
      });

      const order = await paypalClient.execute(request);

      return {
        order_id: order.result.id,
        approve_url: order.result.links.find((link: any) => link.rel === 'approve')?.href
      };
    } catch (error) {
      console.error('PayPal order creation failed:', error);
      throw new Error('Failed to create PayPal order');
    }
  }

  static async capturePayPalOrder(order_id: string): Promise<PaymentResult> {
    try {
      const request = new (paypal.orders as any).CaptureOrderRequest(order_id);
      request.requestBody({});

      const capture = await paypalClient.execute(request);

      if (capture.result.status === 'COMPLETED') {
        return {
          success: true,
          payment_id: capture.result.id,
          transaction_id: capture.result.purchase_units[0].payments.captures[0].id,
          status: 'completed'
        };
      }

      return {
        success: false,
        error: 'Payment not completed'
      };
    } catch (error) {
      console.error('PayPal order capture failed:', error);
      return {
        success: false,
        error: 'Failed to capture PayPal payment'
      };
    }
  }

  // Universal payment processing
  static async processPayment(
    paymentMethod: 'razorpay' | 'stripe' | 'paypal',
    amount: number,
    currency: string,
    eventId: string,
    userId: string,
    ticketType: string,
    quantity: number,
    attendeeInfo: any[]
  ): Promise<PaymentResult> {
    try {
      const totalAmount = amount * quantity;
      const receipt = `receipt_${eventId}_${userId}_${Date.now()}`;

      let paymentResult: PaymentResult;

      switch (paymentMethod) {
        case 'razorpay':
          const razorpayOrder = await this.createRazorpayOrder(totalAmount, currency, receipt, {
            event_id: eventId,
            user_id: userId,
            ticket_type: ticketType,
            quantity: quantity.toString()
          });

          paymentResult = {
            success: true,
            order_id: razorpayOrder.order_id,
            redirect_url: `razorpay://payment?order_id=${razorpayOrder.order_id}`
          };
          break;

        case 'stripe':
          const stripeIntent = await this.createStripePaymentIntent(totalAmount, currency, {
            event_id: eventId,
            user_id: userId,
            ticket_type: ticketType,
            quantity: quantity.toString()
          });

          paymentResult = {
            success: true,
            payment_id: stripeIntent.id,
            status: stripeIntent.status,
            client_secret: stripeIntent.client_secret
          };
          break;

        case 'paypal':
          const paypalOrder = await this.createPayPalOrder(totalAmount, currency, `Event ${eventId} tickets`);

          paymentResult = {
            success: true,
            payment_id: paypalOrder.order_id,
            redirect_url: paypalOrder.approve_url
          };
          break;

        default:
          throw new Error('Unsupported payment method');
      }

      // Create pending ticket record using compatibility service
      try {
        await DatabaseService.createTicket({
          event_id: eventId,
          user_id: userId,
          type: ticketType as any,
          quantity,
          price: amount,
          total_price: totalAmount,
          status: 'pending',
          payment_id: paymentResult.payment_id || paymentResult.order_id,
          attendee_info: attendeeInfo
        });
      } catch (dbError) {
        console.warn('Database ticket creation failed, but payment order created:', dbError);
      }

      return paymentResult;
    } catch (error) {
      console.error('Payment processing failed:', error);
      return {
        success: false,
        error: 'Payment processing failed'
      };
    }
  }

  // Webhook handlers
  static async handleRazorpayWebhook(payload: any, signature: string): Promise<boolean> {
    try {
      const expected_signature = require('crypto')
        .createHmac('sha256', paymentConfig.razorpay.webhook_secret)
        .update(JSON.stringify(payload))
        .digest('hex');

      if (expected_signature !== signature) {
        console.warn('Invalid Razorpay webhook signature');
        return false;
      }

      const { event, payload: razorpayPayload } = payload;

      switch (event) {
        case 'payment.captured':
          await this.completeTicketPurchase(razorpayPayload.payment.entity.order_id);
          break;
        case 'payment.failed':
          await this.failTicketPurchase(razorpayPayload.payment.entity.order_id);
          break;
      }

      return true;
    } catch (error) {
      console.error('Razorpay webhook handling failed:', error);
      return false;
    }
  }

  static async handleStripeWebhook(payload: any, signature: string): Promise<boolean> {
    try {
      const stripeEvent = stripe.webhooks.constructEvent(
        payload,
        signature,
        paymentConfig.stripe.webhook_secret
      );

      switch (stripeEvent.type) {
        case 'payment_intent.succeeded':
          await this.completeTicketPurchase(stripeEvent.data.object.id);
          break;
        case 'payment_intent.payment_failed':
          await this.failTicketPurchase(stripeEvent.data.object.id);
          break;
      }

      return true;
    } catch (error) {
      console.error('Stripe webhook handling failed:', error);
      return false;
    }
  }

  static async handlePayPalWebhook(payload: any): Promise<boolean> {
    try {
      // Basic webhook validation - in production, implement proper signature verification
      // Note: PayPal webhook verification would require proper SDK support
      console.log('PayPal webhook received:', payload.webhook_event?.event_type);

      const event_type = payload.webhook_event?.event_type;

      switch (event_type) {
        case 'PAYMENT.CAPTURE.COMPLETED':
          await this.completeTicketPurchase(payload.webhook_event.resource.id);
          break;
        case 'PAYMENT.CAPTURE.DENIED':
          await this.failTicketPurchase(payload.webhook_event.resource.id);
          break;
      }

      return true;
    } catch (error) {
      console.error('PayPal webhook handling failed:', error);
      return false;
    }
  }

  // Helper methods for ticket status updates
  static async completeTicketPurchase(paymentId: string): Promise<void> {
    try {
      // Update ticket status to confirmed using compatibility service
      try {
        const tickets = await DatabaseService.getTickets({ status: 'pending' });
        const ticket = tickets.find(t => t.payment_id === paymentId);

        if (ticket) {
          await DatabaseService.updateTicket(ticket.id, { status: 'confirmed' });

          // Update event available tickets
          const event = await DatabaseService.getEventById(ticket.event_id);
          if (event) {
            await DatabaseService.updateEvent(event.id, {
              available_tickets: event.available_tickets - ticket.quantity
            });
          }
        }
      } catch (dbError) {
        console.warn('Database update failed, but webhook processed:', dbError);
      }
    } catch (error) {
      console.error('Ticket purchase completion failed:', error);
    }
  }

  static async failTicketPurchase(paymentId: string): Promise<void> {
    try {
      // Update ticket status to cancelled using compatibility service
      try {
        const tickets = await DatabaseService.getTickets({ status: 'pending' });
        const ticket = tickets.find(t => t.payment_id === paymentId);

        if (ticket) {
          await DatabaseService.updateTicket(ticket.id, { status: 'cancelled' });
        }
      } catch (dbError) {
        console.warn('Database update failed, but webhook processed:', dbError);
      }
    } catch (error) {
      console.error('Ticket purchase failure handling failed:', error);
    }
  }

  // Refund processing
  static async processRefund(
    paymentMethod: 'razorpay' | 'stripe' | 'paypal',
    paymentId: string,
    amount?: number,
    reason?: string
  ): Promise<{ success: boolean; refund_id?: string; error?: string }> {
    try {
      let refundResult;

      switch (paymentMethod) {
        case 'razorpay':
          refundResult = await razorpay.payments.refund(paymentId, {
            amount: amount ? amount * 100 : undefined,
            notes: { reason: reason || 'Event cancellation' }
          });
          break;

        case 'stripe':
          refundResult = await stripe.refunds.create({
            payment_intent: paymentId,
            amount: amount ? Math.round(amount * 100) : undefined,
            reason: 'requested_by_customer'
          });
          break;

        case 'paypal':
          // PayPal refund implementation would go here
          throw new Error('PayPal refund not yet implemented');
      }

      return {
        success: true,
        refund_id: refundResult.id
      };
    } catch (error) {
      console.error('Refund processing failed:', error);
      return {
        success: false,
        error: 'Refund processing failed'
      };
    }
  }
}

// Export payment configuration for client-side use
export const getClientPaymentConfig = () => ({
  stripe: {
    publishable_key: paymentConfig.stripe.publishable_key
  },
  razorpay: {
    key_id: paymentConfig.razorpay.key_id
  },
  paypal: {
    client_id: paymentConfig.paypal.client_id
  }
});