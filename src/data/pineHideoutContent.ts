/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Pine Hideout V0 — Central Content & Inventory Configuration
 * 
 * CONTENT STATUS POLICY:
 * - 'sample': Fictional or unconfirmed prototype proposal; not approved or built.
 * - 'client-approved': Formally verified and signed off by the client.
 * - 'externally-verified': Validated against authoritative tourism or administrative public data.
 * 
 * NOTE ON TERMINOLOGY:
 * Accommodation is strictly presented as sample room-based accommodation
 * (e.g., Pine View Room, Mountain View Room, Valley View Room, Family Room, Deluxe Room).
 */

import { HIMALAYAN_IMAGE_CATALOG } from './himalayanImages';

export { HIMALAYAN_IMAGE_CATALOG };

export const IMAGES = {
  hero: HIMALAYAN_IMAGE_CATALOG.heroVista.src,
  trailVista: HIMALAYAN_IMAGE_CATALOG.valleyTrek.src,
  cabinExterior: HIMALAYAN_IMAGE_CATALOG.roomPineView.src,
  roomInterior: HIMALAYAN_IMAGE_CATALOG.roomMountainView.src,
  loungeHearth: HIMALAYAN_IMAGE_CATALOG.roomLounge.src,
};

export type ContentStatus = 'sample' | 'client-approved' | 'externally-verified';

export interface CurrencyConfig {
  code: string;
  symbol: string;
  name: string;
  locale: string;
}

export const CURRENCY: CurrencyConfig = {
  code: 'INR',
  symbol: '₹',
  name: 'Indian Rupee',
  locale: 'en-IN',
};

export function formatPrice(amount: number): string {
  return `${CURRENCY.symbol}${amount.toLocaleString(CURRENCY.locale)}`;
}

export type ChargingBasis = 'per_guest_per_night' | 'per_room_per_night' | 'per_guest_per_stay' | 'per_room_per_stay';

export interface AddOnOption {
  id: string;
  name: string;
  description: string;
  price: number;
  chargingBasis: ChargingBasis;
  status: ContentStatus;
}

export interface SampleRoom {
  id: string;
  legacyAlias?: string;
  name: string;
  tagline: string;
  description: string;
  basePricePerNight: number;
  maxGuests: number;
  maxAdults: number;
  maxChildren: number;
  bedType: string;
  sizeSqFt: number;
  viewType: 'Pine View' | 'Mountain View' | 'Valley View' | 'Forest & Meadow View';
  isAvailableSample: boolean;
  soldOutNotice?: string;
  primaryImage: string;
  galleryImages: string[];
  features: string[];
  amenities: {
    icon: string;
    title: string;
    description: string;
  }[];
  floorPlanNotes: string;
  status: ContentStatus;
}

export interface SampleTrek {
  id: string;
  title: string;
  subtitle: string;
  geographicRegion: string;
  startPoint: string;
  endPoint: string;
  distanceKm: number;
  routeType: 'Round-trip' | 'One-way' | 'Circuit';
  difficulty: 'Gentle' | 'Moderate' | 'Moderate to Strenuous' | 'Strenuous';
  difficultyReason: string;
  duration: string;
  elevationGainM: number;
  peakAltitudeM: number;
  typicalSeason: string;
  terrainAndFitness: string;
  permitsAndGuides: string;
  departureTime: string;
  idealFor: string;
  guideIncluded: boolean;
  heroImage: string;
  summary: string;
  itinerary: {
    stage: string;
    description: string;
  }[];
  gearRequired: string[];
  safetyAdvisory: string;
  currentConditionsNotice: string;
  sourcesAndReview: {
    authoritativeSource: string;
    lastVerifiedDate: string;
  };
  status: ContentStatus;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Mountain Landscapes' | 'Forest & Trails' | 'Village Life' | 'Illustrative Rooms';
  image: string;
  caption: string;
  location?: string;
  attribution: string;
  type: 'destination' | 'illustrative-accommodation';
  status: ContentStatus;
}

export interface FAQItem {
  id: string;
  category: 'Booking & Reservations' | 'Treks & Mountain Life' | 'Arrival & Location' | 'Policies & Comfort';
  question: string;
  answer: string;
  status: ContentStatus;
}

export const PROPERTY_CONFIG = {
  brand: {
    name: 'Pine Hideout',
    subtitle: 'Highland Retreat & Mountain Treks',
    tagline: 'Fictional Himalayan room retreat concept amidst pine woodlands',
    elevationProposal: '1,840 m (Sample proposal — unverified)',
    season: 'Autumn / Early Himalayan Frost (Prototype scenario)',
    demoNotice: 'Demo booking — no real reservation or charge',
    unconfirmedNotice: 'Client location, room inventory, prices, policies, and photos are not confirmed. Status: sample data.',
  },

  contact: {
    phone: '+91 (0) 80 5550 1974 (Demo Prototype Line)',
    email: 'host.prototype@pinehideout.example.com',
    deskHours: '08:00 – 20:00 Demo Hours',
    addressPlaceholder: 'Unconfirmed Himalayan Location (Status: sample — fictional coordinates for prototype demonstration)',
  },

  addOns: {
    breakfast: {
      id: 'breakfast',
      name: 'Artisan Highland Breakfast Basket',
      description: 'Daily fresh bakery, local preserves, fruit, and hot beverages delivered each morning.',
      price: 1200,
      chargingBasis: 'per_guest_per_night',
      status: 'sample',
    } as AddOnOption,
    guidedTrekPass: {
      id: 'guidedTrekPass',
      name: 'Guided Mountain Trek & Route Pass',
      description: 'Single-session accompaniment by designated local guide with trail refreshments.',
      price: 3500,
      chargingBasis: 'per_guest_per_stay',
      status: 'sample',
    } as AddOnOption,
    firewoodBundle: {
      id: 'firewoodBundle',
      name: 'Seasoned Pine Firewood & Tinder Bundle',
      description: 'One complete evening supply of seasoned pine split logs and fire lighters for room hearth.',
      price: 1500,
      chargingBasis: 'per_room_per_stay',
      status: 'sample',
    } as AddOnOption,
  },

  // Consistent Sample Room Names
  rooms: [
    {
      id: 'pine-view-room',
      legacyAlias: 'ridge-cabin',
      name: 'Pine View Room',
      tagline: 'Proposed boutique bedroom with large windows framing deodar pine groves (Status: sample)',
      description: 'Conceptual room featuring timber framing, double-glazed windows overlooking Himalayan blue pine and cedar trees. Proposed layout includes a quiet heating hearth, wool textiles, and ensuite bathroom. All features are illustrative sample concepts.',
      basePricePerNight: 18500,
      maxGuests: 2,
      maxAdults: 2,
      maxChildren: 0,
      bedType: '1 King Bed',
      sizeSqFt: 460,
      viewType: 'Pine View',
      isAvailableSample: true,
      primaryImage: HIMALAYAN_IMAGE_CATALOG.roomPineView.src,
      galleryImages: [
        HIMALAYAN_IMAGE_CATALOG.roomPineView.src,
        HIMALAYAN_IMAGE_CATALOG.heroVista.src,
        HIMALAYAN_IMAGE_CATALOG.roomLounge.src,
      ],
      features: ['Pine-facing balcony (Proposed)', 'Quiet heating hearth (Sample)', 'Private bath with forest view', 'Pour-over mountain coffee & tea bar'],
      amenities: [
        { icon: 'Flame', title: 'Room Hearth', description: 'Proposed in-room warming hearth (Status: sample)' },
        { icon: 'Bath', title: 'Ensuite Bath', description: 'Private tiled bathroom with hot water (Status: sample)' },
        { icon: 'Coffee', title: 'Tea & Coffee', description: 'Kettle with organic Himalayan teas (Status: sample)' },
        { icon: 'Wifi', title: 'Wi-Fi Proposal', description: 'Planned broadband connectivity (Status: sample)' },
      ],
      floorPlanNotes: 'Proposed ~42.7 m² boutique room layout with private viewing balcony (Sample architectural concept).',
      status: 'sample',
    },
    {
      id: 'mountain-view-room',
      legacyAlias: 'canopy-suite',
      name: 'Mountain View Room',
      tagline: 'Proposed upper-level room with panoramic vista of distant Himalayan peaks (Status: sample)',
      description: 'Conceptual upper-floor bedroom oriented towards snow-capped Himalayan ranges. Concept features hardwood flooring, plush king bed, private viewing balcony, and expansive double-glazed glass walls. Unconfirmed prototype specifications.',
      basePricePerNight: 24000,
      maxGuests: 2,
      maxAdults: 2,
      maxChildren: 0,
      bedType: '1 King Bed',
      sizeSqFt: 520,
      viewType: 'Mountain View',
      isAvailableSample: true,
      primaryImage: HIMALAYAN_IMAGE_CATALOG.roomMountainView.src,
      galleryImages: [
        HIMALAYAN_IMAGE_CATALOG.roomMountainView.src,
        HIMALAYAN_IMAGE_CATALOG.heroVista.src,
        HIMALAYAN_IMAGE_CATALOG.valleyTrek.src,
      ],
      features: ['Panoramic mountain balcony (Proposed)', 'Floor-to-ceiling glass wall', 'Binoculars & mountain peak guide', 'Hand-woven wool throws'],
      amenities: [
        { icon: 'Eye', title: 'Mountain Panorama', description: 'Wide-angle views toward high summits (Status: sample)' },
        { icon: 'Trees', title: 'Private Balcony', description: 'Covered outdoor timber seating (Status: sample)' },
        { icon: 'Sparkles', title: 'Soaking Tub', description: 'Deep room bath concept (Status: sample)' },
        { icon: 'Thermometer', title: 'Radiant Heat', description: 'Proposed underfloor heating (Status: sample)' },
      ],
      floorPlanNotes: 'Proposed ~48.3 m² corner room layout with panoramic mountain orientation (Sample draft).',
      status: 'sample',
    },
    {
      id: 'valley-view-room',
      legacyAlias: 'valley-sanctuary',
      name: 'Valley View Room',
      tagline: 'Proposed secluded room overlooking misty terraced valleys (Status: sample)',
      description: 'Conceptual room looking out over the winding Himalayan river valley below. Features a daybed reading corner, private timber balcony, and serene minimalist decor. Prototype sample category.',
      basePricePerNight: 28000,
      maxGuests: 3,
      maxAdults: 2,
      maxChildren: 1,
      bedType: '1 King Bed + 1 Daybed',
      sizeSqFt: 580,
      viewType: 'Valley View',
      isAvailableSample: true,
      primaryImage: HIMALAYAN_IMAGE_CATALOG.villageRidge.src,
      galleryImages: [
        HIMALAYAN_IMAGE_CATALOG.villageRidge.src,
        HIMALAYAN_IMAGE_CATALOG.roomPineView.src,
        HIMALAYAN_IMAGE_CATALOG.forestStream.src,
      ],
      features: ['Valley-facing daybed (Proposed)', 'Panoramic valley windows (Sample)', 'Artisan tea station', 'Quiet reading alcove'],
      amenities: [
        { icon: 'Sun', title: 'Valley Outlook', description: 'Overlooking terraced mountain slopes (Status: sample)' },
        { icon: 'Compass', title: 'Quiet Wing', description: 'Positioned away from common spaces (Status: sample)' },
        { icon: 'Music', title: 'Reading Nook', description: 'Built-in daybed with reading lamps (Status: sample)' },
        { icon: 'Coffee', title: 'Botanical Teas', description: 'Locally curated herbal infusions (Status: sample)' },
      ],
      floorPlanNotes: 'Proposed ~53.8 m² spacious room with daybed alcove (Sample prototype concept).',
      status: 'sample',
    },
    {
      id: 'family-room',
      legacyAlias: 'meadow-lodge',
      name: 'Family Room',
      tagline: 'Proposed interconnected multi-bed room for families or trekking pairs (Status: sample)',
      description: 'Conceptual family accommodation featuring a king master bedroom connected to an adjoining twin sleeping nook. Includes a spacious seating area with stone fireplace accent and outdoor portico. Prototype sample.',
      basePricePerNight: 32000,
      maxGuests: 4,
      maxAdults: 4,
      maxChildren: 2,
      bedType: '1 King Bed + 2 Twin Beds',
      sizeSqFt: 780,
      viewType: 'Forest & Meadow View',
      isAvailableSample: true,
      primaryImage: HIMALAYAN_IMAGE_CATALOG.roomLounge.src,
      galleryImages: [
        HIMALAYAN_IMAGE_CATALOG.roomLounge.src,
        HIMALAYAN_IMAGE_CATALOG.roomMountainView.src,
        HIMALAYAN_IMAGE_CATALOG.heroVista.src,
      ],
      features: ['Two dedicated sleeping areas (Proposed)', 'Stone hearth seating zone (Sample)', 'Generous luggage storage', 'Private outdoor portico'],
      amenities: [
        { icon: 'Users', title: 'Sleeps up to 4', description: 'Family layout with twin beds (Status: sample)' },
        { icon: 'Flame', title: 'Stone Hearth', description: 'Warm family seating area (Status: sample)' },
        { icon: 'Footprints', title: 'Gear Vestibule', description: 'Entry space for trekking boots (Status: sample)' },
        { icon: 'Utensils', title: 'Tea Nook', description: 'Electric kettle and beverage setup (Status: sample)' },
      ],
      floorPlanNotes: 'Proposed ~72.5 m² multi-bed family suite with partitioned sleeping zones (Sample architectural concept).',
      status: 'sample',
    },
    {
      id: 'deluxe-room',
      legacyAlias: 'moss-cottage',
      name: 'Deluxe Room',
      tagline: 'Sample category demonstrating simulated sold-out inventory state (Status: sample)',
      description: 'Conceptual deluxe room proposal preserved specifically to demonstrate sold-out inventory handling in this prototype booking system. Not available for simulated dates.',
      basePricePerNight: 21500,
      maxGuests: 2,
      maxAdults: 2,
      maxChildren: 0,
      bedType: '1 Queen Bed',
      sizeSqFt: 410,
      viewType: 'Forest & Meadow View',
      isAvailableSample: false, // SOLD OUT DEMO STATE
      soldOutNotice: 'Sold out for the current sample dates. Illustrative demo state.',
      primaryImage: HIMALAYAN_IMAGE_CATALOG.roomPineView.src,
      galleryImages: [
        HIMALAYAN_IMAGE_CATALOG.roomPineView.src,
        HIMALAYAN_IMAGE_CATALOG.heroVista.src,
      ],
      features: ['Timber beam ceiling (Proposed)', 'Heated slate bathroom proposal', 'Quiet garden view', 'Crafted wooden furniture'],
      amenities: [
        { icon: 'Clock', title: 'Timber Accents', description: 'Woodwork and local slate (Status: sample)' },
        { icon: 'Droplets', title: 'Slate Floors', description: 'Bathroom heated floor proposal (Status: sample)' },
        { icon: 'BookOpen', title: 'Reading Chair', description: 'Armchair by the window (Status: sample)' },
      ],
      floorPlanNotes: 'Proposed ~38.1 m² deluxe room footprint (Sample sold-out test state).',
      status: 'sample',
    },
  ] as SampleRoom[],

  // Factual Himalayan Trek Inspiration
  treks: [
    {
      id: 'triund-ridge-ascent',
      title: 'Triund Ridge Trek',
      subtitle: 'Himalayan trek inspiration: Classic Dhauladhar ridgeline route overlooking Kangra Valley',
      geographicRegion: 'Dhauladhar Range, Kangra District, Himachal Pradesh, India',
      startPoint: 'Galu Devi Temple / Dharamkot (2,130 m)',
      endPoint: 'Triund Ridge Plateau (2,828 m)',
      distanceKm: 14,
      routeType: 'Round-trip',
      difficulty: 'Moderate',
      difficultyReason: 'Sustained uphill gradient along rocky stone paths, with a steep 22-curve switchback section near the crest. Well-defined trail with steep altitude gain of ~698m.',
      duration: '4 to 6 Hours (Round-trip)',
      elevationGainM: 698,
      peakAltitudeM: 2828,
      typicalSeason: 'April to June (clear days, rhododendron blooms) and September to November (crisp alpine visibility). Winter (Dec–Feb) features heavy snow.',
      terrainAndFitness: 'Stone steps, packed dirt, uneven granite switchbacks. Requires moderate cardiovascular stamina and comfortable hiking footwear.',
      permitsAndGuides: 'Forest registration at Galu Devi Forest Checkpoint (HP Forest Dept). Registered local guide advised for first-time high-altitude hikers.',
      departureTime: '07:30 AM (Sample early morning departure)',
      idealFor: 'Moderate fitness hikers, photographers, day trekkers',
      guideIncluded: true,
      heroImage: HIMALAYAN_IMAGE_CATALOG.valleyTrek.src,
      summary: 'One of the most celebrated day-treks in the Western Himalayas. Winding through dense rhododendron, oak, and deodar pine forests, the trail emerges onto a grassy alpine ridge with the immense granite cliffs of the Dhauladhar rising directly ahead and the sprawling Kangra valley below.',
      itinerary: [
        { stage: 'Stage 1 — Galu Devi to Magic View (3 km)', description: 'Ascend through shaded oak and deodar canopy on a steady incline to one of the oldest trail cafes in the region.' },
        { stage: 'Stage 2 — Magic View to Triund Ridge (4 km)', description: 'Negotiate the famous "22 curves" (twenty-two steep stone switchbacks) to reach the top ridge.' },
        { stage: 'Stage 3 — Triund Ridge Crest (2,828 m)', description: 'Uninterrupted panoramic view of the Moon Peak and Indrahar Pass wall, followed by afternoon descent.' },
      ],
      gearRequired: ['Sturdy hiking shoes with lugged soles', 'Windproof fleece layer', '2L water bottle', 'UV sunglasses & hat', 'Trekking poles'],
      safetyAdvisory: 'Weather shifts rapidly in the Dhauladhar Range. Afternoon cloud cover and sudden temperature drops are common. Not an active Pine Hideout facility trail.',
      currentConditionsNotice: 'Current trail conditions not verified — check with local forest checkpoint at Galu Devi or registered local guide.',
      sourcesAndReview: {
        authoritativeSource: 'Himachal Pradesh Tourism Development Corporation (HPTDC) & Kangra District Forest Administration',
        lastVerifiedDate: 'October 2026',
      },
      status: 'externally-verified',
    },
    {
      id: 'kheerganga-forest-trail',
      title: 'Kheerganga Forest Trail',
      subtitle: 'Himalayan trek inspiration: Sacred alpine meadow route through Parvati Valley pine forests',
      geographicRegion: 'Parvati Valley, Kullu District, Himachal Pradesh, India',
      startPoint: 'Barshaini Village (1,189 m)',
      endPoint: 'Kheerganga Meadow (2,960 m)',
      distanceKm: 24,
      routeType: 'Round-trip',
      difficulty: 'Moderate to Strenuous',
      difficultyReason: 'Substantial cumulative altitude gain (+1,771m), rocky stream crossings, narrow cliffside sections, and variable alpine weather over a 12 km one-way ascent.',
      duration: '5 to 7 Hours one-way (typically 2-Day expedition)',
      elevationGainM: 1771,
      peakAltitudeM: 2960,
      typicalSeason: 'May to June and September to October. Monsoon (July–August) prone to landslides; winter (Dec–March) sub-zero with snow.',
      terrainAndFitness: 'Pine needle forest paths, wooden footbridges over Parvati tributaries, steep wet rock steps near cascading waterfalls. High stamina required.',
      permitsAndGuides: 'Kullu District Administration safety registration at Barshaini. Local village guide strongly recommended.',
      departureTime: '06:30 AM (Early morning start recommended)',
      idealFor: 'Experienced multi-day trekkers, active endurance walkers',
      guideIncluded: true,
      heroImage: HIMALAYAN_IMAGE_CATALOG.forestStream.src,
      summary: 'A journey through the heart of the Parvati Valley. Passing traditional wooden villages like Nakthan and the sacred confluence at Rudranag, the trail climbs through virgin deodar and Himalayan blue pine groves to the high sub-alpine meadow of Kheerganga.',
      itinerary: [
        { stage: 'Stage 1 — Barshaini to Nakthan Village (4 km)', description: 'Walk through apple orchards and terraced fields overlooking the Parvati River gorge.' },
        { stage: 'Stage 2 — Nakthan to Rudranag Confluence (4 km)', description: 'Cross wooden bridge over raging waters and pass the ancient sacred waterfall temple.' },
        { stage: 'Stage 3 — Upper Pine Ascent to Kheerganga (4 km)', description: 'Steep climb through dense forest canopy opening onto the wide high-altitude meadow.' },
      ],
      gearRequired: ['Waterproof trekking boots', 'Layered thermal clothing', 'Rain shell / poncho', 'Headlamp', 'Electrolytes & personal first aid'],
      safetyAdvisory: 'Steep drop-offs along river canyon. Avoid during heavy monsoon rains due to flash flood risks. Researched Himalayan inspiration route.',
      currentConditionsNotice: 'Current trail conditions not verified — consult Barshaini forest desk or local village administration before departure.',
      sourcesAndReview: {
        authoritativeSource: 'Kullu District Tourism & Parvati Valley Eco-Tourism Committee',
        lastVerifiedDate: 'October 2026',
      },
      status: 'externally-verified',
    },
    {
      id: 'tirthan-valley-river-walk',
      title: 'Tirthan Valley & GHNP Eco-Zone Walk',
      subtitle: 'Himalayan trek inspiration: Gentle riverbank walk along pristine trout streams and deodar groves',
      geographicRegion: 'Tirthan Valley, Great Himalayan National Park Buffer Zone, Kullu, Himachal Pradesh, India',
      startPoint: 'Gushaini Riverside (1,500 m)',
      endPoint: 'Chhoie Waterfall / Rolla Gate (1,850 m)',
      distanceKm: 8,
      routeType: 'Round-trip',
      difficulty: 'Gentle',
      difficultyReason: 'Gentle slope along marked riverside trails, well-shaded pine forest canopy, minimal technical hazards. Suitable for active walkers of all ages.',
      duration: '3 to 4 Hours (Round-trip)',
      elevationGainM: 350,
      peakAltitudeM: 1850,
      typicalSeason: 'March to November. Spring brings blooming wild irises; autumn features crisp golden light.',
      terrainAndFitness: 'Level dirt paths, riverbed cobblestones, rustic wooden footbridges. Basic fitness required.',
      permitsAndGuides: 'GHNP Community Eco-Tourism ticket at Sai Ropa entry point. Eco-Development Committee (EDC) community guide available.',
      departureTime: '09:00 AM & 02:00 PM',
      idealFor: 'Families, nature lovers, birdwatchers, gentle walkers',
      guideIncluded: true,
      heroImage: HIMALAYAN_IMAGE_CATALOG.heroVista.src,
      summary: 'Set along the crystal-clear Tirthan River—one of the last free-flowing Himalayan rivers without major hydro dams. This route follows the river through mossy deodar pine forests and quiet stone hamlets to a hidden forest waterfall.',
      itinerary: [
        { stage: 'Stage 1 — Gushaini to Riverbank Trail (2.5 km)', description: 'Follow the gentle river trail listening to Himalayan brown dippers and mountain streams.' },
        { stage: 'Stage 2 — Forest Ascent to Chhoie Waterfall (1.5 km)', description: 'Short uphill walk through pine needles to a secluded sacred waterfall.' },
        { stage: 'Stage 3 — Return via Riverside Hamlet', description: 'Leisurely walk back through stone cottages with mountain views.' },
      ],
      gearRequired: ['Comfortable walking shoes with rubber grip', 'Light warm layer', 'Water bottle', 'Binoculars for birdwatching'],
      safetyAdvisory: 'Stay on established paths near the riverbank. River currents can be swift during snowmelt.',
      currentConditionsNotice: 'Current trail conditions not verified — verify river flow levels with GHNP office at Sai Ropa.',
      sourcesAndReview: {
        authoritativeSource: 'Great Himalayan National Park (GHNP) UNESCO World Heritage Site Administration & EDC',
        lastVerifiedDate: 'October 2026',
      },
      status: 'externally-verified',
    },
    {
      id: 'nag-tibba-summit-scramble',
      title: 'Nag Tibba Summit Trek',
      subtitle: 'Himalayan trek inspiration: Historic Garhwal peak offering 360° views of high snow ranges',
      geographicRegion: 'Lesser Himalayas / Garhwal Range, Tehri Garhwal, Uttarakhand, India',
      startPoint: 'Pantwari Village (1,400 m)',
      endPoint: 'Nag Tibba Summit / Jhandi Top (3,022 m)',
      distanceKm: 16,
      routeType: 'Round-trip',
      difficulty: 'Moderate',
      difficultyReason: 'Steep initial climb from Pantwari on rocky dirt switchbacks (+1,622m total gain), followed by ridge walking through thick oak and deodar woods.',
      duration: '6 to 8 Hours (Round-trip or 2-day camp)',
      elevationGainM: 1622,
      peakAltitudeM: 3022,
      typicalSeason: 'October to May. Famous winter snow trek December through February; pleasant autumn and spring.',
      terrainAndFitness: 'Forest loam, loose gravel switchbacks, snow sections in winter. Good physical stamina required.',
      permitsAndGuides: 'Registration with Pantwari Gram Panchayat. Local village guide recommended for ridge route.',
      departureTime: '06:00 AM (Early dawn departure)',
      idealFor: 'Summit enthusiasts, weekend trekkers, photographers',
      guideIncluded: true,
      heroImage: HIMALAYAN_IMAGE_CATALOG.villageRidge.src,
      summary: 'Nag Tibba ("Serpent Peak") is the highest peak in the lesser Himalayan range of Garhwal. The summit delivers a panorama of the Great Himalayan arc, including Swargarohini, Bandarpoonch, and the Gangotri group.',
      itinerary: [
        { stage: 'Stage 1 — Pantwari to Base Camp (5 km)', description: 'Ascend through terraced village fields into dense oak and deodar forests.' },
        { stage: 'Stage 2 — Base Camp to Nag Devta Temple (1.5 km)', description: 'Gentle ridge walk passing the ancient stone shrine dedicated to the serpent god.' },
        { stage: 'Stage 3 — Final Ridge Scramble to Jhandi Top (1.5 km)', description: 'Climb along the exposed crest to 3,022 m with panoramic Himalayan views.' },
      ],
      gearRequired: ['Ankle-support trekking boots with lugged soles', 'Warm down/fleece jacket', 'Sun protection & wind shell', '2L water bladder'],
      safetyAdvisory: 'No water sources along upper summit ridge; carry full day supply. Researched regional route inspiration.',
      currentConditionsNotice: 'Current trail conditions not verified — check with Pantwari trailhead guides.',
      sourcesAndReview: {
        authoritativeSource: 'Uttarakhand Tourism Development Board (UTDB) & GMVN',
        lastVerifiedDate: 'October 2026',
      },
      status: 'externally-verified',
    },
  ] as SampleTrek[],

  gallery: [
    {
      id: 'g1',
      title: 'Dawn Over Himalayan Deodar Forests',
      category: 'Mountain Landscapes',
      image: HIMALAYAN_IMAGE_CATALOG.heroVista.src,
      caption: 'Dawn illumination across Himalayan deodar pine ridges in the Western Himalayas. Destination landscape photography.',
      location: HIMALAYAN_IMAGE_CATALOG.heroVista.locationKnown,
      attribution: HIMALAYAN_IMAGE_CATALOG.heroVista.attribution,
      type: 'destination',
      status: 'sample',
    },
    {
      id: 'g2',
      title: 'Dhauladhar Trail Corridor',
      category: 'Forest & Trails',
      image: HIMALAYAN_IMAGE_CATALOG.valleyTrek.src,
      caption: 'Highland trekking path traversing blue pine woodlands. Regional trail documentation for trekking inspiration.',
      location: HIMALAYAN_IMAGE_CATALOG.valleyTrek.locationKnown,
      attribution: HIMALAYAN_IMAGE_CATALOG.valleyTrek.attribution,
      type: 'destination',
      status: 'sample',
    },
    {
      id: 'g3',
      title: 'Himalayan Glacial Stream',
      category: 'Forest & Trails',
      image: HIMALAYAN_IMAGE_CATALOG.forestStream.src,
      caption: 'Clear mountain stream through ancient deodar pine forest. Illustrative regional destination imagery.',
      location: HIMALAYAN_IMAGE_CATALOG.forestStream.locationKnown,
      attribution: HIMALAYAN_IMAGE_CATALOG.forestStream.attribution,
      type: 'destination',
      status: 'sample',
    },
    {
      id: 'g4',
      title: 'Terrace Mountain Village & Ridge',
      category: 'Village Life',
      image: HIMALAYAN_IMAGE_CATALOG.villageRidge.src,
      caption: 'Traditional Himalayan stone and cedar village nestled along terraced slopes amidst pine trees.',
      location: HIMALAYAN_IMAGE_CATALOG.villageRidge.locationKnown,
      attribution: HIMALAYAN_IMAGE_CATALOG.villageRidge.attribution,
      type: 'destination',
      status: 'sample',
    },
    {
      id: 'g5',
      title: 'Pine View Room Interior (Sample)',
      category: 'Illustrative Rooms',
      image: HIMALAYAN_IMAGE_CATALOG.roomPineView.src,
      caption: 'Sample bedroom visual showing timber-framed windows and pine forest views. Illustrative concept, not depicting real property.',
      attribution: HIMALAYAN_IMAGE_CATALOG.roomPineView.attribution,
      type: 'illustrative-accommodation',
      status: 'sample',
    },
    {
      id: 'g6',
      title: 'Mountain View Room Interior (Sample)',
      category: 'Illustrative Rooms',
      image: HIMALAYAN_IMAGE_CATALOG.roomMountainView.src,
      caption: 'Sample bedroom visual showing panoramic mountain view balcony. Illustrative concept, not depicting real property.',
      attribution: HIMALAYAN_IMAGE_CATALOG.roomMountainView.attribution,
      type: 'illustrative-accommodation',
      status: 'sample',
    },
  ] as GalleryItem[],

  about: {
    title: 'The Concept of Pine Hideout',
    lead: 'A prototype architectural design proposal for an alpine room-based retreat in the Himalayas (Status: sample — not confirmed by client).',
    paragraphs: [
      'Pine Hideout is a preliminary design study exploring boutique room-based mountain accommodation nestled among Himalayan blue pine and deodar forests. The client has not confirmed the exact location, development schedule, or construction methods.',
      'Proposed concepts under exploration include elevated timber foundations to reduce ground disturbance, along with renewable energy feasibility studies. These architectural ideas represent conceptual prototypes rather than constructed engineering realities.',
      'Our intention for this prototype is to provide a complete interactive preview of the guest journey, room booking flow, and mountain assistant before any physical groundwork commences.',
    ],
    pillars: [
      { title: 'Elevated Foundation Concept', text: 'Proposed room foundation designs under architectural study to reduce earth excavation. Status: sample proposal.' },
      { title: 'Renewable Microgrid Feasibility', text: 'Feasibility evaluations for solar arrays and clean energy solutions in Himalayan weather. Status: sample study.' },
      { title: 'Wilderness Stewardship Intent', text: 'Draft guidelines encouraging quiet hours and Leave No Trace outdoor principles. Status: sample draft.' },
    ],
    status: 'sample' as ContentStatus,
  },

  howToReach: {
    title: 'Journey to the Highland (Sample Transit Concept)',
    subtitle: 'Fictional access advisory for prototype demonstration (Status: sample — unconfirmed)',
    options: [
      {
        title: 'Scenic Himalayan Mountain Drive',
        badge: 'Sample Route Concept',
        description: 'Illustrative driving route proposal following regional mountain roads (estimated 2.5 hours from a regional Himalayan airport in scenario modeling). Final road access requires client site confirmation.',
        notes: 'Fictional proposal: valley parking and shuttle ideas are prototype concepts.',
        status: 'sample' as ContentStatus,
      },
      {
        title: 'Lodge Rail Shuttle (Sample Demo Concept)',
        badge: 'Simulated Demo Transit',
        description: 'Conceptual proposal for scheduled electric shuttle transfers from a hypothetical mountain rail junction. Offered purely as an interactive simulation.',
        notes: 'Simulated demo feature — no real shuttle service exists.',
        status: 'sample' as ContentStatus,
      },
      {
        title: 'Private Charter Inquiry Concept',
        badge: 'Prototype Study',
        description: 'Conceptual feasibility note regarding aerial access. Subject to local aviation regulations and environmental quiet corridors.',
        notes: 'Sample inquiry concept only.',
        status: 'sample' as ContentStatus,
      },
    ],
    packingTips: [
      'Sturdy footwear with lugged soles for uneven gravel trails',
      'Warm fleece or wool layers for highland evening temperatures',
      'Reusable water bottle for hydration',
      'UV sunglasses and hat for high-altitude sunlight',
    ],
    status: 'sample' as ContentStatus,
  },

  policies: [
    {
      title: 'Proposed Check-In & Check-Out Times',
      details: 'Draft proposal: Check-in welcomed from 03:00 PM until 07:00 PM; check-out at 11:00 AM. Fictional sample policies for demonstration.',
      status: 'sample' as ContentStatus,
    },
    {
      title: 'Demo Cancellation Policy',
      details: 'Prototype rule: 100% simulated refund for demo cancellations requested at least 7 days prior. (Note: No actual funds are charged or refunded in this demo).',
      status: 'sample' as ContentStatus,
    },
    {
      title: 'Quiet Hours Concept',
      details: 'Draft guideline: Quiet hours proposed between 10:00 PM and 07:00 AM to preserve nocturnal wildlife and tranquility. Status: sample draft.',
      status: 'sample' as ContentStatus,
    },
    {
      title: 'Mountain Safety Advisory',
      details: 'Safety principle: All mountain treks involve inherent high-altitude and weather risks. Current trail status is not verified; guests must consult local guides.',
      status: 'sample' as ContentStatus,
    },
    {
      title: 'Fire Safety Guidelines',
      details: 'Safety principle: Smoking and open flames strictly prohibited in forest terrain. Room warming stoves must only use designated split hardwood.',
      status: 'sample' as ContentStatus,
    },
  ],

  faqs: [
    {
      id: 'f1',
      category: 'Booking & Reservations',
      question: 'What room categories are offered at Pine Hideout?',
      answer: 'Pine Hideout is organized as room-based accommodation featuring 5 sample categories: Pine View Room (₹18,500/night), Mountain View Room (₹24,000/night), Valley View Room (₹28,000/night), Family Room (₹32,000/night), and Deluxe Room (₹21,500/night, sold out sample state). Status: sample.',
      status: 'sample',
    },
    {
      id: 'f2',
      category: 'Booking & Reservations',
      question: 'What currency is used for room rates and quotes?',
      answer: 'Rates are displayed in Indian Rupee (INR / ₹) as illustrative sample figures. All calculation rules are centralized and configurable. Taxes are not configured pending client statutory registration.',
      status: 'sample',
    },
    {
      id: 'f3',
      category: 'Booking & Reservations',
      question: 'How are add-ons priced and charged?',
      answer: 'Every add-on has an explicit basis: Breakfast is ₹1,200 per guest per night; Guided Trek Pass is ₹3,500 per guest per stay; Firewood Bundle is ₹1,500 per room per stay. All figures are sample rates.',
      status: 'sample',
    },
    {
      id: 'f4',
      category: 'Treks & Mountain Life',
      question: 'Are current trail conditions live or verified?',
      answer: 'No. Current trail conditions are not verified. Static trail descriptions represent researched Himalayan trek inspiration. Real trail safety and openings must be confirmed locally with registered mountain guides.',
      status: 'sample',
    },
    {
      id: 'f5',
      category: 'Arrival & Location',
      question: 'Is the property location or shuttle service operational?',
      answer: 'No. The property location, road access, and station shuttle schedules are fictional prototype proposals (Status: sample). No transport vehicles operate.',
      status: 'sample',
    },
    {
      id: 'f6',
      category: 'Policies & Comfort',
      question: 'Are environmental claims like micro-hydro verified?',
      answer: 'No. Energy systems such as micro-hydro and zero-ground-disturbance engineering are conceptual proposals under study. They are explicitly labelled as sample prototype content.',
      status: 'sample',
    },
  ] as FAQItem[],
};
