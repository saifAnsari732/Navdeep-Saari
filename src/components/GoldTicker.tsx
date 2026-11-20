"use client";

import React, { useState } from "react";
import { Pause, Play } from "lucide-react";
import { TICKER_ITEMS } from "@/data/catalog";

export default function GoldTicker({
  sticky = false,
}: {
  sticky?: boolean;
}) {
  const [paused, setPaused] = useState(false);

  const track = [...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <div
      className={`${
        sticky ? "fixed bottom-0 left-0 right-0 z-40" : "relative"
      } w-full bg-[#2E0B12] border-t border-[#C6943B]/35 overflow-hidden select-none`}
    >
      <div className="flex items-center">
        <div
          className={`animate-marquee py-2.5 flex items-center gap-8 ${
            paused ? "paused" : ""
          }`}
        >
          {track.map((item, idx) => (
            <div
              key={`${item.label}-${idx}`}
              className="flex items-center gap-3 whitespace-nowrap text-[12px] sm:text-[13px]"
            >
              <svg
                width="9"
                height="9"
                viewBox="0 0 12 12"
                fill="none"
                aria-hidden="true"
                className="text-[#E8C574] shrink-0"
              >
                <path
                  d="M6 1L11 6L6 11L1 6L6 1Z"
                  fill="currentColor"
                />
              </svg>
              <span className="font-bold tracking-[0.14em] text-[#E8C574] uppercase">
                {item.label}
              </span>
              <span className="text-[#F5ECE0]/88 font-normal">{item.desc}</span>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          aria-label={paused ? "Play ticker" : "Pause ticker"}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#1C060A]/90 border border-[#E8C574]/40 text-[#E8C574] hover:bg-[#E8C574] hover:text-[#1C060A] flex items-center justify-center transition-colors cursor-pointer z-10"
        >
          {paused ? <Play className="w-3 h-3" /> : <Pause className="w-3 h-3" />}
        </button>
      </div>
    </div>
  );
}
