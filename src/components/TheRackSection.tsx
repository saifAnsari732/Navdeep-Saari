"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Heart,
  X,
  MapPin,
  Check,
  Sparkles,
} from "lucide-react";
import {
  RACK_CATEGORIES,
  RACK_ITEMS,
  formatINR,
  type RackCategory,
} from "@/data/catalog";
import { useStore } from "@/context/StoreContext";

const SIZES = ["34", "36", "38", "40", "42"];

export default function TheRackSection() {
  const [selectedCategory, setSelectedCategory] =
    useState<RackCategory>("Silk Sarees");
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [activeDetailIndex, setActiveDetailIndex] = useState<number | null>(
    null
  );
  const [viewSide, setViewSide] = useState<"front" | "back">("front");
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [showAvailability, setShowAvailability] = useState(false);
  const railScrollRef = useRef<HTMLDivElement>(null);

  const slideRail = (dir: number) => {
    railScrollRef.current?.scrollBy({ left: dir * 320, behavior: "smooth" });
  };

  const { addToBag, toggleWishlist, isWishlisted } = useStore();

  const filteredItems = useMemo(() => {
    if (selectedCategory === "All pieces") return RACK_ITEMS;
    return RACK_ITEMS.filter((item) =>
      item.categories.includes(selectedCategory)
    );
  }, [selectedCategory]);

  const categoryCounts = useMemo(() => {
    const map: Record<string, number> = {};
    for (const cat of RACK_CATEGORIES) {
      map[cat] =
        cat === "All pieces"
          ? RACK_ITEMS.length
          : RACK_ITEMS.filter((i) => i.categories.includes(cat)).length;
    }
    return map;
  }, []);

  const hoveredItem =
    filteredItems.find((i) => i.id === hoveredId) ??
    filteredItems[Math.floor(filteredItems.length / 2)] ??
    filteredItems[0];

  const activeItem =
    activeDetailIndex !== null ? filteredItems[activeDetailIndex] ?? null : null;

  // Keyboard navigation when Rack Detail is open
  useEffect(() => {
    if (activeDetailIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveDetailIndex(null);
      if (e.key === "ArrowRight") {
        setActiveDetailIndex((idx) =>
          idx === null ? null : (idx + 1) % filteredItems.length
        );
        setViewSide("front");
        setSelectedSize(null);
        setShowAvailability(false);
      }
      if (e.key === "ArrowLeft") {
        setActiveDetailIndex((idx) =>
          idx === null
            ? null
            : (idx - 1 + filteredItems.length) % filteredItems.length
        );
        setViewSide("front");
        setSelectedSize(null);
        setShowAvailability(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeDetailIndex, filteredItems.length]);

  const openDetail = (idx: number) => {
    setActiveDetailIndex(idx);
    setViewSide("front");
    setSelectedSize(null);
    setShowAvailability(false);
  };

  const handleAddActiveToBag = () => {
    if (!activeItem || !selectedSize) return;
    addToBag({
      id: activeItem.id,
      brand: "NOOLAM",
      category: activeItem.type === "blouse" ? "COUTURE BLOUSE" : "SILK SAREE",
      name: activeItem.name,
      price: activeItem.price,
      image: activeItem.image,
      size: selectedSize,
    });
  };

  return (
    <section
      id="the-rack"
      className="relative bg-white py-20 sm:py-28 px-4 sm:px-10 lg:px-14 border-t border-[#F1ECE4] overflow-hidden"
    >
      <div className="max-w-[1360px] mx-auto">
        {/* Centered Header */}
        <div className="text-center mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2.5 mb-3">
            <span className="w-6 h-[1.5px] bg-[#C6943B]" />
            <span className="text-[11px] font-semibold tracking-[0.26em] text-[#6B635E] uppercase">
              The Collection
            </span>
          </div>
          <h2 className="text-[38px] sm:text-[52px] lg:text-[60px] font-extrabold tracking-[-0.03em] leading-[1.06] text-[#141110]">
            Every silk, <span className="text-gold-maroon">on the rail.</span>
          </h2>
        </div>

        {/* Category Filter Chips with Counts */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-14 sm:mb-16">
          {RACK_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => {
                  setSelectedCategory(cat);
                  setHoveredId(null);
                  setActiveDetailIndex(null);
                }}
                className={`relative px-4 py-2 rounded-full text-[13px] font-medium border transition-colors cursor-pointer flex items-center gap-2 ${
                  isSelected
                    ? "text-white border-[#C6943B]"
                    : "text-[#292524] border-[#ECE4D9] bg-white hover:border-[#C6943B]/60"
                }`}
              >
                {isSelected && (
                  <motion.span
                    layoutId="rackActiveChip"
                    transition={{ type: "spring", stiffness: 360, damping: 30 }}
                    className="absolute inset-0 rounded-full bg-[#7A1426] shadow-[0_6px_18px_rgba(122,20,38,0.28)]"
                  />
                )}
                <span className="relative z-10">{cat}</span>
                <span
                  className={`relative z-10 min-w-[20px] h-5 px-1.5 rounded-full text-[11px] font-bold flex items-center justify-center ${
                    isSelected
                      ? "bg-white text-[#7A1426]"
                      : "bg-[#F6EFE6] text-[#7A1426]"
                  }`}
                >
                  {categoryCounts[cat]}
                </span>
              </button>
            );
          })}
        </div>

        {/* Interactive Clothes Rail Stage */}
        <div className="relative min-h-[380px] sm:min-h-[450px] flex flex-col justify-center">
          {/* Background Rail (blurs smoothly when a hanger is lifted into detail mode) */}
          <div
            className={`relative w-full transition-all duration-500 ${
              activeItem ? "blur-md opacity-35 scale-[0.98] pointer-events-none" : ""
            }`}
          >
            {/* Brushed Chrome Rod with End Finials */}
            <div className="relative mx-auto max-w-[1140px] flex items-center">
              <span
                aria-hidden="true"
                className="w-3.5 h-3.5 rounded-full chrome-rail shrink-0"
              />
              <div
                aria-hidden="true"
                className="h-[6px] w-full chrome-rail rounded-full"
              />
              <span
                aria-hidden="true"
                className="w-3.5 h-3.5 rounded-full chrome-rail shrink-0"
              />
            </div>

            {/* Hanging Silks on Wooden Hangers (Strictly Bounded Inside Chrome Rod) */}
            <div className="relative mx-auto max-w-[1120px] -mt-[10px]">
              {/* Left / Right Smooth Rail Glide Controls when many hangers are shown */}
              {filteredItems.length > 8 && (
                <>
                  <button
                    type="button"
                    onClick={() => slideRail(-1)}
                    aria-label="Slide rail left"
                    className="flex absolute -left-3 sm:-left-5 top-[44%] -translate-y-1/2 z-40 w-10 h-10 rounded-full bg-white/95 border border-[#E5DDD2] hover:border-[#7A1426] text-[#141110] hover:text-[#7A1426] items-center justify-center shadow-lg transition-all hover:scale-105 cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => slideRail(1)}
                    aria-label="Slide rail right"
                    className="flex absolute -right-3 sm:-right-5 top-[44%] -translate-y-1/2 z-40 w-10 h-10 rounded-full bg-white/95 border border-[#E5DDD2] hover:border-[#7A1426] text-[#141110] hover:text-[#7A1426] items-center justify-center shadow-lg transition-all hover:scale-105 cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </>
              )}

              <div
                ref={railScrollRef}
                className="pt-0 pb-8 overflow-x-auto no-scrollbar scroll-smooth"
                style={{
                  maskImage:
                    filteredItems.length > 9
                      ? "linear-gradient(90deg, transparent 0%, black 3%, black 97%, transparent 100%)"
                      : "none",
                  WebkitMaskImage:
                    filteredItems.length > 9
                      ? "linear-gradient(90deg, transparent 0%, black 3%, black 97%, transparent 100%)"
                      : "none",
                }}
              >
                <motion.div
                  layout
                  className={`flex items-start ${
                    filteredItems.length <= 9
                      ? "justify-center w-full"
                      : "justify-start min-w-max"
                  } px-6`}
                >
                  <AnimatePresence mode="popLayout">
                    {filteredItems.map((item, idx) => {
                      const isHovered = hoveredItem?.id === item.id;
                      const compact = filteredItems.length >= 9;
                      return (
                        <motion.button
                          key={item.id}
                          layout
                          type="button"
                          initial={{ opacity: 0, x: 36, scale: 0.9 }}
                          animate={{
                            opacity: 1,
                            x: 0,
                            scale: isHovered ? 1.15 : 0.96,
                            y: isHovered ? 18 : 0,
                            zIndex: isHovered ? 35 : 10 + idx,
                          }}
                          exit={{ opacity: 0, x: -28, scale: 0.85 }}
                          transition={{
                            type: "spring",
                            stiffness: 260,
                            damping: 24,
                          }}
                          onMouseEnter={() => setHoveredId(item.id)}
                          onFocus={() => setHoveredId(item.id)}
                          onClick={() => openDetail(idx)}
                          data-cursor="LIFT"
                          aria-label={`Inspect ${item.name} (${formatINR(item.price)})`}
                          className={`relative ${
                            compact
                              ? "-mx-3 sm:-mx-3.5 w-[124px] sm:w-[138px] md:w-[146px]"
                              : "-mx-1 sm:-mx-1.5 w-[142px] sm:w-[168px] md:w-[184px]"
                          } h-[270px] sm:h-[330px] flex flex-col items-center cursor-pointer group focus-visible:outline-none bg-transparent shrink-0`}
                        >
                          <div className="relative w-full h-full">
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              sizes="190px"
                              className="object-contain object-top drop-shadow-[0_18px_22px_rgba(20,17,16,0.22)] transition-transform duration-300"
                            />
                          </div>
                        </motion.button>
                      );
                    })}
                  </AnimatePresence>
                </motion.div>
              </div>
            </div>

            {/* Hovered Item Caption Below Rail */}
            <div className="mt-4 text-center min-h-[28px]">
              {hoveredItem && (
                <motion.p
                  key={hoveredItem.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-[12px] sm:text-[13px] font-medium tracking-[0.2em] text-[#57534E] uppercase"
                >
                  {hoveredItem.name} &nbsp;·&nbsp;{" "}
                  <span className="text-[#141110] font-semibold">
                    {formatINR(hoveredItem.price)}.00
                  </span>
                </motion.p>
              )}
              <p className="mt-1 text-[11px] text-[#A8A29E]">
                Click any hanger to lift it off the rail
              </p>
            </div>
          </div>

          {/* Lifted Full-Focus Rack Detail Overlay */}
          <AnimatePresence>
            {activeItem && activeDetailIndex !== null && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="absolute inset-0 z-30 flex items-center justify-center bg-white/65 backdrop-blur-sm rounded-3xl px-4 py-6"
              >
                {/* Close × Top Right */}
                <button
                  type="button"
                  onClick={() => setActiveDetailIndex(null)}
                  className="absolute top-3 right-3 sm:top-5 sm:right-6 inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.22em] text-[#44403C] hover:text-[#7A1426] uppercase cursor-pointer"
                >
                  <span>Close</span>
                  <X className="w-4 h-4" />
                </button>

                {/* Prev Hanger Arrow */}
                <button
                  type="button"
                  onClick={() => {
                    setActiveDetailIndex(
                      (activeDetailIndex - 1 + filteredItems.length) %
                        filteredItems.length
                    );
                    setViewSide("front");
                    setSelectedSize(null);
                    setShowAvailability(false);
                  }}
                  aria-label="Previous piece on rail"
                  className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white border border-[#E5DDD2] hover:border-[#7A1426] text-[#141110] hover:text-[#7A1426] flex items-center justify-center shadow-sm transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>

                {/* Next Hanger Arrow */}
                <button
                  type="button"
                  onClick={() => {
                    setActiveDetailIndex(
                      (activeDetailIndex + 1) % filteredItems.length
                    );
                    setViewSide("front");
                    setSelectedSize(null);
                    setShowAvailability(false);
                  }}
                  aria-label="Next piece on rail"
                  className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white border border-[#E5DDD2] hover:border-[#7A1426] text-[#141110] hover:text-[#7A1426] flex items-center justify-center shadow-sm transition-colors cursor-pointer"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>

                {/* Lifted Hanger + Controls Stack */}
                <motion.div
                  key={activeItem.id}
                  initial={{ y: 24, scale: 0.9, opacity: 0 }}
                  animate={{ y: 0, scale: 1, opacity: 1 }}
                  exit={{ y: 16, scale: 0.94, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 280, damping: 26 }}
                  className="flex flex-col items-center text-center max-w-[420px] w-full"
                >
                  {/* 3D Front/Back Flip Showcase */}
                  <div
                    className="relative w-[220px] sm:w-[260px] h-[250px] sm:h-[290px] mb-3"
                    style={{ perspective: 900 }}
                  >
                    <motion.div
                      animate={{ rotateY: viewSide === "back" ? 180 : 0 }}
                      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                      style={{ transformStyle: "preserve-3d" }}
                      className="relative w-full h-full"
                    >
                      {/* Front View */}
                      <div
                        style={{ backfaceVisibility: "hidden" }}
                        className="absolute inset-0"
                      >
                        <Image
                          src={activeItem.image}
                          alt={`${activeItem.name} front view`}
                          fill
                          sizes="280px"
                          style={{ filter: activeItem.imageFilter ?? "none" }}
                          className="object-contain drop-shadow-[0_24px_30px_rgba(20,17,16,0.24)]"
                        />
                      </div>

                      {/* Back Weave Inspection Card */}
                      <div
                        style={{
                          backfaceVisibility: "hidden",
                          transform: "rotateY(180deg)",
                        }}
                        className="absolute inset-0 rounded-2xl bg-[#FAF6F0] border border-[#DFC48F] p-5 flex flex-col items-center justify-center text-center shadow-lg"
                      >
                        <Sparkles className="w-5 h-5 text-[#C6943B] mb-2" />
                        <p className="text-[10px] font-bold tracking-[0.22em] text-[#7A1426] uppercase mb-2">
                          Reverse Weave &amp; Silk Mark
                        </p>
                        <p className="text-[12px] text-[#292524] leading-relaxed mb-3">
                          {activeItem.backNote}
                        </p>
                        <div className="w-full border-t border-[#E6DAC7] pt-2.5 text-[11px] text-[#57534E] space-y-1">
                          <p>{activeItem.fabric}</p>
                          <p className="text-[#8F6520] font-medium">
                            {activeItem.loomOrigin}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Product Title & Price */}
                  <h3 className="text-[14px] sm:text-[15px] font-extrabold tracking-[0.14em] text-[#141110] uppercase">
                    {activeItem.name}
                  </h3>
                  <p className="text-[13px] text-[#6B635E] mt-0.5">
                    {formatINR(activeItem.price)}.00
                  </p>

                  {/* Front / Back Pill Toggle */}
                  <div className="mt-3 inline-flex items-center p-0.5 rounded-full border border-[#D6CFC5] bg-white">
                    {(["front", "back"] as const).map((side) => (
                      <button
                        key={side}
                        type="button"
                        onClick={() => setViewSide(side)}
                        className={`px-4 py-1 rounded-full text-[11px] font-semibold tracking-[0.16em] uppercase transition-colors cursor-pointer ${
                          viewSide === side
                            ? "bg-[#141110] text-white"
                            : "text-[#57534E] hover:text-[#141110]"
                        }`}
                      >
                        {side}
                      </button>
                    ))}
                  </div>

                  {/* Size Chips 34–42 */}
                  <div className="mt-3.5 flex items-center justify-center gap-2">
                    {SIZES.map((sz) => {
                      const active = selectedSize === sz;
                      return (
                        <button
                          key={sz}
                          type="button"
                          onClick={() => setSelectedSize(sz)}
                          className={`w-9 h-9 rounded-full text-[12px] font-semibold border transition-all cursor-pointer ${
                            active
                              ? "bg-[#7A1426] border-[#7A1426] text-white scale-105 shadow-md"
                              : "bg-white border-[#DDD5C9] text-[#44403C] hover:border-[#7A1426]"
                          }`}
                        >
                          {sz}
                        </button>
                      );
                    })}
                  </div>

                  {/* Primary Action Row */}
                  <div className="mt-4 flex items-center gap-2.5 w-full max-w-[270px]">
                    <button
                      type="button"
                      onClick={handleAddActiveToBag}
                      disabled={!selectedSize}
                      className={`flex-1 py-2.5 px-5 rounded-full text-[12px] font-bold tracking-[0.14em] uppercase transition-all flex items-center justify-center gap-2 ${
                        selectedSize
                          ? "bg-[#7A1426] hover:bg-[#91192E] text-white shadow-md cursor-pointer"
                          : "bg-[#D6D3D1] text-white cursor-not-allowed"
                      }`}
                    >
                      {selectedSize ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Add Size {selectedSize}</span>
                        </>
                      ) : (
                        <span>Select a Size</span>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        toggleWishlist({
                          id: activeItem.id,
                          brand: "NOOLAM",
                          category: "RACK PIECE",
                          name: activeItem.name,
                          price: activeItem.price,
                          image: activeItem.image,
                        })
                      }
                      aria-label={`Save ${activeItem.name}`}
                      className="w-10 h-10 rounded-full border border-[#DDD5C9] bg-white hover:border-[#7A1426] flex items-center justify-center cursor-pointer"
                    >
                      <Heart
                        className={`w-4 h-4 ${
                          isWishlisted(activeItem.id)
                            ? "fill-[#7A1426] text-[#7A1426]"
                            : "text-[#141110]"
                        }`}
                      />
                    </button>
                  </div>

                  {/* See Availability Link + Popover */}
                  <button
                    type="button"
                    onClick={() => setShowAvailability((s) => !s)}
                    className="mt-3 text-[11px] font-semibold tracking-[0.18em] text-[#44403C] hover:text-[#7A1426] underline underline-offset-4 uppercase cursor-pointer"
                  >
                    See Availability
                  </button>

                  <AnimatePresence>
                    {showAvailability && (
                      <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        className="mt-2.5 flex flex-wrap items-center justify-center gap-1.5"
                      >
                        {activeItem.availability.map((loc) => (
                          <span
                            key={loc}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#FAF6F0] border border-[#E5D7BF] text-[10px] font-medium text-[#57534E]"
                          >
                            <MapPin className="w-3 h-3 text-[#7A1426]" />
                            {loc}
                          </span>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom Subtle Captions */}
        <div className="mt-10 pt-5 border-t border-[#F3EEE6] flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] tracking-[0.22em] text-[#A8A29E] uppercase">
          <span>
            Explore the collection · {filteredItems.length} pieces
          </span>
          <span>AI-generated studio imagery · Demo collection</span>
        </div>
      </div>
    </section>
  );
}
