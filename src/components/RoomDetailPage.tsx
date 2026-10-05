/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { SampleRoom, formatPrice } from '../data/pineHideoutContent';
import { ImageWithFallback } from './ImageWithFallback';
import { 
  ArrowLeft, Users, Bed, Eye, Maximize2, Check, 
  ArrowRight, Info, Flame, Bath, Coffee, Wifi, Trees, Sun, 
  Music, Compass, Clock, Droplets, BookOpen, Footprints, Utensils, 
  Share2, CheckCircle2 
} from 'lucide-react';

interface RoomDetailPageProps {
  room: SampleRoom;
  onNavigateBack: () => void;
  onSelectForBooking: (room: SampleRoom) => void;
  onOpenQuickModal: (room: SampleRoom) => void;
}

export const RoomDetailPage: React.FC<RoomDetailPageProps> = ({
  room,
  onNavigateBack,
  onSelectForBooking,
  onOpenQuickModal,
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [copiedUrl, setCopiedUrl] = useState(false);

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
      default: return <Coffee className="w-4 h-4 text-[#c67d4e]" />;
    }
  };

  const images = room.galleryImages.length > 0 ? room.galleryImages : [room.primaryImage];

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Breadcrumbs & Navigation Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1a3428]/10 pb-4">
        <div className="flex items-center gap-2 text-xs text-[#706757] font-mono">
          <button
            onClick={onNavigateBack}
            className="hover:text-[#12241b] flex items-center gap-1 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Rooms List</span>
          </button>
          <span>/</span>
          <span className="text-[#12241b] font-medium">{room.name}</span>
        </div>

        <div className="flex items-center gap-2">
          {/* Status Badge */}
          <span className="text-[11px] font-mono uppercase tracking-wider text-[#c67d4e] bg-[#eadecb]/50 px-2.5 py-1 rounded-sm border border-[#c67d4e]/30">
            Status: {room.status} (Unconfirmed)
          </span>

          <button
            onClick={handleCopyLink}
            className="flex items-center gap-1.5 px-3 py-1 text-xs text-[#554e43] hover:text-[#12241b] border border-[#1a3428]/15 rounded-sm bg-white cursor-pointer"
            title="Copy direct route link"
          >
            {copiedUrl ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
            <span>{copiedUrl ? 'Link Copied!' : 'Share Direct Route'}</span>
          </button>
        </div>
      </div>

      {/* Main Gallery Showcase */}
      <div className="space-y-3">
        <div className="relative rounded-sm overflow-hidden shadow-lg border border-[#1a3428]/15">
          <ImageWithFallback
            src={images[activeImageIndex]}
            alt={`${room.name} conceptual visualization`}
            fallbackTitle={room.name}
            aspectRatioClass="aspect-[16/9] sm:aspect-[21/9]"
          />
          <div className="absolute bottom-3 left-4 bg-black/60 backdrop-blur-xs text-white px-3 py-1 text-xs font-mono rounded-sm">
            Conceptual Render — Illustrative Sample Reference Only
          </div>
        </div>

        {/* Thumbnail Selector */}
        {images.length > 1 && (
          <div className="flex gap-2">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className={`w-24 h-16 rounded-sm overflow-hidden border-2 transition-all cursor-pointer ${
                  activeImageIndex === idx ? 'border-[#1a3428] scale-102' : 'border-transparent opacity-70 hover:opacity-100'
                }`}
              >
                <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Title, Pricing & Status Header */}
      <div className="bg-white border border-[#1a3428]/15 rounded-sm p-6 sm:p-8 shadow-2xs flex flex-col md:flex-row md:items-start justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs text-[#706757] font-mono uppercase tracking-wider mb-2">
            <span>{room.viewType}</span>
            <span aria-hidden="true">·</span>
            <span>{room.sizeSqFt} sq ft</span>
            <span aria-hidden="true">·</span>
            <span>{room.bedType}</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-[#12241b] tracking-tight">
            {room.name}
          </h1>

          <p className="text-sm text-[#706757] mt-1 italic">
            {room.tagline}
          </p>
        </div>

        <div className="md:text-right shrink-0 bg-[#f4efe6] p-4 rounded-sm border border-[#1a3428]/10">
          <div className="text-[11px] font-mono uppercase tracking-wider text-[#706757]">
            Illustrative Sample Rate
          </div>
          <div className="font-serif text-3xl font-semibold text-[#12241b] mt-0.5">
            {formatPrice(room.basePricePerNight)}
            <span className="text-sm font-sans font-normal text-[#706757]"> / night</span>
          </div>
          <div className="text-[11px] text-[#706757] mt-1 font-mono">
            Taxes not configured pending client rules
          </div>
          {!room.isAvailableSample && (
            <div className="mt-2 text-xs font-semibold text-rose-800 bg-rose-50 px-2.5 py-1 rounded-sm border border-rose-200">
              Demo Sold-Out State
            </div>
          )}
        </div>
      </div>

      {/* Narrative & Architecture */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-[#1a3428]/15 rounded-sm p-6 sm:p-8 shadow-2xs space-y-4">
            <h2 className="font-serif text-xl font-semibold text-[#12241b]">
              Architectural Concept & Layout
            </h2>
            <p className="text-sm text-[#38332c] leading-relaxed">
              {room.description}
            </p>
            <div className="p-3.5 bg-[#f4efe6] rounded-sm text-xs text-[#554e43] border border-[#1a3428]/10">
              <strong className="text-[#12241b]">Floor Plan Proposal:</strong> {room.floorPlanNotes}
            </div>
          </div>

          {/* Amenities & Provisions */}
          <div className="bg-white border border-[#1a3428]/15 rounded-sm p-6 sm:p-8 shadow-2xs space-y-6">
            <h2 className="font-serif text-xl font-semibold text-[#12241b]">
              Proposed Comforts & Amenities
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {room.amenities.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 bg-[#fbf9f4] border border-[#1a3428]/10 rounded-sm">
                  <div className="p-2 bg-white rounded-sm shrink-0">
                    {getAmenityIcon(item.icon)}
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold text-[#12241b]">{item.title}</h3>
                    <p className="text-[11px] text-[#706757] mt-0.5">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 flex flex-wrap gap-2">
              {room.features.map((feat, idx) => (
                <span key={idx} className="flex items-center gap-1.5 px-3 py-1 bg-[#eadecb]/40 border border-[#1a3428]/10 rounded-sm text-xs text-[#554e43]">
                  <Check className="w-3 h-3 text-[#c67d4e]" />
                  {feat}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Booking & Quick Modal Actions */}
        <div className="space-y-6">
          <div className="bg-white border border-[#1a3428]/15 rounded-sm p-6 shadow-2xs space-y-4">
            <h3 className="font-serif text-lg font-semibold text-[#12241b]">
              Reserve This Room
            </h3>
            <p className="text-xs text-[#554e43] leading-relaxed">
              Step into the interactive 7-stage demo reservation flow with this room pre-selected.
            </p>

            <button
              onClick={() => onSelectForBooking(room)}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-[#1a3428] hover:bg-[#12241b] text-white text-xs font-semibold rounded-sm transition-colors cursor-pointer shadow-xs"
            >
              <span>{room.isAvailableSample ? 'Book This Room (Demo)' : 'Test Sold Out Notice'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onOpenQuickModal(room)}
              className="w-full py-2 px-4 bg-[#f4efe6] hover:bg-[#eadecb] text-[#12241b] text-xs font-medium rounded-sm border border-[#1a3428]/10 transition-colors cursor-pointer"
            >
              Open Quick Preview Modal
            </button>

            <div className="pt-3 border-t border-[#1a3428]/10 flex items-start gap-2 text-[11px] text-[#706757]">
              <Info className="w-3.5 h-3.5 text-[#c67d4e] shrink-0 mt-0.5" />
              <span>Demo simulation only. No real booking is placed or payment charged.</span>
            </div>
          </div>

          <div className="bg-[#f4efe6] border border-[#1a3428]/15 rounded-sm p-5 text-xs text-[#554e43] space-y-2">
            <h4 className="font-semibold text-[#12241b]">Room Specifications</h4>
            <div className="space-y-1.5 pt-1 text-[11px]">
              <div className="flex justify-between"><span>Max Occupancy:</span> <strong>{room.maxGuests} Guests</strong></div>
              <div className="flex justify-between"><span>Bedding:</span> <strong>{room.bedType}</strong></div>
              <div className="flex justify-between"><span>View Orientation:</span> <strong>{room.viewType}</strong></div>
              <div className="flex justify-between"><span>Enclosed Area:</span> <strong>{room.sizeSqFt} sq ft</strong></div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};
