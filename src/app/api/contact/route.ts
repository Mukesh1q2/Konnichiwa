import { NextRequest, NextResponse } from 'next/server';

// Mock contact submissions
const mockContacts = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    subject: 'Event Registration Inquiry',
    message: 'I would like to know more about upcoming events in Tokyo.',
    eventType: 'event',
    status: 'new',
    submittedAt: '2024-12-10T10:30:00Z',
    respondedAt: null,
    response: null
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    subject: 'Volunteer Opportunity',
    message: 'I am interested in volunteering for your cultural events.',
    eventType: 'volunteer',
    status: 'in-progress',
    submittedAt: '2024-12-09T14:20:00Z',
    respondedAt: '2024-12-10T09:15:00Z',
    response: 'Thank you for your interest! We will contact you soon with volunteer opportunities.'
  }
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const eventType = searchParams.get('eventType');

    let filteredContacts = [...mockContacts];

    // Filter by status
    if (status) {
      filteredContacts = filteredContacts.filter(contact => contact.status === status);
    }

    // Filter by event type
    if (eventType) {
      filteredContacts = filteredContacts.filter(contact => contact.eventType === eventType);
    }

    return NextResponse.json({
      success: true,
      data: filteredContacts,
      total: filteredContacts.length
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch contacts' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, subject, message, eventType } = body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { success: false, error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email format' },
        { status: 400 }
      );
    }

    const newContact = {
      id: (mockContacts.length + 1).toString(),
      name: name.trim(),
      email: email.toLowerCase().trim(),
      subject: subject.trim(),
      message: message.trim(),
      eventType: eventType || 'general',
      status: 'new',
      submittedAt: new Date().toISOString(),
      respondedAt: null,
      response: null
    };

    // In production, save to database and send notification email
    mockContacts.push(newContact);

    // Mock email sending (in production, integrate with email service)

    return NextResponse.json({
      success: true,
      data: newContact,
      message: 'Message sent successfully'
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to send message' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, status, response } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Contact ID is required' },
        { status: 400 }
      );
    }

    const contactIndex = mockContacts.findIndex(contact => contact.id === id);
    if (contactIndex === -1) {
      return NextResponse.json(
        { success: false, error: 'Contact not found' },
        { status: 404 }
      );
    }

    // Update contact status and response
    if (status) {
      mockContacts[contactIndex].status = status;
    }
    
    if (response !== undefined) {
      mockContacts[contactIndex].response = response;
      mockContacts[contactIndex].respondedAt = new Date().toISOString();
    }

    return NextResponse.json({
      success: true,
      data: mockContacts[contactIndex],
      message: 'Contact updated successfully'
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to update contact' },
      { status: 500 }
    );
  }
}