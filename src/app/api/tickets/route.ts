import { NextRequest, NextResponse } from 'next/server';
import { DatabaseService } from '@/lib/database';
import { PaymentService } from '@/lib/payment-service-fixed';
import { AuthService } from '@/lib/auth-service';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const eventId = searchParams.get('eventId');
    const status = searchParams.get('status');

    // Get tickets from database
    const filters: any = {};
    if (userId) filters.userId = userId;
    if (eventId) filters.eventId = eventId;
    if (status) filters.status = status;

    const tickets = await DatabaseService.getTickets(filters);

    return NextResponse.json({
      success: true,
      data: tickets,
      total: tickets.length
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch tickets' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      eventId,
      userId,
      type,
      quantity,
      attendeeInfo,
      paymentMethod = 'razorpay',
      currency = 'INR'
    } = body;

    // Validate required fields
    if (!eventId || !userId || !type || !quantity || !attendeeInfo) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate payment method
    const validPaymentMethods = ['razorpay', 'stripe', 'paypal'];
    if (!validPaymentMethods.includes(paymentMethod)) {
      return NextResponse.json(
        { success: false, error: 'Invalid payment method' },
        { status: 400 }
      );
    }

    // Get event details to calculate price
    const event = await DatabaseService.getEventById(eventId);
    if (!event) {
      return NextResponse.json(
        { success: false, error: 'Event not found' },
        { status: 404 }
      );
    }

    // Check availability
    if (event.available_tickets < quantity) {
      return NextResponse.json(
        { success: false, error: 'Insufficient tickets available' },
        { status: 400 }
      );
    }

    // Get ticket price based on type
    const ticketPrices = {
      general: event.price_general,
      vip: event.price_vip,
      student: event.price_student
    };

    const price = ticketPrices[type as keyof typeof ticketPrices] || event.price_general;
    const totalPrice = price * quantity;

    // Process payment through payment service
    const paymentResult = await PaymentService.processPayment(
      paymentMethod as 'razorpay' | 'stripe' | 'paypal',
      totalPrice,
      currency,
      eventId,
      userId,
      type,
      quantity,
      attendeeInfo
    );

    if (!paymentResult.success) {
      return NextResponse.json(
        { success: false, error: paymentResult.error || 'Payment processing failed' },
        { status: 400 }
      );
    }

    // Return payment details for client-side processing
    return NextResponse.json({
      success: true,
      data: {
        ticket_id: `TKT-${Date.now()}`,
        event_id: eventId,
        user_id: userId,
        type,
        quantity,
        price,
        total_price: totalPrice,
        currency,
        payment_method: paymentMethod,
        payment_details: paymentResult
      },
      message: 'Payment initiated successfully'
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to create ticket' },
      { status: 500 }
    );
  }
}