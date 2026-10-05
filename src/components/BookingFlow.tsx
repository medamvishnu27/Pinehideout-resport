/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { PROPERTY_CONFIG, SampleRoom, formatPrice, CURRENCY } from '../data/pineHideoutContent';
import { ImageWithFallback } from './ImageWithFallback';
import { 
  Calendar, Users, ArrowRight, ArrowLeft, Check, CheckCircle2, 
  AlertCircle, ShieldAlert, CreditCard, Download, Printer, 
  Sparkles, Coffee, Mountain, Flame, Info, RefreshCw
} from 'lucide-react';

interface BookingFlowProps {
  initialRoomId?: string;
  initialCheckIn?: string;
  initialCheckOut?: string;
  initialGuests?: number;
  onCloseToHome: () => void;
  onOpenRoomModal: (room: SampleRoom) => void;
}

export type BookingStep = 
  | 'dates-guests' 
  | 'room-selection' 
  | 'add-ons' 
  | 'quote' 
  | 'guest-details' 
  | 'simulated-payment' 
  | 'confirmation';

export const BookingFlow: React.FC<BookingFlowProps> = ({
  initialRoomId,
  initialCheckIn,
  initialCheckOut,
  initialGuests = 2,
  onCloseToHome,
  onOpenRoomModal,
}) => {
  // Step State
  const [currentStep, setCurrentStep] = useState<BookingStep>(initialRoomId ? 'add-ons' : 'dates-guests');

  // Dates & Occupancy State (Preserved throughout)
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];
  const threeDaysLater = new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0];

  const [checkIn, setCheckIn] = useState(initialCheckIn || tomorrow);
  const [checkOut, setCheckOut] = useState(initialCheckOut || threeDaysLater);
  const [adults, setAdults] = useState(initialGuests || 2);
  const [children, setChildren] = useState(0);
  const [dateError, setDateError] = useState<string | null>(null);

  // Selected Room
  const [selectedRoom, setSelectedRoom] = useState<SampleRoom | null>(() => {
    if (initialRoomId) {
      return PROPERTY_CONFIG.rooms.find((r) => r.id === initialRoomId) || PROPERTY_CONFIG.rooms[0];
    }
    return null;
  });

  // Sold-out warning banner
  const [soldOutAttemptRoom, setSoldOutAttemptRoom] = useState<SampleRoom | null>(null);

  // Add-ons State
  const [addOns, setAddOns] = useState({
    breakfast: true,
    guidedTrekPass: false,
    firewoodBundle: true,
  });

  // Quote State
  const [quoteData, setQuoteData] = useState<any>(null);
  const [isCalculatingQuote, setIsCalculatingQuote] = useState(false);

  // Guest Details State (Fictional Demo Details)
  const [guestDetails, setGuestDetails] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dietaryNotes: '',
    arrivalNotes: '',
  });
  const [guestError, setGuestError] = useState<string | null>(null);

  // Simulated Payment State
  const [paymentForm, setPaymentForm] = useState({
    cardholderName: '',
    cardNumber: '',
    expiry: '12/28',
    cvv: '382',
    postalCode: '560001',
  });
  const [paymentOutcomeSimulation, setPaymentOutcomeSimulation] = useState<'success' | 'failure'>('success');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);

  // Confirmation State
  const [confirmationCode, setConfirmationCode] = useState<string>('');
  const [bookingTimestamp, setBookingTimestamp] = useState<string>('');

  // Validate dates whenever they change
  useEffect(() => {
    const dIn = new Date(checkIn);
    const dOut = new Date(checkOut);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (isNaN(dIn.getTime()) || isNaN(dOut.getTime())) {
      setDateError('Please enter valid dates.');
      return;
    }
    if (dOut <= dIn) {
      setDateError('Check-out date must be at least one day after check-in.');
      return;
    }
    setDateError(null);
  }, [checkIn, checkOut]);

  // Recalculate quote whenever room, dates, or add-ons change
  useEffect(() => {
    if (!selectedRoom || !checkIn || !checkOut || dateError) return;

    setIsCalculatingQuote(true);
    fetch('/api/booking-quote', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        roomId: selectedRoom.id,
        checkIn,
        checkOut,
        adults,
        children,
        addOns,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) {
          setQuoteData(data);
        } else {
          calculateClientQuoteFallback();
        }
      })
      .catch(() => {
        calculateClientQuoteFallback();
      })
      .finally(() => {
        setIsCalculatingQuote(false);
      });
  }, [selectedRoom, checkIn, checkOut, adults, children, addOns, dateError]);

  const calculateClientQuoteFallback = () => {
    if (!selectedRoom) return;
    const dIn = new Date(checkIn);
    const dOut = new Date(checkOut);
    const nights = Math.max(1, Math.ceil((dOut.getTime() - dIn.getTime()) / (1000 * 60 * 60 * 24)));
    const totalGuests = adults + children;
    const roomTotal = selectedRoom.basePricePerNight * nights;

    // Explicit charging basis calculations
    const breakfastTotal = addOns.breakfast ? PROPERTY_CONFIG.addOns.breakfast.price * totalGuests * nights : 0;
    const trekTotal = addOns.guidedTrekPass ? PROPERTY_CONFIG.addOns.guidedTrekPass.price * totalGuests : 0;
    const firewoodTotal = addOns.firewoodBundle ? PROPERTY_CONFIG.addOns.firewoodBundle.price : 0;

    const subtotal = roomTotal + breakfastTotal + trekTotal + firewoodTotal;
    const tax = 0; // Taxes not configured
    const total = subtotal;

    setQuoteData({
      roomId: selectedRoom.id,
      roomName: selectedRoom.name,
      nights,
      checkIn,
      checkOut,
      guests: { adults, children, total: totalGuests },
      lineItems: [
        {
          description: `${selectedRoom.name} (${nights} night${nights > 1 ? 's' : ''} × ${formatPrice(selectedRoom.basePricePerNight)})`,
          amount: roomTotal,
          chargingBasis: 'per_room_per_night',
        },
        ...(addOns.breakfast
          ? [{
              description: `Artisan Breakfast (${totalGuests} guest${totalGuests > 1 ? 's' : ''} × ${nights} night${nights > 1 ? 's' : ''} × ${formatPrice(PROPERTY_CONFIG.addOns.breakfast.price)})`,
              amount: breakfastTotal,
              chargingBasis: 'per_guest_per_night',
            }]
          : []),
        ...(addOns.guidedTrekPass
          ? [{
              description: `Guided Trek Pass (${totalGuests} guest${totalGuests > 1 ? 's' : ''} × ${formatPrice(PROPERTY_CONFIG.addOns.guidedTrekPass.price)})`,
              amount: trekTotal,
              chargingBasis: 'per_guest_per_stay',
            }]
          : []),
        ...(addOns.firewoodBundle
          ? [{
              description: `Seasoned Firewood Bundle (${formatPrice(PROPERTY_CONFIG.addOns.firewoodBundle.price)} per stay)`,
              amount: firewoodTotal,
              chargingBasis: 'per_room_per_stay',
            }]
          : []),
        {
          description: 'Taxes & Statutory Levies (Not configured pending client registration)',
          amount: 0,
          chargingBasis: 'not_applicable',
        },
      ],
      subtotal,
      tax,
      total,
      currency: CURRENCY.code,
      currencySymbol: CURRENCY.symbol,
      taxNotice: 'Taxes are not configured until client-approved tax registration and statutory rules are supplied.',
      amountsStatus: 'sample',
    });
  };

  const handleProceedFromDates = () => {
    if (dateError) return;
    setCurrentStep('room-selection');
  };

  const handleSelectRoom = (room: SampleRoom) => {
    if (!room.isAvailableSample) {
      setSoldOutAttemptRoom(room);
      return;
    }
    setSoldOutAttemptRoom(null);
    setSelectedRoom(room);
    setCurrentStep('add-ons');
  };

  const handleProceedFromAddOns = () => {
    setCurrentStep('quote');
  };

  const handleProceedFromQuote = () => {
    setCurrentStep('guest-details');
  };

  const handleAutofillDemoGuest = () => {
    setGuestDetails({
      firstName: 'Aarav',
      lastName: 'Menon',
      email: 'aarav.menon.demo@example.com',
      phone: '+91 98765 43210',
      dietaryNotes: 'Vegetarian, preference for local seasonal fruit and herbal tea.',
      arrivalNotes: 'Interested in the Sunrise Crest ascent if guide conditions permit.',
    });
    setGuestError(null);
  };

  const handleProceedFromGuest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestDetails.firstName || !guestDetails.lastName || !guestDetails.email) {
      setGuestError('Please enter your first name, last name, and a valid email.');
      return;
    }
    setGuestError(null);
    if (!paymentForm.cardholderName) {
      setPaymentForm((prev) => ({
        ...prev,
        cardholderName: `${guestDetails.firstName} ${guestDetails.lastName}`,
        cardNumber: '4242 •••• •••• 4242',
      }));
    }
    setCurrentStep('simulated-payment');
  };

  const handleAutofillCard = () => {
    setPaymentForm({
      cardholderName: `${guestDetails.firstName || 'Demo'} ${guestDetails.lastName || 'Guest'}`,
      cardNumber: '4111 2222 3333 4444',
      expiry: '09/29',
      cvv: '821',
      postalCode: '560001',
    });
  };

  const handleSubmitPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessingPayment(true);
    setPaymentError(null);

    setTimeout(() => {
      setIsProcessingPayment(false);

      if (paymentOutcomeSimulation === 'failure') {
        setPaymentError(
          'Simulated Payment Failed: Card verification error code (SIMULATED_TEST_DECLINE). Your card was not charged. You can toggle payment mode to "Simulate Payment Success" below to test the success flow.'
        );
      } else {
        const code = `PH-IN-${Math.floor(10000 + Math.random() * 90000)}`;
        setConfirmationCode(code);
        setBookingTimestamp(new Date().toLocaleString());
        setCurrentStep('confirmation');
      }
    }, 1200);
  };

  const handleDownloadReceipt = () => {
    if (!quoteData) return;
    const textContent = `
========================================
PINE HIDEOUT V0 — DEMO BOOKING RECEIPT
========================================
Confirmation Code: ${confirmationCode}
Status: Confirmed Demo Reservation (No Real Charge)
Date Issued: ${bookingTimestamp}

GUEST DETAILS:
Name: ${guestDetails.firstName} ${guestDetails.lastName}
Email: ${guestDetails.email}
Phone: ${guestDetails.phone || 'N/A'}
Dietary Notes: ${guestDetails.dietaryNotes || 'Standard'}

RESERVATION SUMMARY:
Room: ${selectedRoom?.name}
Check-In: ${checkIn} (from 3:00 PM)
Check-Out: ${checkOut} (until 11:00 AM)
Nights: ${quoteData.nights}
Guests: ${quoteData.guests.adults} Adults, ${quoteData.guests.children} Children

ITEMIZED CHARGES (${CURRENCY.code}):
${quoteData.lineItems.map((li: any) => `• ${li.description.padEnd(55)} ${formatPrice(li.amount)}`).join('\n')}

Subtotal:                     ${formatPrice(quoteData.subtotal)}
Taxes & Statutory Levies:     Not configured pending client registration (₹0)
----------------------------------------
TOTAL DEMO AMOUNT:            ${formatPrice(quoteData.total)} ${CURRENCY.code}
Payment Method:               Simulated Demo Card (${paymentForm.cardNumber.slice(-4) || '4242'})

DISCLAIMER:
Demo booking — no real reservation or charge.
Pine Hideout V0 concept prototype. Status: sample.
========================================
`;

    const blob = new Blob([textContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `pine-hideout-demo-${confirmationCode}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadICS = () => {
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Pine Hideout V0//Demo Booking//EN
BEGIN:VEVENT
UID:${confirmationCode}@pinehideout.demo
DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z
DTSTART;VALUE=DATE:${checkIn.replace(/-/g, '')}
DTEND;VALUE=DATE:${checkOut.replace(/-/g, '')}
SUMMARY:Pine Hideout Stay — ${selectedRoom?.name}
DESCRIPTION:Demo booking at Pine Hideout. Code: ${confirmationCode}. No real reservation or charge. Status: sample.
LOCATION:Pine Hideout Highland Retreat (Demo)
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `pine-hideout-${confirmationCode}.ics`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const stepsList: { id: BookingStep; label: string }[] = [
    { id: 'dates-guests', label: '1. Dates' },
    { id: 'room-selection', label: '2. Room' },
    { id: 'add-ons', label: '3. Add-ons' },
    { id: 'quote', label: '4. Quote' },
    { id: 'guest-details', label: '5. Guest' },
    { id: 'simulated-payment', label: '6. Payment' },
    { id: 'confirmation', label: '7. Receipt' },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* 1. Mandatory Demo Booking Banner */}
      <div className="mb-8 p-3.5 bg-[#eadecb] border border-[#c67d4e]/40 rounded-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-[#554e43]">
        <div className="flex items-center gap-2">
          <Info className="w-4 h-4 text-[#c67d4e] shrink-0" />
          <span className="font-semibold text-[#1a3428]">
            {PROPERTY_CONFIG.brand.demoNotice}
          </span>
        </div>
        <span className="text-[11px] font-mono text-[#706757]">
          Currency: Indian Rupee ({CURRENCY.code} / {CURRENCY.symbol}) · Status: sample
        </span>
      </div>

      {/* 2. Step Progress Bar */}
      <div className="mb-10 bg-white border border-[#1a3428]/15 rounded-sm p-3 shadow-2xs overflow-x-auto">
        <div className="flex items-center justify-between min-w-[580px] text-xs">
          {stepsList.map((step, idx) => {
            const isCurrent = currentStep === step.id;
            const isPassed = stepsList.findIndex((s) => s.id === currentStep) > idx;

            return (
              <div key={step.id} className="flex items-center gap-2">
                <span
                  className={`font-mono text-xs px-2 py-0.5 rounded-sm transition-colors ${
                    isCurrent
                      ? 'bg-[#1a3428] text-white font-semibold'
                      : isPassed
                      ? 'bg-[#eadecb] text-[#1a3428] font-medium'
                      : 'text-stone-400'
                  }`}
                >
                  {step.label}
                </span>
                {idx < stepsList.length - 1 && (
                  <span className="text-stone-300 font-mono">›</span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. STEP 1: DATES & GUESTS */}
      {currentStep === 'dates-guests' && (
        <div className="bg-white border border-[#1a3428]/15 rounded-sm p-6 sm:p-8 shadow-2xs space-y-6">
          <div className="border-b border-[#1a3428]/10 pb-4">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#c67d4e]">Step 1 of 7</span>
            <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#12241b] mt-1">
              Select Stay Dates & Occupancy
            </h2>
            <p className="text-xs text-[#554e43] mt-1">
              Validate your demo reservation dates. Minimum stay: 1 night.
            </p>
          </div>

          {dateError && (
            <div className="p-3 bg-rose-50 border border-rose-300 text-rose-800 rounded-sm text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{dateError}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#1e2320] mb-2">
                Check-in Date
              </label>
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full text-sm px-3.5 py-2.5 bg-[#fbf9f4] border border-[#1a3428]/20 rounded-sm focus:outline-none focus:border-[#1a3428]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#1e2320] mb-2">
                Check-out Date
              </label>
              <input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full text-sm px-3.5 py-2.5 bg-[#fbf9f4] border border-[#1a3428]/20 rounded-sm focus:outline-none focus:border-[#1a3428]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#1e2320] mb-2">
                Adults (Age 13+)
              </label>
              <select
                value={adults}
                onChange={(e) => setAdults(Number(e.target.value))}
                className="w-full text-sm px-3.5 py-2.5 bg-[#fbf9f4] border border-[#1a3428]/20 rounded-sm focus:outline-none focus:border-[#1a3428]"
              >
                <option value={1}>1 Adult</option>
                <option value={2}>2 Adults</option>
                <option value={3}>3 Adults</option>
                <option value={4}>4 Adults</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#1e2320] mb-2">
                Children (Under 13)
              </label>
              <select
                value={children}
                onChange={(e) => setChildren(Number(e.target.value))}
                className="w-full text-sm px-3.5 py-2.5 bg-[#fbf9f4] border border-[#1a3428]/20 rounded-sm focus:outline-none focus:border-[#1a3428]"
              >
                <option value={0}>0 Children</option>
                <option value={1}>1 Child</option>
                <option value={2}>2 Children</option>
              </select>
            </div>
          </div>

          <div className="pt-4 flex items-center justify-between border-t border-[#1a3428]/10">
            <button
              onClick={onCloseToHome}
              className="text-xs text-[#706757] hover:text-[#12241b] cursor-pointer"
            >
              Cancel Demo
            </button>
            <button
              onClick={handleProceedFromDates}
              disabled={!!dateError}
              className="flex items-center gap-2 px-6 py-2.5 text-xs font-semibold bg-[#1a3428] hover:bg-[#12241b] text-white rounded-sm transition-colors disabled:opacity-40 cursor-pointer"
            >
              <span>Search Available Rooms</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* 4. STEP 2: AVAILABLE SAMPLE ROOMS */}
      {currentStep === 'room-selection' && (
        <div className="space-y-6">
          <div className="bg-white border border-[#1a3428]/15 rounded-sm p-6 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#c67d4e]">Step 2 of 7</span>
              <h2 className="font-serif text-2xl font-semibold text-[#12241b]">
                Select Available Sample Room
              </h2>
              <p className="text-xs text-[#554e43] mt-0.5">
                Dates: <strong className="text-[#12241b]">{checkIn}</strong> to <strong className="text-[#12241b]">{checkOut}</strong> · Guests: <strong className="text-[#12241b]">{adults + children}</strong>
              </p>
            </div>
            <button
              onClick={() => setCurrentStep('dates-guests')}
              className="text-xs text-[#1a3428] hover:text-[#c67d4e] underline font-medium self-start sm:self-auto cursor-pointer"
            >
              Change Dates or Occupancy
            </button>
          </div>

          {soldOutAttemptRoom && (
            <div className="p-4 bg-rose-50 border border-rose-300 rounded-sm text-xs text-rose-900 flex items-start gap-3 animate-in fade-in">
              <ShieldAlert className="w-5 h-5 text-rose-700 shrink-0 mt-0.5" />
              <div>
                <strong className="font-semibold text-rose-950">
                  Demo Sold-Out Notice: {soldOutAttemptRoom.name}
                </strong>
                <p className="mt-1">
                  This room is intentionally marked as sold out to demonstrate sold-out system handling. Please choose an available sample room to continue the simulation.
                </p>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PROPERTY_CONFIG.rooms.map((room) => {
              const totalGuests = adults + children;
              const isCapacityFit = room.maxGuests >= totalGuests;

              return (
                <div
                  key={room.id}
                  className={`bg-white border rounded-sm overflow-hidden flex flex-col justify-between transition-all ${
                    !room.isAvailableSample
                      ? 'border-rose-200 opacity-80'
                      : !isCapacityFit
                      ? 'border-stone-200 opacity-70'
                      : 'border-[#1a3428]/20 shadow-2xs hover:shadow-md'
                  }`}
                >
                  <div className="relative">
                    <ImageWithFallback
                      src={room.primaryImage}
                      alt={room.name}
                      fallbackTitle={room.name}
                      aspectRatioClass="aspect-[16/10]"
                    />
                    <div className="absolute top-3 left-3 bg-black/65 backdrop-blur-xs text-white px-2.5 py-1 text-xs font-mono rounded-sm">
                      {formatPrice(room.basePricePerNight)} / night
                    </div>
                    <div className="absolute top-3 right-3">
                      {room.isAvailableSample ? (
                        <span className="bg-[#1a3428]/85 text-emerald-200 px-2 py-0.5 text-[11px] font-medium rounded-sm">
                          Available
                        </span>
                      ) : (
                        <span className="bg-rose-900/90 text-rose-200 px-2 py-0.5 text-[11px] font-medium rounded-sm">
                          Sold Out
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-[11px] text-[#706757] font-mono uppercase tracking-wider mb-1">
                        <span>{room.viewType}</span>
                        <span aria-hidden="true">·</span>
                        <span>Capacity: {room.maxGuests} Guests</span>
                      </div>

                      <h3 className="font-serif text-xl font-semibold text-[#12241b] mb-1.5">
                        {room.name}
                      </h3>

                      <p className="text-xs text-[#554e43] leading-relaxed mb-3">
                        {room.description}
                      </p>

                      {!isCapacityFit && (
                        <div className="p-2 bg-amber-50 border border-amber-200 text-amber-900 rounded-sm text-[11px] mb-3">
                          Selected occupancy ({totalGuests} guests) exceeds this room’s maximum capacity of {room.maxGuests}.
                        </div>
                      )}
                    </div>

                    <div className="pt-3 border-t border-[#1a3428]/10 flex items-center justify-between gap-3">
                      <button
                        onClick={() => onOpenRoomModal(room)}
                        className="text-xs text-[#1a3428] hover:text-[#c67d4e] font-semibold cursor-pointer"
                      >
                        Quick Details
                      </button>

                      <button
                        onClick={() => handleSelectRoom(room)}
                        className={`px-4 py-2 text-xs font-semibold rounded-sm transition-colors cursor-pointer ${
                          !room.isAvailableSample
                            ? 'bg-rose-900 text-white hover:bg-rose-950'
                            : !isCapacityFit
                            ? 'bg-stone-300 text-stone-600 cursor-not-allowed'
                            : 'bg-[#1a3428] hover:bg-[#12241b] text-white'
                        }`}
                      >
                        {!room.isAvailableSample
                          ? 'Test Sold Out Notice'
                          : !isCapacityFit
                          ? 'Capacity Exceeded'
                          : 'Select Room'}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between pt-4">
            <button
              onClick={() => setCurrentStep('dates-guests')}
              className="flex items-center gap-1.5 text-xs text-[#706757] hover:text-[#12241b] cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Dates</span>
            </button>
          </div>
        </div>
      )}

      {/* 5. STEP 3: ROOM SELECTION & ADD-ONS */}
      {currentStep === 'add-ons' && selectedRoom && (
        <div className="bg-white border border-[#1a3428]/15 rounded-sm p-6 sm:p-8 shadow-2xs space-y-6">
          <div className="border-b border-[#1a3428]/10 pb-4">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#c67d4e]">Step 3 of 7</span>
            <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#12241b] mt-1">
              Customize Your Stay Experience
            </h2>
            <p className="text-xs text-[#554e43] mt-1">
              Selected: <strong className="text-[#12241b]">{selectedRoom.name}</strong> ({formatPrice(selectedRoom.basePricePerNight)}/night) · {checkIn} to {checkOut}
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#1a3428]">
              Optional Highland Enhancements (Explicit Charging Basis)
            </h3>

            {/* 1. Breakfast: per_guest_per_night */}
            <label className={`flex items-start gap-4 p-4 border rounded-sm cursor-pointer transition-colors ${
              addOns.breakfast ? 'bg-[#f4efe6] border-[#1a3428]/30' : 'bg-white border-stone-200 hover:border-stone-300'
            }`}>
              <input
                type="checkbox"
                checked={addOns.breakfast}
                onChange={(e) => setAddOns({ ...addOns, breakfast: e.target.checked })}
                className="mt-1 w-4 h-4 rounded-xs accent-[#1a3428]"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <Coffee className="w-4 h-4 text-[#c67d4e]" />
                    <span className="text-xs font-semibold text-[#12241b]">
                      {PROPERTY_CONFIG.addOns.breakfast.name}
                    </span>
                  </div>
                  <span className="text-xs font-mono font-semibold text-[#12241b]">
                    {formatPrice(PROPERTY_CONFIG.addOns.breakfast.price)} per guest / night
                  </span>
                </div>
                <p className="text-xs text-[#554e43] mt-1">
                  {PROPERTY_CONFIG.addOns.breakfast.description}
                </p>
                <div className="text-[11px] font-mono text-[#706757] mt-1">
                  Charging basis: per guest per night ({adults + children} guests × {quoteData?.nights || 1} nights)
                </div>
              </div>
            </label>

            {/* 2. Guided Trek Pass: per_guest_per_stay */}
            <label className={`flex items-start gap-4 p-4 border rounded-sm cursor-pointer transition-colors ${
              addOns.guidedTrekPass ? 'bg-[#f4efe6] border-[#1a3428]/30' : 'bg-white border-stone-200 hover:border-stone-300'
            }`}>
              <input
                type="checkbox"
                checked={addOns.guidedTrekPass}
                onChange={(e) => setAddOns({ ...addOns, guidedTrekPass: e.target.checked })}
                className="mt-1 w-4 h-4 rounded-xs accent-[#1a3428]"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <Mountain className="w-4 h-4 text-[#c67d4e]" />
                    <span className="text-xs font-semibold text-[#12241b]">
                      {PROPERTY_CONFIG.addOns.guidedTrekPass.name}
                    </span>
                  </div>
                  <span className="text-xs font-mono font-semibold text-[#12241b]">
                    {formatPrice(PROPERTY_CONFIG.addOns.guidedTrekPass.price)} per guest / stay
                  </span>
                </div>
                <p className="text-xs text-[#554e43] mt-1">
                  {PROPERTY_CONFIG.addOns.guidedTrekPass.description}
                </p>
                <div className="text-[11px] font-mono text-[#706757] mt-1">
                  Charging basis: per guest per stay ({adults + children} guests)
                </div>
              </div>
            </label>

            {/* 3. Seasoned Firewood: per_room_per_stay */}
            <label className={`flex items-start gap-4 p-4 border rounded-sm cursor-pointer transition-colors ${
              addOns.firewoodBundle ? 'bg-[#f4efe6] border-[#1a3428]/30' : 'bg-white border-stone-200 hover:border-stone-300'
            }`}>
              <input
                type="checkbox"
                checked={addOns.firewoodBundle}
                onChange={(e) => setAddOns({ ...addOns, firewoodBundle: e.target.checked })}
                className="mt-1 w-4 h-4 rounded-xs accent-[#1a3428]"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <Flame className="w-4 h-4 text-[#c67d4e]" />
                    <span className="text-xs font-semibold text-[#12241b]">
                      {PROPERTY_CONFIG.addOns.firewoodBundle.name}
                    </span>
                  </div>
                  <span className="text-xs font-mono font-semibold text-[#12241b]">
                    {formatPrice(PROPERTY_CONFIG.addOns.firewoodBundle.price)} per room / stay
                  </span>
                </div>
                <p className="text-xs text-[#554e43] mt-1">
                  {PROPERTY_CONFIG.addOns.firewoodBundle.description}
                </p>
                <div className="text-[11px] font-mono text-[#706757] mt-1">
                  Charging basis: per room per stay (1 bundle)
                </div>
              </div>
            </label>
          </div>

          <div className="pt-4 flex items-center justify-between border-t border-[#1a3428]/10">
            <button
              onClick={() => setCurrentStep('room-selection')}
              className="flex items-center gap-1.5 text-xs text-[#706757] hover:text-[#12241b] cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Rooms</span>
            </button>
            <button
              onClick={handleProceedFromAddOns}
              className="flex items-center gap-2 px-6 py-2.5 text-xs font-semibold bg-[#1a3428] hover:bg-[#12241b] text-white rounded-sm transition-colors cursor-pointer"
            >
              <span>View Itemized Quote</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* 6. STEP 4: ITEMIZED QUOTE */}
      {currentStep === 'quote' && (
        <div className="bg-white border border-[#1a3428]/15 rounded-sm p-6 sm:p-8 shadow-2xs space-y-6">
          <div className="border-b border-[#1a3428]/10 pb-4">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#c67d4e]">Step 4 of 7</span>
            <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#12241b] mt-1">
              Transparent Itemized Quote
            </h2>
            <p className="text-xs text-[#554e43] mt-1">
              Verified quote totals calculated from sample nightly rates and explicit add-on charging bases.
            </p>
          </div>

          {isCalculatingQuote || !quoteData ? (
            <div className="py-12 text-center text-xs text-[#706757] flex flex-col items-center justify-center gap-2">
              <RefreshCw className="w-5 h-5 animate-spin text-[#c67d4e]" />
              <span>Calculating itemized sample totals...</span>
            </div>
          ) : (
            <div className="space-y-6">
              
              <div className="p-4 bg-[#f4efe6] rounded-sm text-xs text-[#554e43] flex flex-col sm:flex-row justify-between gap-2 border border-[#1a3428]/10">
                <div>
                  <strong className="text-[#12241b]">{quoteData.roomName}</strong> · {quoteData.nights} Night{quoteData.nights > 1 ? 's' : ''} · {quoteData.guests.total} Guest{quoteData.guests.total > 1 ? 's' : ''}
                </div>
                <div>
                  Check-in: <strong className="text-[#12241b]">{quoteData.checkIn}</strong> · Check-out: <strong className="text-[#12241b]">{quoteData.checkOut}</strong>
                </div>
              </div>

              {/* Line Items Table */}
              <div className="space-y-2 border-b border-[#1a3428]/10 pb-4">
                {quoteData.lineItems.map((item: any, i: number) => (
                  <div key={i} className="flex items-center justify-between text-xs py-1.5">
                    <span className="text-[#554e43]">{item.description}</span>
                    <span className="font-mono font-medium text-[#12241b]">{formatPrice(item.amount)}</span>
                  </div>
                ))}
              </div>

              {/* Subtotal & Total */}
              <div className="space-y-2 pt-1 text-xs">
                <div className="flex items-center justify-between text-[#706757]">
                  <span>Subtotal</span>
                  <span className="font-mono">{formatPrice(quoteData.subtotal)}</span>
                </div>
                <div className="flex items-center justify-between text-[#706757]">
                  <span>Taxes & Statutory Levies</span>
                  <span className="font-mono text-emerald-800 font-medium">Not configured (₹0)</span>
                </div>
                <div className="pt-3 border-t border-[#1a3428]/20 flex items-center justify-between text-base sm:text-lg font-semibold text-[#12241b]">
                  <span className="font-serif">Total Demo Amount</span>
                  <span className="font-mono text-xl text-[#1a3428]">{formatPrice(quoteData.total)} {CURRENCY.code}</span>
                </div>
              </div>

              {/* Mandatory Disclaimers */}
              <div className="p-3 bg-[#eadecb]/40 border border-[#c67d4e]/30 rounded-sm text-[11px] text-[#554e43] space-y-1">
                <p>
                  <strong>Illustrative Amounts:</strong> All prices shown are sample figures in Indian Rupee (INR).
                </p>
                <p>
                  <strong>Tax Notice:</strong> Taxes and statutory fees are not configured pending client tax registration rules.
                </p>
              </div>
            </div>
          )}

          <div className="pt-4 flex items-center justify-between border-t border-[#1a3428]/10">
            <button
              onClick={() => setCurrentStep('add-ons')}
              className="flex items-center gap-1.5 text-xs text-[#706757] hover:text-[#12241b] cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Add-ons</span>
            </button>
            <button
              onClick={handleProceedFromQuote}
              className="flex items-center gap-2 px-6 py-2.5 text-xs font-semibold bg-[#1a3428] hover:bg-[#12241b] text-white rounded-sm transition-colors cursor-pointer"
            >
              <span>Continue to Guest Details</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* 7. STEP 5: GUEST DETAILS */}
      {currentStep === 'guest-details' && (
        <form onSubmit={handleProceedFromGuest} className="bg-white border border-[#1a3428]/15 rounded-sm p-6 sm:p-8 shadow-2xs space-y-6">
          <div className="border-b border-[#1a3428]/10 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#c67d4e]">Step 5 of 7</span>
              <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#12241b] mt-1">
                Guest Information (Demo Simulation)
              </h2>
              <p className="text-xs text-[#554e43] mt-0.5">
                Use fictional guest details for demonstrations. No real messages or records are created.
              </p>
            </div>

            <button
              type="button"
              onClick={handleAutofillDemoGuest}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-[#eadecb] text-[#1a3428] hover:bg-[#d8cbb5] rounded-sm transition-colors cursor-pointer self-start sm:self-auto"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#c67d4e]" />
              <span>Fill Fictional Demo Guest</span>
            </button>
          </div>

          {guestError && (
            <div className="p-3 bg-rose-50 border border-rose-300 text-rose-800 rounded-sm text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{guestError}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#1e2320] mb-1">
                First Name *
              </label>
              <input
                type="text"
                required
                value={guestDetails.firstName}
                onChange={(e) => setGuestDetails({ ...guestDetails, firstName: e.target.value })}
                placeholder="e.g. Aarav"
                className="w-full text-xs px-3 py-2.5 bg-[#fbf9f4] border border-[#1a3428]/20 rounded-sm focus:outline-none focus:border-[#1a3428]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#1e2320] mb-1">
                Last Name *
              </label>
              <input
                type="text"
                required
                value={guestDetails.lastName}
                onChange={(e) => setGuestDetails({ ...guestDetails, lastName: e.target.value })}
                placeholder="e.g. Menon"
                className="w-full text-xs px-3 py-2.5 bg-[#fbf9f4] border border-[#1a3428]/20 rounded-sm focus:outline-none focus:border-[#1a3428]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#1e2320] mb-1">
                Email Address *
              </label>
              <input
                type="email"
                required
                value={guestDetails.email}
                onChange={(e) => setGuestDetails({ ...guestDetails, email: e.target.value })}
                placeholder="guest@example.com"
                className="w-full text-xs px-3 py-2.5 bg-[#fbf9f4] border border-[#1a3428]/20 rounded-sm focus:outline-none focus:border-[#1a3428]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#1e2320] mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                value={guestDetails.phone}
                onChange={(e) => setGuestDetails({ ...guestDetails, phone: e.target.value })}
                placeholder="+91 98765 43210"
                className="w-full text-xs px-3 py-2.5 bg-[#fbf9f4] border border-[#1a3428]/20 rounded-sm focus:outline-none focus:border-[#1a3428]"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#1e2320] mb-1">
              Dietary Requirements or Allergies
            </label>
            <input
              type="text"
              value={guestDetails.dietaryNotes}
              onChange={(e) => setGuestDetails({ ...guestDetails, dietaryNotes: e.target.value })}
              placeholder="e.g. Vegetarian, morning tea preferences"
              className="w-full text-xs px-3 py-2 bg-[#fbf9f4] border border-[#1a3428]/20 rounded-sm focus:outline-none focus:border-[#1a3428]"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#1e2320] mb-1">
              Arrival & Trek Inquiry Notes
            </label>
            <textarea
              rows={2}
              value={guestDetails.arrivalNotes}
              onChange={(e) => setGuestDetails({ ...guestDetails, arrivalNotes: e.target.value })}
              placeholder="e.g. Interested in morning guided treks..."
              className="w-full text-xs px-3 py-2 bg-[#fbf9f4] border border-[#1a3428]/20 rounded-sm focus:outline-none focus:border-[#1a3428]"
            />
          </div>

          <div className="pt-4 flex items-center justify-between border-t border-[#1a3428]/10">
            <button
              type="button"
              onClick={() => setCurrentStep('quote')}
              className="flex items-center gap-1.5 text-xs text-[#706757] hover:text-[#12241b] cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Quote</span>
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2.5 text-xs font-semibold bg-[#1a3428] hover:bg-[#12241b] text-white rounded-sm transition-colors cursor-pointer"
            >
              <span>Continue to Payment Simulation</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </form>
      )}

      {/* 8. STEP 6: SIMULATED PAYMENT */}
      {currentStep === 'simulated-payment' && quoteData && (
        <form onSubmit={handleSubmitPayment} className="bg-white border border-[#1a3428]/15 rounded-sm p-6 sm:p-8 shadow-2xs space-y-6">
          <div className="border-b border-[#1a3428]/10 pb-4">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#c67d4e]">Step 6 of 7</span>
            <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#12241b] mt-1">
              Simulated Payment Authorization
            </h2>
            <p className="text-xs text-[#554e43] mt-0.5">
              Simulate checkout authorization for <strong className="text-[#12241b]">{formatPrice(quoteData.total)} {CURRENCY.code}</strong>.
            </p>
          </div>

          {/* Test State Simulator Controls */}
          <div className="p-4 bg-[#f4efe6] border border-[#1a3428]/20 rounded-sm space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#12241b]">
                Payment Mode Simulator:
              </span>
              <button
                type="button"
                onClick={handleAutofillCard}
                className="text-[11px] text-[#c67d4e] hover:text-[#a05a2f] font-medium underline cursor-pointer"
              >
                Autofill Test Card
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => {
                  setPaymentOutcomeSimulation('success');
                  setPaymentError(null);
                }}
                className={`py-2 px-3 rounded-xs font-medium border text-center transition-colors cursor-pointer ${
                  paymentOutcomeSimulation === 'success'
                    ? 'bg-emerald-800 text-white border-emerald-900 shadow-xs'
                    : 'bg-white text-stone-700 border-stone-300 hover:bg-stone-50'
                }`}
              >
                ✓ Simulate Payment SUCCESS
              </button>

              <button
                type="button"
                onClick={() => setPaymentOutcomeSimulation('failure')}
                className={`py-2 px-3 rounded-xs font-medium border text-center transition-colors cursor-pointer ${
                  paymentOutcomeSimulation === 'failure'
                    ? 'bg-rose-900 text-white border-rose-950 shadow-xs'
                    : 'bg-white text-stone-700 border-stone-300 hover:bg-stone-50'
                }`}
              >
                ✕ Simulate Payment FAILURE (Test Decline)
              </button>
            </div>

            <p className="text-[11px] text-[#706757]">
              Current active state: <strong className="text-[#12241b]">{paymentOutcomeSimulation === 'success' ? 'Payment Will Succeed' : 'Payment Will Trigger Decline Error'}</strong>.
            </p>
          </div>

          {paymentError && (
            <div className="p-4 bg-rose-50 border border-rose-300 text-rose-900 rounded-sm text-xs flex items-start gap-2.5 animate-in fade-in">
              <AlertCircle className="w-5 h-5 text-rose-700 shrink-0 mt-0.5" />
              <div>
                <strong className="font-semibold text-rose-950">Payment Authorization Failed (Demo Simulation)</strong>
                <p className="mt-1 leading-relaxed">{paymentError}</p>
              </div>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#1e2320] mb-1">
                Name on Card (Demo)
              </label>
              <input
                type="text"
                required
                value={paymentForm.cardholderName}
                onChange={(e) => setPaymentForm({ ...paymentForm, cardholderName: e.target.value })}
                className="w-full text-xs px-3 py-2.5 bg-[#fbf9f4] border border-[#1a3428]/20 rounded-sm focus:outline-none focus:border-[#1a3428]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#1e2320] mb-1">
                Test Card Number
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={paymentForm.cardNumber}
                  onChange={(e) => setPaymentForm({ ...paymentForm, cardNumber: e.target.value })}
                  placeholder="4111 2222 3333 4444"
                  className="w-full text-xs px-3 py-2.5 bg-[#fbf9f4] border border-[#1a3428]/20 rounded-sm focus:outline-none focus:border-[#1a3428] font-mono"
                />
                <CreditCard className="w-4 h-4 text-stone-400 absolute right-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#1e2320] mb-1">
                  Expiry
                </label>
                <input
                  type="text"
                  required
                  value={paymentForm.expiry}
                  onChange={(e) => setPaymentForm({ ...paymentForm, expiry: e.target.value })}
                  placeholder="MM/YY"
                  className="w-full text-xs px-3 py-2.5 bg-[#fbf9f4] border border-[#1a3428]/20 rounded-sm focus:outline-none focus:border-[#1a3428] font-mono text-center"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#1e2320] mb-1">
                  CVV
                </label>
                <input
                  type="text"
                  required
                  value={paymentForm.cvv}
                  onChange={(e) => setPaymentForm({ ...paymentForm, cvv: e.target.value })}
                  placeholder="3-digit"
                  className="w-full text-xs px-3 py-2.5 bg-[#fbf9f4] border border-[#1a3428]/20 rounded-sm focus:outline-none focus:border-[#1a3428] font-mono text-center"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#1e2320] mb-1">
                  PIN / Code
                </label>
                <input
                  type="text"
                  required
                  value={paymentForm.postalCode}
                  onChange={(e) => setPaymentForm({ ...paymentForm, postalCode: e.target.value })}
                  className="w-full text-xs px-3 py-2.5 bg-[#fbf9f4] border border-[#1a3428]/20 rounded-sm focus:outline-none focus:border-[#1a3428] text-center"
                />
              </div>
            </div>
          </div>

          <div className="pt-4 flex items-center justify-between border-t border-[#1a3428]/10">
            <button
              type="button"
              onClick={() => setCurrentStep('guest-details')}
              disabled={isProcessingPayment}
              className="flex items-center gap-1.5 text-xs text-[#706757] hover:text-[#12241b] cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Guest Details</span>
            </button>

            <button
              type="submit"
              disabled={isProcessingPayment}
              className="flex items-center gap-2 px-6 py-2.5 text-xs font-semibold bg-[#1a3428] hover:bg-[#12241b] text-white rounded-sm transition-colors cursor-pointer disabled:opacity-50"
            >
              {isProcessingPayment ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#c67d4e]" />
                  <span>Authorizing Simulated Payment...</span>
                </>
              ) : (
                <>
                  <span>Submit Demo Payment ({formatPrice(quoteData.total)})</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </div>
        </form>
      )}

      {/* 9. STEP 7: DEMO CONFIRMATION */}
      {currentStep === 'confirmation' && quoteData && (
        <div className="bg-white border border-[#1a3428]/15 rounded-sm p-6 sm:p-10 shadow-xl space-y-8 animate-in zoom-in-95 duration-200">
          
          <div className="text-center max-w-lg mx-auto space-y-2">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto mb-3">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <span className="text-xs font-mono uppercase tracking-wider text-[#c67d4e] font-semibold">
              Demo Reservation Confirmed (Status: sample)
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#12241b] tracking-tight">
              Simulated Booking Acknowledgment
            </h2>
            <p className="text-xs text-[#554e43]">
              A complete demo summary has been generated for your review. No charge has been made to any financial account.
            </p>
          </div>

          <div className="p-6 bg-[#f4efe6] border border-[#1a3428]/15 rounded-sm grid grid-cols-1 sm:grid-cols-3 gap-4 text-center sm:text-left">
            <div>
              <div className="text-[10px] font-mono uppercase tracking-wider text-[#706757]">
                Booking Reference
              </div>
              <div className="font-mono text-xl font-bold text-[#12241b] mt-0.5">
                {confirmationCode}
              </div>
            </div>

            <div>
              <div className="text-[10px] font-mono uppercase tracking-wider text-[#706757]">
                Selected Room
              </div>
              <div className="text-xs font-semibold text-[#12241b] mt-0.5">
                {selectedRoom?.name}
              </div>
              <div className="text-[11px] text-[#706757]">
                {quoteData.nights} Night Stay ({checkIn} – {checkOut})
              </div>
            </div>

            <div>
              <div className="text-[10px] font-mono uppercase tracking-wider text-[#706757]">
                Demo Total Authorized
              </div>
              <div className="font-mono text-xl font-bold text-[#1a3428] mt-0.5">
                {formatPrice(quoteData.total)} {CURRENCY.code}
              </div>
              <div className="text-[11px] text-[#706757]">
                Simulated Payment Confirmed
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-[#1a3428]/10 text-xs">
            <div>
              <h3 className="font-serif text-lg font-semibold text-[#12241b] mb-2">
                Fictional Guest Profile
              </h3>
              <div className="space-y-1 text-[#554e43]">
                <p><strong>Primary Guest:</strong> {guestDetails.firstName} {guestDetails.lastName}</p>
                <p><strong>Email:</strong> {guestDetails.email}</p>
                <p><strong>Phone:</strong> {guestDetails.phone || 'None provided'}</p>
                <p><strong>Dietary Preferences:</strong> {guestDetails.dietaryNotes || 'Standard provisions'}</p>
                <p><strong>Check-in Window:</strong> 03:00 PM – 07:00 PM (Draft policy)</p>
                <p><strong>Check-out Time:</strong> 11:00 AM (Draft policy)</p>
              </div>
            </div>

            <div>
              <h3 className="font-serif text-lg font-semibold text-[#12241b] mb-2">
                Itemized Summary ({CURRENCY.code})
              </h3>
              <div className="space-y-1.5 text-[#554e43]">
                {quoteData.lineItems.map((li: any, i: number) => (
                  <div key={i} className="flex justify-between py-0.5">
                    <span>{li.description}</span>
                    <span className="font-mono font-medium">{formatPrice(li.amount)}</span>
                  </div>
                ))}
                <div className="pt-2 border-t border-[#1a3428]/10 flex justify-between font-semibold text-[#12241b]">
                  <span>Total Simulated Paid</span>
                  <span className="font-mono">{formatPrice(quoteData.total)} {CURRENCY.code}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-[#1a3428]/10 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={handleDownloadReceipt}
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold bg-[#f4efe6] hover:bg-[#eadecb] text-[#12241b] border border-[#1a3428]/15 rounded-sm transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-[#c67d4e]" />
                <span>Download Receipt (.txt)</span>
              </button>

              <button
                onClick={handleDownloadICS}
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold bg-[#f4efe6] hover:bg-[#eadecb] text-[#12241b] border border-[#1a3428]/15 rounded-sm transition-colors cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5 text-[#c67d4e]" />
                <span>Export Calendar (.ics)</span>
              </button>

              <button
                onClick={() => window.print()}
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-[#706757] hover:text-[#12241b] cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print</span>
              </button>
            </div>

            <button
              onClick={onCloseToHome}
              className="px-6 py-2 text-xs font-semibold bg-[#1a3428] hover:bg-[#12241b] text-white rounded-sm transition-colors cursor-pointer"
            >
              Return to Prototype Home
            </button>
          </div>

        </div>
      )}

    </div>
  );
};
