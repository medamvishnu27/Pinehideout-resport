/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { PROPERTY_CONFIG, HIMALAYAN_IMAGE_CATALOG } from '../data/pineHideoutContent';
import { ImageWithFallback } from './ImageWithFallback';
import { Trees, Sun, VolumeX, Shield, Compass, Mountain, AlertCircle } from 'lucide-react';

export const AboutView: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      
      {/* Header */}
      <div className="border-b border-[#1a3428]/10 pb-8">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#706757] mb-2">
          <span>Ethos & Origin</span>
          <span aria-hidden="true">·</span>
          <span>Himalayan Architecture Study</span>
          <span aria-hidden="true">·</span>
          <span>Status: sample</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-semibold text-[#12241b] tracking-tight max-w-3xl">
          {PROPERTY_CONFIG.about.title}
        </h1>
        <p className="text-base sm:text-lg text-[#554e43] mt-3 max-w-3xl font-light leading-relaxed">
          {PROPERTY_CONFIG.about.lead}
        </p>

        <div className="mt-4 p-3 bg-[#f4efe6] border border-[#1a3428]/15 rounded-sm flex items-start gap-2.5 text-xs text-[#554e43]">
          <AlertCircle className="w-4 h-4 text-[#c67d4e] shrink-0 mt-0.5" />
          <p>
            <strong>Audited Content Policy:</strong> Unsupported environmental claims (such as operational micro-hydro generation or zero ground disturbance engineering) have been audited and explicitly labelled as fictional prototype proposals.
          </p>
        </div>
      </div>

      {/* Main Narrative with Photography */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-5 text-sm text-[#38332c] leading-relaxed">
          {PROPERTY_CONFIG.about.paragraphs.map((p, idx) => (
            <p key={idx}>{p}</p>
          ))}
          <div className="pt-4 border-t border-[#1a3428]/10 flex flex-wrap items-center gap-4 text-xs font-mono text-[#706757]">
            <div className="flex items-center gap-1.5">
              <Mountain className="w-4 h-4 text-[#c67d4e]" />
              <span>Elevation: {PROPERTY_CONFIG.brand.elevationProposal}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-[#c67d4e]" />
              <span>Himalayan Pine Forest Corridor</span>
            </div>
          </div>
        </div>

        <div>
          <ImageWithFallback
            src={HIMALAYAN_IMAGE_CATALOG.villageRidge.src}
            alt="Traditional stone-and-timber Himalayan mountain hamlet on terraced ridge"
            fallbackTitle="Traditional Himalayan Architecture Reference"
            aspectRatioClass="aspect-[4/3] rounded-sm shadow-xl"
          />
          <p className="text-[11px] text-[#706757] text-center mt-2 italic font-mono">
            Regional stone and timber architectural reference — Status: sample prototype study
          </p>
        </div>
      </div>

      {/* Three Pillars from Central Content Config */}
      <div className="bg-[#f4efe6] border border-[#1a3428]/15 rounded-md p-8 sm:p-10">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-mono uppercase tracking-wider text-[#c67d4e] font-semibold">
            Architectural Studies (Status: sample)
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#12241b] mt-1">
            Core Design Proposals Under Evaluation
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PROPERTY_CONFIG.about.pillars.map((pillar, idx) => (
            <div key={idx} className="bg-white p-6 rounded-sm border border-[#1a3428]/10 shadow-2xs space-y-2">
              {idx === 0 && <Trees className="w-7 h-7 text-[#1a3428]" />}
              {idx === 1 && <Sun className="w-7 h-7 text-[#c67d4e]" />}
              {idx === 2 && <VolumeX className="w-7 h-7 text-[#1a3428]" />}
              
              <h3 className="font-serif text-lg font-semibold text-[#12241b]">
                {pillar.title}
              </h3>
              <p className="text-xs text-[#554e43] leading-relaxed">
                {pillar.text}
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
