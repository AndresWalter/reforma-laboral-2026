import { createClient } from '@supabase/supabase-js';

export const config = {
    runtime: 'edge', // Usamos Edge para menor latencia
};

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || '';
const supabase = (supabaseUrl && supabaseAnonKey) ? createClient(supabaseUrl, supabaseAnonKey) : null;

export default async function handler(request: Request, context: any) {
    if (request.method !== 'POST') {
        return new Response(JSON.stringify({ error: 'Method Not Allowed' }), {
            status: 405,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    // --- Hardening: Validar Secreto de Aplicación ---
    const appSecret = request.headers.get("X-App-Secret");
    if (appSecret !== process.env.APP_CHAT_SECRET) {
        return new Response(JSON.stringify({ error: 'Unauthorized: Missing or invalid App Secret' }), {
            status: 401,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    try {
        const { message } = await request.json();
        const apiKey = process.env.GROQ_API_KEY;

        if (!apiKey) {
            console.error("Critical: GROQ_API_KEY is missing in environment variables.");
            return new Response(JSON.stringify({ error: 'Server configuration error' }), {
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
1. Impacto directo (negativo para el trabajador).
2. Artículo legal (Art. 245, 56, 23, 200, 13, 242, 92bis).
3. Acción/Consecuencia práctica.
Contexto: Art.200 deroga ley 27.555. Art.23 elimina perjuicio moral. Art.56 tasa pasiva BCRA tope IPC+3% piso 67%. Art.13 sin presunción laboral con factura. Art.52 excluye SAC de indemnización. Art.242 bloqueos=despido.`
                    },
                    { role: "user", content: message }
                ],
                temperature: 0.1,
                max_tokens: 500
            })
        });

        if (!response.ok) {
            const errorData = await response.text();
            console.error("Groq API Error:", response.status, errorData);
            return new Response(JSON.stringify({ error: `AI Provider Error: ${response.status}` }), {
                status: response.status >= 500 ? 502 : 500,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const data = await response.json();
        const botResponse = data?.choices?.[0]?.message?.content || "";

        // Log to Supabase non-blocking using waitUntil
        if (supabase && context && typeof context.waitUntil === 'function') {
            context.waitUntil(
                supabase.from('chat_logs').insert([
                    { user_query: message, bot_response: botResponse, timestamp: new Date().toISOString() }
                ]).then(({ error }) => {
                    if (error) console.error("Supabase Log Error:", error);
                })
            );
        } else if (supabase) {
            // Fallback if context.waitUntil is not available (e.g. local dev)
            // We verify if we are in an environment that might terminate early
            console.warn("waitUntil not available, logging might be interrupted if function terminates early.");
            supabase.from('chat_logs').insert([
                { user_query: message, bot_response: botResponse, timestamp: new Date().toISOString() }
            ]).then(({ error }) => {
                 if (error) console.error("Supabase Log Error:", error);
            }).catch(err => console.error("Supabase Log Exception:", err));
        }

        return new Response(JSON.stringify(data), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300' 
            }
        });

    } catch (error) {
        console.error("API Handler Exception:", error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
