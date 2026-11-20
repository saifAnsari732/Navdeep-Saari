"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, type PanInfo } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Heart,
  Plus,
  ShoppingCart,
  Check,
} from "lucide-react";
import { STYLED_LOOKS, formatINR } from "@/data/catalog";
import { useStore } from "@/context/StoreContext";

export default function TryTheLookSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [justAddedId, setJustAddedId] = useState<string | null>(null);
  const { addToBag, addBundleToBag, toggleWishlist, isWishlisted } = useStore();

  const total = STYLED_LOOKS.length;
  const activeLook = STYLED_LOOKS[activeIndex];

  const bundleOriginal = activeLook.pieces.reduce((s, p) => s + p.price, 0);
  const bundleDiscounted = Math.round(bundleOriginal * 0.9);

  const goPrev = () => setActiveIndex((i) => (i - 1 + total) % total);
  const goNext = () => setActiveIndex((i) => (i + 1) % total);

  const handleDragEnd = (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    if (info.offset.x < -55) goNext();
    else if (info.offset.x > 55) goPrev();
  };

  const handleAddPiece = (piece: (typeof activeLook.pieces)[number]) => {
    addToBag(piece);
    setJustAddedId(piece.id);
    setTimeout(() => setJustAddedId(null), 900);
  };

  return (
    <section
      id="try-the-look"
      className="relative bg-white pt-20 pb-28 sm:pt-24 sm:pb-32 px-6 sm:px-10 lg:px-14 border-t border-[#F1ECE4] overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-6 items-center">
        {/* Left & Center Stage (8 cols) */}
        <div className="lg:col-span-8 flex flex-col">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-2.5">
              <span className="w-7 h-[1.5px] bg-[#C6943B]" />
              <span className="text-[11px] font-semibold tracking-[0.26em] text-[#6B635E] uppercase">
                Styled Head to Toe
              </span>
            </div>
            <h2 className="text-[40px] sm:text-[54px] lg:text-[64px] font-extrabold tracking-[-0.03em] leading-[1.02] text-[#141110]">
              Try the <span className="text-[#7A1426]">Look.</span>
            </h2>
            <p className="mt-2.5 text-[14px] sm:text-[16px] text-[#6B635E]">
              {total} curated Kanjivaram looks, styled head to toe. Drag or tap a
              look to explore every piece.
            </p>
          </div>

          {/* Interactive Drag/Scroll Stage */}
          <motion.div
            data-cursor="DRAG"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.18}
            onDragEnd={handleDragEnd}
            className="relative h-[430px] sm:h-[520px] w-full flex items-center justify-center cursor-grab active:cursor-grabbing select-none overflow-hidden"
          >
            {STYLED_LOOKS.map((look, idx) => {
              let offset = idx - activeIndex;
              if (offset > total / 2) offset -= total;
              if (offset < -total / 2) offset += total;

              const absOffset = Math.abs(offset);
              const isCenter = offset === 0;
              const isVisible = absOffset <= 2;

              const translateX = offset * 215;
              const scale = isCenter ? 1 : absOffset === 1 ? 0.78 : 0.6;
              const opacity = isCenter ? 1 : absOffset === 1 ? 0.85 : 0.4;
              const blurPx = isCenter ? 0 : absOffset === 1 ? 1.5 : 4.5;
              const zIndex = 30 - absOffset * 10;

              return (
                <motion.button
                  key={look.id}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  aria-label={`View ${look.shortName} look`}
                  animate={{
                    x: translateX,
                    scale,
                    opacity: isVisible ? opacity : 0,
                    filter: `blur(${blurPx}px)`,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 240,
                    damping: 28,
                  }}
                  style={{ zIndex }}
                  className={`absolute w-[220px] sm:w-[260px] h-[390px] sm:h-[470px] bg-transparent focus-visible:outline-none ${
                    isCenter
                      ? "cursor-default"
                      : "cursor-pointer hover:opacity-95"
                  }`}
                >
                  <Image
                    src={look.modelImage}
                    alt={`${look.shortName} full Kanjivaram styled look`}
                    fill
                    sizes="(max-width: 640px) 240px, 280px"
                    style={{ filter: look.modelFilter ?? "none" }}
                    className="object-contain object-bottom pointer-events-none drop-shadow-[0_18px_24px_rgba(20,17,16,0.16)]"
                  />
                  {/* Soft floor grounding shadow */}
                  {isCenter && (
                    <div
                      aria-hidden="true"
                      className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-32 h-3.5 bg-black/14 blur-md rounded-full"
                    />
                  )}
                </motion.button>
              );
            })}
          </motion.div>

          {/* Bottom Stage Controls Bar */}
          <div className="mt-4 flex items-center justify-between gap-4 border-t border-[#EFEAE2] pt-4">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={goPrev}
                aria-label="Previous look"
                className="w-9 h-9 rounded-full border border-[#E5DDD2] hover:border-[#7A1426] hover:text-[#7A1426] flex items-center justify-center transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <div className="flex flex-col">
                <span className="text-[12px] font-semibold text-[#1C1917] tracking-wide">
                  {activeIndex + 1} of {total} ·{" "}
                  <span className="text-[#7A1426]">{activeLook.shortName}</span>
                </span>
                {/* Animated Progress Track */}
                <div className="w-36 h-[2px] bg-[#ECE6DC] mt-1.5 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-[#7A1426]"
                    animate={{
                      width: `${((activeIndex + 1) / total) * 100}%`,
                    }}
                    transition={{ type: "spring", stiffness: 280, damping: 30 }}
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="hidden sm:inline-flex items-center gap-1.5 text-[12px] text-[#78716C]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C6943B]" />
                Scroll or drag
              </span>
              <button
                type="button"
                onClick={goNext}
                aria-label="Next look"
                className="w-9 h-9 rounded-full border border-[#E5DDD2] hover:border-[#7A1426] hover:text-[#7A1426] flex items-center justify-center transition-colors cursor-pointer"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Panel: "In this look" (4 cols) */}
        <div className="lg:col-span-4 bg-[#FCFBF9] border border-[#ECE6DC] rounded-3xl p-5 sm:p-6 shadow-[0_12px_36px_rgba(20,17,16,0.04)]">
          <div className="flex items-center justify-between pb-3.5 border-b border-[#ECE6DC]">
            <h3 className="text-[14px] font-semibold tracking-wide text-[#141110]">
              In this look
            </h3>
            <span className="text-[11px] font-medium tracking-[0.16em] uppercase text-[#C6943B]">
              6 Pieces
            </span>
          </div>

          <AnimatePresence mode="wait">
            <motion.ul
              key={activeLook.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.28 }}
              className="divide-y divide-[#F0EAE0] my-1"
            >
              {activeLook.pieces.map((piece, i) => {
                const liked = isWishlisted(piece.id);
                const added = justAddedId === piece.id;
                return (
                  <li
                    key={piece.id}
                    className="py-3 flex items-center justify-between gap-3 group"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-white border border-[#EDE7DD] shrink-0">
                        <Image
                          src={piece.image}
                          alt={piece.name}
                          fill
                          sizes="48px"
                          className="object-cover"
                        />
                        <span className="absolute top-0.5 right-1 text-[9px] font-bold text-[#78716C] bg-white/85 px-1 rounded">
                          {i + 1}
                        </span>
                      </div>
                      <div className="min-w-0">
                        <p className="text-[10px] font-semibold tracking-[0.16em] text-[#8C8279] uppercase">
                          {piece.brand} · {piece.category}
                        </p>
                        <p className="text-[13px] font-semibold text-[#141110] truncate">
                          {piece.name}
                        </p>
                        <p className="text-[12px] font-medium text-[#57534E]">
                          {formatINR(piece.price)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        type="button"
                        onClick={() => toggleWishlist(piece)}
                        aria-label={`Save ${piece.name} to wishlist`}
                        className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
                          liked
                            ? "text-[#7A1426] bg-[#7A1426]/10"
                            : "text-[#78716C] hover:text-[#7A1426] hover:bg-[#F5EFE7]"
                        }`}
                      >
                        <Heart
                          className={`w-4 h-4 ${liked ? "fill-current" : ""}`}
                        />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleAddPiece(piece)}
                        aria-label={`Add ${piece.name} to bag`}
                        className={`w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                          added
                            ? "bg-emerald-600 text-white scale-105"
                            : "text-[#141110] hover:bg-[#141110] hover:text-white"
                        }`}
                      >
                        {added ? (
                          <Check className="w-4 h-4" />
                        ) : (
                          <Plus className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </li>
                );
              })}
            </motion.ul>
          </AnimatePresence>

          {/* Bundle Pricing Footer */}
          <div className="mt-4 pt-4 border-t border-[#E6DFD3]">
            <div className="flex items-end justify-between mb-4">
              <div>
                <p className="text-[13px] font-bold text-[#141110]">
                  Complete the look
                </p>
                <p className="text-[11px] text-[#78716C]">
                  Bundle all 6 pieces · save 10%
                </p>
              </div>
              <div className="text-right">
                <span className="text-[12px] text-[#A8A29E] line-through mr-2">
                  {formatINR(bundleOriginal)}
                </span>
                <span className="text-[18px] font-extrabold text-[#141110]">
                  {formatINR(bundleDiscounted)}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <motion.button
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() =>
                  addBundleToBag(activeLook.pieces, activeLook.shortName)
                }
                className="flex-1 flex items-center justify-between pl-5 pr-2 py-2 rounded-full bg-gradient-to-r from-[#851529] to-[#6B0F1F] hover:from-[#9A1A31] hover:to-[#7D1325] text-white text-[13px] font-semibold shadow-[0_10px_24px_rgba(122,20,38,0.28)] cursor-pointer"
              >
                <span>Add full look to bag</span>
                <span className="w-8 h-8 rounded-full bg-white text-[#7A1426] flex items-center justify-center">
                  <ShoppingCart className="w-4 h-4" />
                </span>
              </motion.button>

              <button
                type="button"
                onClick={() => toggleWishlist(activeLook.pieces[0])}
                aria-label="Wishlist full look"
                className="w-11 h-11 rounded-full border border-[#E5DDD2] bg-white hover:border-[#7A1426] text-[#141110] hover:text-[#7A1426] flex items-center justify-center transition-colors cursor-pointer shrink-0"
              >
                <Heart
                  className={`w-4 h-4 ${
                    isWishlisted(activeLook.pieces[0].id)
                      ? "fill-[#7A1426] text-[#7A1426]"
                      : ""
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
