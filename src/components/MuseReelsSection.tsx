"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  X,
  ShoppingBag,
  Volume2,
  VolumeX,
} from "lucide-react";
import { MUSE_REELS, formatINR, type MuseReel } from "@/data/catalog";
import { useStore } from "@/context/StoreContext";

export default function MuseReelsSection() {
  const [activeIndex, setActiveIndex] = useState(3); // Center on REEL 04 Pachai Pattu like reference
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [lightboxReel, setLightboxReel] = useState<MuseReel | null>(null);
  const [muted, setMuted] = useState(false);

  const { addToBag } = useStore();
  const total = MUSE_REELS.length;

  useEffect(() => {
    if (!isPlaying || lightboxReel) return;
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          setActiveIndex((idx) => (idx + 1) % total);
          return 0;
        }
        return p + 1.8;
      });
    }, 100);
    return () => clearInterval(interval);
  }, [isPlaying, lightboxReel, total]);

  const goPrev = () => {
    setProgress(0);
    setActiveIndex((i) => (i - 1 + total) % total);
  };

  const goNext = () => {
    setProgress(0);
    setActiveIndex((i) => (i + 1) % total);
  };

  return (
    <section
      id="muse-reels"
      className="relative bg-white py-20 sm:py-28 px-6 sm:px-10 lg:px-14 border-t border-[#F1ECE4] overflow-hidden"
    >
      <div className="max-w-[1380px] mx-auto">
        {/* Header Row */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div>
            <div className="flex items-center gap-3 mb-2.5">
              <span className="w-7 h-[1.5px] bg-[#C6943B]" />
              <span className="text-[11px] font-semibold tracking-[0.26em] text-[#6B635E] uppercase">
                The Muse Reels
              </span>
            </div>
            <h2 className="text-[40px] sm:text-[54px] lg:text-[62px] font-extrabold tracking-[-0.03em] leading-[1.04] text-[#141110]">
              Silk, <span className="text-gold-maroon">in motion.</span>
            </h2>
          </div>

          <div className="flex flex-col sm:items-end gap-4">
            <p className="text-[14px] text-[#6B635E] sm:text-right max-w-[360px] leading-relaxed">
              Five drapes filmed the way they are lived in — lamp rooms, temple
              lanes, a morning by the sea. Tap the centre reel to watch it full
              screen, with sound.
            </p>

            {/* Top-Right Prev / Pause / Next Controls */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={goPrev}
                aria-label="Previous reel"
                className="w-10 h-10 rounded-full border border-[#E4DDD2] hover:border-[#7A1426] text-[#141110] hover:text-[#7A1426] flex items-center justify-center transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setIsPlaying((p) => !p)}
                aria-label={isPlaying ? "Pause reels" : "Play reels"}
                className="w-10 h-10 rounded-full bg-[#1C120E] text-white hover:bg-[#7A1426] flex items-center justify-center transition-colors cursor-pointer"
              >
                {isPlaying ? (
                  <Pause className="w-4 h-4" />
                ) : (
                  <Play className="w-4 h-4 ml-0.5" />
                )}
              </button>
              <button
                type="button"
                onClick={goNext}
                aria-label="Next reel"
                className="w-10 h-10 rounded-full border border-[#E4DDD2] hover:border-[#7A1426] text-[#141110] hover:text-[#7A1426] flex items-center justify-center transition-colors cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* 3D Curved Arc Stage */}
        <div
          className="relative h-[430px] sm:h-[490px] w-full flex items-center justify-center select-none"
          style={{ perspective: 1300 }}
        >
          {MUSE_REELS.map((reel, idx) => {
            let offset = idx - activeIndex;
            if (offset > total / 2) offset -= total;
            if (offset < -total / 2) offset += total;

            const abs = Math.abs(offset);
            const isCenter = offset === 0;

            const translateX = offset * 245;
            const translateZ = -abs * abs * 72;
            const rotateY = offset * -18;
            const scale = isCenter ? 1.06 : abs === 1 ? 0.92 : 0.78;
            const opacity = isCenter ? 1 : abs === 1 ? 0.92 : 0.72;
            const zIndex = 30 - abs * 8;

            return (
              <motion.button
                key={reel.id}
                type="button"
                data-cursor={isCenter ? "WATCH" : "NEXT"}
                onClick={() => {
                  if (isCenter) {
                    setLightboxReel(reel);
                  } else {
                    setProgress(0);
                    setActiveIndex(idx);
                  }
                }}
                aria-label={
                  isCenter
                    ? `Open ${reel.title} full screen`
                    : `Focus ${reel.title}`
                }
                animate={{
                  x: translateX,
                  z: translateZ,
                  rotateY,
                  scale,
                  opacity,
                }}
                transition={{
                  type: "spring",
                  stiffness: 210,
                  damping: 26,
                }}
                style={{
                  zIndex,
                  transformStyle: "preserve-3d",
                }}
                className="absolute w-[210px] sm:w-[245px] h-[365px] sm:h-[420px] rounded-[24px] overflow-hidden shadow-[0_24px_50px_rgba(20,17,16,0.24)] cursor-pointer text-left group focus-visible:outline-none bg-[#1B1210]"
              >
                <Image
                  src={reel.image}
                  alt={`${reel.title} — ${reel.location}`}
                  fill
                  sizes="260px"
                  className={`object-cover transition-transform duration-700 ${
                    isCenter && isPlaying ? "scale-105" : "scale-100"
                  }`}
                />

                {/* Editorial Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/18 to-black/40" />

                {/* Top Reel Number & Duration */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-[11px] font-semibold text-white/95 tracking-[0.14em]">
                  <span className="inline-flex items-center gap-1.5">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        isCenter ? "bg-rose-500 animate-pulse" : "bg-[#E8C574]"
                      }`}
                    />
                    {reel.number}
                  </span>
                  <span className="text-white/80">{reel.duration}</span>
                </div>

                {/* Center Play Button */}
                {isCenter && (
                  <motion.div
                    initial={{ scale: 0.7, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <span className="w-14 h-14 rounded-full bg-white/90 group-hover:bg-white text-[#141110] flex items-center justify-center shadow-xl transition-transform group-hover:scale-110">
                      <Play className="w-5 h-5 fill-current ml-0.5" />
                    </span>
                  </motion.div>
                )}

                {/* Bottom Metadata + Gold Progress Bar */}
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-[10px] font-bold tracking-[0.2em] text-[#E8C574] uppercase">
                    {reel.fabric}
                  </p>
                  <h3 className="mt-0.5 text-[20px] font-bold text-white leading-tight">
                    {reel.title}
                  </h3>
                  <p className="text-[12px] text-white/75 mt-0.5">
                    {reel.location}
                  </p>

                  {/* Gold Progress Bar on Center Reel */}
                  <div className="mt-3 w-full h-[3px] rounded-full bg-white/25 overflow-hidden">
                    <div
                      className="h-full bg-[#E8C574] transition-[width] duration-100 ease-linear"
                      style={{ width: isCenter ? `${progress}%` : "0%" }}
                    />
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Fullscreen Stories-Style Reel Lightbox with Flanking Side Previews */}
      <AnimatePresence>
        {lightboxReel && (() => {
          const lbIdx = MUSE_REELS.findIndex((r) => r.id === lightboxReel.id);
          const prevReel = MUSE_REELS[(lbIdx - 1 + total) % total];
          const nextReel = MUSE_REELS[(lbIdx + 1) % total];
          return (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setLightboxReel(null)}
              className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4 sm:p-8 backdrop-blur-xl"
              style={{
                background:
                  "radial-gradient(ellipse at 50% 45%, rgba(68,14,26,0.92) 0%, rgba(16,6,9,0.96) 75%)",
              }}
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className="flex items-center justify-center gap-6 lg:gap-12 w-full max-w-[1040px]"
              >
                {/* Left Flanking Previous Reel Preview */}
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.05, opacity: 0.95 }}
                  onClick={() => setLightboxReel(prevReel)}
                  aria-label={`Skip to previous reel ${prevReel.title}`}
                  className="hidden md:block relative w-[165px] lg:w-[190px] aspect-[9/14] rounded-2xl overflow-hidden opacity-60 hover:opacity-95 transition-opacity shadow-xl border border-white/15 cursor-pointer shrink-0"
                >
                  <Image
                    src={prevReel.image}
                    alt={prevReel.title}
                    fill
                    sizes="190px"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />
                  <span className="absolute bottom-3 left-3 right-3 text-left text-[12px] font-semibold text-white truncate">
                    {prevReel.title}
                  </span>
                </motion.button>

                {/* Center Active Vertical Story Reel */}
                <motion.div
                  key={lightboxReel.id}
                  initial={{ scale: 0.92, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.92, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 280, damping: 26 }}
                  className="relative w-full max-w-[390px] aspect-[9/15.5] rounded-[28px] overflow-hidden bg-[#140C0A] border border-[#E8C574]/35 shadow-[0_32px_90px_rgba(0,0,0,0.65)] shrink-0"
                >
                  <Image
                    src={lightboxReel.image}
                    alt={lightboxReel.title}
                    fill
                    sizes="400px"
                    className="object-cover animate-ken-burns"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/92 via-black/15 to-black/50" />

                  {/* Story Progress Segments */}
                  <div className="absolute top-3 left-3.5 right-3.5 flex gap-1.5 z-20">
                    {MUSE_REELS.map((r, i) => (
                      <div
                        key={r.id}
                        className="h-[2.5px] flex-1 rounded-full bg-white/25 overflow-hidden"
                      >
                        <div
                          className="h-full bg-[#E8C574]"
                          style={{
                            width:
                              i < lbIdx ? "100%" : i === lbIdx ? "68%" : "0%",
                          }}
                        />
                      </div>
                    ))}
                  </div>

                  {/* Top @noolam Header + Mute / Close */}
                  <div className="absolute top-6 left-4 right-4 flex items-center justify-between z-20">
                    <div className="flex items-center gap-2.5">
                      <span className="w-8 h-8 rounded-full bg-[#E8C574] text-[#1C0C08] font-serif font-bold text-sm flex items-center justify-center shadow">
                        N
                      </span>
                      <div className="text-left leading-tight">
                        <p className="text-[12px] font-bold text-white">
                          navdeep
                        </p>
                        <p className="text-[10px] text-white/75">
                          {lightboxReel.location}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => setMuted((m) => !m)}
                        aria-label={muted ? "Unmute" : "Mute"}
                        className="w-8 h-8 rounded-full bg-black/45 hover:bg-black/70 text-white flex items-center justify-center cursor-pointer"
                      >
                        {muted ? (
                          <VolumeX className="w-3.5 h-3.5" />
                        ) : (
                          <Volume2 className="w-3.5 h-3.5 text-[#E8C574]" />
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={() => setLightboxReel(null)}
                        aria-label="Close reel"
                        className="w-8 h-8 rounded-full bg-black/45 hover:bg-black/70 text-white flex items-center justify-center cursor-pointer"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Bottom Story Details + Add to Bag Row */}
                  <div className="absolute bottom-5 left-5 right-5 text-white z-20">
                    <p className="text-[10px] font-bold tracking-[0.22em] text-[#E8C574] uppercase">
                      {lightboxReel.fabric}
                    </p>
                    <h3 className="text-[26px] font-extrabold leading-tight mt-0.5">
                      {lightboxReel.title}
                    </h3>
                    <p className="text-[12px] text-white/80 mt-1 leading-relaxed">
                      {lightboxReel.story}
                    </p>

                    <div className="mt-4 pt-3 border-t border-white/15 flex items-center justify-between gap-2">
                      <span className="text-[15px] font-extrabold text-white">
                        {formatINR(lightboxReel.featuredPrice)}
                      </span>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            addToBag({
                              id: lightboxReel.id,
                              brand: "NAVDEEP",
                              category: lightboxReel.fabric,
                              name: lightboxReel.title,
                              price: lightboxReel.featuredPrice,
                              image: lightboxReel.image,
                            });
                            setLightboxReel(null);
                          }}
                          className="px-4 py-2 rounded-full bg-[#8B162B] hover:bg-[#A61B34] border border-[#E8C574]/40 text-white text-[12px] font-semibold flex items-center gap-1.5 cursor-pointer"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>Add to bag</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setLightboxReel(nextReel)}
                          className="text-[11px] font-medium text-white/80 hover:text-[#E8C574] underline underline-offset-4 cursor-pointer pl-1"
                        >
                          More drapes
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Right Flanking Next Reel Preview */}
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.05, opacity: 0.95 }}
                  onClick={() => setLightboxReel(nextReel)}
                  aria-label={`Skip to next reel ${nextReel.title}`}
                  className="hidden md:block relative w-[165px] lg:w-[190px] aspect-[9/14] rounded-2xl overflow-hidden opacity-60 hover:opacity-95 transition-opacity shadow-xl border border-white/15 cursor-pointer shrink-0"
                >
                  <Image
                    src={nextReel.image}
                    alt={nextReel.title}
                    fill
                    sizes="190px"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />
                  <span className="absolute bottom-3 left-3 right-3 text-left text-[12px] font-semibold text-white truncate">
                    {nextReel.title}
                  </span>
                </motion.button>
              </div>

              <p className="mt-4 text-[11px] tracking-[0.14em] text-white/55">
                Tap sides to skip · click outside to close
              </p>
            </motion.div>
          );
        })()}
      </AnimatePresence>
    </section>
  );
}
