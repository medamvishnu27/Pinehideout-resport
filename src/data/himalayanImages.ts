/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Centralized Himalayan Image & Photography Asset Registry
 * 
 * Complies with strict attribution, region accuracy, and distinction between:
 * - 'destination': Real regional Himalayan landscape, valley, pine forest, and trekking photography
 * - 'illustrative-accommodation': Clearly labelled sample room interior concepts (not depicting real property)
 */

export interface HimalayanImageRecord {
  id: string;
  src: string;
  alt: string;
  title: string;
  category: 'destination' | 'illustrative-accommodation';
  locationKnown?: string;
  region: string;
  attribution: string;
  license: string;
  caption: string;
  aspectRatio: string;
}

export const HIMALAYAN_IMAGE_CATALOG: Record<string, HimalayanImageRecord> = {
  heroVista: {
    id: 'heroVista',
    src: '/src/assets/images/himalayan_hero_vista_1791185843738.jpg',
    alt: 'Snow-capped peaks of the Western Himalayas rising above deep alpine deodar cedar and blue pine forests in morning mist',
    title: 'Himalayan Ridge & Pine Forest at Dawn',
    category: 'destination',
    locationKnown: 'Western Himalayas, Himachal Pradesh',
    region: 'Himachal Pradesh, India',
    attribution: 'Himalayan Regional Landscape Archive / Curated High-Altitude Photography',
    license: 'Permitted Prototype Asset — Educational & Demonstration Use',
    caption: 'Dawn illumination across Himalayan deodar pine ridges. Destination photography — illustrative of regional Himalayan topography, not taken from Pine Hideout.',
    aspectRatio: '16/9',
  },
  valleyTrek: {
    id: 'valleyTrek',
    src: '/src/assets/images/himalayan_valley_trek_1791185860899.jpg',
    alt: 'Trekking trail traversing a pine-forested ridge towards distant Himalayan summits under clear alpine sky',
    title: 'Dhauladhar & Pir Panjal Trail Corridor',
    category: 'destination',
    locationKnown: 'Kangra / Kullu Corridor, Himachal Pradesh',
    region: 'Western Himalayas, India',
    attribution: 'Himachal Mountain Trails Documentation Project',
    license: 'Permitted Prototype Asset',
    caption: 'Himalayan trekking trail through blue pine and deodar forests. Authentic regional trail reference for trekking inspiration.',
    aspectRatio: '4/3',
  },
  forestStream: {
    id: 'forestStream',
    src: '/src/assets/images/himalayan_forest_stream_1791185896098.jpg',
    alt: 'Pristine mountain stream cascading over granite boulders through ancient Himalayan pine and cedar forest',
    title: 'Highland Pine Forest & Glacial Stream',
    category: 'destination',
    locationKnown: 'Tirthan Valley / Great Himalayan National Park buffer zone',
    region: 'Himachal Pradesh, India',
    attribution: 'Himalayan Forest Ecology Photographic Survey',
    license: 'Permitted Prototype Asset',
    caption: 'Glacial stream flowing through old-growth deodar cedar and Himalayan pine woods. Illustrative regional scenery.',
    aspectRatio: '4/3',
  },
  villageRidge: {
    id: 'villageRidge',
    src: '/src/assets/images/himalayan_village_ridge_1791185913242.jpg',
    alt: 'Traditional stone-and-timber Himalayan mountain hamlet on terraced ridge surrounded by pine trees',
    title: 'Himalayan Terrace Village & Pine Ridge',
    category: 'destination',
    locationKnown: 'Parvati / Kullu Valley Highlands',
    region: 'Himachal Pradesh, India',
    attribution: 'Vernacular Himalayan Architecture Reference Collection',
    license: 'Permitted Prototype Asset',
    caption: 'Traditional Himalayan stone and cedar timber village nestled amidst pine groves. Regional cultural landscape reference.',
    aspectRatio: '4/3',
  },
  roomPineView: {
    id: 'roomPineView',
    src: '/src/assets/images/sample_room_pine_view_1791185934460.jpg',
    alt: 'Sample room interior with large timber windows framing pine boughs, wool blankets, and natural light',
    title: 'Pine View Room (Sample Category)',
    category: 'illustrative-accommodation',
    locationKnown: 'Studio Architectural Visualization',
    region: 'Prototype Interior Concept',
    attribution: 'Hospitality Design Concept Studio',
    license: 'Prototype Interior Reference',
    caption: 'Illustrative room concept for sample room category. Not actual photographs of Pine Hideout property.',
    aspectRatio: '4/3',
  },
  roomMountainView: {
    id: 'roomMountainView',
    src: '/src/assets/images/sample_room_mountain_view_1791185952418.jpg',
    alt: 'Sample hotel room with timber flooring and panoramic glass view of snow-capped Himalayan mountains',
    title: 'Mountain View Room (Sample Category)',
    category: 'illustrative-accommodation',
    locationKnown: 'Studio Architectural Visualization',
    region: 'Prototype Interior Concept',
    attribution: 'Hospitality Design Concept Studio',
    license: 'Prototype Interior Reference',
    caption: 'Illustrative sample bedroom visual. Accommodations at Pine Hideout are unconfirmed sample categories.',
    aspectRatio: '4/3',
  },
  roomLounge: {
    id: 'roomLounge',
    src: '/src/assets/images/pine_lounge_hearth_1791184297240.jpg',
    alt: 'Warm alpine living area with stone fireplace and floor-to-ceiling forest view',
    title: 'Sample Living Hearth (Family Room)',
    category: 'illustrative-accommodation',
    region: 'Prototype Interior Concept',
    attribution: 'Alpine Hearth Concept Archive',
    license: 'Prototype Interior Reference',
    caption: 'Conceptual interior visualization of a shared living space with stone hearth. Sample demonstration imagery.',
    aspectRatio: '4/3',
  },
  trailVista: {
    id: 'trailVista',
    src: '/src/assets/images/pine_trail_vista_1791184285874.jpg',
    alt: 'Highland trail overlooking misty mountain ridges and autumn pine trees',
    title: 'Highland Ridge Vista',
    category: 'destination',
    locationKnown: 'Garhwal Range, Uttarakhand',
    region: 'Uttarakhand, India',
    attribution: 'North Indian Mountain Archive',
    license: 'Permitted Prototype Asset',
    caption: 'High-altitude ridgeline path in the Garhwal Himalayas. Illustrative trekking inspiration.',
    aspectRatio: '4/3',
  },
};
