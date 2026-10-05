/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X, Users, Bed, Eye, Maximize2, Sparkles, Check, ArrowRight, Info, Flame, Bath, Coffee, Wifi, Trees, Sun, Music, Compass, Clock, Droplets, BookOpen, Footprints, Utensils } from 'lucide-react';
import { SampleRoom, formatPrice } from '../data/pineHideoutContent';
import { ImageWithFallback } from './ImageWithFallback';

interface RoomModalProps {
  room: SampleRoom | null;
  onClose: () => void;
  onSelectForBooking: (room: SampleRoom) => void;
}

export const RoomModal: React.FC<RoomModalProps> = ({
  room,
  onClose,
  onSelectForBooking,
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!room) return null;

  const getAmenityIcon = (iconName: string) => {
    switch (iconName) {
      case 'Flame': return <Flame className="w-4 h-4 text-[#c67d4e]" />;
      case 'Bath': return <Bath className="w-4 h-4 text-[#c67d4e]" />;
      case 'Coffee': return <Coffee className="w-4 h-4 text-[#c67d4e]" />;
      case 'Wifi': return <Wifi className="w-4 h-4 text-[#c67d4e]" />;
      case 'Trees': return <Trees className="w-4 h-4 text-[#c67d4e]" />;
      case 'Sun': return <Sun className="w-4 h-4 text-[#c67d4e]" />;
      case 'Music': return <Music className="w-4 h-4 text-[#c67d4e]" />;
      case 'Compass': return <Compass className="w-4 h-4 text-[#c67d4e]" />;
      case 'Clock': return <Clock className="w-4 h-4 text-[#c67d4e]" />;
      case 'Droplets': return <Droplets className="w-4 h-4 text-[#c67d4e]" />;
      case 'BookOpen': return <BookOpen className="w-4 h-4 text-[#c67d4e]" />;
      case 'Footprints': return <Footprints className="w-4 h-4 text-[#c67d4e]" />;
      case 'Utensils': return <Utensils className="w-4 h-4 text-[#c67d4e]" />;
      default: return <Sparkles className="w-4 h-4 text-[#c67d4e]" />;
    }
  };

  const images = room.galleryImages.length > 0 ? room.galleryImages : [room.primaryImage];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-[#fbf9f4] rounded-md shadow-2xl overflow-hidden border border-[#1a3428]/20 my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 bg-black/50 hover:bg-black/80 text-white rounded-full transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Gallery Section */}
        <div className="relative">
          <ImageWithFallback
            src={images[activeImageIndex]}
            alt={`${room.name} visualization`}
            fallbackTitle={room.name}
            fallbackSubtitle="Sample room visualization"
            aspectRatioClass="aspect-[16/9] sm:aspect-[21/9]"
          />
          <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-white/90 drop-shadow-md">
            <span className="bg-black/60 px-2.5 py-1 rounded-sm text-[11px] font-mono">
              Conceptual render — Status: {room.status}
            </span>
            {images.length > 1 && (
              <div className="flex gap-1.5">
                {images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                      activeImageIndex === idx ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/80'
                    }`}
                    aria-label={`View photo ${idx + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Room Header & Content */}
        <div className="p-6 sm:p-8">
          
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b border-[#1a3428]/10">
            <div>
              <div className="flex items-center gap-2 text-xs text-[#706757] mb-1 font-mono uppercase tracking-wider">
                <span>{room.viewType}</span>
                <span aria-hidden="true">·</span>
                <span>{room.sizeSqFt} sq ft</span>
                <span aria-hidden="true">·</span>
                <span>{room.bedType}</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#12241b] tracking-tight">
                {room.name}
              </h2>
              <p className="text-xs sm:text-sm text-[#706757] mt-1 italic">
                {room.tagline}
              </p>
            </div>

            <div className="sm:text-right shrink-0">
              <div className="text-xs text-[#706757] uppercase tracking-wider">Illustrative Rate (INR)</div>
              <div className="font-serif text-3xl font-semibold text-[#12241b]">
                {formatPrice(room.basePricePerNight)}
                <span className="text-sm font-sans font-normal text-[#706757]"> / night</span>
              </div>
              <div className="text-[10px] text-[#706757] font-mono mt-0.5">
                Taxes not configured pending client rules
              </div>
              {!room.isAvailableSample && (
                <div className="mt-1 inline-block text-[11px] font-medium text-rose-800 bg-rose-50 px-2 py-0.5 rounded-sm border border-rose-200">
                  Demo Sold-Out State
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="py-6 border-b border-[#1a3428]/10">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#1a3428] mb-2">
              Room Architecture Proposal (Status: sample)
            </h3>
            <p className="text-sm text-[#38332c] leading-relaxed">
              {room.description}
            </p>
            <p className="text-xs text-[#706757] mt-3 bg-[#f4efe6] p-3 rounded-sm border border-[#1a3428]/10">
              <strong className="font-medium text-[#1a3428]">Floor Plan Note:</strong> {room.floorPlanNotes}
            </p>
          </div>

          {/* Key Specs Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6 border-b border-[#1a3428]/10">
            <div className="flex items-center gap-2.5">
              <Users className="w-4 h-4 text-[#c67d4e]" />
              <div>
                <div className="text-[10px] uppercase text-[#706757]">Occupancy</div>
                <div className="text-xs font-medium text-[#12241b]">Up to {room.maxGuests} guests</div>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <Bed className="w-4 h-4 text-[#c67d4e]" />
              <div>
                <div className="text-[10px] uppercase text-[#706757]">Bed Setup</div>
                <div className="text-xs font-medium text-[#12241b]">{room.bedType}</div>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <Eye className="w-4 h-4 text-[#c67d4e]" />
              <div>
                <div className="text-[10px] uppercase text-[#706757]">Aspect & View</div>
                <div className="text-xs font-medium text-[#12241b]">{room.viewType}</div>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <Maximize2 className="w-4 h-4 text-[#c67d4e]" />
              <div>
                <div className="text-[10px] uppercase text-[#706757]">Total Area</div>
                <div className="text-xs font-medium text-[#12241b]">{room.sizeSqFt} sq ft</div>
              </div>
            </div>
          </div>

          {/* Amenities & Highlights */}
          <div className="py-6">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#1a3428] mb-4">
              Proposed Room Comforts & Amenities
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {room.amenities.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 p-2.5 bg-white border border-[#1a3428]/10 rounded-sm">
                  <div className="p-1.5 bg-[#f4efe6] rounded-sm shrink-0 mt-0.5">
                    {getAmenityIcon(item.icon)}
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-[#12241b]">{item.title}</h4>
                    <p className="text-[11px] text-[#706757] leading-relaxed mt-0.5">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-3 flex flex-wrap gap-2 text-xs text-[#554e43]">
              {room.features.map((feat, idx) => (
                <span key={idx} className="flex items-center gap-1.5 bg-[#eadecb]/40 px-2.5 py-1 rounded-sm text-[11px]">
                  <Check className="w-3 h-3 text-[#c67d4e]" />
                  {feat}
                </span>
              ))}
            </div>
          </div>

          {/* Modal Actions */}
          <div className="pt-6 border-t border-[#1a3428]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-[#706757]">
              <Info className="w-3.5 h-3.5 text-[#c67d4e] shrink-0" />
              <span>Demo selection: pre-populates this room in the demo booking flow.</span>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium text-[#554e43] hover:text-[#12241b] cursor-pointer"
              >
                Close
              </button>

              <button
                type="button"
                onClick={() => {
                  onSelectForBooking(room);
                  onClose();
                }}
                className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-medium rounded-md transition-colors shadow-xs cursor-pointer ${
                  room.isAvailableSample
                    ? 'bg-[#1a3428] text-white hover:bg-[#12241b]'
                    : 'bg-[#554e43] text-[#ede5d6] hover:bg-[#38332c]'
                }`}
              >
                <span>{room.isAvailableSample ? 'Select for Demo Stay' : 'Select Room (Demo Test)'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
