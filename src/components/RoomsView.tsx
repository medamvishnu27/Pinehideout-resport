/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { PROPERTY_CONFIG, SampleRoom, formatPrice } from '../data/pineHideoutContent';
import { ImageWithFallback } from './ImageWithFallback';
import { Filter, Users, Bed, Eye, ArrowRight, Info, Check, ExternalLink } from 'lucide-react';

interface RoomsViewProps {
  onOpenRoomModal: (room: SampleRoom) => void;
  onSelectForBooking: (room: SampleRoom) => void;
  onNavigateToRoomDetail: (roomId: string) => void;
}

export const RoomsView: React.FC<RoomsViewProps> = ({
  onOpenRoomModal,
  onSelectForBooking,
  onNavigateToRoomDetail,
}) => {
  const [occupancyFilter, setOccupancyFilter] = useState<'all' | '2' | '3-4'>('all');
  const [viewFilter, setViewFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'recommended' | 'price-asc' | 'price-desc'>('recommended');
  const [showOnlyAvailable, setShowOnlyAvailable] = useState(false);

  const viewOptions = ['all', 'Pine View', 'Mountain View', 'Valley View', 'Forest & Meadow View'];

  const filteredRooms = useMemo(() => {
    return PROPERTY_CONFIG.rooms
      .filter((room) => {
        if (occupancyFilter === '2' && room.maxGuests !== 2) return false;
        if (occupancyFilter === '3-4' && room.maxGuests < 3) return false;
        if (viewFilter !== 'all' && room.viewType !== viewFilter) return false;
        if (showOnlyAvailable && !room.isAvailableSample) return false;
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.basePricePerNight - b.basePricePerNight;
        if (sortBy === 'price-desc') return b.basePricePerNight - a.basePricePerNight;
        return 0;
      });
  }, [occupancyFilter, viewFilter, sortBy, showOnlyAvailable]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Page Header */}
      <div className="border-b border-[#1a3428]/10 pb-8">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#706757] mb-2">
          <span>Highland Accommodations</span>
          <span aria-hidden="true">·</span>
          <span>Sample Inventory</span>
          <span aria-hidden="true">·</span>
          <span>Status: sample</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-semibold text-[#12241b] tracking-tight">
          Sample Rooms & Suites
        </h1>
        <p className="text-sm sm:text-base text-[#554e43] mt-2 max-w-3xl leading-relaxed">
          Proposed Himalayan boutique room concepts designed with native deodar pine and mountain views. Rates are illustrative sample figures in Indian Rupee (INR / ₹). Taxes are not configured pending client statutory registration.
        </p>

        {/* Demo Disclaimer notice */}
        <div className="mt-4 p-3 bg-[#f4efe6] border border-[#1a3428]/15 rounded-sm flex items-start gap-2.5 text-xs text-[#554e43]">
          <Info className="w-4 h-4 text-[#c67d4e] shrink-0 mt-0.5" />
          <p>
            <strong>Status Notice:</strong> Client location, room inventory, prices, policies, and photos are not confirmed. Status: sample. Dedicated detail pages can be opened directly or previewed in modal view.
          </p>
        </div>
      </div>

      {/* Interactive Filter Bar */}
      <div className="bg-white border border-[#1a3428]/15 rounded-sm p-4 sm:p-5 shadow-2xs space-y-4">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#12241b]">
          <Filter className="w-3.5 h-3.5 text-[#c67d4e]" />
          <span>Filter Accommodations</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          
          {/* Occupancy Segmented Control */}
          <div>
            <label className="block text-[11px] font-medium text-[#706757] mb-1.5">
              Guest Capacity
            </label>
            <div className="flex items-center gap-1 bg-[#f4efe6] p-1 rounded-sm">
              <button
                onClick={() => setOccupancyFilter('all')}
                className={`flex-1 py-1.5 px-2 rounded-xs font-medium transition-colors cursor-pointer text-center ${
                  occupancyFilter === 'all' ? 'bg-white text-[#12241b] shadow-2xs' : 'text-[#706757] hover:text-[#12241b]'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setOccupancyFilter('2')}
                className={`flex-1 py-1.5 px-2 rounded-xs font-medium transition-colors cursor-pointer text-center ${
                  occupancyFilter === '2' ? 'bg-white text-[#12241b] shadow-2xs' : 'text-[#706757] hover:text-[#12241b]'
                }`}
              >
                1–2 Guests
              </button>
              <button
                onClick={() => setOccupancyFilter('3-4')}
                className={`flex-1 py-1.5 px-2 rounded-xs font-medium transition-colors cursor-pointer text-center ${
                  occupancyFilter === '3-4' ? 'bg-white text-[#12241b] shadow-2xs' : 'text-[#706757] hover:text-[#12241b]'
                }`}
              >
                3–4 Guests
              </button>
            </div>
          </div>

          {/* View Type Dropdown */}
          <div>
            <label className="block text-[11px] font-medium text-[#706757] mb-1.5">
              Aspect & View
            </label>
            <select
              value={viewFilter}
              onChange={(e) => setViewFilter(e.target.value)}
              className="w-full text-xs py-2 px-3 bg-[#f4efe6] border border-[#1a3428]/10 rounded-sm text-[#12241b] focus:outline-none focus:border-[#1a3428]"
            >
              {viewOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt === 'all' ? 'All Forest & Ridge Aspects' : opt}
                </option>
              ))}
            </select>
          </div>

          {/* Sort By Dropdown */}
          <div>
            <label className="block text-[11px] font-medium text-[#706757] mb-1.5">
              Sort Price (INR)
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full text-xs py-2 px-3 bg-[#f4efe6] border border-[#1a3428]/10 rounded-sm text-[#12241b] focus:outline-none focus:border-[#1a3428]"
            >
              <option value="recommended">Featured Order</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>

          {/* Availability Toggle */}
          <div className="flex items-end">
            <label className="flex items-center gap-2 cursor-pointer pb-2 text-xs text-[#554e43]">
              <input
                type="checkbox"
                checked={showOnlyAvailable}
                onChange={(e) => setShowOnlyAvailable(e.target.checked)}
                className="w-4 h-4 rounded-xs accent-[#1a3428] text-white"
              />
              <span>Hide demo sold-out rooms</span>
            </label>
          </div>

        </div>
      </div>

      {/* Room Grid */}
      {filteredRooms.length === 0 ? (
        <div className="text-center py-16 bg-white border border-[#1a3428]/10 rounded-sm">
          <p className="font-serif text-xl text-[#12241b]">No rooms match current filter criteria.</p>
          <button
            onClick={() => {
              setOccupancyFilter('all');
              setViewFilter('all');
              setShowOnlyAvailable(false);
            }}
            className="mt-3 text-xs text-[#c67d4e] font-semibold underline underline-offset-2 cursor-pointer"
          >
            Reset filters to view all rooms
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredRooms.map((room) => (
            <div
              key={room.id}
              className={`bg-white border rounded-sm overflow-hidden flex flex-col group shadow-2xs hover:shadow-md transition-all ${
                room.isAvailableSample ? 'border-[#1a3428]/15' : 'border-rose-200 bg-stone-50/50'
              }`}
            >
              <div className="relative">
                <ImageWithFallback
                  src={room.primaryImage}
                  alt={room.name}
                  fallbackTitle={room.name}
                  aspectRatioClass="aspect-[16/10]"
                />
                
                {/* Price & Status Overlay */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                  <span className="bg-black/65 backdrop-blur-xs text-white px-2.5 py-1 text-xs font-mono rounded-sm">
                    {formatPrice(room.basePricePerNight)} / night
                  </span>

                  {room.isAvailableSample ? (
                    <span className="bg-[#1a3428]/85 text-emerald-200 px-2 py-0.5 text-[11px] font-medium rounded-sm">
                      Sample Available
                    </span>
                  ) : (
                    <span className="bg-rose-900/90 text-rose-200 px-2 py-0.5 text-[11px] font-medium rounded-sm">
                      Sold Out Demo
                    </span>
                  )}
                </div>

                <div className="absolute bottom-2 right-3 text-[10px] text-white/80 font-mono drop-shadow-xs">
                  Conceptual Render (Status: sample)
                </div>
              </div>

              {/* Room Content */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-[11px] text-[#706757] font-mono uppercase tracking-wider mb-1.5">
                    <span>{room.viewType}</span>
                    <span aria-hidden="true">·</span>
                    <span>{room.sizeSqFt} sq ft</span>
                    <span aria-hidden="true">·</span>
                    <span>{room.bedType}</span>
                  </div>

                  <h2 
                    onClick={() => onNavigateToRoomDetail(room.id)}
                    className="font-serif text-2xl font-semibold text-[#12241b] tracking-tight mb-2 group-hover:text-[#c67d4e] transition-colors cursor-pointer"
                  >
                    {room.name}
                  </h2>

                  <p className="text-xs text-[#554e43] leading-relaxed mb-4">
                    {room.description}
                  </p>

                  <div className="space-y-1 mb-4 text-xs text-[#706757]">
                    {room.features.slice(0, 3).map((feat, i) => (
                      <div key={i} className="flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-[#c67d4e] shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Actions: Dedicated Route Link, Quick Modal, and Demo Book */}
                <div className="pt-4 border-t border-[#1a3428]/10 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => onNavigateToRoomDetail(room.id)}
                      className="text-xs font-semibold text-[#12241b] hover:text-[#c67d4e] transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <span>Dedicated Page</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>

                    <button
                      onClick={() => onOpenRoomModal(room)}
                      className="text-xs font-medium text-[#706757] hover:text-[#12241b] transition-colors cursor-pointer"
                    >
                      Quick Preview
                    </button>
                  </div>

                  <button
                    onClick={() => onSelectForBooking(room)}
                    className={`flex items-center gap-1.5 px-4 py-2 text-xs font-medium rounded-sm transition-colors cursor-pointer ${
                      room.isAvailableSample
                        ? 'bg-[#1a3428] hover:bg-[#12241b] text-white'
                        : 'bg-[#554e43] hover:bg-[#38332c] text-white'
                    }`}
                  >
                    <span>{room.isAvailableSample ? 'Demo Book' : 'Test Sold Out'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
