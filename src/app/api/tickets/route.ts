import { NextRequest, NextResponse } from 'next/server';
import { DatabaseService } from '@/lib/database';
import { AuthService } from '@/lib/auth-service';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

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
  return NextResponse.json(
    { success: false, error: 'Ticket booking is currently unavailable. Please check back later.' },
    { status: 503 }
  );
}
