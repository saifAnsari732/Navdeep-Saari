"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { SIX_MOODS } from "@/data/catalog";

/* Authentic Gopuram Temple Arch SVG Clip + Gold Border + Finial */
const ARCH_PATH =
  "M 100 18 C 94 40 74 52 48 66 C 24 79 14 102 14 134 L 14 148 L 6 148 L 6 294 L 194 294 L 194 148 L 186 148 L 186 134 C 186 102 176 79 152 66 C 126 52 106 40 100 18 Z";

export default function SixMoodsSection() {
  const handleScrollTo = (anchor: string) => {
    const id = anchor.replace("#", "");
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="six-moods"
      className="relative z-20 bg-white pb-20 sm:pb-28 overflow-hidden"
    >
      {/* Wavy Crimson-Maroon & Gold Silk Heritage Ribbon along Top Edge (matches w_17.jpg & w_18.jpg) */}
      <div className="relative w-full bg-gradient-to-r from-[#690D1D] via-[#88142A] to-[#690D1D] border-y-2 border-[#E8C574]/60 shadow-[0_-10px_28px_rgba(0,0,0,0.28)] overflow-hidden select-none mb-16 sm:mb-20">
        <div className="animate-marquee py-3 flex items-center gap-10 text-[11px] sm:text-[12px] font-bold tracking-[0.3em] text-[#F9E7BE] uppercase">
          {[
            "NAVDEEP",
            "PURE ZARI",
            "HANDWOVEN",
            "TEMPLE BORDERS",
            "BRIDAL SILK",
            "KANCHIPURAM",
            "NAVDEEP",
            "PURE ZARI",
            "HANDWOVEN",
            "TEMPLE BORDERS",
            "BRIDAL SILK",
            "KANCHIPURAM",
          ].map((word, i) => (
            <span key={i} className="whitespace-nowrap flex items-center gap-10">
              <span>{word}</span>
              <span className="text-[#E8C574] text-[10px]" aria-hidden="true">
                ♦
              </span>
            </span>
          ))}
        </div>
      </div>

      <div className="max-w-[1360px] mx-auto px-6 sm:px-10 lg:px-14">
        {/* Top Header Row */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="w-7 h-[1.5px] bg-[#C6943B]" />
              <span className="text-[11px] font-semibold tracking-[0.26em] text-[#6B635E] uppercase">
                The NAVDEEP Archive
              </span>
            </div>
            <h2 className="text-[36px] sm:text-[48px] lg:text-[56px] font-extrabold tracking-[-0.03em] leading-[1.06] text-[#141110]">
              Six Moods.{" "}
              <span className="text-maroon-gold">Timeless Drapes</span>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, delay: 0.12 }}
            className="text-[14px] sm:text-[15px] leading-[1.65] text-[#6B635E] lg:text-right max-w-[290px]"
          >
            Woven by hand, worn for a lifetime. Six silk stories, from quiet
            mornings to festive evenings.
          </motion.p>
        </div>

        {/* Six Gopuram Temple Arch Windows */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5 sm:gap-6">
          {SIX_MOODS.map((mood, idx) => {
            const clipId = `gopuram-clip-${mood.id}`;
            const gradId = `gopuram-gold-${mood.id}`;
            return (
              <motion.button
                key={mood.id}
                type="button"
                onClick={() => handleScrollTo(mood.anchor)}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{
                  duration: 0.65,
                  delay: idx * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ y: -10 }}
                className="group flex flex-col items-center text-center cursor-pointer focus-visible:outline-none"
              >
                {/* Arch Frame Container */}
                <div className="relative w-full aspect-[200/300] transition-all duration-500 group-hover:drop-shadow-[0_20px_34px_rgba(198,148,59,0.32)]">
                  {/* Soft Golden Aura Behind Arch on Hover */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-4 rounded-t-full bg-gradient-to-b from-[#E8C574]/0 via-[#C6943B]/0 to-[#7A1426]/0 group-hover:from-[#E8C574]/30 group-hover:via-[#C6943B]/18 group-hover:to-transparent blur-xl transition-all duration-500 -z-10"
                  />

                  <svg
                    viewBox="0 0 200 300"
                    className="w-full h-full overflow-visible"
                    aria-hidden="true"
                  >
                    <defs>
                      <clipPath id={clipId}>
                        <path d={ARCH_PATH} />
                      </clipPath>
                      <linearGradient
                        id={gradId}
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                      >
                        <stop offset="0%" stopColor="#E9C77B" />
                        <stop offset="50%" stopColor="#B8832E" />
                        <stop offset="100%" stopColor="#E4BF6B" />
                      </linearGradient>
                    </defs>

                    {/* Temple Kalash Finial at Apex */}
                    <g
                      fill={`url(#${gradId})`}
                      className="transition-transform duration-500 origin-[100px_18px] group-hover:scale-110"
                    >
                      <circle cx="100" cy="4" r="2.2" />
                      <path d="M 97.5 8 L 102.5 8 L 100 4.5 Z" />
                      <ellipse cx="100" cy="11.5" rx="3.4" ry="2.2" />
                      <rect x="96" y="14.5" width="8" height="2" rx="1" />
                    </g>

                    {/* Clipped Editorial Saree Photo */}
                    <g clipPath={`url(#${clipId})`}>
                      <foreignObject x="0" y="16" width="200" height="284">
                        <div className="relative w-full h-full overflow-hidden bg-[#F5F0E8]">
                          <Image
                            src={mood.image}
                            alt={`${mood.title} — ${mood.subtitle}`}
                            fill
                            sizes="(max-width: 640px) 48vw, (max-width: 1024px) 30vw, 16vw"
                            className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-60 group-hover:opacity-20 transition-opacity duration-500" />
                        </div>
                      </foreignObject>
                    </g>

                    {/* Golden Architectural Arch Stroke */}
                    <path
                      d={ARCH_PATH}
                      fill="none"
                      stroke={`url(#${gradId})`}
                      strokeWidth="2.4"
                      className="transition-all duration-300 group-hover:stroke-[3.2]"
                    />
                  </svg>
                </div>

                {/* Spaced Capitals Mood Label */}
                <span className="mt-4 text-[11px] sm:text-[12px] font-bold tracking-[0.2em] text-[#1C1917] group-hover:text-[#7A1426] transition-colors uppercase">
                  {mood.title}
                </span>
                <span className="mt-1 text-[11px] text-[#78716C] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {mood.subtitle}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
