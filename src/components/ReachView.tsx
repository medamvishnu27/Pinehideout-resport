/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { PROPERTY_CONFIG } from '../data/pineHideoutContent';
import { Car, Train, Navigation, AlertTriangle, CheckCircle, Info, Send } from 'lucide-react';

export const ReachView: React.FC = () => {
  const [shuttleForm, setShuttleForm] = useState({ date: '', time: '13:00', trainNumber: '', passengers: 2 });
  const [shuttleBooked, setShuttleBooked] = useState(false);

  const handleShuttleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShuttleBooked(true);
    setTimeout(() => setShuttleBooked(false), 5000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-14">
      
      {/* Header */}
      <div className="border-b border-[#1a3428]/10 pb-8">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#706757] mb-2">
          <span>Highland Transit</span>
          <span aria-hidden="true">·</span>
          <span>Access Advisory</span>
          <span aria-hidden="true">·</span>
          <span>Elevation 1,840m</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-semibold text-[#12241b] tracking-tight">
          How to Reach Pine Hideout
        </h1>
        <p className="text-sm sm:text-base text-[#554e43] mt-2 max-w-3xl leading-relaxed">
          Journey up through scenic cedar valleys to our mountain sanctuary. Detailed arrival guidance for self-drivers and demo shuttle passengers.
        </p>

        {/* Demo Coordinates Notice */}
        <div className="mt-4 p-3 bg-[#f4efe6] border border-[#1a3428]/15 rounded-sm flex items-start gap-2.5 text-xs text-[#554e43]">
          <Info className="w-4 h-4 text-[#c67d4e] shrink-0 mt-0.5" />
          <p>
            <strong>Location Notice:</strong> Exact property coordinates and valley parcel numbers are withheld pending client confirmation. All routes, stations, and transfer schedules below are illustrative demo representations.
          </p>
        </div>
      </div>

      {/* Transit Modes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {PROPERTY_CONFIG.howToReach.options.map((opt, idx) => (
          <div
            key={idx}
            className="bg-white border border-[#1a3428]/15 rounded-sm p-6 shadow-2xs flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#c67d4e]">
                  {opt.badge}
                </span>
                {idx === 0 && <Car className="w-5 h-5 text-[#1a3428]" />}
                {idx === 1 && <Train className="w-5 h-5 text-[#1a3428]" />}
                {idx === 2 && <Navigation className="w-5 h-5 text-[#1a3428]" />}
              </div>

              <h2 className="font-serif text-xl font-semibold text-[#12241b] mb-2">
                {opt.title}
              </h2>

              <p className="text-xs text-[#554e43] leading-relaxed mb-4">
                {opt.description}
              </p>
            </div>

            <div className="pt-3 border-t border-[#1a3428]/10 text-[11px] text-[#706757] italic">
              {opt.notes}
            </div>
          </div>
        ))}
      </div>

      {/* Demo Shuttle Booking Simulation */}
      <div className="bg-[#f4efe6] border border-[#1a3428]/15 rounded-md p-6 sm:p-8">
        <div className="max-w-2xl mb-6">
          <span className="text-xs font-mono uppercase tracking-wider text-[#c67d4e] font-semibold">
            Interactive Transit Demo
          </span>
          <h2 className="font-serif text-2xl font-semibold text-[#12241b] mt-1">
            Simulate Mountain Rail Station Shuttle Pickup
          </h2>
          <p className="text-xs text-[#554e43] mt-1">
            Arriving via regional rail? Coordinate your scheduled electric van transfer from Highland Alpine Station (Demo simulation).
          </p>
        </div>

        <form onSubmit={handleShuttleSubmit} className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div>
            <label className="block text-[11px] font-medium text-[#1e2320] mb-1">
              Transfer Date
            </label>
            <input
              type="date"
              required
              value={shuttleForm.date}
              onChange={(e) => setShuttleForm({ ...shuttleForm, date: e.target.value })}
              className="w-full text-xs px-3 py-2 bg-white border border-[#1a3428]/20 rounded-sm focus:outline-none focus:border-[#1a3428]"
            />
          </div>

          <div>
            <label className="block text-[11px] font-medium text-[#1e2320] mb-1">
              Shuttle Slot
            </label>
            <select
              value={shuttleForm.time}
              onChange={(e) => setShuttleForm({ ...shuttleForm, time: e.target.value })}
              className="w-full text-xs px-3 py-2 bg-white border border-[#1a3428]/20 rounded-sm focus:outline-none focus:border-[#1a3428]"
            >
              <option value="13:00">1:00 PM (Afternoon Arrival)</option>
              <option value="16:30">4:30 PM (Evening Twilight)</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-medium text-[#1e2320] mb-1">
              Passengers
            </label>
            <select
              value={shuttleForm.passengers}
              onChange={(e) => setShuttleForm({ ...shuttleForm, passengers: Number(e.target.value) })}
              className="w-full text-xs px-3 py-2 bg-white border border-[#1a3428]/20 rounded-sm focus:outline-none focus:border-[#1a3428]"
            >
              <option value={1}>1 Passenger</option>
              <option value={2}>2 Passengers</option>
              <option value={3}>3 Passengers</option>
              <option value={4}>4 Passengers</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-1.5 py-2 px-4 bg-[#1a3428] hover:bg-[#12241b] text-white text-xs font-semibold rounded-sm transition-colors cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Simulate Shuttle Request</span>
            </button>
          </div>
        </form>

        {shuttleBooked && (
          <div className="mt-4 p-3 bg-emerald-50 border border-emerald-300 text-emerald-900 rounded-sm text-xs flex items-center gap-2 animate-in fade-in">
            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              Demo Shuttle Confirmed: Electric van scheduled for pickup at Highland Alpine Station on {shuttleForm.date || 'selected date'} ({shuttleForm.time}). (Demo simulation — no real transport dispatched).
            </span>
          </div>
        )}
      </div>

      {/* Packing & Altitude Guidance */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Packing Checklist */}
        <div className="bg-white border border-[#1a3428]/15 rounded-sm p-6 shadow-2xs">
          <h2 className="font-serif text-xl font-semibold text-[#12241b] mb-4">
            Essential Alpine Packing
          </h2>
          <ul className="space-y-2.5 text-xs text-[#554e43]">
            {PROPERTY_CONFIG.howToReach.packingTips.map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#c67d4e] shrink-0 mt-1.5" />
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Altitude & Weather Note */}
        <div className="bg-white border border-[#1a3428]/15 rounded-sm p-6 shadow-2xs space-y-3">
          <div className="flex items-center gap-2 text-[#c67d4e]">
            <AlertTriangle className="w-5 h-5" />
            <h2 className="font-serif text-xl font-semibold text-[#12241b]">
              Mountain Microclimate & Acclimatization
            </h2>
          </div>
          <p className="text-xs text-[#554e43] leading-relaxed">
            At 1,840 meters, the air is crisp, dry, and pure. Sun intensity is heightened while temperatures drop noticeably once the sun sinks behind the western ridges.
          </p>
          <p className="text-xs text-[#554e43] leading-relaxed">
            Drink plenty of pure mountain spring water upon arrival. If planning high-elevation treks on day one, we suggest scheduling the gentle Tirthan Valley eco-zone walk first for easy acclimatization.
          </p>
        </div>

      </div>

    </div>
  );
};
