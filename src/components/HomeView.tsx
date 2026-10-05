/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ArrowRight, Calendar, Sparkles, ChevronRight, AlertTriangle } from 'lucide-react';
import { PROPERTY_CONFIG, SampleRoom, SampleTrek, IMAGES, formatPrice } from '../data/pineHideoutContent';
import { ImageWithFallback } from './ImageWithFallback';
import { ActiveTab } from './Header';

interface HomeViewProps {
  onNavigate: (tab: ActiveTab) => void;
  onOpenRoomModal: (room: SampleRoom) => void;
  onOpenTrekModal: (trek: SampleTrek) => void;
  onNavigateToRoomDetail: (roomId: string) => void;
  onNavigateToExperienceDetail: (trekId: string) => void;
  onStartBookingWithParams: (params: { checkIn: string; checkOut: string; guests: number; roomId?: string }) => void;
  onOpenAssistant: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigate,
  onOpenRoomModal,
  onOpenTrekModal,
  onNavigateToRoomDetail,
  onNavigateToExperienceDetail,
  onStartBookingWithParams,
  onOpenAssistant,
}) => {
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];
  const threeDaysLater = new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0];

  const [checkIn, setCheckIn] = useState(tomorrow);
  const [checkOut, setCheckOut] = useState(threeDaysLater);
  const [guests, setGuests] = useState(2);

  const handleQuickSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onStartBookingWithParams({ checkIn, checkOut, guests });
  };

  return (
    <div className="space-y-20 sm:space-y-28 pb-12">
      
      {/* 1. Hero Section (Static Hero Fallback preserved) */}
      <section className="relative min-h-[82vh] flex items-center justify-center pt-8 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        
        {/* Static Background Fallback */}
        <div className="absolute inset-0 z-0">
          <img
            src={IMAGES.hero}
            alt="Dawn across Western Himalayan pine and deodar forests"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#12241b] via-[#12241b]/65 to-black/35" />
        </div>

        {/* Hero Content Container */}
        <div className="relative z-10 max-w-5xl mx-auto text-center text-[#fbf9f4] space-y-6 pt-10">
          
          <div className="flex items-center justify-center gap-2 text-xs font-mono uppercase tracking-widest text-[#e8dfcf]/90">
            <span>Himalayan Retreat</span>
            <span aria-hidden="true">·</span>
            <span>Status: sample</span>
            <span aria-hidden="true">·</span>
            <span>Version 0 Demo</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.1] text-[#fbf9f4] max-w-4xl mx-auto drop-shadow-sm">
            Solitude among ancient Himalayan pines.
          </h1>

          <p className="text-base sm:text-xl text-[#ede5d6]/90 max-w-2xl mx-auto font-light leading-relaxed">
            Proposed boutique room accommodation and guided mountain treks. Experience our interactive demo booking journey with sample rates in Indian Rupee.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => onNavigate('rooms')}
              className="px-6 py-3 text-sm font-medium text-[#12241b] bg-[#fbf9f4] hover:bg-white rounded-md transition-all shadow-md cursor-pointer whitespace-nowrap"
            >
              Explore Sample Rooms
            </button>
            <button
              onClick={onOpenAssistant}
              className="flex items-center gap-2 px-6 py-3 text-sm font-medium text-[#fbf9f4] bg-[#1a3428]/80 hover:bg-[#1a3428] border border-[#fbf9f4]/25 rounded-md transition-all backdrop-blur-xs cursor-pointer whitespace-nowrap"
            >
              <Sparkles className="w-4 h-4 text-[#c67d4e]" />
              Property & Trek Assistant
            </button>
          </div>

          {/* Quick Search Booking Widget */}
          <div className="pt-8 max-w-4xl mx-auto">
            <form
              onSubmit={handleQuickSearch}
              className="bg-[#fbf9f4] text-[#1e2320] p-4 sm:p-5 rounded-md shadow-2xl border border-[#1a3428]/20 grid grid-cols-1 sm:grid-cols-4 gap-4 items-end text-left"
            >
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#706757] mb-1.5">
                  Check-in Date
                </label>
                <input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="w-full text-xs sm:text-sm font-medium px-3 py-2 bg-white border border-[#1a3428]/20 rounded-sm focus:outline-none focus:border-[#1a3428]"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#706757] mb-1.5">
                  Check-out Date
                </label>
                <input
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="w-full text-xs sm:text-sm font-medium px-3 py-2 bg-white border border-[#1a3428]/20 rounded-sm focus:outline-none focus:border-[#1a3428]"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#706757] mb-1.5">
                  Guests
                </label>
                <select
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                  className="w-full text-xs sm:text-sm font-medium px-3 py-2 bg-white border border-[#1a3428]/20 rounded-sm focus:outline-none focus:border-[#1a3428]"
                >
                  <option value={1}>1 Guest</option>
                  <option value={2}>2 Guests</option>
                  <option value={3}>3 Guests</option>
                  <option value={4}>4 Guests</option>
                </select>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold bg-[#1a3428] hover:bg-[#12241b] text-[#fbf9f4] rounded-sm transition-colors cursor-pointer shadow-xs"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Check Demo Stays</span>
                </button>
              </div>
            </form>

            <div className="mt-2 text-center text-[11px] text-[#ede5d6]/75 drop-shadow-xs">
              {PROPERTY_CONFIG.brand.demoNotice} · Sample rates in INR · Taxes not configured
            </div>
          </div>

        </div>

      </section>

      {/* 2. Client Notice & Status Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#f4efe6] border border-[#1a3428]/10 rounded-md p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1">
            <span className="text-xs font-mono uppercase tracking-wider text-[#c67d4e] font-semibold">
              Content Status: sample (Fictional Prototype)
            </span>
            <h2 className="font-serif text-xl sm:text-2xl font-semibold text-[#12241b]">
              Audited Content Notice
            </h2>
            <p className="text-xs sm:text-sm text-[#554e43] max-w-3xl leading-relaxed">
              Client location, room inventory, prices, policies, and photos are unconfirmed sample proposals. Unsupported environmental, transport, and policy claims are marked explicitly as fictional prototype content.
            </p>
          </div>
          <button
            onClick={() => onNavigate('about')}
            className="flex items-center gap-1.5 text-xs font-semibold text-[#12241b] hover:text-[#c67d4e] transition-colors whitespace-nowrap cursor-pointer shrink-0"
          >
            <span>Read Concept Study</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* 3. Featured Sample Rooms */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-4 border-b border-[#1a3428]/10">
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-[#706757] mb-1">
              Sample Accommodations · Status: sample
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#12241b] tracking-tight">
              Sample Rooms & Suites
            </h2>
          </div>
          <button
            onClick={() => onNavigate('rooms')}
            className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#1a3428] hover:text-[#c67d4e] transition-colors cursor-pointer"
          >
            <span>View All Sample Rooms ({PROPERTY_CONFIG.rooms.length})</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PROPERTY_CONFIG.rooms.slice(0, 3).map((room) => (
            <div
              key={room.id}
              className="bg-white border border-[#1a3428]/10 rounded-sm overflow-hidden flex flex-col group shadow-2xs hover:shadow-md transition-shadow"
            >
              <div className="relative">
                <ImageWithFallback
                  src={room.primaryImage}
                  alt={room.name}
                  fallbackTitle={room.name}
                  aspectRatioClass="aspect-[4/3]"
                />
                <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-xs text-white px-2.5 py-1 text-xs font-mono rounded-sm">
                  {formatPrice(room.basePricePerNight)} / night
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-[11px] text-[#706757] font-mono uppercase tracking-wider mb-1">
                    <span>{room.viewType}</span>
                    <span aria-hidden="true">·</span>
                    <span>Up to {room.maxGuests} guests</span>
                  </div>
                  <h3 
                    onClick={() => onNavigateToRoomDetail(room.id)}
                    className="font-serif text-xl font-semibold text-[#12241b] mb-2 group-hover:text-[#c67d4e] transition-colors cursor-pointer"
                  >
                    {room.name}
                  </h3>
                  <p className="text-xs text-[#554e43] line-clamp-2 leading-relaxed mb-4">
                    {room.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#1a3428]/10 flex items-center justify-between">
                  <button
                    onClick={() => onNavigateToRoomDetail(room.id)}
                    className="text-xs font-semibold text-[#1a3428] hover:text-[#c67d4e] transition-colors cursor-pointer"
                  >
                    Dedicated Route →
                  </button>
                  <button
                    onClick={() => onStartBookingWithParams({ checkIn, checkOut, guests, roomId: room.id })}
                    className="px-3.5 py-1.5 text-xs font-medium bg-[#1a3428] hover:bg-[#12241b] text-white rounded-sm transition-colors cursor-pointer"
                  >
                    Demo Book
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* 4. Curated Treks Preview */}
      <section className="bg-[#162c22] text-[#ede5d6] py-18 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12 pb-4 border-b border-[#234636]">
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-[#c67d4e] mb-1">
                Sample Routes · Status: sample
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#fbf9f4] tracking-tight">
                Himalayan Treks & Forest Experiences
              </h2>
            </div>
            <button
              onClick={() => onNavigate('treks')}
              className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#ede5d6] hover:text-[#c67d4e] transition-colors cursor-pointer"
            >
              <span>Explore All Routes ({PROPERTY_CONFIG.treks.length})</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Condition Advisory Banner */}
          <div className="mb-8 p-3.5 bg-[#12241b] border border-amber-600/40 rounded-sm text-xs text-amber-200 flex items-center gap-2.5">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              Current conditions not verified—confirm with the property or local guide before any mountain trek.
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {PROPERTY_CONFIG.treks.slice(0, 2).map((trek) => (
              <div
                key={trek.id}
                className="bg-[#12241b] border border-[#234636] rounded-sm overflow-hidden flex flex-col sm:flex-row group hover:border-[#c67d4e]/40 transition-colors"
              >
                <div className="sm:w-2/5 shrink-0">
                  <ImageWithFallback
                    src={trek.heroImage}
                    alt={trek.title}
                    fallbackTitle={trek.title}
                    aspectRatioClass="aspect-[4/3] sm:h-full"
                  />
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-[11px] text-[#c67d4e] font-mono uppercase tracking-wider mb-1">
                      <span>{trek.difficulty}</span>
                      <span aria-hidden="true">·</span>
                      <span>{trek.duration}</span>
                      <span aria-hidden="true">·</span>
                      <span>+{trek.elevationGainM}m</span>
                    </div>
                    <h3 
                      onClick={() => onNavigateToExperienceDetail(trek.id)}
                      className="font-serif text-xl font-semibold text-[#fbf9f4] mb-2 group-hover:text-[#c67d4e] transition-colors cursor-pointer"
                    >
                      {trek.title}
                    </h3>
                    <p className="text-xs text-[#b8ad98] leading-relaxed mb-4 line-clamp-3">
                      {trek.summary}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#234636] flex items-center justify-between">
                    <span className="text-[11px] text-[#8e8574]">
                      Status: {trek.status}
                    </span>
                    <button
                      onClick={() => onNavigateToExperienceDetail(trek.id)}
                      className="text-xs font-semibold text-[#c67d4e] hover:text-white transition-colors cursor-pointer"
                    >
                      Dedicated Route →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. Concept & Architectural Exploration */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <div className="space-y-6">
            <div className="text-xs font-mono uppercase tracking-wider text-[#706757]">
              Prototype Study · Status: sample
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#12241b] tracking-tight leading-tight">
              A preliminary design proposal for highland hospitality.
            </h2>
            <p className="text-sm text-[#554e43] leading-relaxed">
              Pine Hideout is a prototype design study. Architectural ideas under consideration explore elevated timber pier foundations and renewable microgrid feasibility studies. All specifications are unconfirmed prototype concepts.
            </p>

            <div className="pt-2">
              <button
                onClick={() => onNavigate('about')}
                className="text-xs font-semibold text-[#1a3428] hover:text-[#c67d4e] transition-colors inline-flex items-center gap-1.5 cursor-pointer"
              >
                <span>Read the conceptual design manifesto</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="relative">
            <ImageWithFallback
              src={IMAGES.loungeHearth}
              alt="Hearth and timber interior concept visualization"
              fallbackTitle="Hearth Lounge Concept"
              aspectRatioClass="aspect-[4/3] rounded-sm shadow-xl"
            />
          </div>

        </div>
      </section>

    </div>
  );
};
