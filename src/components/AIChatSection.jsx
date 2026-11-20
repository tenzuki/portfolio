import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
    Sparkles, 
    Send, 
    RotateCcw, 
    Copy, 
    Check, 
    ArrowRight 
} from 'lucide-react';
import TiltCard from './TiltCard';
import CreepyEyeButton from './CreepyEyeButton';
import { sendChatMessage } from '../services/aiService.js';
import './AIChatSection.css';

// Lightweight in-page markdown renderer
const FormattedMessage = ({ content }) => {
    if (!content) return null;
    const lines = content.split('\n');

    return (
        <div className="formatted-text">
            {lines.map((line, idx) => {
                const trimmed = line.trim();
                if (!trimmed) {
                    return <div key={idx} style={{ height: '0.35rem' }} />;
                }

                if (trimmed.startsWith('### ')) {
                    return (
                        <h4 key={idx} style={{ margin: '0.75rem 0 0.25rem 0', color: '#64b5f6', fontSize: '0.98rem', fontWeight: 700 }}>
                            <span dangerouslySetInnerHTML={{ __html: parseInline(trimmed.substring(4)) }} />
                        </h4>
                    );
                }

                if (trimmed.startsWith('## ')) {
                    return (
                        <h3 key={idx} style={{ margin: '0.85rem 0 0.35rem 0', color: '#ffffff', fontSize: '1.08rem', fontWeight: 800 }}>
                            <span dangerouslySetInnerHTML={{ __html: parseInline(trimmed.substring(3)) }} />
                        </h3>
                    );
                }

                if (trimmed.startsWith('- ') || trimmed.startsWith('* ') || trimmed.startsWith('• ')) {
                    const text = trimmed.substring(2);
                    return (
                        <li key={idx} style={{ marginLeft: '1.2rem', marginBottom: '0.2rem', listStyleType: 'disc' }}>
                            <span dangerouslySetInnerHTML={{ __html: parseInline(text) }} />
                        </li>
                    );
                }

                const numberMatch = trimmed.match(/^(\d+)\.\s(.*)/);
                if (numberMatch) {
                    return (
                        <li key={idx} style={{ marginLeft: '1.2rem', marginBottom: '0.2rem', listStyleType: 'decimal' }}>
                            <span dangerouslySetInnerHTML={{ __html: parseInline(numberMatch[2]) }} />
                        </li>
                    );
                }

                return (
                    <p key={idx} style={{ margin: '0.25rem 0', lineHeight: '1.6' }}>
                        <span dangerouslySetInnerHTML={{ __html: parseInline(trimmed) }} />
                    </p>
                );
            })}
        </div>
    );
};

function parseInline(str) {
    let html = str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');

    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" style="text-decoration: underline; color: #64b5f6;">$1</a>');
    html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

    return html;
}

const AIChatSection = () => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const yTitle = useTransform(scrollYProgress, [0, 1], ["50%", "-50%"]);

    const initialGreeting = {
        role: 'assistant',
        content: "Hello! I am **Parthiv's AI Assistant**. Ask me anything about his current work as **Full Stack Developer & Tech Lead at Bornov Technologies LLP**, his previous startup experience at **BezgoFresh**, his **15+ GitHub projects**, or his technical capabilities.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const [messages, setMessages] = useState([initialGreeting]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [copiedIndex, setCopiedIndex] = useState(null);

    const messagesContainerRef = useRef(null);
    const inputRef = useRef(null);

    const suggestions = [
        "Current Tech Lead role at Bornov Technologies?",
        "Production applications built at BezgoFresh?",
        "Core technical skills & full-stack stacks?",
        "Top GitHub projects & AI architectures?"
    ];

    // Scroll ONLY the internal messages container, NEVER the window/webpage
    useEffect(() => {
        if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTo({
                top: messagesContainerRef.current.scrollHeight,
                behavior: 'smooth'
            });
        }
    }, [messages, loading]);

    const handleSend = async (customText = null) => {
        const textToSend = (customText || input).trim();
        if (!textToSend || loading) return;

        const userMsg = {
            role: 'user',
            content: textToSend,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        const updatedHistory = [...messages, userMsg];
        setMessages(updatedHistory);
        setInput('');
        setLoading(true);

        try {
            const apiHistory = updatedHistory.map(m => ({
                role: m.role,
                content: m.content
            }));

            const result = await sendChatMessage(apiHistory);

            setMessages(prev => [
                ...prev,
                {
                    role: 'assistant',
                    content: result.text,
                    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                }
            ]);
        } catch (_err) {
            setMessages(prev => [
                ...prev,
                {
                    role: 'assistant',
                    content: "I'm having a brief connection pause. Please feel free to reach out directly to Parthiv at parthiv.kp28@gmail.com!",
                    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                }
            ]);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = (e) => {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        handleSend();
    };

    const handleReset = () => {
        setMessages([
            {
                role: 'assistant',
                content: "Conversation cleared. How can I assist you with Parthiv's background or projects today?",
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }
        ]);
    };

    const handleCopy = (text, index) => {
        navigator.clipboard.writeText(text);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
    };

    return (
        <section id="ai-assistant" className="ai-section" ref={ref}>
            <div className="section-container">
                <motion.div
                    style={{ y: yTitle }}
                    className="section-header"
                >
                    <span className="section-label">04 / INTELLIGENCE</span>
                    <h2>Live <em className="serif-accent">Assistant</em></h2>
                    <p>INTERACTIVE PORTFOLIO CONSOLE</p>
                </motion.div>

                <div className="ai-section-grid">
                    {/* Left Column: Interactive Info Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, type: "spring" }}
                        className="ai-info-wrapper"
                    >
                        <TiltCard className="ai-info-card">
                            <div className="ai-info-top">
                                <div className="ai-status-row">
                                    <div className="ai-avatar-badge">
                                        <div className="ai-avatar-icon">
                                            <img src="/assets/logo.png" alt="Parthiv AI" />
                                        </div>
                                        <div>
                                            <h4>Parthiv AI</h4>
                                            <span>Official Assistant</span>
                                        </div>
                                    </div>
                                    <div className="ai-pulse-pill">
                                        <span className="pulse-circle" />
                                        Active &amp; Ready
                                    </div>
                                </div>

                                <h3 className="ai-info-title">Direct Answers in Real Time</h3>
                                <p className="ai-info-desc">
                                    Inquire about Parthiv's engineering at Bornov Technologies, production applications at BezgoFresh, 15+ repositories, or his full-stack &amp; AI expertise.
                                </p>

                                <div className="ai-suggestions-title">
                                    <Sparkles size={15} color="#64b5f6" />
                                    <span>Prompt Suggestions</span>
                                </div>

                                <div className="ai-chips-list">
                                    {suggestions.map((query, index) => (
                                        <button
                                            key={index}
                                            type="button"
                                            className="ai-prompt-chip"
                                            onClick={() => handleSend(query)}
                                        >
                                            <span>{query}</span>
                                            <ArrowRight size={15} className="chip-arrow" />
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="ai-features-row">
                                <span className="ai-feat-tag">⚡ Instant Answers</span>
                                <span className="ai-feat-tag">💼 Verified Background</span>
                                <span className="ai-feat-tag">🚀 Production Proven</span>
                            </div>
                        </TiltCard>
                    </motion.div>

                    {/* Right Column: Solid Interactive Console Window */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, type: "spring", delay: 0.2 }}
                        className="ai-console-wrapper"
                    >
                        <div className="ai-console" data-lenis-prevent="true">
                            {/* Top Bar */}
                            <div className="console-topbar">
                                <div className="console-dots">
                                    <span className="dot dot-red" />
                                    <span className="dot dot-yellow" />
                                    <span className="dot dot-green" />
                                </div>
                                <div className="console-title-wrap">
                                    <Sparkles size={15} color="#64b5f6" />
                                    <span>Live Portfolio Assistant</span>
                                </div>
                                <CreepyEyeButton
                                    onClick={handleReset}
                                    variant="dark"
                                    size="sm"
                                    title="Clear conversation"
                                >
                                    <RotateCcw size={13} /> Clear
                                </CreepyEyeButton>
                            </div>

                            {/* Messages Scroll View */}
                            <div className="console-messages" ref={messagesContainerRef} data-lenis-prevent="true">
                                {messages.map((msg, index) => (
                                    <div key={index} className={`c-msg c-msg-${msg.role}`}>
                                        <div className="c-bubble">
                                            <FormattedMessage content={msg.content} />
                                        </div>
                                        <div className="c-msg-meta">
                                            <span>{msg.timestamp}</span>
                                            {msg.role === 'assistant' && (
                                                <button
                                                    type="button"
                                                    style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', padding: 0, marginLeft: '6px' }}
                                                    onClick={() => handleCopy(msg.content, index)}
                                                    title="Copy response"
                                                >
                                                    {copiedIndex === index ? <Check size={12} color="#00ff88" /> : <Copy size={12} />}
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))}

                                {loading && (
                                    <div className="c-msg c-msg-assistant">
                                        <div className="c-bubble c-typing-bubble">
                                            <div className="c-dot" />
                                            <div className="c-dot" />
                                            <div className="c-dot" />
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Native Form Input Bar */}
                            <form 
                                className="console-input-bar" 
                                onSubmit={handleSubmit} 
                                data-lenis-prevent="true"
                            >
                                <input
                                    ref={inputRef}
                                    type="text"
                                    className="c-input"
                                    placeholder="Ask anything about Parthiv..."
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            handleSend();
                                        }
                                    }}
                                    disabled={loading}
                                />
                                <CreepyEyeButton
                                    type="button"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        handleSend();
                                    }}
                                    variant="primary"
                                    size="icon"
                                    disabled={!input.trim() || loading}
                                    title="Send Message"
                                    aria-label="Send Message"
                                >
                                    <Send size={18} color="#000000" />
                                </CreepyEyeButton>
                            </form>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default AIChatSection;
