/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ActiveTab } from './Header';
import { PROPERTY_CONFIG } from '../data/pineHideoutContent';
import { Info, Compass } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: ActiveTab) => void;
  onOpenAssistant: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenAssistant }) => {
  return (
    <footer className="bg-[#14231b] text-[#ede5d6] border-t border-[#234636] pt-14 pb-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Disclaimer Banner */}
        <div className="mb-10 p-4 bg-[#1a3428]/80 border border-[#2d5843] rounded-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#d3c8b4]">
          <div className="flex items-start gap-2.5">
            <Info className="w-4 h-4 text-[#c67d4e] shrink-0 mt-0.5" />
            <p>
              <strong className="text-[#f5f0e6] font-medium">Demo Notice:</strong> {PROPERTY_CONFIG.brand.demoNotice}. {PROPERTY_CONFIG.brand.unconfirmedNotice}
            </p>
          </div>
          <span className="text-[#c67d4e] font-mono text-[11px] uppercase tracking-wider shrink-0">
            Version 0 Prototype
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-[#234636]/60">
          
          {/* Brand Info */}
          <div className="md:col-span-1">
            <h2 className="font-serif text-2xl font-semibold text-[#fbf9f4] tracking-tight mb-2">
              {PROPERTY_CONFIG.brand.name}
            </h2>
            <p className="text-xs text-[#b8ad98] leading-relaxed mb-4">
              {PROPERTY_CONFIG.brand.tagline}. Boutique room accommodation, guided Himalayan mountain treks, and dark sky stargazing.
            </p>
            <div className="flex items-center gap-2 text-xs text-[#c67d4e]">
              <Compass className="w-3.5 h-3.5" />
              <span>Elevation: {PROPERTY_CONFIG.brand.elevationProposal}</span>
            </div>
          </div>

          {/* Retreat Navigation */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#d3c8b4] mb-3">
              Explore Pine Hideout
            </h3>
            <ul className="space-y-2 text-xs text-[#b8ad98]">
              <li>
                <button
                  onClick={() => onNavigate('rooms')}
                  className="hover:text-[#fbf9f4] transition-colors cursor-pointer"
                >
                  Sample Rooms & Suites
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('treks')}
                  className="hover:text-[#fbf9f4] transition-colors cursor-pointer"
                >
                  Guided Alpine Treks
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('gallery')}
                  className="hover:text-[#fbf9f4] transition-colors cursor-pointer"
                >
                  Atmosphere & Architecture
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-[#fbf9f4] transition-colors cursor-pointer"
                >
                  Sustainable Philosophy
                </button>
              </li>
            </ul>
          </div>

          {/* Guest Guidance */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#d3c8b4] mb-3">
              Guest Information
            </h3>
            <ul className="space-y-2 text-xs text-[#b8ad98]">
              <li>
                <button
                  onClick={() => onNavigate('reach')}
                  className="hover:text-[#fbf9f4] transition-colors cursor-pointer"
                >
                  How to Reach & Transit
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('policies-faq')}
                  className="hover:text-[#fbf9f4] transition-colors cursor-pointer"
                >
                  Check-in, Quiet Hours & Policies
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('policies-faq')}
                  className="hover:text-[#fbf9f4] transition-colors cursor-pointer"
                >
                  Frequently Asked Questions
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenAssistant}
                  className="hover:text-[#c67d4e] transition-colors cursor-pointer"
                >
                  Ask AI Property Assistant
                </button>
              </li>
            </ul>
          </div>

          {/* Coordination Desk */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#d3c8b4] mb-3">
              Coordination Desk
            </h3>
            <p className="text-xs text-[#b8ad98] mb-1">{PROPERTY_CONFIG.contact.deskHours}</p>
            <p className="text-xs text-[#d3c8b4] mb-2 font-mono">{PROPERTY_CONFIG.contact.phone}</p>
            <p className="text-xs text-[#b8ad98] mb-3">{PROPERTY_CONFIG.contact.email}</p>
            <p className="text-[11px] text-[#8e8574] leading-relaxed">
              {PROPERTY_CONFIG.contact.addressPlaceholder}
            </p>
          </div>

        </div>

        {/* Quiet Bottom Legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8e8574]">
          <p>
            © {new Date().getFullYear()} Pine Hideout V0. Concept design & booking demonstration.
          </p>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Leave No Trace Partner</span>
            <span aria-hidden="true">·</span>
            <span>Dark Sky Compliant</span>
            <span aria-hidden="true">·</span>
            <span>Geothermal & Solar Microgrid</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
