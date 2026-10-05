/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { SampleTrek } from '../data/pineHideoutContent';
import { ImageWithFallback } from './ImageWithFallback';
import { 
  ArrowLeft, Compass, Mountain, Clock, Footprints, 
  ShieldAlert, CheckCircle2, ArrowRight, Share2, Info, AlertTriangle, 
  MapPin, Calendar, ShieldCheck, FileCheck, ExternalLink
} from 'lucide-react';

interface ExperienceDetailPageProps {
  trek: SampleTrek;
  onNavigateBack: () => void;
  onBookExperience: (trek: SampleTrek) => void;
  onOpenQuickModal: (trek: SampleTrek) => void;
}

export const ExperienceDetailPage: React.FC<ExperienceDetailPageProps> = ({
  trek,
  onNavigateBack,
  onBookExperience,
  onOpenQuickModal,
}) => {
  const [copiedUrl, setCopiedUrl] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Breadcrumbs & Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1a3428]/10 pb-4">
        <div className="flex items-center gap-2 text-xs text-[#706757] font-mono">
          <button
            onClick={onNavigateBack}
            className="hover:text-[#12241b] flex items-center gap-1 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Treks List</span>
          </button>
          <span>/</span>
          <span className="text-[#12241b] font-medium">{trek.title}</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono uppercase tracking-wider text-[#c67d4e] bg-[#eadecb]/50 px-2.5 py-1 rounded-sm border border-[#c67d4e]/30">
            Status: {trek.status}
          </span>

          <button
            onClick={handleCopyLink}
            className="flex items-center gap-1.5 px-3 py-1 text-xs text-[#554e43] hover:text-[#12241b] border border-[#1a3428]/15 rounded-sm bg-white cursor-pointer"
            title="Copy direct route link"
          >
            {copiedUrl ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
            <span>{copiedUrl ? 'Link Copied!' : 'Share Route'}</span>
          </button>
        </div>
      </div>

      {/* Hero Image Showcase with Himalayan Context */}
      <div className="relative rounded-sm overflow-hidden shadow-lg border border-[#1a3428]/15">
        <ImageWithFallback
          src={trek.heroImage}
          alt={`${trek.title} scenery in ${trek.geographicRegion}`}
          fallbackTitle={trek.title}
          aspectRatioClass="aspect-[16/9] sm:aspect-[21/9]"
        />
        <div className="absolute top-4 left-4 bg-black/65 backdrop-blur-xs text-white px-3 py-1 text-xs font-mono rounded-sm">
          {trek.difficulty} Grade · {trek.duration} · {trek.routeType}
        </div>
        <div className="absolute bottom-3 left-4 bg-black/65 backdrop-blur-xs text-white px-3 py-1 text-xs font-mono rounded-sm">
          Regional Himalayan Trail Documentation — Illustrative Reference Only
        </div>
      </div>

      {/* Mandatory Condition Notice Bar */}
      <div className="p-4 bg-amber-50 border border-amber-300 rounded-sm text-xs text-amber-950 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <div className="font-semibold flex items-center gap-2">
            <span>{trek.currentConditionsNotice}</span>
          </div>
          <p className="text-amber-900 leading-relaxed">
            Mountain trails are subject to rapidly changing weather, rockfall, snow accumulation, and river levels. Static descriptions must not be presented as live safety or opening status. Always verify current conditions with property staff or a certified local guide.
          </p>
          <div className="text-[11px] font-mono text-amber-800 pt-1">
            Authoritative Reference Source: {trek.sourcesAndReview.authoritativeSource} (Documented: {trek.sourcesAndReview.lastVerifiedDate})
          </div>
        </div>
      </div>

      {/* Title & Key Metrics Grid */}
      <div className="bg-white border border-[#1a3428]/15 rounded-sm p-6 sm:p-8 shadow-2xs">
        <div className="flex items-center gap-2 text-xs text-[#706757] font-mono uppercase tracking-wider mb-2">
          <span>{trek.difficulty}</span>
          <span aria-hidden="true">·</span>
          <span>{trek.duration}</span>
          <span aria-hidden="true">·</span>
          <span>{trek.distanceKm} km ({trek.routeType})</span>
          <span aria-hidden="true">·</span>
          <span>+{trek.elevationGainM} m</span>
          <span aria-hidden="true">·</span>
          <span>Peak: {trek.peakAltitudeM} m</span>
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-[#12241b] tracking-tight">
          {trek.title}
        </h1>

        <p className="text-sm text-[#706757] mt-1 italic">
          {trek.subtitle}
        </p>

        {/* Region & Trailhead Strip */}
        <div className="mt-4 pt-4 border-t border-[#1a3428]/10 flex flex-wrap items-center gap-6 text-xs text-[#554e43]">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-[#c67d4e]" />
            <span><strong>Geographic Region:</strong> {trek.geographicRegion}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Compass className="w-4 h-4 text-[#c67d4e]" />
            <span><strong>Route:</strong> {trek.startPoint} → {trek.endPoint}</span>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-[#1a3428]/10 bg-[#f4efe6]/50 -mx-6 sm:-mx-8 px-6 sm:px-8">
          <div className="flex items-center gap-2.5">
            <Clock className="w-4 h-4 text-[#c67d4e]" />
            <div>
              <div className="text-[10px] uppercase text-[#706757]">Duration</div>
              <div className="text-xs font-medium text-[#12241b]">{trek.duration}</div>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <Footprints className="w-4 h-4 text-[#c67d4e]" />
            <div>
              <div className="text-[10px] uppercase text-[#706757]">Distance ({trek.routeType})</div>
              <div className="text-xs font-medium text-[#12241b]">{trek.distanceKm} km total</div>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <Mountain className="w-4 h-4 text-[#c67d4e]" />
            <div>
              <div className="text-[10px] uppercase text-[#706757]">Altitude Gain</div>
              <div className="text-xs font-medium text-[#12241b]">+{trek.elevationGainM} m (Summit: {trek.peakAltitudeM}m)</div>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <Compass className="w-4 h-4 text-[#c67d4e]" />
            <div>
              <div className="text-[10px] uppercase text-[#706757]">Suggested Start</div>
              <div className="text-xs font-medium text-[#12241b]">{trek.departureTime}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Experience Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          
          {/* Summary & Terrain */}
          <div className="bg-white border border-[#1a3428]/15 rounded-sm p-6 sm:p-8 shadow-2xs space-y-4">
            <h2 className="font-serif text-xl font-semibold text-[#12241b]">
              Route Character & Description
            </h2>
            <p className="text-sm text-[#38332c] leading-relaxed">
              {trek.summary}
            </p>

            <div className="p-4 bg-[#f4efe6] rounded-sm text-xs text-[#554e43] border border-[#1a3428]/10 space-y-2">
              <div>
                <strong className="text-[#12241b]">Difficulty Classification & Reasons:</strong>{' '}
                <span className="font-medium text-[#1a3428]">{trek.difficulty}:</span> {trek.difficultyReason}
              </div>
              <div>
                <strong className="text-[#12241b]">Terrain & Fitness Considerations:</strong>{' '}
                {trek.terrainAndFitness}
              </div>
              <div>
                <strong className="text-[#12241b]">Typical Visiting Season:</strong>{' '}
                {trek.typicalSeason}
              </div>
              <div>
                <strong className="text-[#12241b]">Permits & Local Guide Advice:</strong>{' '}
                {trek.permitsAndGuides}
              </div>
              <div>
                <strong className="text-[#12241b]">Recommended For:</strong>{' '}
                {trek.idealFor}
              </div>
            </div>
          </div>

          {/* Stage Flow */}
          <div className="bg-white border border-[#1a3428]/15 rounded-sm p-6 sm:p-8 shadow-2xs space-y-6">
            <h2 className="font-serif text-xl font-semibold text-[#12241b]">
              Researched Trail Itinerary
            </h2>
            <div className="space-y-4">
              {trek.itinerary.map((step, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#1a3428] text-white flex items-center justify-center shrink-0 mt-0.5 text-[11px] font-mono">
                    {idx + 1}
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold text-[#12241b]">{step.stage}</h3>
                    <p className="text-xs text-[#554e43] leading-relaxed mt-0.5">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Gear Checklist */}
          <div className="bg-white border border-[#1a3428]/15 rounded-sm p-6 sm:p-8 shadow-2xs space-y-4">
            <h2 className="font-serif text-xl font-semibold text-[#12241b]">
              Recommended Gear & Mountain Essentials
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {trek.gearRequired.map((g, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-[#38332c]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#c67d4e] shrink-0" />
                  <span>{g}</span>
                </div>
              ))}
            </div>

            <div className="mt-4 p-3 bg-[#eadecb]/40 border border-[#c67d4e]/30 rounded-sm text-xs text-[#554e43] flex items-start gap-2">
              <ShieldAlert className="w-4 h-4 text-[#c67d4e] shrink-0 mt-0.5" />
              <p>
                <strong>Safety Advisory:</strong> {trek.safetyAdvisory}
              </p>
            </div>
          </div>
        </div>

        {/* Sidebar Actions */}
        <div className="space-y-6">
          <div className="bg-white border border-[#1a3428]/15 rounded-sm p-6 shadow-2xs space-y-4">
            <h3 className="font-serif text-lg font-semibold text-[#12241b]">
              Include in Demo Stay
            </h3>
            <p className="text-xs text-[#554e43] leading-relaxed">
              Add this guided mountain trek pass to your simulated stay booking quote.
            </p>

            <button
              onClick={() => onBookExperience(trek)}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-[#1a3428] hover:bg-[#12241b] text-white text-xs font-semibold rounded-sm transition-colors cursor-pointer shadow-xs"
            >
              <span>Add to Demo Booking</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onOpenQuickModal(trek)}
              className="w-full py-2 px-4 bg-[#f4efe6] hover:bg-[#eadecb] text-[#12241b] text-xs font-medium rounded-sm border border-[#1a3428]/10 transition-colors cursor-pointer"
            >
              Open Quick Preview Modal
            </button>

            <div className="pt-3 border-t border-[#1a3428]/10 flex items-start gap-2 text-[11px] text-[#706757]">
              <Info className="w-3.5 h-3.5 text-[#c67d4e] shrink-0 mt-0.5" />
              <span>Trail routes and guide packages are unconfirmed sample proposals for prototype demonstration.</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};
