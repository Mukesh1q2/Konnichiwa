import { NextRequest, NextResponse } from 'next/server';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

// Mock magazine articles
const mockMagazine = [
  {
    id: '1',
    title: 'The Art of Japanese Tea Ceremony: A Cultural Journey',
    slug: 'japanese-tea-ceremony-cultural-journey',
    excerpt: 'Discover the philosophy and beauty behind the traditional Japanese tea ceremony, and learn how it represents the harmony between nature and human creativity.',
    content: `# The Art of Japanese Tea Ceremony: A Cultural Journey

The Japanese tea ceremony, known as "chanoyu" or "sado," is far more than simply preparing and drinking tea. It is a profound cultural practice that embodies harmony, respect, purity, and tranquility—the four core principles that guide every aspect of this ancient art.

## Historical Roots

The tea ceremony traces its origins to Chinese tea culture, which was introduced to Japan in the 9th century. However, it was the Zen monk Sen no Rikyū (1522-1591) who refined and systematized the ceremony into the form we recognize today. His influence established the philosophical foundations that continue to guide practitioners centuries later.

## The Four Principles

### 1. Harmony (Wa)
This principle emphasizes the harmonious relationship between host and guest, as well as between humans and nature. Every element in the tea room, from the flowers to the utensils, is carefully chosen to create a sense of unity and balance.

### 2. Respect (Kei)
Respect extends to all participants and elements of the ceremony. Guests show deference to the host, the host shows respect to the tea utensils, and all present honor the sacred nature of the gathering.

### 3. Purity (Sei)
Physical and spiritual cleanliness is essential. The tea room is meticulously cleaned, and participants approach the ceremony with pure intentions, leaving behind worldly concerns.

### 4. Tranquility (Jaku)
The ultimate goal is achieving a state of peaceful contemplation. The ceremony serves as a meditation practice, allowing participants to find inner calm and clarity.

## The Ceremony in Practice

A traditional tea ceremony involves several carefully choreographed steps:

1. **Preparation**: The host selects and arranges utensils with intentionality
2. **Purification**: Cleaning of the tea implements
3. **Preparation of sweets**: Light refreshments are prepared and served
4. **Whisking the tea**: The famous matcha is prepared with precise movements
5. **Serving**: The tea is presented to guests with formal respect
6. **Enjoyment**: Participants savor both the tea and the moment
7. **Clean-up**: The ceremony concludes with careful cleaning of all implements

## Modern Significance

In our fast-paced, digitally connected world, the tea ceremony offers a precious opportunity to slow down and reconnect with the present moment. It teaches patience, mindfulness, and appreciation for simple beauty.

For those interested in experiencing this profound cultural practice, workshops and demonstrations are regularly held at cultural centers, offering authentic instruction in this time-honored tradition.`,
    author: {
      name: 'Dr. Yuki Tanaka',
      bio: 'Cultural anthropologist and tea ceremony master with over 20 years of experience',
      image: '/images/authors/yuki-tanaka.jpg'
    },
    brand: 'konnichiwa',
    category: 'Traditional Arts',
    tags: ['tea ceremony', 'traditional arts', 'japanese culture', 'mindfulness'],
    image: '/images/magazine/tea-ceremony-article.jpg',
    publishedAt: '2024-12-01T10:00:00Z',
    featured: true,
    readTime: 8,
    status: 'published'
  },
  {
    id: '2',
    title: 'Bollywood Dance: The Rhythm of Cultural Expression',
    slug: 'bollywood-dance-cultural-expression',
    excerpt: 'Explore the vibrant world of Bollywood dance, where traditional Indian classical forms meet contemporary choreography to create a uniquely expressive art form.',
    content: `# Bollywood Dance: The Rhythm of Cultural Expression

Bollywood dance represents one of the most dynamic and expressive forms of cultural performance in the contemporary world. Born from the golden age of Indian cinema, this art form has evolved into a global phenomenon that celebrates the rich heritage of Indian culture while embracing modern influences.

## Origins and Evolution

The roots of Bollywood dance can be traced back to classical Indian dance forms such as Bharatanatyam, Kathak, and Odissi. These traditional styles provided the foundation for the expressive movements that would later define Bollywood choreography. When Indian cinema began to flourish in Mumbai, filmmakers recognized the power of dance to convey emotion and advance narrative.

The 1950s and 1960s marked the golden age of Bollywood dance, with legendary choreographers like Saroj Khan and classical dancers like Vyjayanthimala establishing the aesthetic principles that still influence the genre today. Their work blended classical precision with cinematic storytelling, creating a new language of movement.

## Key Characteristics

### Expressive Storytelling
Bollywood dance is fundamentally narrative. Each movement, gesture, and expression is designed to tell a story or convey specific emotions. The dancer becomes a storyteller, using their body as a vessel for complex narratives of love, joy, sorrow, and triumph.

### Fusion of Styles
Modern Bollywood dance seamlessly blends:
- Classical Indian dance forms
- Folk dances from different regions
- Contemporary Western dance styles
- Jazz and hip-hop influences
- Traditional Indian music with modern beats

### Facial Expressions
Perhaps the most distinctive feature of Bollywood dance is the emphasis on facial expressions. The eyes, eyebrows, and entire face become instruments of emotional communication, allowing dancers to express nuanced feelings that enhance the storytelling.

## Cultural Significance

### Preserving Tradition
While embracing innovation, Bollywood dance serves as a vital link to India\'s cultural past. Many choreographers incorporate classical forms as the foundation for their work, ensuring that traditional techniques remain alive and relevant.

### Celebrating Diversity
India\'s cultural diversity is reflected in Bollywood dance through the incorporation of folk dances from various regions. Bhangra from Punjab, Garba from Gujarat, and Bihu from Assam are just a few examples of regional forms that have found expression in Bollywood choreography.

### Global Ambassador
Bollywood dance has become one of India\'s most successful cultural exports. Dance studios around the world teach this style, and Bollywood-themed dance events draw participants from diverse backgrounds, creating cross-cultural understanding through shared movement.

## Learning Bollywood Dance

For beginners, learning Bollywood dance offers numerous benefits:

### Physical Benefits
- Cardiovascular workout through energetic choreography
- Flexibility improvement through classical movements
- Strength building through sustained dance sequences
- Coordination development through complex hand and foot patterns

### Cultural Learning
- Understanding of Indian music and rhythm systems
- Exposure to classical dance vocabulary
- Appreciation for the storytelling tradition in Indian arts

### Creative Expression
- Development of personal style within traditional framework
- Confidence building through expressive movement
- Community connection through group performances

## Contemporary Trends

Today\'s Bollywood dance continues to evolve, incorporating:
- Digital technology for choreographic innovation
- Cross-cultural collaborations with international artists
- Integration with fitness and wellness programs
- Social media platforms for sharing and learning

The future of Bollywood dance promises continued innovation while maintaining its core identity as a celebration of life, love, and cultural heritage through movement.`,
    author: {
      name: 'Priya Sharma',
      bio: 'Professional choreographer and dance instructor specializing in Bollywood and classical Indian dance forms',
      image: '/images/authors/priya-sharma.jpg'
    },
    brand: 'namaste',
    category: 'Dance',
    tags: ['bollywood', 'dance', 'indian culture', 'performance'],
    image: '/images/magazine/bollywood-dance-article.jpg',
    publishedAt: '2024-12-05T14:30:00Z',
    featured: true,
    readTime: 12,
    status: 'published'
  },
  {
    id: '3',
    title: 'Cross-Cultural Understanding: Building Bridges Through Arts',
    slug: 'cross-cultural-understanding-bridges-through-arts',
    excerpt: 'How cultural festivals and artistic exchange programs foster mutual understanding and create lasting connections between diverse communities.',
    content: `# Cross-Cultural Understanding: Building Bridges Through Arts

In our increasingly interconnected world, the importance of cross-cultural understanding cannot be overstated. Cultural festivals and artistic exchange programs serve as powerful vehicles for building bridges between diverse communities, fostering empathy, and creating lasting connections that transcend geographical and cultural boundaries.

## The Power of Cultural Exchange

### Shared Humanity
Art has a unique ability to communicate across language barriers and cultural differences. When we experience the music, dance, or visual arts of another culture, we often discover common human emotions and experiences that unite us despite our apparent differences.

### Breaking Down Stereotypes
Cultural festivals provide authentic, immersive experiences that challenge preconceived notions and stereotypes. Rather than relying on media representations, participants engage directly with cultural practitioners and community members, gaining nuanced understanding.

### Creating Dialogue
Arts-based cultural exchange creates natural opportunities for dialogue. Whether through a cooking class, dance workshop, or music performance, participants are encouraged to ask questions, share their own cultural experiences, and engage in meaningful conversation.

## Case Studies in Cultural Bridge-Building

### Konnichiwa Japan: Japanese Culture in India
Since 2017, the Konnichiwa Japan festival has successfully introduced authentic Japanese cultural experiences to Indian audiences. Through tea ceremony workshops, calligraphy classes, and traditional arts demonstrations, thousands of Indians have gained firsthand appreciation for Japanese cultural values such as harmony, respect, and mindfulness.

### Namaste India: Indian Culture in Japan
Similarly, the Namaste India festival has brought the vibrancy of Indian culture to Japanese communities. Bollywood dance workshops, classical music concerts, and spiritual practices have helped Japanese audiences understand the diversity and richness of Indian traditions.

## The Role of Arts in Cultural Education

### Immersive Learning
Traditional classroom education about other cultures often feels abstract and disconnected. Arts-based learning provides sensory, emotional, and intellectual engagement that creates lasting memories and deeper understanding.

### Active Participation
Cultural arts workshops require active participation rather than passive observation. This hands-on approach helps participants develop empathy and appreciation by literally stepping into another cultural experience.

### Creative Expression
When participants create art inspired by another culture, they engage in a form of creative translation that requires deep understanding and respect for the original cultural context.

## Benefits for All Participants

### For Cultural Hosts
- Opportunity to share their heritage with new audiences
- Validation and appreciation for their cultural practices
- Economic opportunities through workshops and performances
- Expansion of their own cultural perspective through interaction

### For Cultural Guests
- Direct exposure to authentic cultural practices
- Development of new skills and interests
- Broadened worldview and increased cultural sensitivity
- Opportunities for meaningful social connection

### For Communities
- Strengthened social cohesion through shared cultural experiences
- Economic benefits from tourism and cultural activities
- Enhanced reputation as welcoming, diverse communities
- Increased cultural competency among residents

## Overcoming Challenges

### Avoiding Cultural Appropriation
Cultural exchange requires careful balance between appreciation and appropriation. Successful programs:
- Center the voices of cultural practitioners from the originating culture
- Provide proper context and education about cultural significance
- Ensure fair compensation and recognition for cultural knowledge
- Maintain ongoing relationships rather than one-time events

### Language Barriers
While arts can transcend language barriers, clear communication remains important. Successful programs often include:
- Multilingual materials and instruction
- Translation services for workshops
- Cultural mediators who can explain context and significance
- Opportunities for participants to share their own languages and cultures

## Looking Forward: The Future of Cultural Exchange

### Digital Innovation
Technology is creating new possibilities for cultural exchange:
- Virtual reality experiences that simulate cultural environments
- Online workshops that connect practitioners with global audiences
- Digital platforms for sharing and preserving cultural knowledge
- Social media campaigns that celebrate cultural diversity

### Sustainable Partnerships
The most successful cultural exchange programs build long-term relationships rather than one-time events. These partnerships:
- Provide ongoing economic support for cultural practitioners
- Create opportunities for cultural communities to thrive
- Develop local expertise in cultural education
- Build institutional knowledge about effective cross-cultural programming

### Expanding Reach
Future programs will likely focus on:
- Accessibility for underrepresented communities
- Rural and remote area engagement
- Intergenerational knowledge transfer
- Integration with formal education systems

## Conclusion

Cross-cultural understanding through the arts represents one of our most powerful tools for building a more connected and compassionate world. By creating opportunities for authentic cultural exchange, we not only preserve and share the beautiful traditions of different cultures but also develop the empathy and understanding necessary for global harmony.

The success of festivals like Konnichiwa Japan and Namaste India demonstrates that when people come together to share their cultural heritage with openness and respect, profound connections are possible. These connections form the foundation for a more inclusive and understanding global community.`,
    author: {
      name: 'Dr. Maria Rodriguez',
      bio: 'Anthropologist specializing in cultural exchange and community building through arts programs',
      image: '/images/authors/maria-rodriguez.jpg'
    },
    brand: 'both',
    category: 'Cultural Exchange',
    tags: ['cultural exchange', 'arts', 'community', 'understanding'],
    image: '/images/magazine/cultural-exchange-article.jpg',
    publishedAt: '2024-12-10T09:15:00Z',
    featured: true,
    readTime: 15,
    status: 'published'
  }
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const brand = searchParams.get('brand');
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');
    const status = searchParams.get('status');
    const limit = searchParams.get('limit');

    let filteredArticles = [...mockMagazine];

    // Filter by brand
    if (brand && ['konnichiwa', 'namaste', 'both'].includes(brand)) {
      filteredArticles = filteredArticles.filter(article => 
        article.brand === brand || article.brand === 'both'
      );
    }

    // Filter by category
    if (category) {
      filteredArticles = filteredArticles.filter(article => 
        article.category.toLowerCase().includes(category.toLowerCase())
      );
    }

    // Filter featured articles
    if (featured === 'true') {
      filteredArticles = filteredArticles.filter(article => article.featured);
    }

    // Filter by status
    if (status) {
      filteredArticles = filteredArticles.filter(article => article.status === status);
    }

    // Sort by publication date (newest first)
    filteredArticles.sort((a, b) => 
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );

    // Apply limit
    if (limit) {
      const limitNum = parseInt(limit);
      filteredArticles = filteredArticles.slice(0, limitNum);
    }

    return NextResponse.json({
      success: true,
      data: filteredArticles,
      total: filteredArticles.length
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch articles' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      title,
      slug,
      excerpt,
      content,
      author,
      brand,
      category,
      tags,
      image,
      featured
    } = body;

    // Validate required fields
    if (!title || !content || !author || !brand) {
      return NextResponse.json(
        { success: false, error: 'Title, content, author, and brand are required' },
        { status: 400 }
      );
    }

    // Validate brand
    if (!['konnichiwa', 'namaste', 'both'].includes(brand)) {
      return NextResponse.json(
        { success: false, error: 'Invalid brand' },
        { status: 400 }
      );
    }

    // Generate slug if not provided
    const articleSlug = slug || title.toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');

    const newArticle = {
      id: Date.now().toString(),
      title: title.trim(),
      slug: articleSlug,
      excerpt: excerpt?.trim() || '',
      content: content.trim(),
      author,
      brand,
      category: category || 'General',
      tags: tags || [],
      image: image || '',
      publishedAt: new Date().toISOString(),
      featured: featured || false,
      readTime: Math.ceil(content.split(' ').length / 200), // Estimate reading time
      status: 'published'
    };

    // Add to magazine
    mockMagazine.push(newArticle);

    return NextResponse.json({
      success: true,
      data: newArticle,
      message: 'Article published successfully'
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to create article' },
      { status: 500 }
    );
  }
}
