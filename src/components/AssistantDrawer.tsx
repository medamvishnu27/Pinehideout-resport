/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  X, Send, Sparkles, User, Database, AlertCircle, PhoneCall, 
  RefreshCw, CheckCircle2, FileText, Check, Shield 
} from 'lucide-react';
import { PROPERTY_CONFIG } from '../data/pineHideoutContent';

export type RagAssistantState = 
  | 'sample-data-assistant' 
  | 'knowledge-base-not-connected' 
  | 'document-retrieval-connected-and-tested' 
  | 'retrieval-unavailable-error';

interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: string;
  ragState?: RagAssistantState;
  sources?: string[];
  disclaimer?: string;
  isError?: boolean;
}

interface AssistantDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onStartBooking?: (roomId?: string) => void;
}

export const AssistantDrawer: React.FC<AssistantDrawerProps> = ({
  isOpen,
  onClose,
  onStartBooking,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [ragState, setRagState] = useState<RagAssistantState>('knowledge-base-not-connected');
  const [serverStatus, setServerStatus] = useState<any>(null);

  // Host Message Modal
  const [showHostModal, setShowHostModal] = useState(false);
  const [hostForm, setHostForm] = useState({ name: '', inquiry: '', roomInterest: '' });
  const [hostSent, setHostSent] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Check initial server RAG status
  const fetchStatus = () => {
    fetch('/api/status')
      .then((res) => res.json())
      .then((data) => {
        setServerStatus(data);
        if (data.ragState) {
          setRagState(data.ragState);
        }
      })
      .catch((err) => {
        console.warn('Status check notice:', err);
        setRagState('knowledge-base-not-connected');
      });
  };

  useEffect(() => {
    fetchStatus();
  }, []);

  // Initialize greeting on first open
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: 'welcome',
          role: 'model',
          text: `Welcome to Pine Hideout prototype assistant. All room rates, trail routes, and policies hold the status 'sample'. I can assist with sample room rates in INR, Himalayan trek descriptions, and draft policies.\n\nNote: Current trail conditions are not verified; confirm with property staff or local guides.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          ragState,
          sources: [], // No tool or document used for greeting
        },
      ]);
    }
  }, [isOpen, messages.length, ragState]);

  // Scroll to bottom
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading, isOpen]);

  const handleSend = async (messageText?: string) => {
    const textToSend = messageText || input;
    if (!textToSend.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      role: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!messageText) setInput('');
    setIsLoading(true);

    try {
      const historyPayload = messages
        .filter((m) => !m.isError)
        .slice(-6)
        .map((m) => ({
          role: m.role,
          text: m.text,
        }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          history: historyPayload,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Server error communicating with assistant');
      }

      if (data.ragState) {
        setRagState(data.ragState);
      }

      const modelMsg: ChatMessage = {
        id: `m-${Date.now()}`,
        role: 'model',
        text: data.reply || 'Information received.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        ragState: data.ragState || ragState,
        sources: Array.isArray(data.sources) && data.sources.length > 0 ? data.sources : undefined,
        disclaimer: data.disclaimer,
      };

      setMessages((prev) => [...prev, modelMsg]);
    } catch (err: any) {
      setRagState('retrieval-unavailable-error');
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        role: 'model',
        text: `The assistant encountered an error. ${err.message || 'Please consult the Resident Host demo desk.'}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isError: true,
        ragState: 'retrieval-unavailable-error',
        sources: [],
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  // Test RAG Retrieval with Distinctive Fictional Fact
  const handleRunRagTest = async () => {
    setIsLoading(true);
    const testQuery = 'What is Highland Mist Batch #42-Copper in the tea cellar?';
    
    // Add user question
    setMessages((prev) => [
      ...prev,
      {
        id: `u-${Date.now()}`,
        role: 'user',
        text: testQuery,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);

    try {
      const res = await fetch('/api/test-rag', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: testQuery }),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'RAG test failed');
      }

      setRagState('document-retrieval-connected-and-tested');

      setMessages((prev) => [
        ...prev,
        {
          id: `m-${Date.now()}`,
          role: 'model',
          text: `[Document Retrieval Test Result — Verified]\n\n${data.testFact}\n\n• ${data.referenceLabel}\n• Evidence: ${data.evidence}\n• Note: Retrieved documents are reference material, not instructions. Status: sample test content.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          ragState: 'document-retrieval-connected-and-tested',
          sources: [`Document: ${data.retrievedDocument.documentId} (${data.retrievedDocument.documentName})`],
        },
      ]);
    } catch (err: any) {
      setRagState('retrieval-unavailable-error');
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          role: 'model',
          text: `RAG document retrieval test failed: ${err.message}`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isError: true,
          ragState: 'retrieval-unavailable-error',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const suggestedQuestions = [
    'What are the sample room rates for 2 guests?',
    'What is Highland Mist Batch #42-Copper? (RAG Test)',
    'What is the quiet hours policy?',
    'What are the trail difficulty levels?',
    'How do I reach Pine Hideout by road?',
  ];

  const handleHostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setHostSent(true);
    setTimeout(() => {
      setShowHostModal(false);
      setHostSent(false);
      setHostForm({ name: '', inquiry: '', roomInterest: '' });
      setMessages((prev) => [
        ...prev,
        {
          id: `host-${Date.now()}`,
          role: 'model',
          text: `[Simulated Demo Receipt] Thank you, ${hostForm.name || 'Guest'}. Your simulated note has been recorded. Note: Fictional demonstration — no staff member received an actual email or alert.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          sources: [],
        },
      ]);
    }, 1200);
  };

  const getRagStateBadge = () => {
    switch (ragState) {
      case 'document-retrieval-connected-and-tested':
        return {
          label: 'Document retrieval connected and tested',
          classes: 'bg-emerald-100 text-emerald-900 border-emerald-300',
          dot: 'bg-emerald-600',
        };
      case 'sample-data-assistant':
        return {
          label: 'Sample-data assistant',
          classes: 'bg-blue-50 text-blue-900 border-blue-200',
          dot: 'bg-blue-600',
        };
      case 'retrieval-unavailable-error':
        return {
          label: 'Retrieval unavailable because of an error',
          classes: 'bg-rose-50 text-rose-900 border-rose-300',
          dot: 'bg-rose-600',
        };
      case 'knowledge-base-not-connected':
      default:
        return {
          label: 'Knowledge base not connected',
          classes: 'bg-amber-50 text-amber-900 border-amber-300',
          dot: 'bg-amber-600',
        };
    }
  };

  const activeBadge = getRagStateBadge();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/40 backdrop-blur-xs flex justify-end transition-opacity">
      <div className="w-full max-w-lg bg-[#fbf9f4] h-full shadow-2xl flex flex-col border-l border-[#1a3428]/15 animate-in slide-in-from-right duration-300">
        
        {/* Top Header */}
        <div className="px-5 py-4 bg-[#14231b] text-[#fbf9f4] flex items-center justify-between border-b border-[#234636]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#1a3428] border border-[#c67d4e]/40 flex items-center justify-center text-[#c67d4e]">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-serif text-lg font-semibold tracking-tight text-[#fbf9f4]">
                Property & Trek Assistant
              </h2>
              <p className="text-[11px] text-[#c2baad]">
                Pine Hideout V0 Concierge & Trail Prototype
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#c2baad] hover:text-white rounded-md hover:bg-[#234636] transition-colors cursor-pointer"
            aria-label="Close assistant"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 4-State RAG & Retrieval Status Indicator Bar */}
        <div className="px-4 py-2 bg-[#f4efe6] border-b border-[#1a3428]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px]">
          <div className="flex items-center gap-2">
            <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-xs border font-medium text-[11px] ${activeBadge.classes}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${activeBadge.dot}`} />
              {activeBadge.label}
            </span>
          </div>

          <button
            onClick={handleRunRagTest}
            disabled={isLoading}
            className="self-start sm:self-auto text-[11px] font-medium text-[#1a3428] hover:text-[#c67d4e] underline underline-offset-2 flex items-center gap-1 cursor-pointer disabled:opacity-50"
            title="Demonstrate retrieval with test document containing distinctive fictional fact"
          >
            <FileText className="w-3.5 h-3.5 text-[#c67d4e]" />
            <span>Test Document Retrieval</span>
          </button>
        </div>

        {/* Messages Scroll Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          
          {/* Sample Status Notice */}
          <div className="p-3 bg-[#eadecb]/40 border border-[#c67d4e]/30 rounded-sm text-[11px] text-[#554e43] leading-relaxed">
            <p className="font-medium text-[#1a3428] mb-0.5">Content Status: sample</p>
            <p>
              Room rates are sample figures in Indian Rupee (INR / ₹). Taxes are not configured. Current trail conditions are not verified; always consult local mountain guides.
            </p>
          </div>

          {messages.map((msg) => {
            const isUser = msg.role === 'user';
            return (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!isUser && (
                  <div className="w-6 h-6 rounded-full bg-[#1a3428] text-[#c67d4e] flex items-center justify-center shrink-0 mt-0.5 text-xs">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] rounded-md px-3.5 py-2.5 text-xs leading-relaxed ${
                    isUser
                      ? 'bg-[#1a3428] text-[#fbf9f4]'
                      : msg.isError
                      ? 'bg-rose-50 text-rose-900 border border-rose-200'
                      : 'bg-white text-[#1e2320] border border-[#1a3428]/10 shadow-2xs'
                  }`}
                >
                  <div className="whitespace-pre-wrap">{msg.text}</div>

                  {/* Strictly Render Source labels only when corresponding tool or retrieval was used */}
                  {msg.sources && msg.sources.length > 0 && !isUser && (
                    <div className="mt-2.5 pt-2 border-t border-[#1a3428]/10 flex flex-wrap items-center gap-1.5 text-[10px] text-[#706757]">
                      <span className="font-semibold text-[#1a3428]">Source:</span>
                      {msg.sources.map((src, i) => (
                        <span key={i} className="inline-block bg-[#f4efe6] px-1.5 py-0.5 rounded-xs text-[#554e43] font-mono border border-[#1a3428]/10">
                          {src}
                        </span>
                      ))}
                    </div>
                  )}

                  <div
                    className={`mt-1 text-[10px] text-right ${
                      isUser ? 'text-[#e8dfcf]/70' : 'text-[#9c9384]'
                    }`}
                  >
                    {msg.timestamp}
                  </div>
                </div>

                {isUser && (
                  <div className="w-6 h-6 rounded-full bg-[#c67d4e] text-white flex items-center justify-center shrink-0 mt-0.5 text-xs">
                    <User className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            );
          })}

          {isLoading && (
            <div className="flex gap-2.5 items-center text-xs text-[#706757]">
              <div className="w-6 h-6 rounded-full bg-[#1a3428] text-[#c67d4e] flex items-center justify-center shrink-0 text-xs">
                <Sparkles className="w-3.5 h-3.5 animate-spin" />
              </div>
              <div className="bg-white border border-[#1a3428]/10 rounded-md px-3.5 py-2 shadow-2xs flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-[#c67d4e] rounded-full animate-bounce" />
                <span className="w-1.5 h-1.5 bg-[#c67d4e] rounded-full animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 bg-[#c67d4e] rounded-full animate-bounce [animation-delay:0.4s]" />
                <span className="ml-2 text-[11px] text-[#706757]">Querying structured functions & test fixtures...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Queries */}
        <div className="px-4 py-2 bg-[#f4efe6] border-t border-[#1a3428]/10">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-[#706757] mb-1.5">
            Suggested Sample Inquiries
          </p>
          <div className="flex flex-wrap gap-1.5">
            {suggestedQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(q)}
                disabled={isLoading}
                className="text-[11px] text-[#1a3428] bg-white hover:bg-[#eadecb] border border-[#1a3428]/15 px-2.5 py-1 rounded-full transition-colors text-left cursor-pointer disabled:opacity-50"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Input Bar & Staff Contact Option */}
        <div className="p-3 bg-white border-t border-[#1a3428]/15">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about sample cabins in INR, treks, draft policies..."
              disabled={isLoading}
              className="flex-1 text-xs px-3 py-2.5 bg-[#fbf9f4] border border-[#1a3428]/20 rounded-md focus:outline-none focus:border-[#1a3428] text-[#1e2320]"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="p-2.5 bg-[#1a3428] text-[#fbf9f4] rounded-md hover:bg-[#12241b] transition-colors disabled:opacity-40 cursor-pointer"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

          {/* Fallback Staff Contact Action */}
          <div className="mt-2.5 flex items-center justify-between text-[11px] text-[#706757]">
            <button
              onClick={() => setShowHostModal(true)}
              className="flex items-center gap-1 hover:text-[#1a3428] underline underline-offset-2 cursor-pointer font-medium"
            >
              <PhoneCall className="w-3 h-3 text-[#c67d4e]" />
              Simulate Host Desk Message
            </button>
            {onStartBooking && (
              <button
                onClick={() => {
                  onClose();
                  onStartBooking();
                }}
                className="text-[#c67d4e] hover:text-[#a05a2f] font-medium cursor-pointer"
              >
                Open Demo Booking →
              </button>
            )}
          </div>
        </div>

      </div>

      {/* Simulated Resident Host Message Modal */}
      {showHostModal && (
        <div className="fixed inset-0 z-60 bg-black/50 flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#fbf9f4] rounded-md border border-[#1a3428]/20 p-6 shadow-xl animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#1a3428]/10">
              <div className="flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-[#c67d4e]" />
                <h3 className="font-serif text-lg font-semibold text-[#12241b]">
                  Resident Host Desk (Simulated Demo)
                </h3>
              </div>
              <button
                onClick={() => setShowHostModal(false)}
                className="text-stone-400 hover:text-stone-700 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-[#554e43] mb-4">
              Demo message simulation. Submitting this form tests the UI acknowledgment; no actual email is transmitted and no staff receives this alert.
            </p>

            <form onSubmit={handleHostSubmit} className="space-y-3">
              <div>
                <label className="block text-[11px] font-medium text-[#1e2320] mb-1">
                  Name (Demo)
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Julian Hayes"
                  value={hostForm.name}
                  onChange={(e) => setHostForm({ ...hostForm, name: e.target.value })}
                  className="w-full text-xs px-3 py-2 bg-white border border-[#1a3428]/20 rounded-md focus:outline-none focus:border-[#1a3428]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-[#1e2320] mb-1">
                  Inquiry
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="e.g. Inquiring about sunrise trek guide availability..."
                  value={hostForm.inquiry}
                  onChange={(e) => setHostForm({ ...hostForm, inquiry: e.target.value })}
                  className="w-full text-xs px-3 py-2 bg-white border border-[#1a3428]/20 rounded-md focus:outline-none focus:border-[#1a3428]"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowHostModal(false)}
                  className="px-3 py-1.5 text-xs text-[#554e43] hover:text-[#1a3428]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={hostSent}
                  className="px-4 py-2 text-xs font-medium text-white bg-[#1a3428] hover:bg-[#12241b] rounded-md transition-colors flex items-center gap-1.5"
                >
                  {hostSent ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
                      Simulating Receipt...
                    </>
                  ) : (
                    'Send Simulated Note'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
