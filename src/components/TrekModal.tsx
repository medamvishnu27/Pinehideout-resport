/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { X, Compass, Mountain, Clock, Footprints, ShieldAlert, CheckCircle2, ArrowRight, AlertTriangle, MapPin } from 'lucide-react';
import { SampleTrek } from '../data/pineHideoutContent';
import { ImageWithFallback } from './ImageWithFallback';

interface TrekModalProps {
  trek: SampleTrek | null;
  onClose: () => void;
  onBookExperience?: (trek: SampleTrek) => void;
}

export const TrekModal: React.FC<TrekModalProps> = ({
  trek,
  onClose,
  onBookExperience,
}) => {
  if (!trek) return null;

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

        {/* Hero Image */}
        <div className="relative">
          <ImageWithFallback
            src={trek.heroImage}
            alt={`${trek.title} scenery`}
            fallbackTitle={trek.title}
            fallbackSubtitle="Sample trail reference"
            aspectRatioClass="aspect-[16/9] sm:aspect-[21/9]"
          />
          <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-white drop-shadow-md">
            <span className="bg-black/60 px-2.5 py-1 rounded-sm text-[11px] font-mono">
              Sample mountain landscape — Status: {trek.status}
            </span>
            <span className="bg-[#1a3428]/80 px-2.5 py-1 rounded-sm text-[11px] font-medium text-emerald-200">
              {trek.difficulty} Grade · {trek.routeType}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8">
          
          <div className="pb-6 border-b border-[#1a3428]/10">
            <div className="flex items-center gap-2 text-xs text-[#706757] font-mono uppercase tracking-wider mb-1">
              <span>{trek.difficulty}</span>
              <span aria-hidden="true">·</span>
              <span>{trek.duration}</span>
              <span aria-hidden="true">·</span>
              <span>{trek.distanceKm} km ({trek.routeType})</span>
              <span aria-hidden="true">·</span>
              <span>+{trek.elevationGainM} m</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#12241b] tracking-tight">
              {trek.title}
            </h2>
            <p className="text-xs sm:text-sm text-[#706757] mt-1 italic">
              {trek.subtitle}
            </p>
            <div className="mt-2 text-xs text-[#554e43] flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#c67d4e]" />
              <span>{trek.geographicRegion}</span>
            </div>
          </div>

          {/* Mandatory Trail Condition Notice Bar */}
          <div className="my-4 p-3.5 bg-amber-50 border border-amber-300 rounded-sm text-xs text-amber-950 flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <strong className="font-semibold">{trek.currentConditionsNotice}</strong>
              <p className="mt-0.5 text-amber-900 leading-relaxed">
                Trail conditions, snow accumulation, and rock stability must be verified locally before setting out.
              </p>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-5 border-b border-[#1a3428]/10 bg-[#f4efe6]/50 -mx-6 sm:-mx-8 px-6 sm:px-8">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#c67d4e]" />
              <div>
                <div className="text-[10px] uppercase text-[#706757]">Duration</div>
                <div className="text-xs font-medium text-[#12241b]">{trek.duration}</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Footprints className="w-4 h-4 text-[#c67d4e]" />
              <div>
                <div className="text-[10px] uppercase text-[#706757]">Distance</div>
                <div className="text-xs font-medium text-[#12241b]">{trek.distanceKm} km ({trek.routeType})</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Mountain className="w-4 h-4 text-[#c67d4e]" />
              <div>
                <div className="text-[10px] uppercase text-[#706757]">Elevation Gain</div>
                <div className="text-xs font-medium text-[#12241b]">+{trek.elevationGainM} m (Max: {trek.peakAltitudeM}m)</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Compass className="w-4 h-4 text-[#c67d4e]" />
              <div>
                <div className="text-[10px] uppercase text-[#706757]">Suggested Start</div>
                <div className="text-xs font-medium text-[#12241b]">{trek.departureTime}</div>
              </div>
            </div>
          </div>

          {/* Summary & Terrain */}
          <div className="py-6 border-b border-[#1a3428]/10">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#1a3428] mb-2">
              Experience Overview (Status: sample)
            </h3>
            <p className="text-sm text-[#38332c] leading-relaxed mb-3">
              {trek.summary}
            </p>
            <div className="text-xs text-[#554e43] bg-white p-3 rounded-sm border border-[#1a3428]/10 space-y-1.5">
              <div><strong className="text-[#12241b]">Difficulty Rationale:</strong> {trek.difficultyReason}</div>
              <div><strong className="text-[#12241b]">Terrain & Fitness:</strong> {trek.terrainAndFitness}</div>
              <div><strong className="text-[#12241b]">Typical Season:</strong> {trek.typicalSeason}</div>
              <div><strong className="text-[#12241b]">Permits & Guides:</strong> {trek.permitsAndGuides}</div>
              <div><strong className="text-[#12241b]">Certified Guide:</strong> {trek.guideIncluded ? 'Proposed guide accompaniment included' : 'Self-guided'}</div>
              <div><strong className="text-[#12241b]">Ideal For:</strong> {trek.idealFor}</div>
            </div>
          </div>

          {/* Stage-by-Stage Itinerary */}
          <div className="py-6 border-b border-[#1a3428]/10">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#1a3428] mb-4">
              Proposed Stage-by-Stage Trail Flow
            </h3>
            <div className="space-y-3">
              {trek.itinerary.map((step, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#1a3428] text-white flex items-center justify-center shrink-0 mt-0.5 text-[10px] font-mono">
                    {idx + 1}
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-[#12241b]">{step.stage}</h4>
                    <p className="text-xs text-[#554e43] leading-relaxed mt-0.5">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Gear & Safety Advisory */}
          <div className="py-6">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#1a3428] mb-3">
              Required Gear & Weather Protocol
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
              {trek.gearRequired.map((g, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-[#38332c]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#c67d4e] shrink-0" />
                  <span>{g}</span>
                </div>
              ))}
            </div>

            <div className="flex items-start gap-2.5 p-3 bg-[#eadecb]/40 border border-[#c67d4e]/30 rounded-sm text-xs text-[#554e43]">
              <ShieldAlert className="w-4 h-4 text-[#c67d4e] shrink-0 mt-0.5" />
              <p>
                <strong className="text-[#12241b]">Safety Advisory:</strong> {trek.safetyAdvisory}
              </p>
            </div>
          </div>

          {/* Modal Actions */}
          <div className="pt-6 border-t border-[#1a3428]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-[#706757]">
              Sample trek itinerary for demonstration.
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium text-[#554e43] hover:text-[#12241b] cursor-pointer"
              >
                Close
              </button>

              {onBookExperience && (
                <button
                  type="button"
                  onClick={() => {
                    onBookExperience(trek);
                    onClose();
                  }}
                  className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-medium bg-[#1a3428] hover:bg-[#12241b] text-white rounded-md transition-colors cursor-pointer"
                >
                  <span>Include in Demo Booking</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
