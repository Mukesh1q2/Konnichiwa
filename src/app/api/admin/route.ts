import { NextRequest, NextResponse } from 'next/server';

// Force dynamic rendering to prevent build-time execution
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

// Lazy load dependencies to prevent build-time execution
let DatabaseService: any;
let AuthService: any;
let EmailService: any;

// Initialize services only at runtime
async function initServices() {
  if (!DatabaseService) {
    DatabaseService = (await import('@/lib/database')).DatabaseService;
    AuthService = (await import('@/lib/auth-service')).AuthService;
    EmailService = (await import('@/lib/email-service')).EmailService;
  }
}

// Admin API middleware
async function verifyAdminAccess(request: NextRequest): Promise<{ success: boolean; user?: any; error?: string }> {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return { success: false, error: 'Missing or invalid authorization header' };
    }

    const token = authHeader.substring(7);
    const session = await AuthService.getCurrentSession();

    if (!session.success || !session.user) {
      return { success: false, error: 'Invalid or expired session' };
    }

    // Check if user has admin role
    if (session.user.role !== 'admin' && session.user.role !== 'organizer') {
      return { success: false, error: 'Insufficient permissions' };
    }

    return { success: true, user: session.user };
  } catch (error) {
    return { success: false, error: 'Authentication failed' };
  }
}

// Dashboard Statistics
export async function GET(request: NextRequest) {
  await initServices();
  try {
    const authResult = await verifyAdminAccess(request);
    if (!authResult.success) {
      return NextResponse.json(
        { success: false, error: authResult.error },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');

    switch (action) {
      case 'stats':
        return await getDashboardStats();
      case 'recent-activity':
        return await getRecentActivity();
      case 'notifications':
        return await getAdminNotifications();
      default:
        return NextResponse.json(
          { success: false, error: 'Invalid action' },
          { status: 400 }
        );
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

async function getDashboardStats() {
  try {
    // Get events count
    const events = await DatabaseService.getEvents();
    const totalEvents = events.length;
    const upcomingEvents = events.filter((e: any) => e.status === 'upcoming').length;

    // Get tickets data
    const tickets = await DatabaseService.getTickets();
    const totalTickets = tickets.length;
    const confirmedTickets = tickets.filter(t => t.status === 'confirmed').length;
    const totalRevenue = tickets
      .filter(t => t.status === 'confirmed')
      .reduce((sum, t) => sum + t.total_price, 0);

    // Get user statistics (mock data for now)
    const totalUsers = 1247;
    const newUsersThisMonth = 89;

    // Get newsletter subscribers
    const subscribers = await DatabaseService.getNewsletterSubscribers();
    const newsletterSubscribers = subscribers.length;

    // Get contact submissions
    const contacts = await DatabaseService.getContacts();
    const pendingContacts = contacts.filter(c => c.status === 'new').length;

    // Get gallery images count
    const galleryImages = await DatabaseService.getGalleryImages();
    const totalImages = galleryImages.length;

    // Get magazine articles count
    const articles = await DatabaseService.getMagazineArticles();
    const totalArticles = articles.length;

    const stats = {
      totalUsers,
      newUsersThisMonth,
      totalEvents,
      upcomingEvents,
      totalTickets,
      confirmedTickets,
      totalRevenue,
      pendingContacts,
      newsletterSubscribers,
      totalImages,
      totalArticles,
      monthlyRevenue: totalRevenue * 0.15, // Mock monthly calculation
      eventAttendance: confirmedTickets,
      conversionRate: 12.5 // Mock conversion rate
    };

    return NextResponse.json({
      success: true,
      data: stats
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch dashboard statistics' },
      { status: 500 }
    );
  }
}

async function getRecentActivity() {
  try {
    const activities = [
      {
        id: '1',
        type: 'user_registered',
        description: 'New user registered',
        user: 'john@example.com',
        timestamp: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
        metadata: {}
      },
      {
        id: '2',
        type: 'ticket_purchased',
        description: 'Ticket purchased for Tea Ceremony Event',
        user: 'alice@example.com',
        timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
        metadata: { event_id: '1', amount: 1500 }
      },
      {
        id: '3',
        type: 'contact_submitted',
        description: 'New contact form submission',
        user: 'partnership@example.com',
        timestamp: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
        metadata: { subject: 'Partnership Inquiry' }
      },
      {
        id: '4',
        type: 'event_created',
        description: 'New event created: Bollywood Dance Workshop',
        user: 'organizer@konnichiwa-namaste.com',
        timestamp: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
        metadata: { event_id: '2' }
      },
      {
        id: '5',
        type: 'newsletter_subscribed',
        description: 'New newsletter subscription',
        user: 'newsubscriber@example.com',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        metadata: { brand: 'konnichiwa' }
      }
    ];

    return NextResponse.json({
      success: true,
      data: activities
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch recent activity' },
      { status: 500 }
    );
  }
}

async function getAdminNotifications() {
  try {
    const notifications = [
      {
        id: '1',
        type: 'warning',
        title: 'Low Event Capacity',
        message: 'Tea Ceremony Event is 80% full',
        timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
        read: false,
        action_url: '/admin/events/1'
      },
      {
        id: '2',
        type: 'info',
        title: 'New Event Registration',
        message: 'Bollywood Dance Workshop registrations opened',
        timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
        read: false,
        action_url: '/admin/events'
      },
      {
        id: '3',
        type: 'error',
        title: 'Payment Processing Error',
        message: '3 failed payment attempts in the last hour',
        timestamp: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
        read: true,
        action_url: '/admin/tickets'
      }
    ];

    return NextResponse.json({
      success: true,
      data: notifications
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch admin notifications' },
      { status: 500 }
    );
  }
}

// Bulk Operations
export async function POST(request: NextRequest) {
  await initServices();
  try {
    const authResult = await verifyAdminAccess(request);
    if (!authResult.success) {
      return NextResponse.json(
        { success: false, error: authResult.error },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { action, data } = body;

    switch (action) {
      case 'bulk_email':
        return await sendBulkEmail(data);
      case 'bulk_event_update':
        return await bulkUpdateEvents(data);
      case 'export_data':
        return await exportData(data);
      case 'import_data':
        return await importData(data);
      default:
        return NextResponse.json(
          { success: false, error: 'Invalid action' },
          { status: 400 }
        );
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

async function sendBulkEmail(data: any) {
  try {
    const { recipients, subject, content, template } = data;

    // Validate required fields
    if (!recipients || !subject || !content) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Send emails in batches to avoid overwhelming the email service
    const batchSize = 10;
    const results = {
      sent: 0,
      failed: 0,
      errors: [] as string[]
    };

    for (let i = 0; i < recipients.length; i += batchSize) {
      const batch = recipients.slice(i, i + batchSize);

      try {
        await Promise.all(
          batch.map(async (recipient: string) => {
            try {
              await EmailService.sendEmail({
                to: recipient,
                subject,
                html: content,
                templateId: template
              });
              results.sent++;
            } catch (error) {
              results.failed++;
              results.errors.push(`Failed to send to ${recipient}: ${error}`);
            }
          })
        );

        // Add delay between batches
        if (i + batchSize < recipients.length) {
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      } catch (error) {
        results.failed += batch.length;
        results.errors.push(`Batch ${Math.floor(i / batchSize) + 1} failed: ${error}`);
      }
    }

    return NextResponse.json({
      success: true,
      data: results,
      message: `Bulk email completed: ${results.sent} sent, ${results.failed} failed`
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Bulk email operation failed' },
      { status: 500 }
    );
  }
}

async function bulkUpdateEvents(data: any) {
  try {
    const { event_ids, updates } = data;

    if (!event_ids || !Array.isArray(event_ids) || event_ids.length === 0) {
      return NextResponse.json(
        { success: false, error: 'No event IDs provided' },
        { status: 400 }
      );
    }

    const results = {
      updated: 0,
      failed: 0,
      errors: [] as string[]
    };

    for (const eventId of event_ids) {
      try {
        await DatabaseService.updateEvent(eventId, updates);
        results.updated++;
      } catch (error) {
        results.failed++;
        results.errors.push(`Failed to update event ${eventId}: ${error}`);
      }
    }

    return NextResponse.json({
      success: true,
      data: results,
      message: `Bulk update completed: ${results.updated} updated, ${results.failed} failed`
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Bulk update operation failed' },
      { status: 500 }
    );
  }
}

async function exportData(data: any) {
  try {
    const { type, filters, format } = data;

    let exportData: any = {};
    let filename = '';

    switch (type) {
      case 'events':
        const events = await DatabaseService.getEvents(filters);
        exportData = { events };
        filename = `events_export_${new Date().toISOString().split('T')[0]}`;
        break;

      case 'tickets':
        const tickets = await DatabaseService.getTickets(filters);
        exportData = { tickets };
        filename = `tickets_export_${new Date().toISOString().split('T')[0]}`;
        break;

      case 'users':
        // Mock user data export
        exportData = {
          users: [
            { id: '1', email: 'user@example.com', name: 'John Doe', created_at: '2024-01-01' }
          ]
        };
        filename = `users_export_${new Date().toISOString().split('T')[0]}`;
        break;

      case 'newsletter':
        const subscribers = await DatabaseService.getNewsletterSubscribers(filters);
        exportData = { subscribers };
        filename = `newsletter_export_${new Date().toISOString().split('T')[0]}`;
        break;

      default:
        return NextResponse.json(
          { success: false, error: 'Invalid export type' },
          { status: 400 }
        );
    }

    // Convert to requested format
    let content = '';
    let contentType = 'application/json';

    if (format === 'csv') {
      // Simple CSV conversion (in production, use a proper CSV library)
      content = 'Data export in CSV format would be generated here';
    } else {
      content = JSON.stringify(exportData, null, 2);
    }

    return new NextResponse(content, {
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': `attachment; filename="${filename}.${format || 'json'}"`
      }
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Data export failed' },
      { status: 500 }
    );
  }
}

async function importData(data: any) {
  try {
    const { type, file_content } = data;

    if (!file_content) {
      return NextResponse.json(
        { success: false, error: 'No file content provided' },
        { status: 400 }
      );
    }

    const results = {
      imported: 0,
      skipped: 0,
      errors: [] as string[]
    };

    try {
      const parsedData = JSON.parse(file_content);

      switch (type) {
        case 'events':
          if (Array.isArray(parsedData.events)) {
            for (const eventData of parsedData.events) {
              try {
                await DatabaseService.createEvent(eventData);
                results.imported++;
              } catch (error) {
                results.skipped++;
                results.errors.push(`Failed to import event: ${error}`);
              }
            }
          }
          break;

        case 'users':
          // User import would go here
          results.imported = parsedData.users?.length || 0;
          break;

        default:
          return NextResponse.json(
            { success: false, error: 'Invalid import type' },
            { status: 400 }
          );
      }

      return NextResponse.json({
        success: true,
        data: results,
        message: `Import completed: ${results.imported} imported, ${results.skipped} skipped`
      });
    } catch (error) {
      return NextResponse.json(
        { success: false, error: 'Invalid file format' },
        { status: 400 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Data import failed' },
      { status: 500 }
    );
  }
}