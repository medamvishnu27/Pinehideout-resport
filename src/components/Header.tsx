/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Sparkles, Menu, X, Calendar } from 'lucide-react';
import { PROPERTY_CONFIG } from '../data/pineHideoutContent';

export type ActiveTab = 'home' | 'rooms' | 'treks' | 'gallery' | 'about' | 'reach' | 'policies-faq' | 'booking';

interface HeaderProps {
  activeTab: ActiveTab;
  onNavigate: (tab: ActiveTab) => void;
  onOpenAssistant: () => void;
  onStartBooking: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onNavigate,
  onOpenAssistant,
  onStartBooking,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { id: ActiveTab; label: string }[] = [
    { id: 'rooms', label: 'Rooms' },
    { id: 'treks', label: 'Treks' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'about', label: 'Our Story' },
    { id: 'reach', label: 'How to Reach' },
    { id: 'policies-faq', label: 'Policies & FAQ' },
  ];

  const handleNavClick = (tab: ActiveTab) => {
    onNavigate(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-[#fbf9f4]/95 backdrop-blur-md border-b border-[#1a3428]/10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => handleNavClick('home')}
          className="text-left group cursor-pointer focus:outline-none"
          aria-label="Pine Hideout Home"
        >
          <span className="font-serif text-2xl sm:text-2xl font-semibold tracking-tight text-[#12241b] group-hover:text-[#c67d4e] transition-colors">
            {PROPERTY_CONFIG.brand.name}
          </span>
        </button>

        {/* Zone 2: 4–6 clean text navigation links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#1e2320]/80">
          {navLinks.map((link) => {
            const isActive = activeTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`transition-colors py-1 cursor-pointer whitespace-nowrap relative ${
                  isActive
                    ? 'text-[#12241b] font-semibold'
                    : 'hover:text-[#12241b] text-[#1e2320]/75'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#c67d4e] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1–2 primary actions */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* AI Assistant Quick Trigger */}
          <button
            onClick={onOpenAssistant}
            className="flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-medium text-[#12241b] bg-[#eadecb]/50 hover:bg-[#eadecb] border border-[#1a3428]/15 rounded-md transition-all whitespace-nowrap cursor-pointer"
            aria-label="Open Property & Trek Assistant"
            title="Chat with property and trek assistant"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#c67d4e]" />
            <span className="hidden sm:inline">Ask</span> Assistant
          </button>

          {/* Primary Booking CTA */}
          <button
            onClick={() => {
              onStartBooking();
              setMobileMenuOpen(false);
            }}
            className="flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-medium text-[#fbf9f4] bg-[#1a3428] hover:bg-[#12241b] rounded-md transition-colors shadow-xs whitespace-nowrap cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Book a Stay</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#12241b] hover:bg-[#f0e8db] rounded-md transition-colors cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#fbf9f4] border-b border-[#1a3428]/15 px-4 pt-3 pb-6 shadow-lg">
          <div className="flex flex-col gap-2">
            <button
              onClick={() => handleNavClick('home')}
              className={`text-left px-3 py-2 text-base font-medium rounded-md cursor-pointer ${
                activeTab === 'home' ? 'bg-[#1a3428]/10 text-[#12241b] font-semibold' : 'text-[#1e2320]/80'
              }`}
            >
              Home Overview
            </button>
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`text-left px-3 py-2 text-base font-medium rounded-md cursor-pointer ${
                  activeTab === link.id ? 'bg-[#1a3428]/10 text-[#12241b] font-semibold' : 'text-[#1e2320]/80'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-[#1a3428]/10 flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAssistant();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-[#12241b] bg-[#eadecb] rounded-md"
            >
              <Sparkles className="w-4 h-4 text-[#c67d4e]" />
              Property & Trek Assistant
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onStartBooking();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-[#1a3428] rounded-md"
            >
              <Calendar className="w-4 h-4" />
              Demo Booking Journey
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
