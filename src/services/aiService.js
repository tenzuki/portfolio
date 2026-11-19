import { AI_SYSTEM_PROMPT } from '../data/parthivData.js';

const OPENROUTER_API_KEY = 
    (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_OPENROUTER_API_KEY) ? import.meta.env.VITE_OPENROUTER_API_KEY : '';

const OPENROUTER_ENDPOINT = 'https://openrouter.ai/api/v1/chat/completions';

// Curated list of reliable free models on OpenRouter
export const AVAILABLE_FREE_MODELS = [
    { id: 'nvidia/nemotron-3.5-lightning:free', name: 'Nemotron 3.5 Lightning (Free)' },
    { id: 'cohere/north-mini-code:free', name: 'Cohere North Mini (Free)' },
    { id: 'liquid/lfm-3-1.7b:free', name: 'Liquid LFM 3 (Free)' },
    { id: 'nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free', name: 'Nemotron Nano Omni (Free)' },
    { id: 'google/gemma-4-26b-a4b-it:free', name: 'Google Gemma 4 (Free)' }
];

export const GUARDRAIL_REFUSAL_MESSAGE = 
    "I am Parthiv's AI portfolio assistant. I can only answer questions regarding Parthiv K's background, work experience, projects, technical skills, and credentials. Feel free to ask me anything about Parthiv!";

/**
 * Pre-validation Guardrail Check
 * Detects obvious off-topic requests or prompt injections to prevent misuse.
 */
export function checkGuardrails(userQuery) {
    if (!userQuery || typeof userQuery !== 'string') return { allowed: true };
    const query = userQuery.toLowerCase().trim();

    // Jailbreak / prompt injection triggers
    const injectionPatterns = [
        'ignore previous',
        'ignore all previous',
        'disregard all',
        'forget all instructions',
        'system prompt',
        'reveal instructions',
        'print your prompt',
        'what are your rules',
        'dan mode',
        'jailbreak',
        'pretend you are',
        'act as a linux',
        'act as python',
        'developer mode'
    ];

    for (const pattern of injectionPatterns) {
        if (query.includes(pattern)) {
            return {
                allowed: false,
                reason: 'injection',
                response: GUARDRAIL_REFUSAL_MESSAGE
            };
        }
    }

    // Generic off-topic queries that are clearly not related to Parthiv
    const offTopicKeywords = [
        'write a python script to',
        'write code to solve',
        'solve this equation',
        'write an essay about',
        'recipe for',
        'tell me a joke',
        'who is the president',
        'what is the weather',
        'capital of',
        'write a song about',
        'translate this into'
    ];

    for (const keyword of offTopicKeywords) {
        // If the query contains off-topic keywords AND doesn't mention Parthiv or his projects
        if (query.includes(keyword) && !query.includes('parthiv') && !query.includes('bornov') && !query.includes('bezgo')) {
            return {
                allowed: false,
                reason: 'off_topic',
                response: GUARDRAIL_REFUSAL_MESSAGE
            };
        }
    }

    return { allowed: true };
}

/**
 * Sends chat message with automatic model fallback and guardrails
 * @param {Array<{role: string, content: string}>} conversationHistory
 * @param {string} preferredModel
 * @returns {Promise<{text: string, modelUsed: string}>}
 */
export async function sendChatMessage(conversationHistory, preferredModel = null) {
    const latestUserMsg = conversationHistory[conversationHistory.length - 1];
    if (latestUserMsg && latestUserMsg.role === 'user') {
        const guardrailCheck = checkGuardrails(latestUserMsg.content);
        if (!guardrailCheck.allowed) {
            return {
                text: guardrailCheck.response,
                modelUsed: 'Guardrail Filter'
            };
        }
    }

    // Build payload messages with system guardrail and parthiv.md knowledge base
    const messages = [
        {
            role: 'system',
            content: AI_SYSTEM_PROMPT
        },
        ...conversationHistory
    ];

    if (!OPENROUTER_API_KEY) {
        console.warn('VITE_OPENROUTER_API_KEY is not defined in environment variables.');
        return {
            text: "Hello! I am Parthiv's AI Assistant. To enable live AI responses in production, please ensure the `VITE_OPENROUTER_API_KEY` environment variable is set. In the meantime, Parthiv is a Full Stack Developer & Tech Lead at Bornov Technologies LLP with extensive production experience across React, Flutter, Python, and AI integrations!",
            modelUsed: 'Local Fallback'
        };
    }

    // Build model try-order: preferred model first, then the rest of the free models
    const modelsToTry = preferredModel 
        ? [preferredModel, ...AVAILABLE_FREE_MODELS.map(m => m.id).filter(id => id !== preferredModel)]
        : AVAILABLE_FREE_MODELS.map(m => m.id);

    let lastError = null;

    for (const modelId of modelsToTry) {
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 12000); // 12s timeout

            const response = await fetch(OPENROUTER_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
                    'Content-Type': 'application/json',
                    'HTTP-Referer': 'https://portfolioparthiv.vercel.app',
                    'X-Title': 'Parthiv K Portfolio AI'
                },
                body: JSON.stringify({
                    model: modelId,
                    messages: messages,
                    temperature: 0.3, // Low temperature for factual fidelity
                    max_tokens: 600
                }),
                signal: controller.signal
            });

            clearTimeout(timeoutId);

            if (!response.ok) {
                const errText = await response.text();
                console.warn(`Model ${modelId} failed (${response.status}):`, errText);
                lastError = new Error(`Status ${response.status}: ${errText}`);
                continue; // Try next free model in list
            }

            const data = await response.json();
            const reply = data.choices?.[0]?.message?.content;

            if (reply && reply.trim().length > 0) {
                return {
                    text: reply.trim(),
                    modelUsed: modelId
                };
            }
        } catch (err) {
            console.warn(`Request failed for model ${modelId}:`, err.message);
            lastError = err;
        }
    }

    // If all models failed or network is unreachable
    console.error('All AI models failed:', lastError);
    return {
        text: `I'm currently having trouble connecting to the free AI providers. Please feel free to reach out to Parthiv directly via email at parthiv.kp28@gmail.com or explore the portfolio sections above!`,
        modelUsed: 'Fallback System'
    };
}
