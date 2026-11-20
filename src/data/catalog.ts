export interface ProductItem {
  id: string;
  brand: string;
  category: string;
  name: string;
  price: number;
  image: string;
  size?: string;
}

export interface MoodItem {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  anchor: string;
}

export interface StyledLook {
  id: string;
  shortName: string;
  modelImage: string;
  modelFilter?: string;
  pieces: ProductItem[];
}

export interface PickSilkCard {
  id: string;
  titleLine1: string;
  titleLine2: string;
  fullName: string;
  price: number;
  bgColor: string;
  textColor: string;
  image: string;
  imageFilter?: string;
  weave: string;
}

export type RackCategory =
  | "All pieces"
  | "Silk Sarees"
  | "Half Sarees"
  | "Full-Sleeve Blouses"
  | "Half-Sleeve Blouses"
  | "Checked Sarees"
  | "Zari & Brocade";

export interface RackItem {
  id: string;
  name: string;
  price: number;
  image: string;
  imageFilter?: string;
  categories: RackCategory[];
  fabric: string;
  zariDetail: string;
  loomOrigin: string;
  backNote: string;
  availability: string[];
  type: "saree" | "blouse";
}

export interface MuseReel {
  id: string;
  number: string;
  duration: string;
  fabric: string;
  title: string;
  location: string;
  image: string;
  accent: string;
  story: string;
  featuredPrice: number;
}

export interface BridalSaree {
  id: string;
  name: string;
  fabricNote: string;
  price: number;
  originalPrice?: number;
  discountTag?: string;
  image: string;
}

export const TICKER_ITEMS = [
  { label: "TRY THE LOOK", desc: "Eight Kanjivaram looks, styled head to toe" },
  { label: "PURE ZARI", desc: "Silver-core zari woven into every temple border" },
  { label: "THE RACK", desc: "Browse the full rail of silks" },
  { label: "BRIDAL", desc: "Heirloom bridal silks for the day that matters" },
  { label: "THE LOOMS", desc: "Handwoven in Kanchipuram, one saree at a time" },
];

export const SIX_MOODS: MoodItem[] = [
  {
    id: "mood-wedding",
    title: "WEDDING EDIT",
    subtitle: "Muhurtham crimson & temple gold",
    image: "/images/mood-wedding.jpg",
    anchor: "#bridal",
  },
  {
    id: "mood-kanchipuram",
    title: "KANCHIPURAM ICONS",
    subtitle: "Three-ply mulberry korvai borders",
    image: "/images/mood-kanchipuram.jpg",
    anchor: "#pick-a-silk",
  },
  {
    id: "mood-banarasi",
    title: "BANARASI HEIRLOOMS",
    subtitle: "Antique kadwa brocade weaves",
    image: "/images/mood-banarasi.jpg",
    anchor: "#the-rack",
  },
  {
    id: "mood-festive",
    title: "FESTIVE RADIANCE",
    subtitle: "Sunlit marigold & saffron drapes",
    image: "/images/mood-festive.jpg",
    anchor: "#try-the-look",
  },
  {
    id: "mood-zari",
    title: "ZARI SIGNATURES",
    subtitle: "Pure silver-dipped gold motifs",
    image: "/images/mood-zari.jpg",
    anchor: "#the-rack",
  },
  {
    id: "mood-bridal",
    title: "BRIDAL ÉLAN",
    subtitle: "Grand pallus for sacred vows",
    image: "/images/mood-bridal.jpg",
    anchor: "#bridal",
  },
];

export const STYLED_LOOKS: StyledLook[] = [
  {
    id: "look-ivory",
    shortName: "Ivory Elephant",
    modelImage: "/images/model-ivory-cutout.png",
    pieces: [
      {
        id: "look1-saree",
        brand: "NAVDEEP",
        category: "SAREE",
        name: "Ivory Kanjivaram with Elephant Border",
        price: 32000,
        image: "/images/rack-gold-brocade.jpg",
      },
      {
        id: "look1-blouse",
        brand: "NAVDEEP",
        category: "BLOUSE",
        name: "Dusty Rose Silk Blouse",
        price: 4200,
        image: "/images/mood-kanchipuram.jpg",
      },
      {
        id: "look1-choker",
        brand: "NAVDEEP",
        category: "CHOKER",
        name: "Pink Stone Temple Choker",
        price: 9400,
        image: "/images/mood-zari.jpg",
      },
      {
        id: "look1-jhumkas",
        brand: "NAVDEEP",
        category: "JHUMKAS",
        name: "Jhumkas with Pearl Drops",
        price: 4600,
        image: "/images/mood-bridal.jpg",
      },
      {
        id: "look1-ottiyanam",
        brand: "NAVDEEP",
        category: "OTTIYANAM",
        name: "Elephant Motif Ottiyanam",
        price: 15000,
        image: "/images/rack-gold-brocade.jpg",
      },
      {
        id: "look1-bangles",
        brand: "NAVDEEP",
        category: "BANGLES",
        name: "Gold and Dusty Rose Bangle Stack",
        price: 3800,
        image: "/images/mood-wedding.jpg",
      },
    ],
  },
  {
    id: "look-emerald",
    shortName: "Temple Emerald",
    modelImage: "/images/model-emerald-cutout.png",
    pieces: [
      {
        id: "look2-saree",
        brand: "NAVDEEP",
        category: "SAREE",
        name: "Deep Emerald Temple Zari Kanjivaram",
        price: 34500,
        image: "/images/mood-zari.jpg",
      },
      {
        id: "look2-blouse",
        brand: "NAVDEEP",
        category: "BLOUSE",
        name: "Saffron Mustard Raw Silk Blouse",
        price: 3600,
        image: "/images/mood-festive.jpg",
      },
      {
        id: "look2-choker",
        brand: "NAVDEEP",
        category: "CHOKER",
        name: "Kemp Lakshmi Kasu Mala",
        price: 11200,
        image: "/images/mood-zari.jpg",
      },
      {
        id: "look2-jhumkas",
        brand: "NAVDEEP",
        category: "JHUMKAS",
        name: "Antique Gold Dome Jhumkas",
        price: 4800,
        image: "/images/mood-kanchipuram.jpg",
      },
      {
        id: "look2-ottiyanam",
        brand: "NAVDEEP",
        category: "OTTIYANAM",
        name: "Mayil Peacock Waistband",
        price: 14200,
        image: "/images/rack-gold-brocade.jpg",
      },
      {
        id: "look2-bangles",
        brand: "NAVDEEP",
        category: "BANGLES",
        name: "Emerald Velvet & Gold Kada Set",
        price: 4100,
        image: "/images/mood-festive.jpg",
      },
    ],
  },
  {
    id: "look-purple",
    shortName: "Magenta Shot Silk",
    modelImage: "/images/model-purple-cutout.png",
    pieces: [
      {
        id: "look4-saree",
        brand: "NAVDEEP",
        category: "SAREE",
        name: "Royal Violet & Magenta Shot Kanjivaram",
        price: 31400,
        image: "/images/mood-banarasi.jpg",
      },
      {
        id: "look4-blouse",
        brand: "NAVDEEP",
        category: "BLOUSE",
        name: "Aubergine Brocade Elbow Blouse",
        price: 4400,
        image: "/images/mood-kanchipuram.jpg",
      },
      {
        id: "look4-choker",
        brand: "NAVDEEP",
        category: "CHOKER",
        name: "Uncut Polki Heritage Collar",
        price: 12600,
        image: "/images/mood-banarasi.jpg",
      },
      {
        id: "look4-jhumkas",
        brand: "NAVDEEP",
        category: "JHUMKAS",
        name: "Ghungroo Gold Bell Jhumkas",
        price: 4400,
        image: "/images/mood-zari.jpg",
      },
      {
        id: "look4-ottiyanam",
        brand: "NAVDEEP",
        category: "OTTIYANAM",
        name: "Temple Gopuram Waistbelt",
        price: 15500,
        image: "/images/rack-gold-brocade.jpg",
      },
      {
        id: "look4-bangles",
        brand: "NAVDEEP",
        category: "BANGLES",
        name: "Antique Matte Gold Kangan Pair",
        price: 4500,
        image: "/images/mood-banarasi.jpg",
      },
    ],
  },
  {
    id: "look-terracotta",
    shortName: "Kanchi Rani",
    modelImage: "/images/model-purple-cutout.png",
    modelFilter: "contrast(1.06) saturate(1.12)",
    pieces: [
      {
        id: "look3-saree",
        brand: "NAVDEEP",
        category: "SAREE",
        name: "Kanchi Rani Pink Temple Kanjivaram",
        price: 29800,
        image: "/images/rack-checked-silk.jpg",
      },
      {
        id: "look3-blouse",
        brand: "NAVDEEP",
        category: "BLOUSE",
        name: "Peacock Teal Zari-Cuff Blouse",
        price: 3900,
        image: "/images/mood-zari.jpg",
      },
      {
        id: "look3-choker",
        brand: "NAVDEEP",
        category: "CHOKER",
        name: "Nakshi Coin Temple Choker",
        price: 10500,
        image: "/images/mood-festive.jpg",
      },
      {
        id: "look3-jhumkas",
        brand: "NAVDEEP",
        category: "JHUMKAS",
        name: "Ruby Cluster Chandbalis",
        price: 5200,
        image: "/images/mood-bridal.jpg",
      },
      {
        id: "look3-ottiyanam",
        brand: "NAVDEEP",
        category: "OTTIYANAM",
        name: "Lotus Carvings Gold Vaddanam",
        price: 13800,
        image: "/images/rack-gold-brocade.jpg",
      },
      {
        id: "look3-bangles",
        brand: "NAVDEEP",
        category: "BANGLES",
        name: "Hand-Crafted Rani & Zari Stack",
        price: 3600,
        image: "/images/mood-wedding.jpg",
      },
    ],
  },
  {
    id: "look-check",
    shortName: "Royal Emerald",
    modelImage: "/images/model-emerald-cutout.png",
    modelFilter: "contrast(1.05) saturate(1.12)",
    pieces: [
      {
        id: "look5-saree",
        brand: "NAVDEEP",
        category: "SAREE",
        name: "Sapphire & Gold Palace Kanjivaram",
        price: 33900,
        image: "/images/rack-checked-silk.jpg",
      },
      {
        id: "look5-blouse",
        brand: "NAVDEEP",
        category: "BLOUSE",
        name: "Antique Gold Pure Silk Blouse",
        price: 3800,
        image: "/images/mood-bridal.jpg",
      },
      {
        id: "look5-choker",
        brand: "NAVDEEP",
        category: "CHOKER",
        name: "Chettinad Gold Bead Necklace",
        price: 8900,
        image: "/images/mood-kanchipuram.jpg",
      },
      {
        id: "look5-jhumkas",
        brand: "NAVDEEP",
        category: "JHUMKAS",
        name: "Filigree Gold Drop Earrings",
        price: 4100,
        image: "/images/mood-zari.jpg",
      },
      {
        id: "look5-ottiyanam",
        brand: "NAVDEEP",
        category: "OTTIYANAM",
        name: "Slim Zari Weave Waist Chain",
        price: 11200,
        image: "/images/rack-gold-brocade.jpg",
      },
      {
        id: "look5-bangles",
        brand: "NAVDEEP",
        category: "BANGLES",
        name: "Sapphire & Gold Enamel Bangles",
        price: 3500,
        image: "/images/mood-wedding.jpg",
      },
    ],
  },
  {
    id: "look-rani",
    shortName: "Benares Gold",
    modelImage: "/images/model-ivory-cutout.png",
    modelFilter: "sepia(0.28) saturate(1.45)",
    pieces: [
      {
        id: "look6-saree",
        brand: "NAVDEEP",
        category: "SAREE",
        name: "Benares Antique Gold Tissue Saree",
        price: 38400,
        image: "/images/mood-kanchipuram.jpg",
      },
      {
        id: "look6-blouse",
        brand: "NAVDEEP",
        category: "BLOUSE",
        name: "Rose Gold Zari-Trim Blouse",
        price: 4100,
        image: "/images/mood-zari.jpg",
      },
      {
        id: "look6-choker",
        brand: "NAVDEEP",
        category: "CHOKER",
        name: "Pachai & Kemp Temple Choker",
        price: 10900,
        image: "/images/mood-bridal.jpg",
      },
      {
        id: "look6-jhumkas",
        brand: "NAVDEEP",
        category: "JHUMKAS",
        name: "Emerald Bead Temple Jhumkas",
        price: 4900,
        image: "/images/mood-zari.jpg",
      },
      {
        id: "look6-ottiyanam",
        brand: "NAVDEEP",
        category: "OTTIYANAM",
        name: "Heritage Kemp Stone Ottiyanam",
        price: 16200,
        image: "/images/rack-gold-brocade.jpg",
      },
      {
        id: "look6-bangles",
        brand: "NAVDEEP",
        category: "BANGLES",
        name: "Tissue Gold & Pearl Bangles",
        price: 3900,
        image: "/images/mood-kanchipuram.jpg",
      },
    ],
  },
];

export const PICK_SILK_CARDS: PickSilkCard[] = [
  {
    id: "pick-magenta",
    titleLine1: "MAGENTA",
    titleLine2: "SHOT SILK",
    fullName: "Magenta Shot Silk Kanjivaram",
    price: 29800,
    bgColor: "#6B21A8",
    textColor: "#FFFFFF",
    image: "/images/model-purple-cutout.png",
    weave: "Dual-tone warp & weft shot silk",
  },
  {
    id: "pick-palace",
    titleLine1: "PALACE",
    titleLine2: "CHECK",
    fullName: "Palace Check Kanchipuram",
    price: 19900,
    bgColor: "#991B29",
    textColor: "#FFFFFF",
    image: "/images/model-emerald-cutout.png",
    imageFilter: "contrast(1.06) saturate(1.14)",
    weave: "Handloom temple weave with gold zari",
  },
  {
    id: "pick-bengal",
    titleLine1: "BENGAL",
    titleLine2: "GARDEN",
    fullName: "Bengal Garden Ivory Silk",
    price: 24600,
    bgColor: "#F2AE43",
    textColor: "#1C140C",
    image: "/images/model-ivory-cutout.png",
    weave: "Ivory mulberry with woven elephant border",
  },
  {
    id: "pick-kanchi",
    titleLine1: "KANCHI",
    titleLine2: "RANI",
    fullName: "Kanchi Rani Korvai Silk",
    price: 32400,
    bgColor: "#BE123C",
    textColor: "#FFFFFF",
    image: "/images/model-purple-cutout.png",
    imageFilter: "contrast(1.05) saturate(1.15) brightness(1.03)",
    weave: "Rani pink body with antique temple korvai",
  },
  {
    id: "pick-benares",
    titleLine1: "BENARES",
    titleLine2: "GOLD",
    fullName: "Benares Gold Tissue Zari",
    price: 41800,
    bgColor: "#EAB308",
    textColor: "#1C140C",
    image: "/images/model-ivory-cutout.png",
    imageFilter: "sepia(0.32) saturate(1.5)",
    weave: "Rich zari tissue & sacred gold weave",
  },
  {
    id: "pick-terracotta",
    titleLine1: "KOORAI",
    titleLine2: "EMERALD",
    fullName: "Koorai Emerald Pure Silk",
    price: 27400,
    bgColor: "#15803D",
    textColor: "#FFFFFF",
    image: "/images/model-emerald-cutout.png",
    weave: "Temple emerald silk with pure zari pallu",
  },
];

export const RACK_CATEGORIES: RackCategory[] = [
  "All pieces",
  "Silk Sarees",
  "Half Sarees",
  "Full-Sleeve Blouses",
  "Half-Sleeve Blouses",
  "Checked Sarees",
  "Zari & Brocade",
];

export const RACK_ITEMS: RackItem[] = [
  {
    id: "rack-1",
    name: "NAVDEEP MADRAS HERITAGE CHECK",
    price: 21500,
    image: "/images/rack-checked-silk-cutout.png",
    categories: ["All pieces", "Silk Sarees", "Checked Sarees"],
    fabric: "Pure Kanchipuram Kattam Silk · 6.2m",
    zariDetail: "Multi-tone temple check with burnished gold selvedge",
    loomOrigin: "Handwoven in Arni & Kanchipuram (11 days)",
    backNote: "Double-faced weave with crisp geometric warp alignment.",
    availability: ["Kanchipuram Flagship", "Chennai Alwarpet", "Online Dispatch (24 hrs)"],
    type: "saree",
  },
  {
    id: "rack-2",
    name: "NAVDEEP ROYAL COBALT KORVAI",
    price: 28400,
    image: "/images/rack-saree-cobalt.png",
    categories: ["All pieces", "Silk Sarees", "Zari & Brocade"],
    fabric: "Pure Kanjivaram Silk · Heavy Pallu",
    zariDetail: "Peacock & Rudraksha gold zari temple border",
    loomOrigin: "Handwoven in Kanchipuram (14 days)",
    backNote: "Hand-knotted silk tassels (kuchu) finished by women artisans in Walajabad.",
    availability: ["Chennai Alwarpet", "Bengaluru Indiranagar", "Online Dispatch (48 hrs)"],
    type: "saree",
  },
  {
    id: "rack-3",
    name: "NAVDEEP IVORY GOLD BUTTA",
    price: 26800,
    image: "/images/rack-saree-ivory.png",
    categories: ["All pieces", "Silk Sarees"],
    fabric: "Soft Handloom Mulberry Silk · Featherweight Drape",
    zariDetail: "Delicate golden jasmine coin buttas across body",
    loomOrigin: "Handwoven in Kanchipuram (12 days)",
    backNote: "Clean jamdani-style back weave ensuring snag-free comfort all day.",
    availability: ["Kanchipuram Flagship", "Online Dispatch (24 hrs)"],
    type: "saree",
  },
  {
    id: "rack-4",
    name: "NAVDEEP MAGENTA TEMPLE ZARI",
    price: 34200,
    image: "/images/rack-saree-magenta.png",
    categories: ["All pieces", "Silk Sarees", "Zari & Brocade"],
    fabric: "Heavyweight Bridal Kanjivaram",
    zariDetail: "6-inch Gopuram temple zari border in antique gold",
    loomOrigin: "Handwoven in Kanchipuram (20 days)",
    backNote: "Authentic 3-shuttle korvai join visible on the reverse border seam.",
    availability: ["Kanchipuram Flagship", "Online Dispatch (48 hrs)"],
    type: "saree",
  },
  {
    id: "rack-5",
    name: "NAVDEEP TEMPLE GOLD BROCADE",
    price: 32000,
    image: "/images/rack-gold-brocade-cutout.png",
    categories: ["All pieces", "Silk Sarees", "Zari & Brocade"],
    fabric: "100% Pure 3-Ply Mulberry Silk · 6.2m with unstitched blouse",
    zariDetail: "240g Silver-core 24k gold-dipped antique zari",
    loomOrigin: "Handwoven in Pillaiyarpalayam, Kanchipuram (18 days)",
    backNote: "Reverse weave reveals clean floating-free korvai interlock with Silk Mark seal.",
    availability: ["Kanchipuram Flagship", "Chennai Alwarpet", "Online Dispatch (48 hrs)"],
    type: "saree",
  },
  {
    id: "rack-6",
    name: "NAVDEEP PEACOCK EMERALD CHECK",
    price: 24900,
    image: "/images/rack-check-emerald.png",
    categories: ["All pieces", "Silk Sarees", "Checked Sarees"],
    fabric: "Pure Mulberry Silk · Korvai Check",
    zariDetail: "Temple emerald body with antique gold weft check",
    loomOrigin: "Handwoven in Kanchipuram (13 days)",
    backNote: "Tight 3-ply weft weave that holds pleats effortlessly.",
    availability: ["Kanchipuram Flagship", "Online Dispatch (24 hrs)"],
    type: "saree",
  },
  {
    id: "rack-7",
    name: "NAVDEEP SINDOOR CRIMSON ZARI",
    price: 35600,
    image: "/images/rack-saree-crimson.png",
    categories: ["All pieces", "Silk Sarees", "Zari & Brocade"],
    fabric: "Heirloom Bridal Mulberry Silk",
    zariDetail: "Pure silver-core zari annapakshi motifs",
    loomOrigin: "Handwoven in Kanchipuram (22 days)",
    backNote: "Certified Silk Mark weave with hand-braided crimson fringe.",
    availability: ["Kanchipuram Flagship", "Chennai Alwarpet", "Online Dispatch (48 hrs)"],
    type: "saree",
  },
  {
    id: "rack-8",
    name: "NAVDEEP PLUM KATTAM SILK",
    price: 23400,
    image: "/images/rack-check-plum.png",
    categories: ["All pieces", "Silk Sarees", "Checked Sarees"],
    fabric: "Hand-loomed Kattam Silk · Couture Drape",
    zariDetail: "Fine gold hairline check with deep maroon border",
    loomOrigin: "Handwoven in Kanchipuram Atelier",
    backNote: "Includes matching 1m zari-trimmed unstitched couture blouse piece.",
    availability: ["Chennai Alwarpet", "Bengaluru Indiranagar", "Online Dispatch (24 hrs)"],
    type: "saree",
  },
  {
    id: "rack-9",
    name: "NAVDEEP SAFFRON TISSUE BROCADE",
    price: 29600,
    image: "/images/rack-saree-saffron.png",
    categories: ["All pieces", "Silk Sarees", "Zari & Brocade"],
    fabric: "Pure Mulberry Zari Tissue Brocade",
    zariDetail: "All-over golden check with yali motif pallu",
    loomOrigin: "Handwoven in Kanchipuram (16 days)",
    backNote: "Luminous tissue reverse with hand-twisted fringe finish.",
    availability: ["Kanchipuram Flagship", "Online Dispatch (48 hrs)"],
    type: "saree",
  },
  {
    id: "rack-hs-1",
    name: "NAVDEEP RANI & EMERALD LANGA VONI",
    price: 24800,
    image: "/images/rack-halfsaree-1.png",
    categories: ["All pieces", "Half Sarees"],
    fabric: "Pure Kanchipuram Pattu Pavadai & Voni Set",
    zariDetail: "Emerald pleated lehenga with rani pink zari voni",
    loomOrigin: "Handwoven in Kanchipuram (15 days)",
    backNote: "Three-piece set with tailored silk choli, flared skirt & 2.5m zari voni.",
    availability: ["Kanchipuram Flagship", "Chennai Alwarpet", "Online Dispatch (24 hrs)"],
    type: "saree",
  },
  {
    id: "rack-hs-2",
    name: "NAVDEEP MUSTARD & COBALT HALF SAREE",
    price: 23500,
    image: "/images/rack-halfsaree-2.png",
    categories: ["All pieces", "Half Sarees"],
    fabric: "3-Ply Mulberry Silk Half Saree Set",
    zariDetail: "Royal cobalt pavadai skirt with sunlit marigold voni",
    loomOrigin: "Handwoven in Kanchipuram (14 days)",
    backNote: "Contrast korvai gold temple border on skirt hem and dupatta.",
    availability: ["Chennai Alwarpet", "Online Dispatch (24 hrs)"],
    type: "saree",
  },
  {
    id: "rack-hs-3",
    name: "NAVDEEP ROSE GOLD & PLUM PAVADAI",
    price: 26200,
    image: "/images/rack-halfsaree-3.png",
    categories: ["All pieces", "Half Sarees"],
    fabric: "Tissue Zari & Pure Mulberry Half Saree",
    zariDetail: "Deep plum silk skirt with rose-gold tissue voni drape",
    loomOrigin: "Handwoven in Kanchipuram (16 days)",
    backNote: "Hand-pleated waist with adjustable silk drawstring and zari belt.",
    availability: ["Kanchipuram Flagship", "Bengaluru Indiranagar", "Online Dispatch (48 hrs)"],
    type: "saree",
  },
  {
    id: "rack-hs-4",
    name: "NAVDEEP VERMILION & BOTTLE GREEN VONI",
    price: 25400,
    image: "/images/rack-halfsaree-4.png",
    categories: ["All pieces", "Half Sarees"],
    fabric: "Festive Muhurtham Half Saree Ensemble",
    zariDetail: "Sacred bottle-green skirt with vermilion red gold-bordered voni",
    loomOrigin: "Handwoven in Kanchipuram (15 days)",
    backNote: "Finished with traditional hand-knotted silk kuchu tassels.",
    availability: ["Kanchipuram Flagship", "Chennai Alwarpet", "Online Dispatch (24 hrs)"],
    type: "saree",
  },
  {
    id: "rack-10",
    name: "NAVDEEP SAFFRON RAW SILK BLOUSE",
    price: 3600,
    image: "/images/rack-blouse-saffron.png",
    categories: ["All pieces", "Half-Sleeve Blouses"],
    fabric: "Hand-loomed Tussar Raw Silk · Breathable Cotton Lining",
    zariDetail: "Hand-worked antique gold zari neckline & elbow cuff trim",
    loomOrigin: "Tailored at NAVDEEP Atelier, Chennai",
    backNote: "Deep square back with handcrafted silk-tassel dori and concealed side hooks.",
    availability: ["Chennai Alwarpet", "Online Dispatch (24 hrs)"],
    type: "blouse",
  },
  {
    id: "rack-11",
    name: "NAVDEEP EMERALD ZARI BLOUSE",
    price: 3900,
    image: "/images/rack-blouse-emerald.png",
    categories: ["All pieces", "Half-Sleeve Blouses"],
    fabric: "Pure Kanchipuram Silk · Mulmul Inner Lining",
    zariDetail: "Woven korvai gold cuff trim on elbow sleeves",
    loomOrigin: "Tailored at NAVDEEP Atelier, Chennai",
    backNote: "Sculpted heritage back with antique gold potli buttons.",
    availability: ["Kanchipuram Flagship", "Chennai Alwarpet", "Online Dispatch (24 hrs)"],
    type: "blouse",
  },
  {
    id: "rack-12",
    name: "NAVDEEP DUSTY ROSE FULL-SLEEVE BLOUSE",
    price: 4400,
    image: "/images/rack-blouse-rose.png",
    categories: ["All pieces", "Full-Sleeve Blouses"],
    fabric: "Pure Bangalore Raw Silk · Couture Padded Fit",
    zariDetail: "Antique gold zari trim along scalloped neckline & full cuffs",
    loomOrigin: "Tailored at NAVDEEP Atelier, Chennai",
    backNote: "Full-length heirloom sleeves with 2-inch inner tailoring margin.",
    availability: ["Chennai Alwarpet", "Bengaluru Indiranagar", "Online Dispatch (24 hrs)"],
    type: "blouse",
  },
  {
    id: "rack-13",
    name: "NAVDEEP MAROON BRIDAL FULL BLOUSE",
    price: 4800,
    image: "/images/rack-blouse-maroon.png",
    categories: ["All pieces", "Full-Sleeve Blouses"],
    fabric: "Heavyweight Muhurtham Kanjivaram Silk",
    zariDetail: "Pure temple-gold zari neckline and cuff border",
    loomOrigin: "Tailored at NAVDEEP Atelier, Kanchipuram",
    backNote: "Hand-finished dori tie-back with gold kundan tassels.",
    availability: ["Kanchipuram Flagship", "Chennai Alwarpet", "Online Dispatch (24 hrs)"],
    type: "blouse",
  },
];

export const MUSE_REELS: MuseReel[] = [
  {
    id: "reel-1",
    number: "REEL 01",
    duration: "0:16",
    fabric: "TISSUE KANJIVARAM",
    title: "Ponni Kanjivaram",
    location: "Lamp room, Kanchipuram",
    image: "/images/mood-zari.jpg",
    accent: "#C6943B",
    story: "Shot by brass oil-lamp light inside a 140-year-old Kanchipuram agraharam.",
    featuredPrice: 38500,
  },
  {
    id: "reel-2",
    number: "REEL 02",
    duration: "0:31",
    fabric: "HAND-BLOCK SILK",
    title: "Marina Morning",
    location: "Mylapore to the sea",
    image: "/images/mood-festive.jpg",
    accent: "#E5A037",
    story: "First light over Kapaleeshwarar temple lanes, draped in featherlight saffron silk.",
    featuredPrice: 24200,
  },
  {
    id: "reel-3",
    number: "REEL 03",
    duration: "0:17",
    fabric: "BANARASI KATAN",
    title: "Kaali Banarasi",
    location: "Studio, Varanasi red",
    image: "/images/mood-banarasi.jpg",
    accent: "#A855F7",
    story: "Deep plum and antique gold kadwa brocade catching twilight shadows.",
    featuredPrice: 44000,
  },
  {
    id: "reel-4",
    number: "REEL 04",
    duration: "0:15",
    fabric: "KANJIVARAM SILK",
    title: "Pachai Pattu",
    location: "The bride's chamber",
    image: "/images/mood-bridal.jpg",
    accent: "#D97706",
    story: "Quiet moments before the muhurtham — pure silk rustling against temple gold.",
    featuredPrice: 36800,
  },
  {
    id: "reel-5",
    number: "REEL 05",
    duration: "0:38",
    fabric: "KORVAI PURE SILK",
    title: "Galli Sindoor",
    location: "Old-city lanes",
    image: "/images/mood-wedding.jpg",
    accent: "#BE123C",
    story: "Crimson zari sweeping across warm sandstone arches at golden hour.",
    featuredPrice: 32900,
  },
];

export const BRIDAL_COLLECTION: BridalSaree[] = [
  {
    id: "bridal-1",
    name: "Kanchipuram Temple Rose",
    fabricNote: "Korvai Silk · Antique zari border",
    price: 31200,
    image: "/images/mood-kanchipuram.jpg",
  },
  {
    id: "bridal-2",
    name: "Sindoor Muhurtham Silk",
    fabricNote: "Pure 3-Ply Pattu · Peacock pallu",
    price: 34800,
    originalPrice: 37800,
    discountTag: "-8%",
    image: "/images/mood-wedding.jpg",
  },
  {
    id: "bridal-3",
    name: "Manjal Kalyanam Pattu",
    fabricNote: "Pattu · Red-gold pallu",
    price: 27300,
    image: "/images/mood-bridal.jpg",
  },
  {
    id: "bridal-4",
    name: "Peacock Emerald Heirloom",
    fabricNote: "Zari Brocade · Temple emerald pallu",
    price: 36900,
    originalPrice: 41000,
    discountTag: "-10%",
    image: "/images/mood-zari.jpg",
  },
  {
    id: "bridal-5",
    name: "Varanasi Plum Kadwa",
    fabricNote: "Katan Silk · Royal gold brocade",
    price: 42500,
    image: "/images/mood-banarasi.jpg",
  },
  {
    id: "bridal-6",
    name: "Marigold Haldi Tissue",
    fabricNote: "Gold Tissue · Sunlit woven border",
    price: 25400,
    originalPrice: 28900,
    discountTag: "-12%",
    image: "/images/mood-festive.jpg",
  },
];

export function formatINR(amount: number): string {
  return `₹${amount.toLocaleString("en-IN")}`;
}
