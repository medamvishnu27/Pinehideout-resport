/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header, ActiveTab } from './components/Header';
import { Footer } from './components/Footer';
import { HomeView } from './components/HomeView';
import { RoomsView } from './components/RoomsView';
import { TreksView } from './components/TreksView';
import { GalleryView } from './components/GalleryView';
import { AboutView } from './components/AboutView';
import { ReachView } from './components/ReachView';
import { PoliciesFaqView } from './components/PoliciesFaqView';
import { BookingFlow } from './components/BookingFlow';
import { RoomDetailPage } from './components/RoomDetailPage';
import { ExperienceDetailPage } from './components/ExperienceDetailPage';
import { RoomModal } from './components/RoomModal';
import { TrekModal } from './components/TrekModal';
import { AssistantDrawer } from './components/AssistantDrawer';
import { PROPERTY_CONFIG, SampleRoom, SampleTrek, CURRENCY } from './data/pineHideoutContent';
import { Sparkles, Info } from 'lucide-react';

export default function App() {
  // Routing State
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname || '/';
  });

  // Modals (Quick preview)
  const [selectedRoomModal, setSelectedRoomModal] = useState<SampleRoom | null>(null);
  const [selectedTrekModal, setSelectedTrekModal] = useState<SampleTrek | null>(null);
  const [assistantOpen, setAssistantOpen] = useState(false);

  // Booking journey parameters
  const [bookingParams, setBookingParams] = useState<{
    roomId?: string;
    checkIn?: string;
    checkOut?: string;
    guests?: number;
  }>({});

  // Sync with browser back/forward and initial path
  useEffect(() => {
    const handleLocationChange = () => {
      // Check path first, or hash fallback
      let path = window.location.pathname;
      if (path === '/' && window.location.hash.startsWith('#/')) {
        path = window.location.hash.slice(1);
      }
      setCurrentPath(path || '/');
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    handleLocationChange();

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  // Navigation Helper with History Support
  const navigateTo = (url: string) => {
    if (window.location.pathname !== url) {
      window.history.pushState(null, '', url);
    }
    setCurrentPath(url);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Route Matchers
  const isRoomDetailRoute = currentPath.startsWith('/rooms/');
  const currentRoomId = isRoomDetailRoute ? currentPath.replace('/rooms/', '').split('?')[0] : null;
  const currentRoom = currentRoomId ? PROPERTY_CONFIG.rooms.find((r) => r.id === currentRoomId) : null;

  const isTrekDetailRoute = currentPath.startsWith('/experiences/') || currentPath.startsWith('/treks/');
  const currentTrekId = isTrekDetailRoute 
    ? (currentPath.startsWith('/experiences/') ? currentPath.replace('/experiences/', '') : currentPath.replace('/treks/', '')).split('?')[0] 
    : null;
  const currentTrek = currentTrekId ? PROPERTY_CONFIG.treks.find((t) => t.id === currentTrekId) : null;

  // Active tab for header
  let activeTab: ActiveTab = 'home';
  if (currentPath === '/rooms' || isRoomDetailRoute) activeTab = 'rooms';
  else if (currentPath === '/treks' || currentPath === '/experiences' || isTrekDetailRoute) activeTab = 'treks';
  else if (currentPath === '/gallery') activeTab = 'gallery';
  else if (currentPath === '/about') activeTab = 'about';
  else if (currentPath === '/reach') activeTab = 'reach';
  else if (currentPath === '/policies-faq') activeTab = 'policies-faq';
  else if (currentPath === '/booking') activeTab = 'booking';

  const handleHeaderNavigate = (tab: ActiveTab) => {
    switch (tab) {
      case 'home': navigateTo('/'); break;
      case 'rooms': navigateTo('/rooms'); break;
      case 'treks': navigateTo('/treks'); break;
      case 'gallery': navigateTo('/gallery'); break;
      case 'about': navigateTo('/about'); break;
      case 'reach': navigateTo('/reach'); break;
      case 'policies-faq': navigateTo('/policies-faq'); break;
      case 'booking': navigateTo('/booking'); break;
      default: navigateTo('/');
    }
  };

  const handleStartBooking = (roomId?: string) => {
    setBookingParams((prev) => ({ ...prev, roomId }));
    navigateTo('/booking');
  };

  const handleStartBookingWithParams = (params: {
    checkIn: string;
    checkOut: string;
    guests: number;
    roomId?: string;
  }) => {
    setBookingParams(params);
    navigateTo('/booking');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fbf9f4] text-[#1e2320]">
      
      {/* Top Banner Notice */}
      <aside aria-label="Demo Prototype Notice" className="bg-[#12241b] text-[#ede5d6] px-4 py-2 text-[11px] border-b border-[#234636]">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Info className="w-3.5 h-3.5 text-[#c67d4e] shrink-0" />
            <p className="truncate">
              <strong>Pine Hideout V0:</strong> Interactive hospitality prototype with complete demo booking journey & AI assistant.
            </p>
          </div>
          <span className="font-mono text-[10px] text-[#c67d4e] tracking-wider uppercase shrink-0 hidden sm:inline">
            Status: sample (Currency: {CURRENCY.code})
          </span>
        </div>
      </aside>

      {/* Header with 3-Zone Contract */}
      <Header
        activeTab={activeTab}
        onNavigate={handleHeaderNavigate}
        onOpenAssistant={() => setAssistantOpen(true)}
        onStartBooking={() => handleStartBooking()}
      />

      {/* Main Content Area with Route Resolver */}
      <main className="flex-1">
        {/* Dedicated Room Detail Route: /rooms/:id */}
        {isRoomDetailRoute && currentRoom ? (
          <RoomDetailPage
            room={currentRoom}
            onNavigateBack={() => navigateTo('/rooms')}
            onSelectForBooking={(r) => handleStartBooking(r.id)}
            onOpenQuickModal={(r) => setSelectedRoomModal(r)}
          />
        ) : isTrekDetailRoute && currentTrek ? (
          /* Dedicated Experience Detail Route: /experiences/:id or /treks/:id */
          <ExperienceDetailPage
            trek={currentTrek}
            onNavigateBack={() => navigateTo('/treks')}
            onBookExperience={(_t) => navigateTo('/booking')}
            onOpenQuickModal={(t) => setSelectedTrekModal(t)}
          />
        ) : activeTab === 'rooms' ? (
          <RoomsView
            onOpenRoomModal={(room) => setSelectedRoomModal(room)}
            onSelectForBooking={(r) => handleStartBooking(r.id)}
            onNavigateToRoomDetail={(roomId) => navigateTo(`/rooms/${roomId}`)}
          />
        ) : activeTab === 'treks' ? (
          <TreksView
            onOpenTrekModal={(trek) => setSelectedTrekModal(trek)}
            onBookExperience={(_t) => navigateTo('/booking')}
            onNavigateToExperienceDetail={(trekId) => navigateTo(`/experiences/${trekId}`)}
          />
        ) : activeTab === 'gallery' ? (
          <GalleryView />
        ) : activeTab === 'about' ? (
          <AboutView />
        ) : activeTab === 'reach' ? (
          <ReachView />
        ) : activeTab === 'policies-faq' ? (
          <PoliciesFaqView />
        ) : activeTab === 'booking' ? (
          <BookingFlow
            initialRoomId={bookingParams.roomId}
            initialCheckIn={bookingParams.checkIn}
            initialCheckOut={bookingParams.checkOut}
            initialGuests={bookingParams.guests}
            onCloseToHome={() => navigateTo('/')}
            onOpenRoomModal={(room) => setSelectedRoomModal(room)}
          />
        ) : (
          <HomeView
            onNavigate={handleHeaderNavigate}
            onOpenRoomModal={(room) => setSelectedRoomModal(room)}
            onOpenTrekModal={(trek) => setSelectedTrekModal(trek)}
            onNavigateToRoomDetail={(roomId) => navigateTo(`/rooms/${roomId}`)}
            onNavigateToExperienceDetail={(trekId) => navigateTo(`/experiences/${trekId}`)}
            onStartBookingWithParams={handleStartBookingWithParams}
            onOpenAssistant={() => setAssistantOpen(true)}
          />
        )}
      </main>

      {/* Floating AI Assistant Trigger */}
      <aside aria-label="Quick AI Assistant launcher" className="fixed bottom-5 right-5 z-40">
        <button
          onClick={() => setAssistantOpen(true)}
          className="flex items-center gap-2 px-4 py-3 bg-[#1a3428] hover:bg-[#12241b] text-white rounded-full shadow-xl border border-[#c67d4e]/40 transition-all cursor-pointer group hover:scale-105"
          aria-label="Open Property and Trek Assistant"
        >
          <Sparkles className="w-4 h-4 text-[#c67d4e] group-hover:rotate-12 transition-transform" />
          <span className="text-xs font-semibold tracking-wide">Property & Trek Guide</span>
        </button>
      </aside>

      {/* Footer */}
      <Footer
        onNavigate={handleHeaderNavigate}
        onOpenAssistant={() => setAssistantOpen(true)}
      />

      {/* Modals for Quick Preview */}
      <RoomModal
        room={selectedRoomModal}
        onClose={() => setSelectedRoomModal(null)}
        onSelectForBooking={(r) => handleStartBooking(r.id)}
      />

      <TrekModal
        trek={selectedTrekModal}
        onClose={() => setSelectedTrekModal(null)}
        onBookExperience={(_t) => navigateTo('/booking')}
      />

      <AssistantDrawer
        isOpen={assistantOpen}
        onClose={() => setAssistantOpen(false)}
        onStartBooking={handleStartBooking}
      />

    </div>
  );
}
