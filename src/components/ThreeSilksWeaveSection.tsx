"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, Sparkles, RotateCcw } from "lucide-react";
import { formatINR } from "@/data/catalog";
import { useStore } from "@/context/StoreContext";

interface SwatchSilk {
  id: string;
  name: string;
  price: number;
  primary: string;
  secondary: string;
  zari: string;
  image: string;
}

const WEAVE_SWATCHES: SwatchSilk[] = [
  {
    id: "sw-koorai",
    name: "Koorai Madras Checks",
    price: 21500,
    primary: "#B91C1C",
    secondary: "#D97706",
    zari: "#FDE68A",
    image: "/images/rack-checked-silk.jpg",
  },
  {
    id: "sw-cobalt",
    name: "Royal Cobalt Korvai",
    price: 28400,
    primary: "#1D4ED8",
    secondary: "#1E3A8A",
    zari: "#F6D57E",
    image: "/images/rack-gold-brocade.jpg",
  },
  {
    id: "sw-muga",
    name: "Muga Ivory Buta",
    price: 26800,
    primary: "#E7DFD3",
    secondary: "#C6B69C",
    zari: "#D4AF37",
    image: "/images/model-ivory.jpg",
  },
  {
    id: "sw-temple-gold",
    name: "Temple Gold Brocade",
    price: 32000,
    primary: "#CA8A04",
    secondary: "#92400E",
    zari: "#FEF08A",
    image: "/images/rack-gold-brocade.jpg",
  },
  {
    id: "sw-magenta",
    name: "Kanchi Rani Shot Silk",
    price: 32400,
    primary: "#BE185D",
    secondary: "#831843",
    zari: "#FCD34D",
    image: "/images/mood-kanchipuram.jpg",
  },
  {
    id: "sw-marigold",
    name: "Marigold Haldi Tissue",
    price: 24600,
    primary: "#EA580C",
    secondary: "#F59E0B",
    zari: "#FEF3C7",
    image: "/images/mood-festive.jpg",
  },
  {
    id: "sw-emerald",
    name: "Peacock Emerald Zari",
    price: 34500,
    primary: "#047857",
    secondary: "#064E3B",
    zari: "#F5D076",
    image: "/images/model-emerald.jpg",
  },
  {
    id: "sw-plum",
    name: "Varanasi Plum Kadwa",
    price: 36900,
    primary: "#6B21A8",
    secondary: "#4C1D95",
    zari: "#FDE047",
    image: "/images/mood-banarasi.jpg",
  },
  {
    id: "sw-sindoor",
    name: "Sindoor Bridal Pattu",
    price: 35600,
    primary: "#881337",
    secondary: "#9F1239",
    zari: "#F7CE68",
    image: "/images/mood-bridal.jpg",
  },
];

export default function ThreeSilksWeaveSection() {
  const [selected, setSelected] = useState<(SwatchSilk | null)[]>([
    WEAVE_SWATCHES[2],
    WEAVE_SWATCHES[4],
    WEAVE_SWATCHES[6],
  ]);
  const [hoveredSwatch, setHoveredSwatch] = useState<SwatchSilk | null>(null);
  const [wovenBanner, setWovenBanner] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { addBundleToBag } = useStore();

  const chosenList = selected.filter((s): s is SwatchSilk => s !== null);
  const rawTotal = chosenList.reduce((sum, s) => sum + s.price, 0);
  const hasFullBundle = chosenList.length === 3;
  const finalTotal = hasFullBundle ? Math.round(rawTotal * 0.9) : rawTotal;
  const savedAmount = rawTotal - finalTotal;

  const handlePickSwatch = (swatch: SwatchSilk) => {
    setWovenBanner(null);
    setSelected((prev) => {
      const emptyIdx = prev.findIndex((s) => s === null);
      if (emptyIdx !== -1) {
        const next = [...prev];
        next[emptyIdx] = swatch;
        return next;
      }
      // Cycle oldest out so user can keep experimenting seamlessly
      return [prev[1], prev[2], swatch];
    });
  };

  const removeSlot = (idx: number) => {
    setWovenBanner(null);
    setSelected((prev) => {
      const next = [...prev];
      next[idx] = null;
      return next;
    });
  };

  const resetWeave = () => {
    setSelected([null, null, null]);
    setWovenBanner(null);
  };

  const handleAddBundle = () => {
    if (!hasFullBundle) return;
    addBundleToBag(
      chosenList.map((s) => ({
        id: s.id,
        brand: "NOOLAM",
        category: "SEER VARISAI SILK",
        name: s.name,
        price: s.price,
        image: s.image,
      })),
      "Seer Varisai Trio"
    );
    setWovenBanner(
      `Woven and in your bag. You saved ${formatINR(savedAmount)}.`
    );
  };

  // Real-time 60fps 3D Sinusoidal Silk Braid Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId = 0;
    let phase = 0;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const render = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      if (
        canvas.width !== Math.floor(rect.width * dpr) ||
        canvas.height !== Math.floor(rect.height * dpr)
      ) {
        canvas.width = Math.floor(rect.width * dpr);
        canvas.height = Math.floor(rect.height * dpr);
      }

      const w = rect.width;
      const h = rect.height;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      const midY = h / 2;
      const amp = Math.min(h * 0.24, 48);
      const freq = (Math.PI * 2 * 2.4) / w;
      const step = 6;

      // Draw each segment in depth order so strands genuinely weave OVER & UNDER each other
      for (let x = 0; x <= w; x += step) {
        const strands = [0, 1, 2].map((i) => {
          const offset = (i * Math.PI * 2) / 3;
          const angle = x * freq - phase + offset;
          const y = midY + Math.sin(angle) * amp;
          const z = Math.cos(angle); // depth (-1 back, +1 front)
          return { i, y, z, silk: selected[i] };
        });

        strands.sort((a, b) => a.z - b.z);

        for (const s of strands) {
          const nextAngle = (x + step) * freq - phase + (s.i * Math.PI * 2) / 3;
          const nextY = midY + Math.sin(nextAngle) * amp;

          if (!s.silk) {
            // Delicate gossamer waiting loom thread
            ctx.beginPath();
            ctx.moveTo(x, s.y);
            ctx.lineTo(x + step + 0.5, nextY);
            ctx.strokeStyle = "rgba(120, 113, 108, 0.35)";
            ctx.lineWidth = 1.25;
            ctx.stroke();
          } else {
            // Lush 3D Silk Ribbon with depth-modulated thickness & zari sheen
            const depthScale = 0.72 + (s.z + 1) * 0.22; // 0.72..1.16
            const ribbonHeight = 24 * depthScale;

            // Soft drop shadow when strand passes over another
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(x, s.y - ribbonHeight / 2);
            ctx.lineTo(x + step + 1, nextY - ribbonHeight / 2);
            ctx.lineTo(x + step + 1, nextY + ribbonHeight / 2);
            ctx.lineTo(x, s.y + ribbonHeight / 2);
            ctx.closePath();

            const grad = ctx.createLinearGradient(
              x,
              s.y - ribbonHeight / 2,
              x,
              s.y + ribbonHeight / 2
            );
            const highlight = s.z > 0.2 ? 0.85 : 0.35;
            grad.addColorStop(0, s.silk.zari);
            grad.addColorStop(0.14, s.silk.primary);
            grad.addColorStop(0.45, s.silk.secondary);
            grad.addColorStop(0.62, s.silk.primary);
            grad.addColorStop(0.88, s.silk.zari);
            grad.addColorStop(1, s.silk.secondary);

            ctx.fillStyle = grad;
            ctx.globalAlpha = 0.8 + (s.z + 1) * 0.1;
            ctx.fill();

            // Specular Silk Sheen Highlight along the crest
            ctx.beginPath();
            ctx.moveTo(x, s.y - ribbonHeight * 0.12);
            ctx.lineTo(x + step + 1, nextY - ribbonHeight * 0.12);
            ctx.strokeStyle = `rgba(255, 248, 224, ${highlight * 0.48})`;
            ctx.lineWidth = 2.2 * depthScale;
            ctx.stroke();

            ctx.restore();
          }
        }
      }

      if (!prefersReduced) {
        phase += 0.018;
        animId = requestAnimationFrame(render);
      }
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [selected]);

  return (
    <section
      id="three-silks"
      className="relative bg-white py-20 sm:py-28 border-t border-[#F1ECE4] overflow-hidden"
    >
      <div className="max-w-[1380px] mx-auto px-6 sm:px-10 lg:px-14">
        {/* Top Row: Seer Varisai Label + Centered Title */}
        <div className="relative flex flex-col items-center text-center mb-6">
          <span className="sm:absolute sm:left-0 sm:top-0 text-[12px] font-medium tracking-[0.14em] text-[#78716C] mb-2 sm:mb-0">
            Seer Varisai
          </span>

          <p className="text-[11px] font-semibold tracking-[0.22em] text-[#8F6520] uppercase">
            Any three silks · 10% off
          </p>

          <AnimatePresence>
            {wovenBanner && (
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6 }}
                className="mt-2.5 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#292524] text-white text-[11px] font-medium shadow-md"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#E8C574]" />
                <span>{wovenBanner}</span>
              </motion.div>
            )}
          </AnimatePresence>

          <h2 className="mt-2 text-[36px] sm:text-[50px] lg:text-[58px] font-extrabold tracking-[-0.03em] leading-[1.06] text-[#141110]">
            Three silks,{" "}
            <span className="text-maroon-gold">one weave.</span>
          </h2>
        </div>
      </div>

      {/* Full-Bleed Animated 3-Strand Silk Braid Canvas */}
      <div className="relative w-full h-[185px] sm:h-[220px] my-4">
        <canvas
          ref={canvasRef}
          aria-label="Interactive three-strand Kanjivaram silk braid"
          className="w-full h-full block"
        />
      </div>

      {/* Bottom Interactive Loom Controls */}
      <div className="max-w-[1380px] mx-auto px-6 sm:px-10 lg:px-14 mt-4 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left: 3 Thread Slots */}
        <div className="lg:col-span-3 space-y-2 order-2 lg:order-1">
          {["I", "II", "III"].map((roman, idx) => {
            const silk = selected[idx];
            return (
              <div
                key={roman}
                className="flex items-center justify-between gap-2 py-2 px-3 rounded-xl bg-[#FAF8F5] border border-[#ECE6DC] text-[12px]"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="font-serif font-semibold text-[#8F6520] w-4">
                    {roman}
                  </span>
                  {silk ? (
                    <>
                      <span
                        className="w-3 h-3 rounded-full shrink-0 ring-1 ring-black/15"
                        style={{ backgroundColor: silk.primary }}
                      />
                      <span className="font-semibold text-[#141110] truncate">
                        {silk.name}
                      </span>
                    </>
                  ) : (
                    <span className="italic text-[#A8A29E]">
                      A thread, waiting
                    </span>
                  )}
                </div>

                {silk && (
                  <button
                    type="button"
                    onClick={() => removeSlot(idx)}
                    aria-label={`Unweave ${silk.name}`}
                    className="text-[#A8A29E] hover:text-[#7A1426] cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            );
          })}
          {chosenList.length > 0 && (
            <button
              type="button"
              onClick={resetWeave}
              className="inline-flex items-center gap-1.5 text-[11px] font-medium text-[#78716C] hover:text-[#7A1426] pt-1 cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Clear loom</span>
            </button>
          )}
        </div>

        {/* Center: Silk Swatch Orb Picker */}
        <div className="lg:col-span-6 flex flex-col items-center text-center order-1 lg:order-2">
          <p className="font-serif italic text-[18px] sm:text-[20px] text-[#44403C] mb-4 min-h-[28px]">
            {hoveredSwatch ? (
              <>
                <span className="not-italic font-sans font-semibold text-[#141110]">
                  {hoveredSwatch.name}
                </span>{" "}
                <span className="text-[13px] font-sans text-[#8F6520] ml-1.5">
                  {formatINR(hoveredSwatch.price)}
                </span>
              </>
            ) : (
              "Choose a silk to weave it in"
            )}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            {WEAVE_SWATCHES.map((sw) => {
              const isSelected = selected.some((s) => s?.id === sw.id);
              return (
                <motion.button
                  key={sw.id}
                  type="button"
                  data-cursor="WEAVE"
                  whileHover={{ scale: 1.18, y: -4 }}
                  whileTap={{ scale: 0.92 }}
                  onMouseEnter={() => setHoveredSwatch(sw)}
                  onMouseLeave={() => setHoveredSwatch(null)}
                  onClick={() => handlePickSwatch(sw)}
                  aria-label={`Weave ${sw.name} (${formatINR(sw.price)})`}
                  className={`relative w-11 h-11 sm:w-12 sm:h-12 rounded-full overflow-hidden shadow-md transition-all cursor-pointer ${
                    isSelected
                      ? "ring-2 ring-offset-2 ring-[#7A1426] scale-105"
                      : "ring-1 ring-black/15"
                  }`}
                  style={{
                    background: `conic-gradient(from 45deg, ${sw.primary}, ${sw.zari}, ${sw.secondary}, ${sw.primary})`,
                  }}
                >
                  {/* Glossy Silk Orb Highlight */}
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 rounded-full"
                    style={{
                      background:
                        "radial-gradient(circle at 32% 28%, rgba(255,255,255,0.55) 0%, transparent 55%)",
                    }}
                  />
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Right: Live Price & Bundle Add CTA */}
        <div className="lg:col-span-3 flex flex-col items-center lg:items-end text-center lg:text-right order-3">
          <div className="flex items-baseline gap-2">
            {hasFullBundle && (
              <span className="text-[13px] text-[#A8A29E] line-through">
                {formatINR(rawTotal)}
              </span>
            )}
            <span className="text-[28px] font-extrabold text-[#141110] tracking-tight">
              {formatINR(finalTotal)}
            </span>
          </div>
          <p className="text-[11px] text-[#78716C] mt-0.5">
            {hasFullBundle
              ? `10% Seer Varisai savings (${formatINR(savedAmount)} off)`
              : `Select ${3 - chosenList.length} more silk${
                  3 - chosenList.length === 1 ? "" : "s"
                } for 10% off`}
          </p>

          <motion.button
            type="button"
            whileHover={hasFullBundle ? { scale: 1.03 } : undefined}
            whileTap={hasFullBundle ? { scale: 0.97 } : undefined}
            disabled={!hasFullBundle}
            onClick={handleAddBundle}
            className={`mt-4 inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-[13px] font-semibold transition-all ${
              hasFullBundle
                ? "bg-gradient-to-r from-[#851529] to-[#6B0F1F] text-white shadow-[0_10px_24px_rgba(122,20,38,0.28)] cursor-pointer"
                : "bg-[#E7E2DA] text-[#A8A29E] cursor-not-allowed"
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Weave 3 into Bag</span>
          </motion.button>
        </div>
      </div>
    </section>
  );
}
