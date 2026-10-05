/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { PROPERTY_CONFIG, GalleryItem } from '../data/pineHideoutContent';
import { ImageWithFallback } from './ImageWithFallback';
import { X, ZoomIn, Info, MapPin, Camera } from 'lucide-react';

export const GalleryView: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeLightboxItem, setActiveLightboxItem] = useState<GalleryItem | null>(null);

  const categories = ['all', 'Mountain Landscapes', 'Forest & Trails', 'Village Life', 'Illustrative Rooms'];

  const filteredItems = selectedCategory === 'all'
    ? PROPERTY_CONFIG.gallery
    : PROPERTY_CONFIG.gallery.filter((g) => g.category === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header */}
      <div className="border-b border-[#1a3428]/10 pb-8">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#706757] mb-2">
          <span>Visual Archive</span>
          <span aria-hidden="true">·</span>
          <span>Regional Himalayan Landscape</span>
          <span aria-hidden="true">·</span>
          <span>Illustrative Room Concepts</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-semibold text-[#12241b] tracking-tight">
          Himalayan Mountain & Property Gallery
        </h1>
        <p className="text-sm sm:text-base text-[#554e43] mt-2 max-w-3xl leading-relaxed">
          Curated Himalayan photography documenting regional pine and deodar forests, high-altitude ridgelines, mountain hamlets, and clearly labelled illustrative room interior concepts.
        </p>

        {/* Demo Disclaimer */}
        <div className="mt-4 p-3 bg-[#f4efe6] border border-[#1a3428]/15 rounded-sm flex items-start gap-2.5 text-xs text-[#554e43]">
          <Info className="w-4 h-4 text-[#c67d4e] shrink-0 mt-0.5" />
          <p>
            <strong>Image Categorization & Attribution:</strong> Destination photographs depict authentic regional Western Himalayan landscapes for context. Room images are clearly labelled illustrative concepts and do not depict constructed Pine Hideout property.
          </p>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-[#1a3428]/10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 text-xs font-medium rounded-sm whitespace-nowrap transition-colors cursor-pointer ${
              selectedCategory === cat
                ? 'bg-[#1a3428] text-white'
                : 'bg-white text-[#554e43] hover:text-[#12241b] border border-[#1a3428]/10'
            }`}
          >
            {cat === 'all' ? 'All Visuals' : cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            onClick={() => setActiveLightboxItem(item)}
            className="group relative bg-white border border-[#1a3428]/15 rounded-sm overflow-hidden cursor-pointer shadow-2xs hover:shadow-md transition-all"
          >
            <ImageWithFallback
              src={item.image}
              alt={item.title}
              fallbackTitle={item.title}
              aspectRatioClass="aspect-[4/3]"
            />
            
            <div className="p-4 bg-white border-t border-[#1a3428]/10 flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#c67d4e]">
                    {item.category}
                  </span>
                  <span className="text-[9px] font-mono uppercase px-1.5 py-0.2 bg-[#f4efe6] text-[#706757] rounded-xs border border-[#1a3428]/10">
                    {item.type === 'destination' ? 'Regional Scenery' : 'Sample Room'}
                  </span>
                </div>
                <h3 className="font-serif text-base font-semibold text-[#12241b] group-hover:text-[#c67d4e] transition-colors">
                  {item.title}
                </h3>
                <p className="text-[11px] text-[#706757] mt-1 line-clamp-1">
                  {item.caption}
                </p>
              </div>
              <ZoomIn className="w-4 h-4 text-[#706757] group-hover:text-[#1a3428] shrink-0 mt-1" />
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal with Full Attribution & Location */}
      {activeLightboxItem && (
        <div
          className="fixed inset-0 z-60 bg-black/85 flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200"
          onClick={() => setActiveLightboxItem(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-[#12241b] border border-[#234636] rounded-sm overflow-hidden text-[#fbf9f4]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveLightboxItem(null)}
              className="absolute top-4 right-4 z-20 p-2 bg-black/60 hover:bg-black/90 text-white rounded-full transition-colors cursor-pointer"
              aria-label="Close photo preview"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative">
              <img
                src={activeLightboxItem.image}
                alt={activeLightboxItem.title}
                className="w-full max-h-[65vh] object-contain bg-black/50"
              />
            </div>

            <div className="p-6 bg-[#162c22] border-t border-[#234636] space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono uppercase tracking-wider text-[#c67d4e]">
                  {activeLightboxItem.category}
                </span>
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 bg-[#12241b] text-emerald-300 rounded-xs border border-[#234636]">
                  {activeLightboxItem.type === 'destination' ? 'Regional Himalayan Scenery' : 'Illustrative Accommodation Concept'}
                </span>
              </div>

              <h2 className="font-serif text-2xl font-semibold text-[#fbf9f4]">
                {activeLightboxItem.title}
              </h2>

              <p className="text-xs sm:text-sm text-[#ede5d6]/80 leading-relaxed">
                {activeLightboxItem.caption}
              </p>

              <div className="pt-3 border-t border-[#234636] flex flex-wrap items-center justify-between gap-3 text-[11px] text-[#b8ad98]">
                {activeLightboxItem.location && (
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#c67d4e]" />
                    <span>Location: {activeLightboxItem.location}</span>
                  </div>
                )}
                <div className="flex items-center gap-1.5">
                  <Camera className="w-3.5 h-3.5 text-[#c67d4e]" />
                  <span>Attribution: {activeLightboxItem.attribution}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
