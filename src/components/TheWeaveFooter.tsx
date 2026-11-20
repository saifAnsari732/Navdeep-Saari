"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Award,
  Sparkles,
  ShieldCheck,
  MapPin,
  ArrowUpRight,
  ArrowUp,
  Clock,
  Check,
  ShoppingBag,
  Heart,
  PhoneCall,
  Compass,
} from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { formatINR } from "@/data/catalog";

const CRAFT_PILLARS = [
  {
    icon: Sparkles,
    num: "01",
    label: "THREE-PLY MULBERRY",
    spec: "18–21 Denier · Triple-Twisted",
    title: "Twisted for a lifetime of drape",
    desc: "Every NAVDEEP saree is woven from triple-twisted pure mulberry silk yarn, giving our Kanjivarams their unmistakable weight, luminous shot-silk lustre, and generational heirloom strength.",
    image: "/images/craft-mulberry-silk.jpg",
    origin: "Sidlaghatta & Kanchipuram Twist",
  },
  {
    icon: Award,
    num: "02",
    label: "PURE SILVER-CORE ZARI",
    spec: "24K Gold-Dipped · 92.5% Silver Core",
    title: "Dipped in 24k temple gold",
    desc: "We weave exclusively with real silver-thread zari electroplated in pure 24-karat gold—never plastic or tested copper—so the pallu and temple borders glow richer with every decade.",
    image: "/images/craft-pure-zari.jpg",
    origin: "Certified Pure Zari Guild",
  },
  {
    icon: ShieldCheck,
    num: "03",
    label: "THREE-SHUTTLE KORVAI",
    spec: "2 Master Weavers · Pit Loom Interlock",
    title: "Two weavers, one sacred seam",
    desc: "Authentic Korvai borders require two master weavers working in rhythm at the pit loom, interlocking contrasting body and border hues by hand so the seam never parts.",
    image: "/images/craft-korvai-loom.jpg",
    origin: "Pillaiyarpalayam Loom Clusters",
  },
];

const ARCHIVE_SHOWCASE = [
  {
    id: "arch-01",
    tag: "MUHURTHAM ARCHIVE",
    name: "Kanchi Sindoor Bridal Pattu",
    weave: "6-inch Gopuram border · 240g pure gold zari",
    price: 38400,
    image: "/images/mood-bridal.jpg",
    cutout: "/images/rack-saree-crimson.png",
    span: "lg:col-span-5",
  },
  {
    id: "arch-02",
    tag: "ROYAL KORVAI",
    name: "Neelam Sapphire & Gold Korvai",
    weave: "Three-shuttle interlock · Annapakshi pallu",
    price: 33900,
    image: "/images/devotion-cobalt.jpg",
    cutout: "/images/rack-saree-cobalt.png",
    span: "lg:col-span-4",
  },
  {
    id: "arch-03",
    tag: "LANGA VONI COUTURE",
    name: "Rani & Pachai Emerald Half-Saree",
    weave: "3-piece Pattu Pavadai · Zari voni drape",
    price: 24800,
    image: "/images/mood-kanchipuram.jpg",
    cutout: "/images/rack-halfsaree-1.png",
    span: "lg:col-span-3",
  },
  {
    id: "arch-04",
    tag: "KATTAM HERITAGE",
    name: "Peacock Emerald Madras Check",
    weave: "Handloom Kattam check · Temple border",
    price: 24900,
    image: "/images/mood-zari.jpg",
    cutout: "/images/rack-check-emerald.png",
    span: "lg:col-span-3",
  },
  {
    id: "arch-05",
    tag: "SWARNA TISSUE",
    name: "Benares & Kanchi Gold Tissue",
    weave: "Dhoop-chhaon metallic gold warp & weft",
    price: 41800,
    image: "/images/mood-festive.jpg",
    cutout: "/images/rack-gold-brocade-cutout.png",
    span: "lg:col-span-5",
  },
  {
    id: "arch-06",
    tag: "ATELIER BLOUSE EDIT",
    name: "Zari-Cuff Tailored Silk Blouses",
    weave: "Hand-embroidered temple necklines · Sizes 34–42",
    price: 4600,
    image: "/images/mood-wedding.jpg",
    cutout: "/images/rack-fullblouse-2.png",
    span: "lg:col-span-4",
  },
];

const SANCTUARIES = [
  {
    name: "Kanchipuram Loom House",
    badge: "FLAGSHIP & PIT-LOOM ARCHIVE",
    address: "48 Gandhi Road, Pillaiyarpalayam, Kanchipuram 631501",
    hours: "Open Daily · 10:00 AM – 8:30 PM IST",
    phone: "+91 44 2722 6840",
    image: "/images/hero-showroom.jpg",
  },
  {
    name: "Chennai Alwarpet Salon",
    badge: "PRIVATE BRIDAL SANCTUM",
    address: "14 Poes Garden Road, Alwarpet, Chennai 600086",
    hours: "Open Daily · 10:30 AM – 9:00 PM IST",
    phone: "+91 44 2499 8120",
    image: "/images/showroom-stage-3.jpg",
  },
];

export default function TheWeaveFooter() {
  const { setStoreModalOpen, addToBag, toggleWishlist, isWishlisted } =
    useStore();
  const [addedId, setAddedId] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleQuickAdd = (item: (typeof ARCHIVE_SHOWCASE)[number]) => {
    addToBag({
      id: item.id,
      brand: "NAVDEEP",
      category: item.tag,
      name: item.name,
      price: item.price,
      image: item.image,
    });
    setAddedId(item.id);
    setTimeout(() => setAddedId(null), 1100);
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail("");
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      id="the-weave"
      className="bg-[#FAF7F2] border-t border-[#EAE2D6] overflow-hidden"
    >
      {/* PART 1: THE WEAVE · PHOTO-BACKED EDITORIAL CRAFTSMANSHIP PILLARS */}
      <div className="max-w-[1380px] mx-auto px-6 sm:px-10 lg:px-14 pt-20 sm:pt-28 pb-16">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-8 h-[1.5px] bg-[#C6943B]" />
              <span className="text-[11px] font-bold tracking-[0.28em] text-[#8F6520] uppercase">
                The Weave · Kanchipuram Provenance
              </span>
            </div>
            <h2 className="text-[36px] sm:text-[50px] lg:text-[58px] font-extrabold tracking-[-0.03em] leading-[1.04] text-[#141110]">
              Handwoven in Kanchipuram,{" "}
              <span className="text-maroon-gold">one saree at a time.</span>
            </h2>
            <p className="mt-3 text-[15px] sm:text-[16px] text-[#57534E] max-w-2xl leading-relaxed">
              Every NAVDEEP heirloom is born on a hand-thrown pit loom in
              Pillaiyarpalayam and Arni—uniting fifth-generation master weavers,
              pure triple-twisted mulberry silk, and 24-karat gold-dipped silver
              zari.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setStoreModalOpen(true)}
            className="self-start lg:self-auto inline-flex items-center gap-3.5 pl-6 pr-2.5 py-2.5 rounded-full border border-[#C6943B]/60 bg-[#1B090C] hover:bg-[#7A1426] text-white text-[13px] font-semibold shadow-[0_14px_34px_rgba(27,9,12,0.22)] transition-all cursor-pointer group shrink-0"
          >
            <span>Book a Private Bridal Viewing</span>
            <span className="w-8 h-8 rounded-full bg-gradient-to-br from-[#F0D38C] to-[#C6943B] text-[#1A0D0A] flex items-center justify-center transition-transform duration-300 group-hover:rotate-12">
              <ArrowUpRight className="w-4 h-4" />
            </span>
          </button>
        </div>

        {/* 3 Luxury Editorial Photo-Backed Craftsmanship Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-7">
          {CRAFT_PILLARS.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.article
                key={pillar.label}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.65, delay: idx * 0.1 }}
                className="group relative rounded-[28px] bg-white border border-[#E5DDD0] overflow-hidden shadow-[0_18px_45px_rgba(20,17,16,0.06)] hover:shadow-[0_24px_60px_rgba(122,20,38,0.14)] hover:border-[#C6943B] transition-all duration-500 flex flex-col"
              >
                {/* Top High-Res Macro Weave Photography Header */}
                <div className="relative h-[230px] sm:h-[250px] w-full overflow-hidden bg-[#1B090C]">
                  <Image
                    src={pillar.image}
                    alt={`${pillar.title} — ${pillar.label}`}
                    fill
                    sizes="(max-width: 1024px) 94vw, 420px"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#16070A] via-[#16070A]/30 to-transparent" />

                  {/* Top Number & Spec Pill */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/55 border border-[#E8C574]/40 backdrop-blur-md text-[11px] font-bold tracking-[0.2em] text-[#F5D688] uppercase">
                      <span>{pillar.num}</span>
                      <span className="w-1 h-1 rounded-full bg-[#E8C574]" />
                      <span>{pillar.label}</span>
                    </span>

                    <span className="w-9 h-9 rounded-full bg-[#7A1426]/90 border border-[#E8C574]/50 text-[#F5D688] flex items-center justify-center shadow-lg">
                      <Icon className="w-4 h-4" />
                    </span>
                  </div>

                  {/* Bottom Spec Caption Inside Photo */}
                  <div className="absolute bottom-3.5 left-4 right-4 flex items-center justify-between text-[11px] text-[#F7ECE0]/90">
                    <span className="font-semibold tracking-[0.14em] uppercase text-[#E8C574]">
                      {pillar.spec}
                    </span>
                    <span className="text-white/75">{pillar.origin}</span>
                  </div>
                </div>

                {/* Editorial Copy Body */}
                <div className="p-7 flex-1 flex flex-col justify-between bg-gradient-to-b from-white to-[#FCF9F4]">
                  <div>
                    <h3 className="text-[22px] font-extrabold text-[#141110] tracking-[-0.02em] leading-snug group-hover:text-[#7A1426] transition-colors">
                      {pillar.title}
                    </h3>
                    <p className="mt-3 text-[14px] leading-[1.68] text-[#57534E]">
                      {pillar.desc}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#EFE8DC] flex items-center justify-between text-[11px] font-bold tracking-[0.2em] text-[#7A1426] uppercase">
                    <span>Silk Mark Guaranteed</span>
                    <span className="inline-flex items-center gap-1 text-[#8F6520] group-hover:translate-x-1 transition-transform">
                      <span>Inspect Weave</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>

      {/* PART 2: CURATED COLLECTION ARCHIVE & HERITAGE ATELIER LOOKBOOK */}
      <div className="max-w-[1380px] mx-auto px-6 sm:px-10 lg:px-14 pb-24">
        <div className="rounded-[32px] bg-white border border-[#E6DDD0] p-6 sm:p-10 lg:p-12 shadow-[0_24px_70px_rgba(20,17,16,0.05)]">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-[#EFE8DC]">
            <div>
              <div className="flex items-center gap-2.5 mb-2">
                <Compass className="w-4 h-4 text-[#C6943B]" />
                <span className="text-[11px] font-bold tracking-[0.26em] text-[#8F6520] uppercase">
                  Curated Collection Archive · Studio Edition
                </span>
              </div>
              <h3 className="text-[28px] sm:text-[38px] font-extrabold tracking-[-0.03em] text-[#141110] leading-tight">
                From the Pit Loom{" "}
                <span className="text-[#7A1426]">to Your Wardrobe.</span>
              </h3>
            </div>

            <p className="text-[14px] text-[#57534E] max-w-md leading-relaxed">
              Explore signature Kanjivaram drapes, bridal Muhurtham pattus,
              handwoven Langa Voni half-sarees, and zari-cuff couture blouses
              ready for immediate insured dispatch.
            </p>
          </div>

          {/* 6-Card Architectural Bento Collection Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
            {ARCHIVE_SHOWCASE.map((item, idx) => {
              const liked = isWishlisted(item.id);
              const isAdded = addedId === item.id;
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.55, delay: idx * 0.06 }}
                  className={`${item.span} group relative h-[350px] sm:h-[370px] rounded-[24px] overflow-hidden bg-[#1A0A0D] border border-[#E5DDD0] shadow-[0_14px_40px_rgba(20,17,16,0.08)] hover:border-[#C6943B] transition-all duration-500 flex flex-col justify-between p-6`}
                >
                  {/* Full-Bleed High-Fashion Editorial Photography */}
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="(max-width: 768px) 94vw, 520px"
                    className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  {/* Scrim overlay guaranteeing crisp text contrast at bottom and top */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#120508] via-[#120508]/55 to-[#120508]/20" />

                  {/* Top Row: Category Pill + Actions & Studio Garment Inset Badge */}
                  <div className="relative z-20 flex items-start justify-between gap-3">
                    <span className="px-3 py-1 rounded-full bg-[#140609]/75 border border-[#E8C574]/45 backdrop-blur-md text-[10px] font-bold tracking-[0.2em] text-[#F5D688] uppercase">
                      {item.tag}
                    </span>

                    <div className="flex items-center gap-2.5 shrink-0">
                      {/* Clean Ivory Studio Drape Inset Preview Card */}
                      <div className="relative w-14 h-20 sm:w-16 sm:h-22 rounded-2xl bg-[#FAF7F2]/95 border border-[#E8C574]/60 shadow-[0_10px_25px_rgba(0,0,0,0.45)] p-1.5 overflow-hidden transition-transform duration-500 group-hover:scale-105">
                        <Image
                          src={item.cutout}
                          alt={`${item.name} studio drape`}
                          fill
                          sizes="72px"
                          className="object-contain p-1"
                        />
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          toggleWishlist({
                            id: item.id,
                            brand: "NAVDEEP",
                            category: item.tag,
                            name: item.name,
                            price: item.price,
                            image: item.image,
                          })
                        }
                        aria-label={`Wishlist ${item.name}`}
                        className="w-9 h-9 rounded-full bg-black/50 hover:bg-white text-white hover:text-[#7A1426] border border-white/25 backdrop-blur-md flex items-center justify-center transition-colors cursor-pointer self-start"
                      >
                        <Heart
                          className={`w-4 h-4 ${
                            liked ? "fill-[#E11D48] text-[#E11D48]" : ""
                          }`}
                        />
                      </button>
                    </div>
                  </div>

                  {/* Bottom Details & Quick Add CTA — Full Width Without Collision */}
                  <div className="relative z-20 pt-4">
                    <h4 className="text-[20px] sm:text-[23px] font-extrabold text-white leading-snug tracking-[-0.01em] drop-shadow-sm">
                      {item.name}
                    </h4>
                    <p className="mt-1 text-[12px] sm:text-[13px] text-[#F2E9DF]/85 line-clamp-1">
                      {item.weave}
                    </p>

                    <div className="mt-4 pt-3.5 border-t border-white/15 flex items-center justify-between gap-3">
                      <div>
                        <span className="block text-[9px] font-bold tracking-[0.2em] text-[#E8C574]/85 uppercase">
                          Atelier Price
                        </span>
                        <span className="text-[17px] sm:text-[19px] font-extrabold text-[#F5D688]">
                          {formatINR(item.price)}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleQuickAdd(item)}
                        className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-[11px] font-bold tracking-[0.14em] uppercase transition-all cursor-pointer ${
                          isAdded
                            ? "bg-emerald-600 text-white"
                            : "bg-white text-[#141110] hover:bg-[#E8C574]"
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>In Bag</span>
                          </>
                        ) : (
                          <>
                            <ShoppingBag className="w-3.5 h-3.5" />
                            <span>Collect</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* PART 3: ARCHITECTURAL HERITAGE MAROON & TEMPLE GOLD LUXURY FOOTER */}
      <div
        className="relative text-[#F5ECE0] pt-20 pb-28 px-6 sm:px-10 lg:px-14 border-t-2 border-[#C6943B]/45"
        style={{
          background:
            "radial-gradient(ellipse at 20% 0%, #5E0D1E 0%, #2B070E 48%, #150407 100%)",
        }}
      >
        {/* Subtle Gold Zari Hairline Grid Watermark */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #E8C574 1px, transparent 1px), linear-gradient(to bottom, #E8C574 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />

        <div className="relative z-10 max-w-[1380px] mx-auto">
          {/* Top Monumental Editorial Statement Row (matches reference video end_475.jpg) */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 pb-14 border-b border-[#E8C574]/20">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1 rounded-full bg-white/8 border border-[#E8C574]/35 mb-5">
                <span className="w-2 h-2 rounded-full bg-[#E8C574]" />
                <span className="text-[10px] font-bold tracking-[0.24em] text-[#F5D688] uppercase">
                  Silk Mark of India · GI-Tagged Kanchipuram
                </span>
              </div>
              <h2 className="text-[38px] sm:text-[52px] lg:text-[60px] font-extrabold tracking-[-0.03em] leading-[1.04] text-white">
                Woven with heritage.
                <br />
                Draped for <span className="text-[#E8C574]">today.</span>
              </h2>
            </div>

            {/* Monumental Brand Crest & Serif Wordmark */}
            <div className="flex flex-col lg:items-end">
              <div className="flex items-center gap-4">
                <span className="w-14 h-14 rounded-full bg-gradient-to-br from-[#9E1932] via-[#5A0917] to-[#2B040B] border-2 border-[#E8C574]/85 shadow-[0_6px_24px_rgba(232,197,116,0.32)] flex items-center justify-center shrink-0">
                  <svg
                    width="30"
                    height="30"
                    viewBox="0 0 32 32"
                    fill="none"
                    aria-hidden="true"
                    className="text-[#F5D688]"
                  >
                    <path
                      d="M16 3C14.2 6.8 13.4 9 13.4 11.2C13.4 12.8 14.5 14 16 14C17.5 14 18.6 12.8 18.6 11.2C18.6 9 17.8 6.8 16 3Z"
                      fill="currentColor"
                    />
                    <path
                      d="M16 15C12.2 13.5 9.6 11.2 8.4 8.2C11.4 9.2 14 11.4 16 15Z"
                      fill="currentColor"
                      opacity="0.85"
                    />
                    <path
                      d="M16 15C19.8 13.5 22.4 11.2 23.6 8.2C20.6 9.2 18 11.4 16 15Z"
                      fill="currentColor"
                      opacity="0.85"
                    />
                    <path
                      d="M9.5 26.5V16.8H12.2L20 24.2V16.8H22.5V26.5H19.9L12 19V26.5H9.5Z"
                      fill="currentColor"
                    />
                    <path
                      d="M11 28.5C13.5 30 18.5 30 21 28.5H11Z"
                      stroke="currentColor"
                      strokeWidth="1.2"
                    />
                  </svg>
                </span>
                <div>
                  <p className="font-serif text-[42px] sm:text-[56px] tracking-[0.22em] text-white font-semibold uppercase leading-none">
                    NAVDEEP
                  </p>
                  <p className="text-[11px] tracking-[0.36em] text-[#E8C574] uppercase mt-1.5">
                    Kanchipuram Silk · Est. 1968
                  </p>
                </div>
              </div>
              <p className="mt-4 text-[13px] text-[#E7DDD2]/75 max-w-md lg:text-right leading-relaxed">
                Direct from fifth-generation master looms in Pillaiyarpalayam to
                discerning brides and collectors worldwide.
              </p>
            </div>
          </div>

          {/* Interactive Flagship Sanctuary Photo Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 py-12 border-b border-[#E8C574]/20">
            {SANCTUARIES.map((store) => (
              <div
                key={store.name}
                className="group relative rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-[#E8C574]/25 hover:border-[#E8C574]/60 p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center gap-5 transition-all"
              >
                <div className="relative w-full sm:w-36 h-28 rounded-xl overflow-hidden shrink-0 border border-[#E8C574]/30">
                  <Image
                    src={store.image}
                    alt={store.name}
                    fill
                    sizes="160px"
                    className="object-cover transition-transform duration-500 group-hover:scale-108"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-bold tracking-[0.22em] text-[#E8C574] uppercase">
                    {store.badge}
                  </span>
                  <h3 className="mt-1 text-[18px] font-bold text-white flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#E8C574] shrink-0" />
                    <span>{store.name}</span>
                  </h3>
                  <p className="mt-1 text-[13px] text-[#E7DDD2]/80">
                    {store.address}
                  </p>
                  <div className="mt-2.5 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-[12px] text-[#E7DDD2]/70">
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#E8C574]" />
                      {store.hours}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <PhoneCall className="w-3.5 h-3.5 text-[#E8C574]" />
                      {store.phone}
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setStoreModalOpen(true)}
                  className="self-start sm:self-center px-4 py-2 rounded-full bg-[#E8C574]/15 hover:bg-[#E8C574] text-[#F5D688] hover:text-[#1A090D] border border-[#E8C574]/40 text-[11px] font-bold tracking-[0.16em] uppercase transition-colors cursor-pointer shrink-0"
                >
                  Visit Salon
                </button>
              </div>
            ))}
          </div>

          {/* 5-Column Architectural Directory + Stay Updated Newsletter Concierge */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-12 gap-8 py-12 border-b border-[#E8C574]/20 text-[13px]">
            {/* Col 1: SHOP */}
            <div className="col-span-1 lg:col-span-2 space-y-2.5">
              <p className="text-[11px] font-bold tracking-[0.24em] text-[#E8C574] uppercase mb-3.5">
                Shop
              </p>
              {[
                { label: "Silk sarees", href: "#the-rack" },
                { label: "Half sarees", href: "#the-rack" },
                { label: "Full-sleeve blouses", href: "#the-rack" },
                { label: "Half-sleeve blouses", href: "#the-rack" },
                { label: "Checked sarees", href: "#the-rack" },
                { label: "Zari & Brocade", href: "#the-rack" },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="block text-[#E7DDD2]/80 hover:text-[#E8C574] transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Col 2: EXPLORE */}
            <div className="col-span-1 lg:col-span-2 space-y-2.5">
              <p className="text-[11px] font-bold tracking-[0.24em] text-[#E8C574] uppercase mb-3.5">
                Explore
              </p>
              {[
                { label: "Our story", href: "#hero" },
                { label: "Six Moods archive", href: "#six-moods" },
                { label: "Try the look", href: "#try-the-look" },
                { label: "Pick a silk", href: "#pick-a-silk" },
                { label: "The lookbook & reels", href: "#the-muse" },
                { label: "Bridal collection", href: "#bridal" },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="block text-[#E7DDD2]/80 hover:text-[#E8C574] transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Col 3: SUPPORT */}
            <div className="col-span-1 lg:col-span-2 space-y-2.5">
              <p className="text-[11px] font-bold tracking-[0.24em] text-[#E8C574] uppercase mb-3.5">
                Support
              </p>
              {[
                {
                  label: "Book private viewing",
                  action: () => setStoreModalOpen(true),
                },
                {
                  label: "Contact concierge",
                  action: () => setStoreModalOpen(true),
                },
                { label: "Shipping & insured delivery", href: "#the-weave" },
                { label: "Returns & exchanges", href: "#the-weave" },
                { label: "Silk care & preservation", href: "#the-weave" },
              ].map((item) =>
                item.action ? (
                  <button
                    key={item.label}
                    type="button"
                    onClick={item.action}
                    className="block text-left text-[#E7DDD2]/80 hover:text-[#E8C574] transition-colors cursor-pointer"
                  >
                    {item.label}
                  </button>
                ) : (
                  <a
                    key={item.label}
                    href={item.href}
                    className="block text-[#E7DDD2]/80 hover:text-[#E8C574] transition-colors"
                  >
                    {item.label}
                  </a>
                )
              )}
            </div>

            {/* Col 4: LEGAL & PROVENANCE */}
            <div className="col-span-1 lg:col-span-2 space-y-2.5">
              <p className="text-[11px] font-bold tracking-[0.24em] text-[#E8C574] uppercase mb-3.5">
                Legal
              </p>
              {[
                "Silk Mark registry",
                "Pure Zari guarantee",
                "Terms & conditions",
                "Privacy policy",
                "Archival authenticity",
              ].map((label) => (
                <a
                  key={label}
                  href="#the-weave"
                  className="block text-[#E7DDD2]/80 hover:text-[#E8C574] transition-colors"
                >
                  {label}
                </a>
              ))}
            </div>

            {/* Col 5: STAY UPDATED (Matches reference video end_475.jpg) */}
            <div className="col-span-2 sm:col-span-4 lg:col-span-4">
              <p className="text-[11px] font-bold tracking-[0.24em] text-[#E8C574] uppercase mb-3">
                Stay Updated
              </p>
              <p className="text-[13px] text-[#E7DDD2]/80 leading-relaxed mb-4">
                New collections, private previews, and styling notes from our
                Kanchipuram loom house—delivered thoughtfully.
              </p>

              {subscribed ? (
                <div className="p-3.5 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-200 text-[12px] flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>
                    Welcome to the NAVDEEP private registry. You will receive
                    our next Muhurtham loom dispatch.
                  </span>
                </div>
              ) : (
                <form
                  onSubmit={handleSubscribe}
                  className="flex items-center gap-2 p-1.5 rounded-full bg-white/8 border border-[#E8C574]/35 focus-within:border-[#E8C574]"
                >
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    aria-label="Your email address"
                    className="flex-1 bg-transparent px-4 py-1.5 text-[13px] text-white placeholder:text-[#E7DDD2]/50 focus:outline-none min-w-0"
                  />
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-full bg-gradient-to-r from-[#F0D38C] to-[#C6943B] hover:from-[#F7E0A3] hover:to-[#D5A246] text-[#1A090D] text-[12px] font-bold tracking-[0.14em] uppercase transition-all cursor-pointer shrink-0"
                  >
                    Join
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Bottom Copyright & Back to Top Bar */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[12px] text-[#E7DDD2]/65">
            <p>
              © {new Date().getFullYear()} NAVDEEP Kanchipuram Silk. All rights
              reserved.
            </p>

            <div className="flex items-center gap-6">
              <span>
                Silk Mark Certified · Pure Silver-Core Zari · Handwoven in India
              </span>
              <button
                type="button"
                onClick={scrollToTop}
                className="inline-flex items-center gap-1.5 text-[#E8C574] hover:text-white font-semibold tracking-[0.16em] uppercase transition-colors cursor-pointer"
              >
                <span>Back to top</span>
                <ArrowUp className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
