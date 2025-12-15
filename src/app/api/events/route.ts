import { NextRequest, NextResponse } from 'next/server';
import { DatabaseService } from '@/lib/database';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const brand = searchParams.get('brand');
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');
    const status = searchParams.get('status');
    const limit = searchParams.get('limit');

    const filters: any = {};

    if (brand && (brand === 'konnichiwa' || brand === 'namaste')) {
      filters.brand = brand;
    }
    if (category) {
      filters.category = category;
    }
    if (featured === 'true' || featured === 'false') {
      filters.featured = featured === 'true';
    }
    if (status) {
      filters.status = status;
    }
    if (limit) {
      filters.limit = parseInt(limit);
    }

    const events = await DatabaseService.getEvents(filters);

    return NextResponse.json({
      success: true,
      data: events,
      total: events.length
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch events' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      title,
      description,
      short_description,
      brand,
      date,
      time,
      location,
      venue,
      category,
      image,
      gallery,
      capacity,
      price_general,
      price_vip,
      price_student,
      organizer,
      highlights,
      requirements,
      included,
      tags,
      schedule,
      featured = false,
      status = 'upcoming'
    } = body;

    // Validate required fields
    if (!title || !description || !brand || !date || !time || !location || !category) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate brand
    if (!['konnichiwa', 'namaste'].includes(brand)) {
      return NextResponse.json(
        { success: false, error: 'Invalid brand' },
        { status: 400 }
      );
    }

    const newEvent = await DatabaseService.createEvent({
      title,
      description,
      short_description: short_description || '',
      brand,
      date,
      time,
      location,
      venue,
      category,
      image: image || '',
      gallery: gallery || [],
      capacity: capacity || 100,
      available_tickets: capacity || 100,
      price_general: price_general || 1500,
      price_vip: price_vip || 2500,
      price_student: price_student || 1000,
      organizer,
      highlights: highlights || [],
      requirements: requirements || '',
      included: included || [],
      tags: tags || [],
      schedule: schedule || [],
      featured,
      status
    });

    return NextResponse.json({
      success: true,
      data: newEvent,
      message: 'Event created successfully'
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to create event' },
      { status: 500 }
    );
  }
}
