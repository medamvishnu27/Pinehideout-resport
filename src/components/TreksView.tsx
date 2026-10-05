/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { PROPERTY_CONFIG, SampleTrek } from '../data/pineHideoutContent';
import { ImageWithFallback } from './ImageWithFallback';
import { Compass, Mountain, Clock, Footprints, ArrowRight, ExternalLink, AlertTriangle, MapPin } from 'lucide-react';

interface TreksViewProps {
  onOpenTrekModal: (trek: SampleTrek) => void;
  onBookExperience: (trek: SampleTrek) => void;
  onNavigateToExperienceDetail: (trekId: string) => void;
}

export const TreksView: React.FC<TreksViewProps> = ({
  onOpenTrekModal,
  onBookExperience,
  onNavigateToExperienceDetail,
}) => {
  const [difficultyFilter, setDifficultyFilter] = useState<'all' | 'Gentle' | 'Moderate' | 'Moderate to Strenuous' | 'Strenuous'>('all');

  const filteredTreks = useMemo(() => {
    return PROPERTY_CONFIG.treks.filter((t) => {
      if (difficultyFilter !== 'all' && t.difficulty !== difficultyFilter) return false;
      return true;
    });
  }, [difficultyFilter]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Page Header */}
      <div className="border-b border-[#1a3428]/10 pb-8">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#706757] mb-2">
          <span>Highland Wilderness</span>
          <span aria-hidden="true">·</span>
          <span>Sample Itineraries</span>
          <span aria-hidden="true">·</span>
          <span>Status: sample</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-semibold text-[#12241b] tracking-tight">
          Himalayan Mountain Treks & Forest Experiences
        </h1>
        <p className="text-sm sm:text-base text-[#554e43] mt-2 max-w-3xl leading-relaxed">
          Curated mountain trails and forest walks through regional Himalayan landscapes. All route descriptions represent researched Himalayan trek inspiration.
        </p>

        {/* Mandatory Condition Notice Bar */}
        <div className="mt-4 p-3.5 bg-amber-50 border border-amber-300 rounded-sm flex items-start gap-2.5 text-xs text-amber-950">
          <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <p>
            <strong>Mandatory Trail Advisory:</strong> Current conditions not verified—confirm with the property or local guide. Static trail descriptions must not be presented as live safety or opening status.
          </p>
        </div>
      </div>

      {/* Difficulty Filter Tabs */}
      <div className="flex items-center justify-between flex-wrap gap-4 bg-white border border-[#1a3428]/15 p-3 sm:p-4 rounded-sm shadow-2xs">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#12241b]">
          <Compass className="w-3.5 h-3.5 text-[#c67d4e]" />
          <span>Difficulty Grade:</span>
        </div>

        <div className="flex items-center gap-1.5 flex-wrap">
          {(['all', 'Gentle', 'Moderate', 'Moderate to Strenuous', 'Strenuous'] as const).map((grade) => (
            <button
              key={grade}
              onClick={() => setDifficultyFilter(grade)}
              className={`px-3 py-1.5 text-xs font-medium rounded-sm transition-colors cursor-pointer ${
                difficultyFilter === grade
                  ? 'bg-[#1a3428] text-white'
                  : 'bg-[#f4efe6] text-[#554e43] hover:text-[#12241b]'
              }`}
            >
              {grade === 'all' ? 'All Treks' : grade}
            </button>
          ))}
        </div>
      </div>

      {/* Trek Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredTreks.map((trek) => (
          <div
            key={trek.id}
            className="bg-white border border-[#1a3428]/15 rounded-sm overflow-hidden flex flex-col group shadow-2xs hover:shadow-md transition-all"
          >
            <div className="relative">
              <ImageWithFallback
                src={trek.heroImage}
                alt={trek.title}
                fallbackTitle={trek.title}
                aspectRatioClass="aspect-[16/9]"
              />
              <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-xs text-white px-2.5 py-1 text-xs font-mono rounded-sm">
                {trek.difficulty} · {trek.duration} · {trek.routeType}
              </div>
              <div className="absolute bottom-2 right-3 text-[10px] text-white/80 font-mono drop-shadow-xs">
                Status: {trek.status}
              </div>
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-[11px] text-[#706757] font-mono uppercase tracking-wider mb-1">
                  <span>{trek.distanceKm} km ({trek.routeType})</span>
                  <span aria-hidden="true">·</span>
                  <span>+{trek.elevationGainM}m elevation</span>
                  <span aria-hidden="true">·</span>
                  <span>Start: {trek.departureTime}</span>
                </div>

                <h2 
                  onClick={() => onNavigateToExperienceDetail(trek.id)}
                  className="font-serif text-2xl font-semibold text-[#12241b] tracking-tight mb-2 group-hover:text-[#c67d4e] transition-colors cursor-pointer"
                >
                  {trek.title}
                </h2>

                <p className="text-xs text-[#554e43] leading-relaxed mb-3">
                  {trek.summary}
                </p>

                <div className="p-3 bg-[#f4efe6] rounded-sm text-xs text-[#554e43] space-y-1 mb-4">
                  <div className="flex items-center gap-1.5 text-[#12241b] font-medium">
                    <MapPin className="w-3.5 h-3.5 text-[#c67d4e]" />
                    <span>{trek.geographicRegion}</span>
                  </div>
                  <div><strong>Terrain & Stamina:</strong> {trek.terrainAndFitness}</div>
                  <div><strong>Best for:</strong> {trek.idealFor}</div>
                  <div className="text-[11px] text-amber-900 font-medium pt-1">
                    ⚠ {trek.currentConditionsNotice}
                  </div>
                </div>
              </div>

              {/* Actions: Dedicated Route Link, Quick Modal, Add to Stay */}
              <div className="pt-4 border-t border-[#1a3428]/10 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => onNavigateToExperienceDetail(trek.id)}
                    className="text-xs font-semibold text-[#12241b] hover:text-[#c67d4e] transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <span>Dedicated Route</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>

                  <button
                    onClick={() => onOpenTrekModal(trek)}
                    className="text-xs font-medium text-[#706757] hover:text-[#12241b] transition-colors cursor-pointer"
                  >
                    Quick Preview
                  </button>
                </div>

                <button
                  onClick={() => onBookExperience(trek)}
                  className="flex items-center gap-1.5 px-4 py-2 text-xs font-medium bg-[#1a3428] hover:bg-[#12241b] text-white rounded-sm transition-colors cursor-pointer"
                >
                  <span>Add to Demo Stay</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
