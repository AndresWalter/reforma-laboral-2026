import { createClient } from '@supabase/supabase-js';

export const config = {
    runtime: 'edge', // Usamos Edge para menor latencia
};

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default async function handler(request: Request) {
    if (request.method !== 'POST') {
        return new Response(JSON.stringify({ error: 'Method Not Allowed' }), {
            status: 405,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    try {
        const { message } = await request.json();
        const apiKey = process.env.GROQ_API_KEY;

        if (!apiKey) {
            return new Response(JSON.stringify({ error: 'Server configuration error: Missing API Key' }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${apiKey}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "llama-3.3-70b-versatile",
                messages: [
                    {
                        role: "system",
                        content: `Experto en Reforma Laboral Argentina 2026. Responde CONCISO en 3 pasos:
Paso 1: Impacto directo (negativo para el trabajador).
Paso 2: Artículo legal (Art. 245, 56, 23, 200, 13, 242, 92bis).
Paso 3: Acción/Consecuencia práctica.
Contexto: Art.200 deroga ley 27.555. Art.23 elimina perjuicio moral. Art.56 tasa pasiva BCRA tope IPC+3% piso 67%. Art.13 sin presunción laboral con factura. Art.52 excluye SAC de indemnización. Art.242 bloqueos=despido.`
                    },
                    { role: "user", content: message }
                ],
                temperature: 0.1,
                max_tokens: 500
            })
        });

        const data = await response.json();
        const botResponse = data?.choices?.[0]?.message?.content || "";

        // Log to Supabase (Firestore-style async, don't await to not block the response if possible, 
        // but in Edge we might need to await to ensure it completes before context closes, 
        // or use waitUntil if available. Vercel Edge supports request.waitUntil)

        try {
            await supabase.from('chat_logs').insert([
                { user_query: message, bot_response: botResponse }
            ]);
        } catch (logError) {
            console.error("Failed to log to Supabase:", logError);
        }

        return new Response(JSON.stringify(data), {
            status: response.status,
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (error) {
        console.error("API Error:", error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
