import React, { useState, useRef, useEffect } from 'react';
import { Icons, MOCK_ACCOUNTS, MOCK_GOALS } from '../constants';
import { chatWithCompass } from '../services/geminiService';
import { ChatMessage } from '../types';

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '0', role: 'assistant', text: 'Hi! I\'m Compass 🧭. Ask me about your spending, goals, or just how to save money!', timestamp: new Date() }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim()) return;

    const userMsg: ChatMessage = {
        id: Date.now().toString(),
        role: 'user',
        text: input,
        timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
        const responseText = await chatWithCompass(input, MOCK_ACCOUNTS, MOCK_GOALS, messages);
        const aiMsg: ChatMessage = {
            id: (Date.now() + 1).toString(),
            role: 'assistant',
            text: responseText,
            timestamp: new Date()
        };
        setMessages(prev => [...prev, aiMsg]);
    } catch (error) {
        console.error(error);
    } finally {
        setIsTyping(false);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-20 md:bottom-8 right-4 md:right-8 w-14 h-14 rounded-full bg-compass-primary hover:bg-compass-primaryDark text-white shadow-[0_0_20px_rgba(0,96,240,0.5)] flex items-center justify-center z-50 transition-all transform hover:scale-110 ${isOpen ? 'rotate-90 scale-90 bg-compass-secondary' : ''}`}
      >
        {isOpen ? <Icons.X /> : <Icons.MessageCircle />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-36 md:bottom-24 right-4 md:right-8 w-[calc(100%-2rem)] md:w-96 h-[500px] max-h-[70vh] bg-[#0f172a]/95 backdrop-blur-xl border border-compass-secondary/50 rounded-2xl shadow-2xl flex flex-col overflow-hidden z-40 animate-fade-in origin-bottom-right">
            {/* Header */}
            <div className="p-4 border-b border-compass-secondary bg-compass-card/50 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-compass-primary/20 flex items-center justify-center text-compass-primary">
                    <Icons.Sparkles />
                </div>
                <div>
                    <h3 className="font-bold text-white text-sm">Compass AI</h3>
                    <p className="text-xs text-green-400 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span>
                        Online
                    </p>
                </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                            msg.role === 'user' 
                            ? 'bg-compass-primary text-white rounded-tr-sm' 
                            : 'bg-compass-secondary text-gray-200 rounded-tl-sm'
                        }`}>
                            {msg.text}
                        </div>
                    </div>
                ))}
                {isTyping && (
                     <div className="flex justify-start">
                        <div className="bg-compass-secondary rounded-2xl rounded-tl-sm px-4 py-3 flex gap-1">
                            <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></span>
                            <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-75"></span>
                            <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-150"></span>
                        </div>
                     </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form onSubmit={handleSend} className="p-3 bg-compass-bg/50 border-t border-compass-secondary">
                <div className="relative flex items-center">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask about your finances..."
                        className="w-full bg-compass-secondary text-white rounded-xl py-3 pl-4 pr-12 text-sm focus:outline-none focus:ring-1 focus:ring-compass-primary transition-all placeholder-compass-muted"
                    />
                    <button 
                        type="submit" 
                        disabled={!input.trim()}
                        className="absolute right-2 p-2 bg-compass-primary/20 hover:bg-compass-primary text-compass-primary hover:text-white rounded-lg transition-colors disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-compass-primary"
                    >
                        <Icons.Send />
                    </button>
                </div>
            </form>
        </div>
      )}
    </>
  );
};

export default ChatWidget;