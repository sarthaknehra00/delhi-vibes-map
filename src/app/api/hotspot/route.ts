import { NextRequest, NextResponse } from 'next/server';

const GEMINI_API_KEY = 'AIzaSyAfJ3YnggRa3QELXp6ysRlirEL98s4ltaU';
const MODELS = ['gemini-3-flash-preview', 'gemini-flash-latest', 'gemini-2.0-flash', 'gemini-pro-latest'];
function geminiUrl(model: string) {
  return `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY}`;
}

const SYSTEM_PROMPT = `You are a Delhi NCR urban mapping assistant. The user will provide the name of a neighborhood or place in Delhi NCR (e.g., "Okhla", "Dilshad Garden", "Chhatarpur", "Noida City Center").
Your job is to generate a dynamic "Hotspot" profile for this area.

IMPORTANT: You MUST return ONLY the raw JSON object. Do not include markdown code blocks (\`\`\`json), do not include any preamble or afterword. Just the JSON.

SCHEMA:
{
  "description": "A very short, punchy 1-2 sentence description of the vibe and people found in this specific area.",
  "vibeQuery": "The exact name of a real song and artist that perfectly represents the vibe of this area (e.g. 'Choo Lo The Local Train' or 'Aazaadiyan Amit Trivedi').",
  "restaurants": [
    {
      "name": "Name of a popular or believable local eatery here",
      "category": "Street Food" | "Cafes" | "Fine Dining" | "Hidden Gems",
      "description": "Short description of what to eat here"
    }
  ]
}

Make sure the restaurants array has Exactly 3-5 items! Make them realistic for the specific area requested.`;

export async function POST(request: NextRequest) {
  try {
    const { placeName } = await request.json();

    if (!placeName) {
      return NextResponse.json({ error: 'placeName is required' }, { status: 400 });
    }

    const body = {
      system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
      contents: [{ role: 'user', parts: [{ text: placeName }] }],
      generationConfig: {
        temperature: 0.85,
        topP: 0.95,
        maxOutputTokens: 1024,
      }
    };

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
          let aiText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
          
          if (!aiText) continue;

          // Clean up potential markdown formatting from Gemini
          aiText = aiText.replace(/```json/g, '').replace(/```/g, '').trim();

          try {
            const parsed = JSON.parse(aiText);
            return NextResponse.json(parsed);
          } catch (e) {
            console.error('Failed to parse Gemini JSON:', aiText);
            // If we fail to parse, try the next model just in case it formats better
            continue;
          }
        }

        if (response.status === 429) {
          lastError = await response.text();
          console.warn(`Rate limited on ${model}, trying next...`);
          continue;
        }

        const errText = await response.text();
        console.error(`Gemini API error (${model}):`, errText);
        return NextResponse.json({ error: 'AI service error.' }, { status: 502 });

      } catch (fetchErr) {
        lastError = String(fetchErr);
        console.error(`Fetch error for ${model}:`, fetchErr);
        continue;
      }
    }

    return NextResponse.json({ 
      error: 'AI is currently busy tracking vibes. Please try again later.' 
    }, { status: 429 });

  } catch (error) {
    console.error('Hotspot API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
