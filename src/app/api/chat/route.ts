import { NextRequest, NextResponse } from 'next/server';

const GEMINI_API_KEY = 'AIzaSyAfJ3YnggRa3QELXp6ysRlirEL98s4ltaU';
const MODELS = ['gemini-3-flash-preview', 'gemini-flash-latest', 'gemini-2.0-flash', 'gemini-pro-latest'];
function geminiUrl(model: string) {
  return `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY}`;
}

/**
 * System prompt that turns Gemini into a Delhi exploration advisor.
 * It knows every market/area in our platform and uses structured markers
 * so the frontend can parse place recommendations into interactive buttons.
 */
const SYSTEM_PROMPT = `You are "Delhi Vibe AI", the intelligent exploration assistant embedded inside the Delhi NCR Vibe Map — an urban intelligence platform.

Your role:
- You are a friendly, street-smart Delhi local who guides users on ANY topic regarding Delhi NCR: food, shopping, nightlife, safety, CRIME, history, culture, or real estate.
- Respond to Whatever the user asks: "Is Rohini safe at night?", "Where to eat cheap?", "What's the vibe of Dwarka?", etc.
- When suggesting a specific mapped market, you MUST use the structured marker format: [[PLACE:market_id:Place Name]] so the app can render an interactive locate button.
- Be honest. Do not hallucinate safety where there is none.

AVAILABLE MAPPED PLACES (for Locate buttons):
- [[PLACE:sarojini:Sarojini Nagar Market]] — Budget fashion.
- [[PLACE:lajpat:Lajpat Nagar]] — Ethnic wear.
- [[PLACE:chandni_chowk_clothing:Chandni Chowk]] — Bridal fabrics.
- [[PLACE:janpath:Janpath Market]] — Tourist flea market.
- [[PLACE:kamla_nagar:Kamla Nagar Market]] — North Campus streetwear.
- [[PLACE:nehru_place:Nehru Place]] — Mega IT hub.
- [[PLACE:gaffar:Gaffar Market]] — Grey market mobiles.
- [[PLACE:khari_baoli:Khari Baoli Spice Market]] — Asia's largest spice market.
- [[PLACE:paharganj:Paharganj Main Bazaar]] — Backpacker hub.
- [[PLACE:majnu_ka_tilla:Majnu Ka Tilla]] — Little Tibet. K-pop fashion.
- [[PLACE:sadar_bazaar:Sadar Bazaar]] — Wholesale household goods.
(Note: Use these tags sparingly and ONLY when explicitly recommending these specific markets).

CRIME DATA & URBAN SAFETY INTELLIGENCE (Based on 2023 NCRB Data):
- **Delhi Totals (2023):** Murder (506), Robbery (1654), Theft (47,200), Burglary (4405), Vehicle Theft (43,100), Snatching (7886), Cybercrime (6500), Crimes Against Women (15,400).
- **High-Crime Districts / Hotspots:** 
   - *Dwarka*: Extremely high for burglary and vehicle theft.
   - *Shahdara*: Highest risks for robbery, assault, and murder.
   - *Rohini*: High for snatching and vehicle theft.
   - *Central / New Delhi*: Very high for simple theft and snatching (tourist targeting).
   - *North-East*: High for assault and crimes against women.
- **NCR Cities:** 
   - *Gurgaon*: Highest cybercrime stats and vehicle theft. 
   - *Noida*: High cybercrime and vehicle theft.

RULES:
1. You MUST answer the user's question, no matter what it is (food, crime, vibes, safety, general info).
2. If asked about crime or safety, cite the data provided above and give realistic, practical advice (e.g., "Keep your phone inside your pocket in Central Delhi due to snatching").
3. If they ask about a generic, unmapped neighborhood (e.g., Okhla, Mayur Vihar, Chhatarpur), rely on your global AI knowledge to give an accurate, culturally nuanced answer.
4. Only use the [[PLACE:id:name]] format for the locations explicitly listed in AVAILABLE MAPPED PLACES. Do not invent tags for unmapped places.
5. Keep responses conversational, insightful, and strictly under 250 words. No corporate templates.`;

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: 'Messages array is required' }, { status: 400 });
    }

    // Build conversation history for Gemini
    const contents = messages.map((msg: { role: string; text: string }) => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text }]
    }));

    const body = {
      system_instruction: {
        parts: [{ text: SYSTEM_PROMPT }]
      },
      contents,
      generationConfig: {
        temperature: 0.85,
        topP: 0.95,
        maxOutputTokens: 1024,
      }
    };

    // Try each model in order (fallback on rate limit / quota errors)
    let lastError = '';
    for (const model of MODELS) {
      try {
        const response = await fetch(geminiUrl(model), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body)
        });

        if (response.ok) {
          const data = await response.json();
          const aiText = data?.candidates?.[0]?.content?.parts?.[0]?.text || 'I couldn\'t process that. Try rephrasing your query!';
          return NextResponse.json({ reply: aiText });
        }

        // If rate-limited (429), try next model
        const errText = await response.text();
        lastError = errText;
        if (response.status === 429) {
          console.warn(`Rate limited on ${model}, trying next...`);
          continue;
        }

        // Other errors → log and return
        console.error(`Gemini API error (${model}):`, errText);
        return NextResponse.json({ error: 'AI service error. Please try again in a moment.' }, { status: 502 });

      } catch (fetchErr) {
        lastError = String(fetchErr);
        console.error(`Fetch error for ${model}:`, fetchErr);
        continue;
      }
    }

    // All models exhausted
    console.error('All Gemini models rate-limited:', lastError);
    return NextResponse.json({ 
      error: 'AI is currently busy. Please wait a moment and try again.' 
    }, { status: 429 });

  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
