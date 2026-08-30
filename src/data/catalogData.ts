export interface CatalogServiceItem {
  id: string;
  category: 'eyelash' | 'nail' | 'massage' | 'brow';
  categoryName: string;
  name: string;
  price: number;
  priceDisplay: string;
  normalPrice?: number;
  normalPriceDisplay?: string;
  isPromo?: boolean;
  promoBadge?: string;
  description: string;
  features?: string[];
  durationMinutes?: number;
}

export const CATALOG_SERVICES: CatalogServiceItem[] = [
  // ── EYELASH EXTENSION ──
  {
    id: 'lash-single',
    category: 'eyelash',
    categoryName: 'Eyelash Extension',
    name: 'Lashes Single',
    price: 111038,
    priceDisplay: 'Rp 111.038',
    normalPrice: 125000,
    normalPriceDisplay: 'Rp 125.000',
    isPromo: true,
    promoBadge: 'Diskon 15%',
    description: 'Aplikasi 1 helai bulu mata sintetis premium pada 1 bulu mata asli untuk hasil natural.',
    durationMinutes: 60
  },
  {
    id: 'lash-lift-tint',
    category: 'eyelash',
    categoryName: 'Eyelash Extension',
    name: 'Lash Lift & Tint',
    price: 155963,
    priceDisplay: 'Rp 155.963',
    normalPrice: 175000,
    normalPriceDisplay: 'Rp 175.000',
    isPromo: true,
    promoBadge: 'Diskon 15%',
    description: 'Melentikkan bulu mata asli dan pewarnaan tint pekat agar tampak lebih tegas & tebal alami.',
    durationMinutes: 60
  },
  {
    id: 'lash-anime',
    category: 'eyelash',
    categoryName: 'Eyelash Extension',
    name: 'Lashes Anime Style',
    price: 138863,
    priceDisplay: 'Rp 138.863',
    normalPrice: 155000,
    normalPriceDisplay: 'Rp 155.000',
    isPromo: true,
    promoBadge: 'Diskon 15%',
    description: 'Desain ala anime / manga dengan spike tajam dan efek mata bulat bersinar.',
    durationMinutes: 75
  },
  {
    id: 'lash-yy',
    category: 'eyelash',
    categoryName: 'Eyelash Extension',
    name: 'Lashes YY Premium',
    price: 148838,
    priceDisplay: 'Rp 148.838',
    normalPrice: 165000,
    normalPriceDisplay: 'Rp 165.000',
    isPromo: true,
    promoBadge: 'Diskon 15%',
    description: 'Tipe cabang Y memberikan efek bervolume ringan dengan tekstur yang sangat halus.',
    durationMinutes: 75
  },
  {
    id: 'lash-3d',
    category: 'eyelash',
    categoryName: 'Eyelash Extension',
    name: 'Lashes 3D Volume',
    price: 153488,
    priceDisplay: 'Rp 153.488',
    normalPrice: 170000,
    normalPriceDisplay: 'Rp 170.000',
    isPromo: true,
    promoBadge: 'Diskon 15%',
    description: 'Efek 3D berdimensi dan rapi untuk tampilan mata yang lebih bervolume.',
    durationMinutes: 90
  },
  {
    id: 'lash-volume',
    category: 'eyelash',
    categoryName: 'Eyelash Extension',
    name: 'Lashes Volume Set',
    price: 155963,
    priceDisplay: 'Rp 155.963',
    normalPrice: 175000,
    normalPriceDisplay: 'Rp 175.000',
    isPromo: true,
    promoBadge: 'Diskon 15%',
    description: 'Bulu mata tebal bervolume penuh namun tetap ringan dan nyaman digunakan seharian.',
    durationMinutes: 90
  },
  {
    id: 'lash-wispy',
    category: 'eyelash',
    categoryName: 'Eyelash Extension',
    name: 'Lashes Wispy Textured',
    price: 155963,
    priceDisplay: 'Rp 155.963',
    normalPrice: 175000,
    normalPriceDisplay: 'Rp 175.000',
    isPromo: true,
    promoBadge: 'Diskon 15%',
    description: 'Tekstur bergradasi dengan layer panjang-pendek artistik yang glamor.',
    durationMinutes: 90
  },
  {
    id: 'lash-russian',
    category: 'eyelash',
    categoryName: 'Eyelash Extension',
    name: 'Russian / Bold Volume',
    price: 204863,
    priceDisplay: 'Rp 204.863',
    normalPrice: 230000,
    normalPriceDisplay: 'Rp 230.000',
    isPromo: true,
    promoBadge: 'Diskon 15%',
    description: 'Bulu mata ekstra rapat, pekat, dan dramatis dengan teknik Russian Volume.',
    durationMinutes: 105
  },
  {
    id: 'lash-double',
    category: 'eyelash',
    categoryName: 'Eyelash Extension',
    name: 'Double Premium Set',
    price: 178750,
    priceDisplay: 'Rp 178.750',
    normalPrice: 200000,
    normalPriceDisplay: 'Rp 200.000',
    isPromo: true,
    promoBadge: 'Diskon 15%',
    description: 'Kerapatan ganda dengan serat sutra ultra-lembut dan daya tahan lebih lama.',
    durationMinutes: 90
  },

  // ── NAIL ART ──
  {
    id: 'nail-promo-special',
    category: 'nail',
    categoryName: 'Nail Art',
    name: 'Paket All-In-One Promo Spesial',
    price: 150000,
    priceDisplay: 'Rp 150.000',
    isPromo: true,
    promoBadge: 'Paket Terlaris',
    description: 'Paket lengkap terfavorit: Free Manicure + Design Simple 10 Jari + Kuku Palsu Included + Finishing Glossy.',
    features: ['Free Manicure', 'Design Simple 10 Jari', 'Kuku Palsu Included', 'Finishing Glossy'],
    durationMinutes: 90
  },
  {
    id: 'nail-polosan-gel',
    category: 'nail',
    categoryName: 'Nail Art',
    name: 'Polosan Gel Polish',
    price: 75000,
    priceDisplay: 'Rp 75.000',
    description: 'Aplikasi cat kuku gel premium polos dengan kilau tahan lama tanpa tambahan desain.',
    durationMinutes: 45
  },
  {
    id: 'nail-polosan-extension',
    category: 'nail',
    categoryName: 'Nail Art',
    name: 'Polosan Gel + Kuku Palsu',
    price: 100000,
    priceDisplay: 'Rp 100.000',
    description: 'Pemasangan kuku palsu presisi ditambah aplikasi cat kuku gel premium berkualitas tinggi.',
    durationMinutes: 60
  },

  // ── MASSAGE & LULUR ──
  {
    id: 'massage-lulur-signature',
    category: 'massage',
    categoryName: 'Massage & Lulur',
    name: 'Massage & Lulur Badan Signature',
    price: 120000,
    priceDisplay: 'Rp 120.000',
    normalPrice: 150000,
    normalPriceDisplay: 'Rp 150.000',
    isPromo: true,
    promoBadge: 'Special Promo',
    description: 'Relaksasi menyeluruh untuk meredakan ketegangan otot, eksfoliasi kulit mati, dan mengembalikan kilau alami.',
    features: ['Deep Tissue Massage', 'Lulur Alami Menutrisi', 'Refresh & Relaksasi', 'Durasi ±60 Menit'],
    durationMinutes: 60
  },

  // ── BROW TREATMENT ──
  {
    id: 'brow-bomber',
    category: 'brow',
    categoryName: 'Brow Treatment',
    name: 'Brow Bomber Signature',
    price: 185000,
    priceDisplay: 'Rp 185.000',
    normalPrice: 250000,
    normalPriceDisplay: 'Rp 250.000',
    isPromo: true,
    promoBadge: 'Special Rate',
    description: 'Nutrisi intensif untuk alis tampak lebih penuh, tebal berdimensi, dan terawat alami.',
    features: ['Stimulus Alami Akar Alis', 'Tampak Tebal Merata', 'Tahan Lama & Aman'],
    durationMinutes: 60
  },
  {
    id: 'brow-lamination',
    category: 'brow',
    categoryName: 'Brow Treatment',
    name: 'Brow Lamination Fluffy Look',
    price: 150000,
    priceDisplay: 'Rp 150.000',
    normalPrice: 195000,
    normalPriceDisplay: 'Rp 195.000',
    isPromo: true,
    promoBadge: 'Special Rate',
    description: 'Merapikan arah tumbuh serat alis untuk tampilan fluffy, simetris, dan mudah disisir.',
    features: ['Serat Rapi & Flawless', 'Efek Volume Natural', 'Ketahanan 4-6 Minggu'],
    durationMinutes: 60
  }
];
