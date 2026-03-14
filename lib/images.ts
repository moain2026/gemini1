/**
 * Centralized image path constants for the Keif Al-Diafa website.
 * All images are served locally from public/images/.
 *
 * Sources:
 *   - https://github.com/moain2026/img (High-res hero images 3168px)
 *   - https://github.com/moain2026/allimg (Offerings category images)
 *   - https://github.com/moain2026/img_kef_updated (235 service/event images)
 *
 * Structure:
 *   hero/              → 2 high-res images (desktop + mobile)
 *   hot-drinks/        → 7 images (hot beverages)
 *   cold-drinks/       → 8 images (cold beverages)
 *   dates/             → 12 images (premium dates)
 *   sweets/            → 6 images (desserts)
 *   pastry/            → 5 images (pastries)
 *   serving-equipment/ → 10 images (serving equipment)
 *   events/            → 82 images (all Event photos)
 *   weddings/          → 18 images (all Wedding photos)
 *   distributions/     → 5 images
 *   equipment/         → 21 images
 *   partners/          → 36 logos
 *   services/male/hosts/{hizam,dagla,dagla-janbiya,sideriya,makkawi}
 *   services/male/{safarjia,sawas,souqiya}
 *   services/female/
 *   services/artistic/{artist,folkband,heritage-tent,counter,photo-booth,buffet,mobile-table}
 */

// ═══════════════════════════════════════════════════════════════
// HERO IMAGES (High-res 3168px from moain2026/img)
// ═══════════════════════════════════════════════════════════════
export const HERO_IMAGES = {
  desktop: "/images/hero/hero-desktop.webp",
  mobile: "/images/hero/hero-mobile.webp",
};

// ═══════════════════════════════════════════════════════════════
// OFFERINGS — HOT DRINKS (7 images from moain2026/allimg)
// ═══════════════════════════════════════════════════════════════
export const HOT_DRINKS_IMAGES = {
  sahlab: "/images/hot-drinks/sahlab.webp",
  redTea: "/images/hot-drinks/red-tea.webp",
  greenTea: "/images/hot-drinks/green-tea.webp",
  karakTea: "/images/hot-drinks/karak-tea.webp",
  gingerPineapple: "/images/hot-drinks/ginger-pineapple.webp",
  turkishCoffee: "/images/hot-drinks/turkish-coffee.webp",
  cappuccino: "/images/hot-drinks/cappuccino.webp",
};

// ═══════════════════════════════════════════════════════════════
// OFFERINGS — COLD DRINKS (8 images, kept from original)
// ═══════════════════════════════════════════════════════════════
export const COLD_DRINKS_IMAGES = {
  freshJuice: "/images/cold-drinks/fresh-juice.webp",
  mojito: "/images/cold-drinks/mojito.webp",
  arakSous: "/images/cold-drinks/arak-sous.webp",
  karkade: "/images/cold-drinks/karkade.webp",
  tamarind: "/images/cold-drinks/tamarind.webp",
  sobia: "/images/cold-drinks/sobia.webp",
  smoothie: "/images/cold-drinks/smoothie.webp",
  icedLatte: "/images/cold-drinks/iced-latte.webp",
};

// ═══════════════════════════════════════════════════════════════
// OFFERINGS — DATES (12 images from moain2026/allimg)
// ═══════════════════════════════════════════════════════════════
export const DATES_IMAGES = {
  datesAssorted: "/images/dates/dates-assorted.webp",
  khalasSesame: "/images/dates/khalas-sesame-tahini.webp",
  khalasStuffed: "/images/dates/khalas-stuffed.webp",
  sukariStuffed: "/images/dates/sukari-stuffed.webp",
  stuffedDates2: "/images/dates/stuffed-dates-2.webp",
  stuffedDates3: "/images/dates/stuffed-dates-3.webp",
  stuffedDates5: "/images/dates/stuffed-dates-5.webp",
  stuffedDates: "/images/dates/stuffed-dates.webp",
  datesPlain: "/images/dates/dates-plain.webp",
  palmKhalasStuffed: "/images/dates/palm-khalas-stuffed.webp",
  palmSukari: "/images/dates/palm-sukari.webp",
  palmSukariStuffed: "/images/dates/palm-sukari-stuffed.webp",
};

// ═══════════════════════════════════════════════════════════════
// OFFERINGS — SWEETS (6 images from moain2026/allimg)
// ═══════════════════════════════════════════════════════════════
export const SWEETS_IMAGES = {
  pancake: "/images/sweets/pancake.webp",
  baklava: "/images/sweets/baklava.webp",
  patchiChocolate: "/images/sweets/patchi-chocolate.webp",
  bostaniChocolate: "/images/sweets/bostani-chocolate.webp",
  chocolateCroissant: "/images/sweets/chocolate-croissant.webp",
  kunafa: "/images/sweets/kunafa.webp",
};

// ═══════════════════════════════════════════════════════════════
// OFFERINGS — PASTRY (5 images from moain2026/allimg)
// ═══════════════════════════════════════════════════════════════
export const PASTRY_IMAGES = {
  samosa: "/images/pastry/samosa.webp",
  fruitPie: "/images/pastry/fruit-pie.webp",
  arabicPastry: "/images/pastry/arabic-pastry.webp",
  assortedPastry: "/images/pastry/assorted-pastry.webp",
  appetizers: "/images/pastry/appetizers.webp",
};

// ═══════════════════════════════════════════════════════════════
// OFFERINGS — SERVING EQUIPMENT (10 images from moain2026/allimg)
// ═══════════════════════════════════════════════════════════════
export const SERVING_EQUIPMENT_IMAGES = {
  coffeeCups: "/images/serving-equipment/coffee-cups.webp",
  coffeeDallah: "/images/serving-equipment/coffee-dallah.webp",
  goldenDallah: "/images/serving-equipment/golden-dallah.webp",
  coffeeFinjan: "/images/serving-equipment/coffee-finjan.webp",
  glassCup: "/images/serving-equipment/glass-cup.webp",
  coffeeGlass: "/images/serving-equipment/coffee-glass.webp",
  teaCup: "/images/serving-equipment/tea-cup.webp",
  whiteTeaCup: "/images/serving-equipment/white-tea-cup.webp",
  glassTeaCup: "/images/serving-equipment/glass-tea-cup.webp",
  coffeeMug: "/images/serving-equipment/coffee-mug.webp",
};

// ═══════════════════════════════════════════════════════════════
// EVENT IMAGES (82 photos)
// ═══════════════════════════════════════════════════════════════
export const EVENT_IMAGES = Array.from({ length: 82 }, (_, i) => `/images/events/event-${i + 1}.webp`);

// ═══════════════════════════════════════════════════════════════
// WEDDING IMAGES (18 photos)
// ═══════════════════════════════════════════════════════════════
export const WEDDING_IMAGES = Array.from({ length: 18 }, (_, i) => `/images/weddings/wedding-${i + 1}.webp`);

// ═══════════════════════════════════════════════════════════════
// DISTRIBUTION IMAGES (5 photos)
// ═══════════════════════════════════════════════════════════════
export const DISTRIBUTION_IMAGES = Array.from({ length: 5 }, (_, i) => `/images/distributions/dist-${i + 1}.webp`);

// ═══════════════════════════════════════════════════════════════
// SERVICES — MALE
// ═══════════════════════════════════════════════════════════════
export const SERVICES_MALE = {
  hosts: {
    hizam: Array.from({ length: 2 }, (_, i) => `/images/services/male/hosts/hizam/hizam-${i + 1}.webp`),
    dagla: Array.from({ length: 6 }, (_, i) => `/images/services/male/hosts/dagla/dagla-${i + 1}.webp`),
    daglaJanbiya: Array.from({ length: 2 }, (_, i) => `/images/services/male/hosts/dagla-janbiya/dagla-janbiya-${i + 1}.webp`),
    sideriya: Array.from({ length: 3 }, (_, i) => `/images/services/male/hosts/sideriya/sideriya-${i + 1}.webp`),
    makkawi: Array.from({ length: 2 }, (_, i) => `/images/services/male/hosts/makkawi/makkawi-${i + 1}.webp`),
    // Convenience: first image of dagla for thumbnails
    main: "/images/services/male/hosts/dagla/dagla-1.webp",
  },
  safarjia: Array.from({ length: 6 }, (_, i) => `/images/services/male/safarjia/safarjia-${i + 1}.webp`),
  sawas: Array.from({ length: 5 }, (_, i) => `/images/services/male/sawas/sawas-${i + 1}.webp`),
  souqiya: Array.from({ length: 8 }, (_, i) => `/images/services/male/souqiya/souqiya-${i + 1}.webp`),
};

// ═══════════════════════════════════════════════════════════════
// SERVICES — FEMALE
// ═══════════════════════════════════════════════════════════════
export const SERVICES_FEMALE = Array.from({ length: 2 }, (_, i) => `/images/services/female/female-${i + 1}.webp`);

export const SERVICES_FEMALE_EXTENDED = {
  hostesses: Array.from({ length: 2 }, (_, i) => `/images/services/female/hostesses/hostess-${i + 1}.webp`),
  safarjiat: Array.from({ length: 2 }, (_, i) => `/images/services/female/safarjiat/safarjia-f-${i + 1}.webp`),
  cleaning: Array.from({ length: 2 }, (_, i) => `/images/services/female/cleaning/cleaning-f-${i + 1}.webp`),
};

// ═══════════════════════════════════════════════════════════════
// SERVICES — ARTISTIC
// ═══════════════════════════════════════════════════════════════
export const SERVICES_ARTISTIC = {
  artist: Array.from({ length: 11 }, (_, i) => `/images/services/artistic/artist/artist-${i + 1}.webp`),
  folkband: Array.from({ length: 2 }, (_, i) => `/images/services/artistic/folkband/folkband-${i + 1}.webp`),
  heritageTent: Array.from({ length: 4 }, (_, i) => `/images/services/artistic/heritage-tent/tent-${i + 1}.webp`),
  counter: Array.from({ length: 2 }, (_, i) => `/images/services/artistic/counter/counter-${i + 1}.webp`),
  photoBooth: Array.from({ length: 6 }, (_, i) => `/images/services/artistic/photo-booth/photo-booth-${i + 1}.webp`),
  buffet: Array.from({ length: 3 }, (_, i) => `/images/services/artistic/buffet/buffet-${i + 1}.webp`),
  mobileTable: Array.from({ length: 6 }, (_, i) => `/images/services/artistic/mobile-table/table-${i + 1}.webp`),
};

// ═══════════════════════════════════════════════════════════════
// EQUIPMENT IMAGES (21 photos)
// ═══════════════════════════════════════════════════════════════
export const EQUIPMENT_IMAGES = Array.from({ length: 21 }, (_, i) => `/images/equipment/equip-${i + 1}.webp`);

// ═══════════════════════════════════════════════════════════════
// PARTNER LOGOS (36 logos)
// ═══════════════════════════════════════════════════════════════
export const PARTNER_LOGOS = Array.from({ length: 36 }, (_, i) => `/images/partners/partner-${i + 1}.webp`);

// ═══════════════════════════════════════════════════════════════
// CONVENIENCE SHORTCUTS — for quick access in components
// ═══════════════════════════════════════════════════════════════

/** Primary hero image (desktop) */
export const HERO_IMG = HERO_IMAGES.desktop;

/** Hero mobile image */
export const HERO_MOBILE_IMG = HERO_IMAGES.mobile;

/** Coffee / Safarjia */
export const COFFEE_IMG = SERVICES_MALE.safarjia[0];

/** Catering / Events */
export const CATERING_IMG = EVENT_IMAGES[2];

/** Tea / Offerings */
export const TEA_IMG = DISTRIBUTION_IMAGES[0];

/** Event photo */
export const EVENT_IMG = EVENT_IMAGES[0];

/** Waiter / Male hosts */
export const WAITER_IMG = SERVICES_MALE.hosts.main;

/** Equipment */
export const EQUIP_IMG = EQUIPMENT_IMAGES[0];

/** Gala / Large event */
export const GALA_IMG = EVENT_IMAGES[5];

/** Hotel / Hospitality */
export const HOTEL_IMG = EVENT_IMAGES[10];

/** Dates / Sweets */
export const DATES_IMG = DISTRIBUTION_IMAGES[1];

/** Food / General */
export const FOOD_IMG = DISTRIBUTION_IMAGES[2];

/** Portfolio showcase */
export const PORTFOLIO_IMG = EVENT_IMAGES[7];

/** Kitchen / Behind scenes */
export const KITCHEN_IMG = EQUIPMENT_IMAGES[5];

/** Team member placeholder */
export const TEAM_IMG = SERVICES_MALE.hosts.dagla[1];

/** Conference img */
export const CONF_IMG = EVENT_IMAGES[12];

// ═══════════════════════════════════════════════════════════════
// SERVICE-SPECIFIC IMAGES
// ═══════════════════════════════════════════════════════════════
export const SERVICE_IMAGES = {
  maleWaiter: SERVICES_MALE.hosts.main,
  zamzam: SERVICES_MALE.safarjia[1],
  butler: SERVICES_MALE.safarjia[2],
  sawas: SERVICES_MALE.sawas[0],
  hostess: SERVICES_FEMALE[0],
  calligrapher: SERVICES_ARTISTIC.artist[0],
  artist: SERVICES_ARTISTIC.artist[1],
  folkband: SERVICES_ARTISTIC.folkband[0],
  heritageTent: SERVICES_ARTISTIC.heritageTent[0],
  counter: SERVICES_ARTISTIC.counter[0],
  photoBooth: SERVICES_ARTISTIC.photoBooth[0],
  buffet: SERVICES_ARTISTIC.buffet[0],
  mobileTable: SERVICES_ARTISTIC.mobileTable[0],
};

// ═══════════════════════════════════════════════════════════════
// OUTFIT IMAGES (for service detail modals)
// ═══════════════════════════════════════════════════════════════
export const OUTFIT_IMAGES = {
  hizam: SERVICES_MALE.hosts.hizam[0],
  dagla: SERVICES_MALE.hosts.dagla[0],
  daglaJanbiya: SERVICES_MALE.hosts.daglaJanbiya[0],
  sideriya: SERVICES_MALE.hosts.sideriya[0],
  makkawi: SERVICES_MALE.hosts.makkawi[0],
  souqiya: SERVICES_MALE.souqiya[0],
  female: SERVICES_FEMALE[0],
  safarjia: SERVICES_MALE.safarjia[0],
  sawas: SERVICES_MALE.sawas[0],
};
