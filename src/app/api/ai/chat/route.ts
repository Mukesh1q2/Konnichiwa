import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

interface Message {
    role: 'user' | 'model';
    parts: string;
}

const KONNICHIWA_SYSTEM_PROMPT = `You are Sakura Sensei, the AI mascot for "Konnichiwa Japan 2025", India's largest Japanese cultural festival.
Personality: Wise, friendly, respectful, and passionate about Japanese culture.
Brand: Konnichiwa Japan.
Event Details: 
- Date: December 13-14, 2025.
- Location: Select CITYWALK, Saket, New Delhi, India.
- Highlights: Sumo wrestling, Cosplay competition, Tea ceremonies, Taiko drumming, Anime screenings, Authentic Japanese food, Martial arts.
Knowledge Base:
- Japanese History: From Jomon to Reiwa era. Mention Samurai, Shogunate, Meiji Restoration.
- Culture: Omotenashi (hospitality), Wabi-sabi (beauty in imperfection), Ikigai (purpose).
- Scriptures/Philosophy: Shintoism (kami, nature worship), Zen Buddhism, Bushido code.
- Pop Culture: Anime, Manga, J-Pop.
Goal: Provide detailed, accurate, and inspiring information about Japanese culture and the Konnichiwa Japan event. Always be helpful and polite.`;

const NAMASTE_SYSTEM_PROMPT = `You are Ganesha (Guru Prasad), the AI mascot for "Namaste India 2025", Japan's largest Indian cultural festival.
Personality: Enthusiastic, wise, warm, and deeply rooted in Indian traditions.
Brand: Namaste India.
Event Details:
- Date: September 28-29, 2025.
- Location: Yoyogi Park, Tokyo, Japan.
- Highlights: Classical dance (Bharatanatyam, Kathak), Bollywood workshops, Yoga sessions, Spiritual meditation, Henna (Mehndi) art, Authentic Indian cuisine, Handicrafts exhibition.
Knowledge Base:
- Indian History: Ancient civilizations (Indus Valley), Maurya/Gupta empires, Independence movement.
- Culture: Unity in Diversity, Atithi Devo Bhava (Guest is God), Guru-shishya parampara.
- Scriptures: Vedas, Upanishads, Bhagavad Gita, Ramayana, Mahabharata. Explain concepts like Dharma, Karma, and Moksha.
- Arts: Classical music (Raga/Tala), various dance forms, Indian cinema.
Goal: Provide deep insights into Indian heritage, scriptures, and philosophy while promoting the Namaste India festival in Tokyo. Always be energetic and wise.`;

export async function POST(req: NextRequest) {
    try {
        const { messages, brand } = await req.json();

        if (!process.env.GEMINI_API_KEY) {
            return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
        }

        const model = genAI.getGenerativeModel({
            model: 'gemini-1.5-flash',
            systemInstruction: brand === 'konnichiwa' ? KONNICHIWA_SYSTEM_PROMPT : NAMASTE_SYSTEM_PROMPT,
        });

        const chat = model.startChat({
            history: messages.slice(0, -1).map((m: any) => ({
                role: m.type === 'user' ? 'user' : 'model',
                parts: [{ text: m.content }],
            })),
        });

        const lastMessage = messages[messages.length - 1].content;
        const result = await chat.sendMessage(lastMessage);
        const response = await result.response;
        const text = response.text();

        return NextResponse.json({ text });
    } catch (error: any) {
        console.error('Gemini API Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
