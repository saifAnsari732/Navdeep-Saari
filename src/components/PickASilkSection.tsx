"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Heart, Plus, Check, ChevronLeft, ChevronRight } from "lucide-react";
import { PICK_SILK_CARDS, formatINR, type PickSilkCard } from "@/data/catalog";
import { useStore } from "@/context/StoreContext";

function TiltSilkCard({
  card,
  index,
  total,
}: {
  card: PickSilkCard;
  index: number;
  total: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({
    rotateX: 0,
    rotateY: 0,
    glareX: 50,
    glareY: 50,
  });
  const [added, setAdded] = useState(false);
  const { addToBag, toggleWishlist, isWishlisted } = useStore();

  const liked = isWishlisted(card.id);

  // Gentle curved fan geometry across the 9-card arc
  const mid = (total - 1) / 2;
  const rel = index - mid;
  const arcRotate = rel * 2.8;
  const arcY = Math.min(Math.abs(rel) * Math.abs(rel) * 4.2, 52);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    setTilt({
      rotateX: (0.5 - py) * 18,
      rotateY: (px - 0.5) * 18,
      glareX: px * 100,
      glareY: py * 100,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0, glareX: 50, glareY: 50 });
  };

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToBag({
      id: card.id,
      brand: "NAVDEEP",
      category: "SILK SAREE",
      name: card.fullName,
      price: card.price,
      image: card.image,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1100);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: arcY }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.65,
        delay: (index % 6) * 0.06,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{ perspective: 1000 }}
      className="shrink-0 w-[238px] sm:w-[256px] lg:w-[264px]"
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        animate={{
          rotateZ: tilt.rotateX === 0 && tilt.rotateY === 0 ? arcRotate : 0,
          rotateX: tilt.rotateX,
          rotateY: tilt.rotateY,
        }}
        whileHover={{ y: -16, scale: 1.04, zIndex: 30 }}
        whileTap={{ scale: 0.96 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        style={{
          backgroundColor: card.bgColor,
          transformStyle: "preserve-3d",
        }}
        className="relative h-[415px] sm:h-[448px] rounded-[26px] overflow-hidden shadow-[0_20px_44px_rgba(20,17,16,0.16)] cursor-pointer select-none group"
      >
        {/* Inner Dashed Couture Stitch Frame (matches 04-pick-a-silk.png) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-2.5 rounded-[20px] border border-dashed border-white/25 z-20"
        />

        {/* Dynamic Specular Sheen Glare */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${tilt.glareX}% ${tilt.glareY}%, rgba(255,255,255,0.28) 0%, transparent 62%)`,
          }}
        />

        {/* Giant Condensed Poster Typography BEHIND the Model */}
        <div
          aria-hidden="true"
          className="absolute top-4 left-3 right-3 z-10 text-center leading-[0.88] pointer-events-none"
          style={{ color: card.textColor }}
        >
          <div className="font-display text-[48px] sm:text-[54px] tracking-[0.01em] uppercase opacity-95 truncate">
            {card.titleLine1}
          </div>
          <div className="font-display text-[46px] sm:text-[52px] tracking-[0.01em] uppercase opacity-95">
            {card.titleLine2}
          </div>
        </div>

        {/* Heart Wishlist Button (Top Right) */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist({
              id: card.id,
              brand: "NAVDEEP",
              category: "SILK SAREE",
              name: card.fullName,
              price: card.price,
              image: card.image,
            });
          }}
          aria-label={`Wishlist ${card.fullName}`}
          className="absolute top-3.5 right-3.5 z-30 w-9 h-9 rounded-full bg-white/95 hover:bg-white shadow-md flex items-center justify-center transition-transform hover:scale-110 cursor-pointer"
        >
          <Heart
            className={`w-4 h-4 ${
              liked ? "fill-[#7A1426] text-[#7A1426]" : "text-[#141110]"
            }`}
          />
        </button>

        {/* Draped Model Cutout Standing Directly in Front of Condensed Typography */}
        <div className="absolute inset-x-2 bottom-2 top-[50px] z-20 flex items-end justify-center pointer-events-none">
          <div className="relative w-full h-full">
            <Image
              src={card.image}
              alt={card.fullName}
              fill
              sizes="260px"
              className="object-contain object-bottom drop-shadow-[0_20px_26px_rgba(0,0,0,0.34)] transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        </div>

        {/* Bottom Price & Round Black Plus Drop-to-Bag Button */}
        <div className="absolute bottom-3.5 left-4 right-3.5 z-30 flex items-center justify-between">
          <div>
            <p
              className="text-[14px] font-bold tracking-tight drop-shadow-sm"
              style={{ color: card.textColor }}
            >
              {formatINR(card.price)}
            </p>
          </div>

          <motion.button
            type="button"
            whileHover={{ scale: 1.12, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleAdd}
            aria-label={`Drop ${card.fullName} into bag`}
            className={`w-11 h-11 rounded-full border-2 border-white shadow-lg flex items-center justify-center transition-colors cursor-pointer ${
              added ? "bg-emerald-600 text-white" : "bg-[#141110] text-white"
            }`}
          >
            {added ? <Check className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function PickASilkSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // Scroll-driven horizontal glide across the 9-card arc (matches h_01.jpg -> h_02.jpg)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
  });

  const arcTranslateX = useTransform(smoothScroll, [0.15, 0.85], ["4%", "-22%"]);

  const slideBy = (dir: number) => {
    trackRef.current?.scrollBy({ left: dir * 320, behavior: "smooth" });
  };

  return (
    <section
      id="pick-a-silk"
      ref={sectionRef}
      className="relative bg-white py-20 sm:py-28 overflow-hidden"
    >
      {/* Header */}
      <div className="max-w-[1360px] mx-auto px-6 sm:px-10 lg:px-14 flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12 sm:mb-14">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7 }}
          className="text-[40px] sm:text-[54px] lg:text-[62px] font-extrabold tracking-[-0.03em] leading-[1.04] text-[#141110]"
        >
          Pick a <span className="text-[#7A1426]">Silk</span>
        </motion.h2>

        <div className="flex flex-col sm:items-end gap-3">
          <p className="text-[14px] sm:text-[15px] text-[#57534E] sm:text-right max-w-[310px] leading-relaxed">
            Tilt a card, press it, poke the silk. Hit{" "}
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#141110] text-white align-middle mx-0.5">
              <Plus className="w-3 h-3" />
            </span>{" "}
            to drop a saree into your bag.
          </p>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => slideBy(-1)}
              aria-label="Slide silk cards left"
              className="w-9 h-9 rounded-full border border-[#E5DDD2] hover:border-[#7A1426] text-[#141110] hover:text-[#7A1426] flex items-center justify-center transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => slideBy(1)}
              aria-label="Slide silk cards right"
              className="w-9 h-9 rounded-full border border-[#E5DDD2] hover:border-[#7A1426] text-[#141110] hover:text-[#7A1426] flex items-center justify-center transition-colors cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Scroll-Driven Fanned Curved Arc of 9 Distinct Silk Cards */}
      <div
        ref={trackRef}
        className="w-full overflow-x-auto no-scrollbar pb-20 pt-8 px-6 sm:px-12"
      >
        <motion.div
          style={{ x: arcTranslateX }}
          className="flex items-start justify-start gap-5 sm:gap-6 min-w-max"
        >
          {PICK_SILK_CARDS.map((card, idx) => (
            <TiltSilkCard
              key={card.id}
              card={card}
              index={idx}
              total={PICK_SILK_CARDS.length}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
