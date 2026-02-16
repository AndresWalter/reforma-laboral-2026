import React, { useState, useRef, useEffect, useCallback } from 'react';
import { MessageCircle, X, Send, Bot, User, Sparkles } from 'lucide-react';

interface Message {
    id: string;
    text: React.ReactNode;
    sender: 'bot' | 'user';
    timestamp: Date;
}

// --- Caché de respuestas IA para ahorrar tokens ---
const aiCache = new Map<string, string>();

// --- Rate Limiter ---
const COOLDOWN_MS = 5000;
let lastApiCall = 0;

const KNOWLEDGE_BASE = {
    teletrabajo: {
        label: 'Teletrabajo y Cambios',
        keywords: ['teletrabajo', 'home office', 'casa', 'remoto', 'conectividad', 'volver', 'oficina', 'ius variandi', 'modalidad', 'presencial'],
        question: 'Trabajo desde casa hace dos años. ¿Puede mi jefe obligarme a volver o quitarme beneficios?',
        answer: (
            <div className="space-y-4">
                <div>
                    <p className="font-bold text-red-600 dark:text-red-400">Paso 1: Respuesta directa</p>
                    <p>Sí, el empleador tiene ahora mayor libertad para modificar las modalidades de trabajo, siempre que no te cause un daño económico comprobable.</p>
                </div>

                <div>
                    <p className="font-bold text-indigo-600 dark:text-indigo-400">Paso 2: Sustento legal</p>
                    <p>El <strong>Artículo 23</strong> de la nueva ley modifica el Art. 66 de la LCT, eliminando la protección contra el "perjuicio moral". Además, el <strong>Artículo 200</strong> deroga por completo la <span className="text-red-500 font-bold">Ley de Teletrabajo (Nº 27.555)</span> a partir del 1º de enero de 2027.</p>
                </div>

                <div>
                    <p className="font-bold text-indigo-600 dark:text-indigo-400">Paso 3: Acción para el trabajador</p>
                    <p>Si el cambio te genera un gasto (daño material), debes intimar a tu empleador por escrito. Si el empleador mantiene la medida, tienes derecho a considerarte despedido sin causa.</p>
                </div>
            </div>
        )
    },
    juicios: {
        label: 'Juicios y Tasas',
        keywords: ['juicio', 'intereses', 'tasa', 'cobrar', 'demanda', 'bcra', 'ipc', 'sentencia', 'anatocismo', 'capitalización'],
        question: 'Tengo un juicio hace años. ¿Cómo me afecta el nuevo cálculo de intereses?',
        answer: (
            <div className="space-y-4">
                <div>
                    <p className="font-bold text-red-600 dark:text-red-400">Paso 1: Respuesta directa</p>
                    <p>Tu crédito se actualizará con una tasa que probablemente sea menor a la que esperabas, ya que se eliminó el sistema de capitalización de intereses que usaban algunos tribunales.</p>
                </div>

                <div>
                    <p className="font-bold text-indigo-600 dark:text-indigo-400">Paso 2: Sustento legal</p>
                    <p>El <strong>Artículo 56</strong> establece que para juicios sin sentencia definitiva, se aplicará la <strong>tasa pasiva del BCRA</strong>.</p>
                </div>

                <div className="bg-slate-100 dark:bg-slate-800/50 p-3 rounded-xl border-l-4 border-amber-500">
                    <p className="font-bold text-amber-600 dark:text-amber-400">Paso 3: El cálculo (Topes)</p>
                    <p>El monto final tiene un techo: no puede superar al capital original actualizado por <strong>IPC más un 3% anual</strong>. Sin embargo, el valor no podrá ser inferior al 67% de ese cálculo máximo.</p>
                </div>
            </div>
        )
    },
    indemnizacion: {
        label: 'Despido e Indemnización',
        keywords: ['despido', 'indemnizacion', 'echaron', 'cuanto me corresponde', 'calculo', '245', 'aguinaldo', 'bonos', 'liquidacion', 'finiquito'],
        question: '¿Qué conceptos se excluyen ahora del cálculo de mi indemnización?',
        answer: (
            <div className="space-y-4">
                <div>
                    <p className="font-bold text-red-600 dark:text-red-400">Paso 1: Respuesta directa</p>
                    <p>Tu indemnización será menor porque se redujo la base de cálculo: ya no se incluyen pagos no mensuales.</p>
                </div>

                <div>
                    <p className="font-bold text-indigo-600 dark:text-indigo-400">Paso 2: Sustento legal</p>
                    <p>El <strong>Artículo 52</strong> (mod. Art. 245 LCT) excluye explícitamente el <strong>SAC (aguinaldo)</strong>, premios y bonificaciones de la base indemnizatoria.</p>
                </div>

                <div>
                    <p className="font-bold text-indigo-600 dark:text-indigo-400">Paso 3: Consecuencia</p>
                    <p>Al tomar solo la remuneración mensual "normal y habitual", el monto final se reduce significativamente respecto al criterio anterior.</p>
                </div>
            </div>
        )
    },
    monotributo: {
        label: 'Monotributo (Riesgos)',
        keywords: ['monotributo', 'factura', 'facturar', 'independiente', 'colaborador', 'negro', 'fraude', 'relacion de dependencia', 'encubierto'],
        question: 'Mi jefe me pide que le facture como monotributista. ¿Sigo protegido?',
        answer: (
            <div className="space-y-4">
                <div>
                    <p className="font-bold text-red-600 dark:text-red-400">Paso 1: Advertencia ⚠️</p>
                    <p>Estás en alto riesgo. Si facturas, la ley ahora presume que eres un profesional independiente y <strong>NO</strong> un empleado.</p>
                </div>

                <div>
                    <p className="font-bold text-indigo-600 dark:text-indigo-400">Paso 2: Sustento legal</p>
                    <p>El <strong>Artículo 13</strong> quita la "presunción de contrato de trabajo" cuando hay facturación de servicios profesionales o de oficios.</p>
                </div>

                <div>
                    <p className="font-bold text-indigo-600 dark:text-indigo-400">Paso 3: Riesgo Final</p>
                    <p>Si aceptas facturar, te será casi imposible reclamar derechos de dependencia (vacaciones, aguinaldo, etc.) ante la justicia.</p>
                </div>
            </div>
        )
    },
    apps: {
        label: 'Apps y Repartidores',
        keywords: ['repartidor', 'pedidosya', 'rappi', 'uber', 'plataforma', 'aplicacion', 'app', 'bicicleta', 'moto', 'delivery'],
        question: '¿Soy empleado de la App o un trabajador independiente bajo esta ley?',
        answer: (
            <div className="space-y-4">
                <div>
                    <p className="font-bold text-red-600 dark:text-red-400">Paso 1: Respuesta directa</p>
                    <p>La ley te define formalmente como un <strong>"prestador independiente"</strong> y aclara que tu vínculo con la plataforma no es una relación laboral.</p>
                </div>

                <div>
                    <p className="font-bold text-indigo-600 dark:text-indigo-400">Paso 2: Derechos específicos</p>
                    <p>Tienes derecho a rechazar pedidos sin dar explicaciones, a elegir tus horarios y a recibir capacitaciones gratuitas pagadas por la plataforma. También debes recibir un seguro de accidentes personales, aunque el pago del mismo se pacta libremente entre vos y la App.</p>
                </div>

                <div>
                    <p className="font-bold text-indigo-600 dark:text-indigo-400">Paso 3: Obligaciones</p>
                    <p>Debes estar inscripto ante las autoridades fiscales (como Monotributista o Autónomo) y realizar tus propios aportes de jubilación y salud.</p>
                </div>
            </div>
        )
    },
    huelga: {
        label: 'Huelga y Bloqueos',
        keywords: ['huelga', 'paro', 'bloqueo', 'piquete', 'protesta', 'sindicato', 'gremio', 'esenciales', 'servicio esencial'],
        question: '¿Qué pasa con el derecho a huelga después de la reforma?',
        answer: (
            <div className="space-y-4">
                <div>
                    <p className="font-bold text-red-600 dark:text-red-400">Paso 1: Respuesta directa</p>
                    <p>Los bloqueos son ahora causa directa de despido. En servicios esenciales, se debe mantener un 75% de cobertura mínima.</p>
                </div>

                <div>
                    <p className="font-bold text-indigo-600 dark:text-indigo-400">Paso 2: Sustento legal</p>
                    <p>El <strong>Artículo 242</strong> incorpora los bloqueos como causal de despido con justa causa. Para actividades "trascendentales", la cobertura mínima es del 50%.</p>
                </div>

                <div>
                    <p className="font-bold text-indigo-600 dark:text-indigo-400">Paso 3: Riesgo</p>
                    <p>Participar en un bloqueo puede significar tu despido inmediato sin indemnización.</p>
                </div>
            </div>
        )
    },
    prueba: {
        label: 'Período de Prueba',
        keywords: ['prueba', 'periodo de prueba', 'tres meses', 'seis meses', 'ocho meses', '92 bis', 'contrato nuevo', 'recien ingresado'],
        question: '¿Cuánto dura ahora el período de prueba?',
        answer: (
            <div className="space-y-4">
                <div>
                    <p className="font-bold text-red-600 dark:text-red-400">Paso 1: Respuesta directa</p>
                    <p>El período de prueba se extiende de 3 a 6 meses (hasta 8 por convenio colectivo). Durante ese tiempo, pueden despedirte sin indemnización.</p>
                </div>

                <div>
                    <p className="font-bold text-indigo-600 dark:text-indigo-400">Paso 2: Sustento legal</p>
                    <p>El <strong>Art. 92 bis</strong> modifica la duración del período de prueba, duplicándola respecto a la ley anterior.</p>
                </div>

                <div>
                    <p className="font-bold text-indigo-600 dark:text-indigo-400">Paso 3: Consecuencia</p>
                    <p>Un trabajador nuevo tiene mayor vulnerabilidad durante más tiempo, sin derecho a indemnización por despido dentro de ese plazo.</p>
                </div>
            </div>
        )
    }
};

// --- Sanitización de input ---
const MAX_INPUT_LENGTH = 300;
const sanitizeInput = (input: string): string => {
    return input
        .slice(0, MAX_INPUT_LENGTH)
        .replace(/[\n\r\t]/g, ' ')
        .trim();
};

const ChatBot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 'welcome',
            text: (
                <div className="space-y-2">
                    <p>Hola 👋 Soy tu asistente legal especializado en la nueva reforma laboral.</p>
                    <p>Puedes hacerme preguntas libres o usar los ejemplos de abajo para ver cómo te afecta la ley.</p>
                </div>
            ),
            sender: 'bot',
            timestamp: new Date()
        }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const abortControllerRef = useRef<AbortController | null>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping, isOpen]);

    // --- Cleanup al desmontar: abortar fetches pendientes ---
    useEffect(() => {
        return () => {
            abortControllerRef.current?.abort();
        };
    }, []);

    const normalize = (str: string) =>
        str.toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");

    const getResponse = (query: string): { type: 'local' | 'ai', content: React.ReactNode } => {
        const q = normalize(query);

        for (const entry of Object.values(KNOWLEDGE_BASE)) {
            if (entry.keywords.some(k => q.includes(normalize(k)))) {
                return { type: 'local', content: entry.answer };
            }
        }

        return { type: 'ai', content: null };
    };

    const callGroqAPI = useCallback(async (userQuery: string): Promise<string> => {
        // --- Sanitizar antes de enviar ---
        const cleanQuery = sanitizeInput(userQuery);
        const cacheKey = normalize(cleanQuery);

        // --- Verificar caché ---
        if (aiCache.has(cacheKey)) {
            return aiCache.get(cacheKey)!;
        }

        // --- Rate limiting ---
        const now = Date.now();
        if (now - lastApiCall < COOLDOWN_MS) {
            return "⏳ Por favor espera unos segundos antes de hacer otra consulta.";
        }
        lastApiCall = now;

        // --- AbortController para cancelar si se desmonta ---
        abortControllerRef.current?.abort();
        const controller = new AbortController();
        abortControllerRef.current = controller;

        try {
            // Llamada al endpoint propio (Serverless Function)
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                signal: controller.signal,
                body: JSON.stringify({
                    message: cleanQuery
                })
            });

            // --- Validar respuesta HTTP ---
            if (!response.ok) {
                if (response.status === 429) return "⚠️ Se alcanzó el límite de consultas. Intenta en unos minutos.";
                if (response.status === 500) return "⚠️ Error en el servidor. Verifica que la API Key esté configurada.";
                return `Error del servidor (${response.status}). Intenta nuevamente.`;
            }

            const data = await response.json();
            const aiText = data?.choices?.[0]?.message?.content || "No pude generar una respuesta.";

            // --- Guardar en caché ---
            aiCache.set(cacheKey, aiText);

            return aiText;
        } catch (error: unknown) {
            if (error instanceof DOMException && error.name === 'AbortError') {
                return "";
            }
            return "Error de conexión. Intenta nuevamente.";
        }
    }, []);

    const handleSend = async (text?: string) => {
        const messageText = text || inputValue;
        if (!messageText.trim() || isTyping) return;

        const userMsg: Message = {
            id: Date.now().toString(),
            text: messageText,
            sender: 'user',
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMsg]);
        setInputValue('');
        setIsTyping(true);

        const responseData = getResponse(messageText);

        if (responseData.type === 'local') {
            setTimeout(() => {
                const botMsg: Message = {
                    id: (Date.now() + 1).toString(),
                    text: responseData.content,
                    sender: 'bot',
                    timestamp: new Date()
                };
                setMessages(prev => [...prev, botMsg]);
                setIsTyping(false);
            }, 800);
        } else {
            const aiText = await callGroqAPI(messageText);
            if (aiText) {
                const botMsg: Message = {
                    id: (Date.now() + 1).toString(),
                    text: aiText,
                    sender: 'bot',
                    timestamp: new Date()
                };
                setMessages(prev => [...prev, botMsg]);
            }
            setIsTyping(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`fixed bottom-24 md:bottom-6 right-6 z-[100] p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 ${isOpen
                    ? 'bg-slate-200 text-slate-800 rotate-90 dark:bg-slate-800 dark:text-white'
                    : 'bg-indigo-600 text-white hover:bg-indigo-700'
                    }`}
            >
                {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-7 h-7" />}
            </button>

            {isOpen && (
                <div className="fixed bottom-24 right-4 left-4 md:left-auto md:right-6 z-[100] md:w-[420px] bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col h-[60vh] md:h-[550px] animate-slideUp">

                    <div className="bg-indigo-600 p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="bg-white/20 p-2 rounded-xl">
                                <Bot className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h3 className="text-white font-bold leading-none">Asistente Laboral</h3>
                                <p className="text-indigo-200 text-[10px] mt-1 uppercase tracking-wider font-semibold">IA · Reforma Laboral 2026</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 dark:bg-slate-950/40">
                        {messages.map((msg) => (
                            <div key={msg.id} className={`flex gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${msg.sender === 'user' ? 'bg-indigo-600 text-white' : 'bg-white dark:bg-slate-800 text-slate-500 shadow-sm'
                                    }`}>
                                    {msg.sender === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
                                </div>
                                <div className={`max-w-[85%] rounded-2xl p-3 text-sm leading-relaxed ${msg.sender === 'user'
                                    ? 'bg-indigo-600 text-white rounded-tr-none'
                                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 shadow-sm border border-slate-100 dark:border-slate-700 rounded-tl-none'
                                    }`}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                        {isTyping && (
                            <div className="flex gap-1 p-2 ml-10">
                                <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"></div>
                                <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                                <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    <div className="p-3 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
                        <div className="flex gap-2 flex-wrap mb-3">
                            <span className="text-[10px] text-slate-500 dark:text-slate-400 w-full flex items-center gap-1">
                                <Sparkles className="w-3 h-3 text-amber-500" /> Sugerencias de preguntas:
                            </span>
                            {Object.entries(KNOWLEDGE_BASE).slice(0, 4).map(([key, option]) => (
                                <button
                                    key={key}
                                    onClick={() => handleSend(option.question)}
                                    disabled={isTyping}
                                    className="px-2 py-1 text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-full border border-slate-200 dark:border-slate-700 hover:bg-indigo-50 dark:hover:bg-indigo-900/40 hover:text-indigo-600 transition-all font-medium disabled:opacity-40"
                                >
                                    {option.label}
                                </button>
                            ))}
                        </div>

                        <div className="relative">
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={handleKeyDown}
                                maxLength={MAX_INPUT_LENGTH}
                                placeholder="Escribe tu consulta laboral aquí..."
                                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl py-3 pl-4 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all dark:text-white"
                            />
                            <button
                                onClick={() => handleSend()}
                                disabled={!inputValue.trim() || isTyping}
                                className="absolute right-2 top-1.5 p-1.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-30 disabled:hover:bg-indigo-600 transition-all shadow-md active:scale-90"
                            >
                                <Send className="w-5 h-5" />
                            </button>
                        </div>
                        <p className="text-[9px] text-center text-slate-400 mt-2">Basado en el Texto Definitivo de la Ley sancionada el 12/02/2026</p>
                    </div>
                </div>
            )}
        </>
    );
};

export default ChatBot;
