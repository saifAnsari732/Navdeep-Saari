"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Heart, Check, ChevronLeft, ChevronRight } from "lucide-react";
import { formatINR } from "@/data/catalog";
import { useStore } from "@/context/StoreContext";

interface DevotionCard {
  id: string;
  num: string;
  category: string;
  name: string;
  note: string;
  price: number;
  image: string;
}

const DEVOTION_CARDS: DevotionCard[] = [
  {
    id: "dev-01",
    num: "01",
    category: "KANJIVARAM SILK",
    name: "Arakku Temple Silk",
    note: "Brocade pallu · pure silver-core zari",
    price: 28400,
    image: "/images/mood-zari.jpg",
  },
  {
    id: "dev-02",
    num: "02",
    category: "BRIDAL PATTU",
    name: "Wine Georgette Zari",
    note: "Temple border · featherlight drape",
    price: 34800,
    image: "/images/mood-wedding.jpg",
  },
  {
    id: "dev-03",
    num: "03",
    category: "TISSUE SILK",
    name: "Agni Tissue Kanjivaram",
    note: "Vermilion weave · antique gold pallu",
    price: 31200,
    image: "/images/mood-bridal.jpg",
  },
  {
    id: "dev-04",
    num: "04",
    category: "KADWA BROCADE",
    name: "Neelambari Plum Silk",
    note: "Royal plum · woven jasmine motifs",
    price: 27300,
    image: "/images/mood-banarasi.jpg",
  },
  {
    id: "dev-05",
    num: "05",
    category: "FESTIVE PATTU",
    name: "Swarna Kanjivaram",
    note: "Sunlit marigold · temple coin border",
    price: 16800,
    image: "/images/mood-festive.jpg",
  },
  {
    id: "dev-06",
    num: "06",
    category: "KORVAI SILK",
    name: "Kanchi Rani Korvai",
    note: "Three-shuttle emerald zari interlock",
    price: 32400,
    image: "/images/mood-kanchipuram.jpg",
  },
  {
    id: "dev-07",
    num: "07",
    category: "HEIRLOOM SILK",
    name: "Ivory Elephant Zari",
    note: "Gajendra border · 3-ply mulberry",
    price: 32000,
    image: "/images/model-ivory.jpg",
  },
  {
    id: "dev-08",
    num: "08",
    category: "TEMPLE WEAVE",
    name: "Pachai Emerald Pattu",
    note: "Peacock pallu · 24k gold-dipped zari",
    price: 34500,
    image: "/images/model-emerald.jpg",
  },
];

export default function DrapedInDevotionSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [addedId, setAddedId] = useState<string | null>(null);
  const { addToBag, toggleWishlist, isWishlisted } = useStore();

  const scrollByCards = (dir: number) => {
    scrollRef.current?.scrollBy({ left: dir * 320, behavior: "smooth" });
  };

  const handleAdd = (card: DevotionCard) => {
    addToBag({
      id: card.id,
      brand: "NOOLAM",
      category: card.category,
      name: card.name,
      price: card.price,
      image: card.image,
    });
    setAddedId(card.id);
    setTimeout(() => setAddedId(null), 1000);
  };

  return (
    <section
      id="devotion"
      className="relative bg-white py-20 sm:py-24 border-t border-[#F1ECE4] overflow-hidden"
    >
      {/* Header Row */}
      <div className="max-w-[1360px] mx-auto px-6 sm:px-10 lg:px-14 flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-center gap-3 mb-2.5">
            <span className="w-7 h-[1.5px] bg-[#C6943B]" />
            <span className="text-[11px] font-semibold tracking-[0.26em] text-[#6B635E] uppercase">
              The Editorial Gallery
            </span>
          </div>
          <h2 className="text-[36px] sm:text-[50px] lg:text-[56px] font-extrabold tracking-[-0.03em] leading-[1.06] text-[#141110]">
            Draped in devotion.{" "}
            <span className="text-maroon-gold">Worn in light.</span>
          </h2>
        </motion.div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => scrollByCards(-1)}
            aria-label="Scroll gallery left"
            className="w-10 h-10 rounded-full border border-[#E4DDD2] hover:border-[#7A1426] text-[#141110] hover:text-[#7A1426] flex items-center justify-center transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => scrollByCards(1)}
            aria-label="Scroll gallery right"
            className="w-10 h-10 rounded-full border border-[#E4DDD2] hover:border-[#7A1426] text-[#141110] hover:text-[#7A1426] flex items-center justify-center transition-colors cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Horizontal Numbered Editorial Cards */}
      <div
        ref={scrollRef}
        className="flex gap-5 overflow-x-auto no-scrollbar px-6 sm:px-10 lg:px-14 pb-6 snap-x snap-mandatory"
      >
        {DEVOTION_CARDS.map((card, idx) => {
          const liked = isWishlisted(card.id);
          const isAdded = addedId === card.id;
          return (
            <motion.article
              key={card.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: idx * 0.05 }}
              whileHover={{ y: -8 }}
              className="snap-start shrink-0 w-[265px] sm:w-[290px] h-[395px] sm:h-[425px] rounded-[24px] overflow-hidden relative bg-[#1C1210] shadow-[0_18px_40px_rgba(20,17,16,0.14)] group"
            >
              <Image
                src={card.image}
                alt={card.name}
                fill
                sizes="300px"
                className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-108"
              />

              {/* Rich Cinematic Bottom Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-black/25" />

              {/* Top Index Badge + Wishlist */}
              <div className="absolute top-3.5 left-4 right-3.5 flex items-center justify-between">
                <span className="text-[12px] font-bold tracking-[0.16em] text-white/90 bg-black/35 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-white/15">
                  {card.num}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    toggleWishlist({
                      id: card.id,
                      brand: "NOOLAM",
                      category: card.category,
                      name: card.name,
                      price: card.price,
                      image: card.image,
                    })
                  }
                  aria-label={`Save ${card.name}`}
                  className="w-8 h-8 rounded-full bg-black/35 hover:bg-white text-white hover:text-[#7A1426] backdrop-blur-md flex items-center justify-center transition-colors cursor-pointer"
                >
                  <Heart
                    className={`w-3.5 h-3.5 ${
                      liked ? "fill-[#E11D48] text-[#E11D48]" : ""
                    }`}
                  />
                </button>
              </div>

              {/* Bottom Editorial Info + ADD TO CART Pill */}
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <p className="text-[10px] font-bold tracking-[0.2em] text-[#E8C574] uppercase">
                  {card.category}
                </p>
                <h3 className="mt-1 text-[20px] font-extrabold leading-tight">
                  {card.name}
                </h3>
                <p className="text-[11px] text-white/75 mt-0.5 truncate">
                  {card.note}
                </p>

                <div className="mt-3.5 pt-3 border-t border-white/15 flex items-center justify-between gap-2">
                  <span className="text-[15px] font-extrabold text-white">
                    {formatINR(card.price)}
                  </span>

                  <button
                    type="button"
                    onClick={() => handleAdd(card)}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[10px] font-bold tracking-[0.14em] uppercase transition-all cursor-pointer ${
                      isAdded
                        ? "bg-emerald-500 text-white"
                        : "bg-white text-[#141110] hover:bg-[#E8C574]"
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-3 h-3" />
                        <span>Added</span>
                      </>
                    ) : (
                      <>
                        <span>Add to cart</span>
                        <ArrowRight className="w-3 h-3" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>

      {/* Subtle Poetic Serif Ribbon Below Cards */}
      <div className="mt-6 border-y border-[#F2ECE3] py-3 overflow-hidden select-none">
        <div className="animate-marquee flex items-center gap-10 text-[#9B8F84] font-serif italic text-[17px] sm:text-[19px]">
          {[
            "Ten muses",
            "Every thread an offering",
            "Woven by hand, worn in devotion",
            "Pure silver-core zari",
            "Three-shuttle Korvai",
            "Ten muses",
            "Every thread an offering",
            "Woven by hand, worn in devotion",
            "Pure silver-core zari",
            "Three-shuttle Korvai",
          ].map((phrase, i) => (
            <span key={i} className="whitespace-nowrap flex items-center gap-10">
              <span>{phrase}</span>
              <span className="text-[#C6943B] not-italic text-[10px]" aria-hidden="true">
                ✦
              </span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
