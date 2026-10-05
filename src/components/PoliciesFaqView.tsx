/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { PROPERTY_CONFIG } from '../data/pineHideoutContent';
import { ChevronDown, ChevronUp, Search, ShieldCheck, Mail, Send, CheckCircle2, Info } from 'lucide-react';

export const PoliciesFaqView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedFaqId, setExpandedFaqId] = useState<string | null>('f1');

  // Contact Host form
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactTopic, setContactTopic] = useState('Reservation inquiry');
  const [contactMessage, setContactMessage] = useState('');
  const [contactSubmitted, setContactSubmitted] = useState(false);

  const categories = ['all', 'Booking & Reservations', 'Treks & Mountain Life', 'Arrival & Location', 'Policies & Comfort'];

  const filteredFaqs = useMemo(() => {
    return PROPERTY_CONFIG.faqs.filter((faq) => {
      if (selectedCategory !== 'all' && faq.category !== selectedCategory) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return faq.question.toLowerCase().includes(q) || faq.answer.toLowerCase().includes(q);
      }
      return true;
    });
  }, [searchQuery, selectedCategory]);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSubmitted(true);
    setTimeout(() => {
      setContactSubmitted(false);
      setContactName('');
      setContactEmail('');
      setContactMessage('');
    }, 6000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      
      {/* Header */}
      <div className="border-b border-[#1a3428]/10 pb-8">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#706757] mb-2">
          <span>Guest Guidelines</span>
          <span aria-hidden="true">·</span>
          <span>Sanctuary Conduct</span>
          <span aria-hidden="true">·</span>
          <span>Direct Contact</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-semibold text-[#12241b] tracking-tight">
          Policies, FAQs & Host Contact
        </h1>
        <p className="text-sm sm:text-base text-[#554e43] mt-2 max-w-3xl leading-relaxed">
          Clear standards designed to safeguard silence, old-growth pines, and alpine wildlife.
        </p>
      </div>

      {/* 1. Property Policies Grid */}
      <div>
        <div className="flex items-center gap-2 mb-6">
          <ShieldCheck className="w-5 h-5 text-[#c67d4e]" />
          <h2 className="font-serif text-2xl font-semibold text-[#12241b]">
            Sanctuary Operations & Forest Policies
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROPERTY_CONFIG.policies.map((p, idx) => (
            <div
              key={idx}
              className="bg-white border border-[#1a3428]/15 rounded-sm p-6 shadow-2xs space-y-2"
            >
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#c67d4e]">
                0{idx + 1}. Policy
              </span>
              <h3 className="font-serif text-lg font-semibold text-[#12241b]">
                {p.title}
              </h3>
              <p className="text-xs text-[#554e43] leading-relaxed">
                {p.details}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Categorized & Searchable FAQs */}
      <div className="pt-8 border-t border-[#1a3428]/10 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-[#c67d4e] font-semibold">
              Clarifications & Guidance
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#12241b] mt-1">
              Frequently Asked Questions
            </h2>
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search policies or treks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-[#1a3428]/20 rounded-sm focus:outline-none focus:border-[#1a3428]"
            />
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-xs font-medium rounded-sm whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#1a3428] text-white'
                  : 'bg-white text-[#554e43] hover:text-[#12241b] border border-[#1a3428]/10'
              }`}
            >
              {cat === 'all' ? 'All Questions' : cat}
            </button>
          ))}
        </div>

        {/* FAQ Accordions */}
        <div className="space-y-3">
          {filteredFaqs.length === 0 ? (
            <div className="p-8 text-center bg-white border border-[#1a3428]/10 rounded-sm text-xs text-[#706757]">
              No questions found matching your search. Feel free to use the message form below or ask our AI assistant.
            </div>
          ) : (
            filteredFaqs.map((faq) => {
              const isExpanded = expandedFaqId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="bg-white border border-[#1a3428]/15 rounded-sm overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setExpandedFaqId(isExpanded ? null : faq.id)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 hover:bg-[#f4efe6]/40 transition-colors cursor-pointer"
                  >
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#c67d4e] block mb-1">
                        {faq.category}
                      </span>
                      <span className="font-serif text-base sm:text-lg font-semibold text-[#12241b]">
                        {faq.question}
                      </span>
                    </div>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-[#1a3428] shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-stone-400 shrink-0" />
                    )}
                  </button>

                  {isExpanded && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#554e43] leading-relaxed border-t border-[#1a3428]/5 animate-in fade-in">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* 3. Direct Contact Form */}
      <div className="bg-[#f4efe6] border border-[#1a3428]/15 rounded-md p-8 sm:p-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="space-y-3">
            <span className="text-xs font-mono uppercase tracking-wider text-[#c67d4e] font-semibold">
              Direct Coordination
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#12241b]">
              Message the Resident Host Desk
            </h2>
            <p className="text-xs text-[#554e43] leading-relaxed">
              Have specific questions regarding private guided treks, dietary provisions, or accessibility? Send a message to our simulated concierge desk.
            </p>
            <div className="pt-2 text-xs text-[#706757] space-y-1">
              <p><strong>Telephone:</strong> {PROPERTY_CONFIG.contact.phone}</p>
              <p><strong>Email:</strong> {PROPERTY_CONFIG.contact.email}</p>
              <p><strong>Hours:</strong> {PROPERTY_CONFIG.contact.deskHours}</p>
            </div>
          </div>

          <div className="lg:col-span-2">
            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#1e2320] mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Julian Hayes"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    className="w-full text-xs px-3 py-2.5 bg-white border border-[#1a3428]/20 rounded-sm focus:outline-none focus:border-[#1a3428]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#1e2320] mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="julian@example.com"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    className="w-full text-xs px-3 py-2.5 bg-white border border-[#1a3428]/20 rounded-sm focus:outline-none focus:border-[#1a3428]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#1e2320] mb-1">
                  Topic of Inquiry
                </label>
                <select
                  value={contactTopic}
                  onChange={(e) => setContactTopic(e.target.value)}
                  className="w-full text-xs px-3 py-2.5 bg-white border border-[#1a3428]/20 rounded-sm focus:outline-none focus:border-[#1a3428]"
                >
                  <option value="Reservation inquiry">Reservation or Room Inquiry</option>
                  <option value="Guided mountain treks">Guided Mountain Treks & Trail Conditions</option>
                  <option value="Transit and shuttle coordination">Arrival, Transit & Shuttle Scheduling</option>
                  <option value="Dietary preferences">Dietary Preferences or Special Provisioning</option>
                  <option value="General questions">Other Questions</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#1e2320] mb-1">
                  Message Details
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Tell us about your expected dates, fitness level, or questions..."
                  value={contactMessage}
                  onChange={(e) => setContactMessage(e.target.value)}
                  className="w-full text-xs px-3 py-2.5 bg-white border border-[#1a3428]/20 rounded-sm focus:outline-none focus:border-[#1a3428]"
                />
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                <div className="flex items-center gap-2 text-[11px] text-[#706757]">
                  <Info className="w-3.5 h-3.5 text-[#c67d4e] shrink-0" />
                  <span>Simulated demonstration form. No actual email is transmitted.</span>
                </div>

                <button
                  type="submit"
                  className="flex items-center justify-center gap-2 px-6 py-2.5 bg-[#1a3428] hover:bg-[#12241b] text-white text-xs font-semibold rounded-sm transition-colors cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Demo Note</span>
                </button>
              </div>
            </form>

            {contactSubmitted && (
              <div className="mt-4 p-4 bg-emerald-50 border border-emerald-300 rounded-sm text-xs text-emerald-900 flex items-start gap-2.5 animate-in fade-in">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-emerald-950">
                    Simulated Message Received at Resident Host Desk!
                  </p>
                  <p className="mt-0.5 text-emerald-800">
                    Thank you, {contactName || 'Guest'}. In this demo version, your message on "{contactTopic}" was simulated successfully. No external emails are dispatched.
                  </p>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>

    </div>
  );
};
