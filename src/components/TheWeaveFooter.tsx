"use client";

import React from "react";
import { motion } from "framer-motion";
import { Award, Sparkles, ShieldCheck, MapPin, ArrowUpRight, Clock } from "lucide-react";
import { useStore } from "@/context/StoreContext";

const CRAFT_PILLARS = [
  {
    icon: Sparkles,
    label: "01 · THREE-PLY MULBERRY",
    title: "Twisted for a lifetime of drape",
    desc: "Every NAVDEEP saree is woven from triple-twisted pure mulberry silk yarn, giving our Kanjivarams their unmistakable weight, lustre, and generational heirloom strength.",
  },
  {
    icon: Award,
    label: "02 · PURE SILVER-CORE ZARI",
    title: "Dipped in 24k temple gold",
    desc: "We weave exclusively with real silver-thread zari electroplated in pure gold—never plastic or tested copper—so the pallu glows richer with every decade.",
  },
  {
    icon: ShieldCheck,
    label: "03 · THREE-SHUTTLE KORVAI",
    title: "Two weavers, one sacred seam",
    desc: "Authentic Korvai borders require two master weavers working in rhythm at the pit loom, interlocking contrasting body and border hues by hand.",
  },
];

export default function TheWeaveFooter() {
  const { setStoreModalOpen } = useStore();

  return (
    <footer id="the-weave" className="bg-white border-t border-[#F1ECE4]">
      {/* The Weave Craftsmanship Strip */}
      <div className="max-w-[1360px] mx-auto px-6 sm:px-10 lg:px-14 py-20 sm:py-24">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
          <div>
            <div className="flex items-center gap-3 mb-2.5">
              <span className="w-7 h-[1.5px] bg-[#C6943B]" />
              <span className="text-[11px] font-semibold tracking-[0.26em] text-[#6B635E] uppercase">
                The Weave · Kanchipuram Provenance
              </span>
            </div>
            <h2 className="text-[36px] sm:text-[48px] font-extrabold tracking-[-0.03em] leading-[1.06] text-[#141110]">
              Handwoven in Kanchipuram,{" "}
              <span className="text-maroon-gold">one saree at a time.</span>
            </h2>
          </div>

          <button
            type="button"
            onClick={() => setStoreModalOpen(true)}
            className="self-start lg:self-auto inline-flex items-center gap-3 pl-5 pr-2 py-2 rounded-full border border-[#DFC48F] bg-[#FAF6F0] hover:bg-[#7A1426] hover:text-white hover:border-[#7A1426] text-[#141110] text-[13px] font-semibold transition-all cursor-pointer group"
          >
            <span>Book a Private Bridal Viewing</span>
            <span className="w-7 h-7 rounded-full bg-[#7A1426] group-hover:bg-white text-white group-hover:text-[#7A1426] flex items-center justify-center transition-colors">
              <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CRAFT_PILLARS.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="rounded-3xl bg-[#FCFBF9] border border-[#ECE6DC] p-7 hover:border-[#DFC48F] hover:shadow-[0_16px_38px_rgba(198,148,59,0.1)] transition-all"
              >
                <div className="w-11 h-11 rounded-2xl bg-[#7A1426]/8 text-[#7A1426] flex items-center justify-center mb-5">
                  <Icon className="w-5 h-5" />
                </div>
                <p className="text-[10px] font-bold tracking-[0.22em] text-[#8F6520] uppercase">
                  {pillar.label}
                </p>
                <h3 className="mt-2 text-[20px] font-bold text-[#141110] leading-snug">
                  {pillar.title}
                </h3>
                <p className="mt-2.5 text-[14px] leading-relaxed text-[#57534E]">
                  {pillar.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Heritage Deep Maroon Showroom Footer */}
      <div className="bg-[#1B090C] text-[#F5ECE0] pt-16 pb-24 px-6 sm:px-10 lg:px-14">
        <div className="max-w-[1360px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          <div className="md:col-span-5">
            <div className="flex items-center gap-3">
              <span className="w-11 h-11 rounded-full bg-gradient-to-br from-[#8F152A] via-[#5A0917] to-[#2B040B] border border-[#E8C574]/80 shadow-[0_4px_16px_rgba(232,197,116,0.28)] flex items-center justify-center">
                <svg
                  width="24"
                  height="24"
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
                <p className="font-serif text-[28px] tracking-[0.24em] text-white font-semibold uppercase leading-none">
                  NAVDEEP
                </p>
                <p className="text-[10px] tracking-[0.34em] text-[#E8C574] uppercase mt-1">
                  Kanchipuram Silk · Est. 1968
                </p>
              </div>
            </div>
            <p className="mt-5 text-[14px] leading-relaxed text-[#E7DDD2]/75 max-w-md">
              A sanctuary for handloom Kanjivaram silks woven directly with
              fifth-generation master weavers in Kanchipuram. Every drape carries
              the Silk Mark of India certification.
            </p>
          </div>

          <div className="md:col-span-3 space-y-2.5 text-[13px]">
            <p className="text-[11px] font-bold tracking-[0.22em] text-[#E8C574] uppercase mb-3">
              Explore
            </p>
            {[
              { label: "Six Moods Archive", href: "#six-moods" },
              { label: "Try the Look", href: "#try-the-look" },
              { label: "Pick a Silk", href: "#pick-a-silk" },
              { label: "The Rack", href: "#the-rack" },
              { label: "The Muse Film & Reels", href: "#the-muse" },
              { label: "The Bridal Collection", href: "#bridal" },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="block text-[#E7DDD2]/80 hover:text-[#E8C574] transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="md:col-span-4 space-y-3 text-[13px]">
            <p className="text-[11px] font-bold tracking-[0.22em] text-[#E8C574] uppercase mb-3">
              Flagship Sanctuaries
            </p>
            <div className="flex items-start gap-2.5 text-[#E7DDD2]/85">
              <MapPin className="w-4 h-4 text-[#E8C574] shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-white">Kanchipuram Loom House</p>
                <p className="text-[#E7DDD2]/70">
                  48 Gandhi Road, Pillaiyarpalayam, Kanchipuram 631501
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2.5 text-[#E7DDD2]/85">
              <MapPin className="w-4 h-4 text-[#E8C574] shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-white">Chennai Alwarpet Salon</p>
                <p className="text-[#E7DDD2]/70">
                  14 Poes Garden Road, Alwarpet, Chennai 600086
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2.5 text-[#E7DDD2]/75 pt-1">
              <Clock className="w-4 h-4 text-[#E8C574] shrink-0" />
              <span>Open Daily · 10:00 AM – 8:30 PM IST</span>
            </div>
          </div>
        </div>

        <div className="max-w-[1360px] mx-auto pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[12px] text-[#E7DDD2]/55">
          <p>© {new Date().getFullYear()} NAVDEEP Kanchipuram Silk. All rights reserved.</p>
          <p>Silk Mark Certified · Pure Silver-Core Zari · Handwoven in India</p>
        </div>
      </div>
    </footer>
  );
}
