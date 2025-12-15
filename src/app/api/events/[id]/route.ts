import { NextRequest, NextResponse } from 'next/server';

// This would typically come from a database
const mockEvents = [
  {
    id: '1',
    title: 'Traditional Japanese Tea Ceremony',
    brand: 'konnichiwa',
    description: 'Experience the authentic Japanese tea ceremony with Master Takahashi. Learn about the philosophy, techniques, and cultural significance of this ancient art.',
    shortDescription: 'Learn the art of Japanese tea ceremony from a master',
    date: '2025-01-15',
    time: '10:00 AM - 12:00 PM',
    location: 'Cultural Center, New Delhi',
    venue: 'Cultural Center, Tokyo Plaza, Connaught Place, New Delhi - 110001',
    category: 'Traditional Arts',
    image: '/images/japan-tea-ceremony.jpg',
    gallery: [
      '/images/gallery/tea-ceremony-1.jpg',
      '/images/gallery/tea-ceremony-2.jpg',
      '/images/gallery/tea-ceremony-3.jpg'
    ],
    capacity: 50,
    availableTickets: 35,
    price: {
      general: 1500,
      vip: 2500,
      student: 1000
    },
    featured: true,
    status: 'upcoming',
    organizer: {
      name: 'Master Takahashi',
      bio: 'Certified tea ceremony master with 30 years of experience',
      image: '/images/organizers/takahashi.jpg',
      email: 'takahashi@konnichiwa-india.com',
      phone: '+91-98765-43210'
    },
    highlights: [
      'Traditional matcha preparation',
      'Cultural philosophy discussion',
      'Hands-on practice session',
      'Take-home tea set'
    ],
    requirements: 'No prior experience required',
    included: ['Tea set to take home', 'Traditional sweets', 'Certificate of completion'],
    tags: ['traditional', 'tea', 'culture', 'hands-on'],
    schedule: [
      {
        time: '10:00 AM',
        activity: 'Welcome & Introduction',
        description: 'Overview of tea ceremony history and philosophy'
      },
      {
        time: '10:30 AM',
        activity: 'Demonstration',
        description: 'Master demonstrates proper tea preparation technique'
      },
      {
        time: '11:00 AM',
        activity: 'Hands-on Practice',
        description: 'Participants practice with guidance'
      },
      {
        time: '11:30 AM',
        activity: 'Tea & Discussion',
        description: 'Enjoy prepared tea while discussing cultural significance'
      }
    ],
    reviews: [
      {
        id: '1',
        name: 'Sarah Johnson',
        rating: 5,
        comment: 'An incredibly peaceful and educational experience. Master Takahashi is wonderful!',
        date: '2024-12-01'
      },
      {
        id: '2', 
        name: 'Raj Patel',
        rating: 5,
        comment: 'Learned so much about Japanese culture through this beautiful ceremony.',
        date: '2024-11-28'
      }
    ]
  },
  {
    id: '2',
    title: 'Bollywood Dance Workshop',
    brand: 'namaste',
    description: 'Join our energetic Bollywood dance workshop featuring popular movie choreography. Perfect for all skill levels, from beginners to experienced dancers.',
    shortDescription: 'Learn energetic Bollywood dance moves',
    date: '2025-01-20',
    time: '2:00 PM - 5:00 PM',
    location: 'Cultural Hub, Tokyo',
    venue: 'Cultural Hub, India Street, Shibuya, Tokyo - 150-0002',
    category: 'Dance',
    image: '/images/india-bollywood-dance.jpg',
    gallery: [
      '/images/gallery/bollywood-1.jpg',
      '/images/gallery/bollywood-2.jpg',
      '/images/gallery/bollywood-3.jpg'
    ],
    capacity: 80,
    availableTickets: 42,
    price: {
      general: 2000,
      vip: 3500,
      student: 1500
    },
    featured: true,
    status: 'upcoming',
    organizer: {
      name: 'Priya Sharma',
      bio: 'Professional Bollywood choreographer and dance instructor',
      image: '/images/organizers/priya.jpg',
      email: 'priya@namaste-japan.com',
      phone: '+81-90-1234-5678'
    },
    highlights: [
      'Popular movie choreography',
      'All skill levels welcome',
      'Live music accompaniment',
      'Video recording of performance'
    ],
    requirements: 'Comfortable clothing and dance shoes recommended',
    included: ['Professional instruction', 'Music tracks', 'Performance video', 'Refreshments'],
    tags: ['dance', 'bollywood', 'music', 'performance'],
    schedule: [
      {
        time: '2:00 PM',
        activity: 'Warm-up & Basics',
        description: 'Basic Bollywood dance steps and warm-up routine'
      },
      {
        time: '2:45 PM',
        activity: 'Choreography Learning',
        description: 'Learn choreography from popular Bollywood movies'
      },
      {
        time: '3:45 PM',
        activity: 'Practice Session',
        description: 'Practice learned choreography with music'
      },
      {
        time: '4:30 PM',
        activity: 'Performance & Recording',
        description: 'Final performance with video recording'
      }
    ],
    reviews: [
      {
        id: '1',
        name: 'Maya Tanaka',
        rating: 5,
        comment: 'So much fun! Priya is an amazing instructor and very encouraging.',
        date: '2024-12-05'
      },
      {
        id: '2',
        name: 'Hiroshi Sato', 
        rating: 4,
        comment: 'Great workout and learned some amazing dance moves!',
        date: '2024-12-03'
      }
    ]
  }
];

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const event = mockEvents.find(e => e.id === id);

    if (!event) {
      return NextResponse.json(
        { success: false, error: 'Event not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: event
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch event' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();
    
    const eventIndex = mockEvents.findIndex(e => e.id === id);
    if (eventIndex === -1) {
      return NextResponse.json(
        { success: false, error: 'Event not found' },
        { status: 404 }
      );
    }

    // Update the event
    mockEvents[eventIndex] = {
      ...mockEvents[eventIndex],
      ...body,
      updatedAt: new Date().toISOString()
    };

    return NextResponse.json({
      success: true,
      data: mockEvents[eventIndex],
      message: 'Event updated successfully'
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to update event' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const eventIndex = mockEvents.findIndex(e => e.id === id);
    
    if (eventIndex === -1) {
      return NextResponse.json(
        { success: false, error: 'Event not found' },
        { status: 404 }
      );
    }

    // Remove the event
    mockEvents.splice(eventIndex, 1);

    return NextResponse.json({
      success: true,
      message: 'Event deleted successfully'
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to delete event' },
      { status: 500 }
    );
  }
}