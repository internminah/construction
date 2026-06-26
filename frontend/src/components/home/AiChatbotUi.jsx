"use client";

import { useState, useEffect, useRef } from "react";
import { X } from "@/components/common/Icons";


const MessageSquare = ({ className, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

const Send = ({ className, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);


export default function AiChatbotUi({ companyInfo }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: "msg-init",
      sender: "bot",
      text: "Hello! Welcome to I Constructions. How can I help you build your dream project today?",
      time: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll messages list to the bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isTyping]);

  const quickChips = [
    { label: "Request a quote", value: "quote" },
    { label: "Our services", value: "services" },
    { label: "Completed projects", value: "projects" },
    { label: "Office contact details", value: "contact" },
  ];

  // Tailored chatbot answers
  const botAnswers = {
    quote: `You can request an official price estimation using the "Request a Project Quotation" form on this home page! Simply scroll down to the estimation section or click the primary CTAs at the top.`,
    services: `I Constructions delivers custom Residential Builds, high-performance Commercial Towers, Bespoke Interiors, Civil Engineering layouts, and full-lifecycle Project Management. Read more on our /services page!`,
    projects: `We have completed over 500 structural commissions, including the 45-story Emerald Heights Skyscraper and private Glass Villas. You can browse them on our /portfolio page.`,
    contact: `Our headquarters is located at ${companyInfo.address}. You can email us at ${companyInfo.email} or call our direct phone line at ${companyInfo.phone}.`,
    default: `Thank you for your message! Our principal architect and cost managers will review this inquiry. For immediate service, please call our office directly at ${companyInfo.phone} or submit our Quotation Form on this page.`,
  };

  const handleSendMessage = (text, type = "custom") => {
    if (!text.trim()) return;

    // Add user message
    const userMsgId = `msg-user-${Date.now()}`;
    const newMessages = [
      ...messages,
      { id: userMsgId, sender: "user", text, time: new Date() },
    ];
    setMessages(newMessages);
    setInputValue("");
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      setIsTyping(false);
      const answerText = botAnswers[type] || botAnswers.default;
      setMessages((prev) => [
        ...prev,
        {
          id: `msg-bot-${Date.now()}`,
          sender: "bot",
          text: answerText,
          time: new Date(),
        },
      ]);
    }, 1000);
  };

  return (
    <>
      {/* Floating Chat Icon (Bottom-Right) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-primary hover:bg-primary-light text-mint flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer relative"
        aria-label="Toggle Chatbot"
      >
        {/* Pulsing alert dot if closed */}
        {!isOpen && (
          <span className="absolute top-0 right-0 w-3.5 h-3.5 rounded-full bg-accent border-2 border-white animate-ping" />
        )}
        <MessageSquare className="h-6 w-6" />
      </button>

      {/* Expandable Chat Window */}
      <div
        className={`fixed right-4 sm:right-6 bottom-24 w-96 max-w-[calc(100vw-2rem)] h-[500px] bg-white rounded-2xl shadow-2xl border border-primary/10 flex flex-col z-40 overflow-hidden transition-all duration-350 ease-out transform ${
          isOpen
            ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
            : "opacity-0 translate-y-8 scale-95 pointer-events-none"
        }`}
      >
        {/* Chat Header */}
        <div className="bg-primary px-5 py-4 flex items-center justify-between text-white">
          <div className="flex items-center gap-3">
            {/* Logo and Status Dot */}
            <div className="relative p-2 rounded-lg bg-white/10 text-accent">
              <MessageSquare className="h-5 w-5" />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-primary" />
            </div>
            <div>
              <h3 className="font-poppins font-bold text-sm leading-none">
                I-Build Assistant
              </h3>
              <span className="font-sans text-[10px] text-accent font-medium uppercase tracking-widest mt-1 inline-block">
                Online Support
              </span>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close Chat"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Message Logs Area */}
        <div className="flex-grow overflow-y-auto p-4 space-y-4 bg-slate-50/50">
          {messages.map((msg) => {
            const isBot = msg.sender === "bot";
            return (
              <div
                key={msg.id}
                className={`flex gap-2.5 max-w-[85%] ${
                  isBot ? "mr-auto" : "ml-auto flex-row-reverse"
                }`}
              >
                {/* Bot Avatar Icon */}
                {isBot && (
                  <div className="h-7 w-7 rounded-full bg-primary/15 text-primary flex items-center justify-center shrink-0 text-xs font-poppins font-bold">
                    iB
                  </div>
                )}
                
                {/* Bubble box */}
                <div
                  className={`rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    isBot
                      ? "bg-white border border-primary/5 text-slate-dark rounded-tl-none shadow-sm"
                      : "bg-primary text-mint rounded-tr-none shadow-sm"
                  }`}
                >
                  <p>{msg.text}</p>
                  <span
                    className={`block text-[9px] mt-1 text-right ${
                      isBot ? "text-slate-light/60" : "text-white/60"
                    }`}
                  >
                    {msg.time.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>
            );
          })}

          {/* Simulated Typing Indicator */}
          {isTyping && (
            <div className="flex gap-2.5 max-w-[80%] mr-auto items-center">
              <div className="h-7 w-7 rounded-full bg-primary/15 text-primary flex items-center justify-center shrink-0 text-xs font-poppins font-bold animate-pulse">
                iB
              </div>
              <div className="bg-white border border-primary/5 rounded-2xl rounded-tl-none px-4 py-3 shadow-sm flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          )}

          {/* Anchor for Auto-scroll */}
          <div ref={messagesEndRef} />
        </div>

        {/* Action Prompt Chips */}
        <div className="px-4 py-2 bg-white border-t border-primary/5 flex gap-2 overflow-x-auto scrollbar-hide py-3">
          {quickChips.map((chip, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(chip.label, chip.value)}
              className="text-xs font-poppins font-semibold text-primary bg-mint hover:bg-mint-dark border border-primary/10 rounded-full py-1.5 px-3 whitespace-nowrap transition-colors cursor-pointer shrink-0"
            >
              {chip.label}
            </button>
          ))}
        </div>

        {/* Message Input Controls */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (inputValue.trim()) {
              handleSendMessage(inputValue, "custom");
            }
          }}
          className="p-3 bg-white border-t border-primary/10 flex gap-2 items-center"
        >
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type a message..."
            className="flex-grow bg-mint/50 border border-primary/10 rounded-lg px-4 py-2 text-sm text-slate-dark focus:outline-none focus:border-primary focus:bg-white transition-all"
          />
          <button
            type="submit"
            disabled={!inputValue.trim()}
            className="p-2.5 rounded-lg bg-primary hover:bg-primary-light text-mint transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            aria-label="Send Message"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>
    </>
  );
}
