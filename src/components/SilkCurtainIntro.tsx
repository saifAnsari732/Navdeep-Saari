"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SilkCurtainIntro() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) {
      setVisible(false);
      return;
    }

    const timer = setTimeout(() => {
      setVisible(false);
    }, 1550);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="silk-curtain"
          initial={{ y: "0%" }}
          exit={{
            y: "-108%",
            transition: {
              duration: 1.15,
              ease: [0.76, 0, 0.24, 1],
            },
          }}
          onClick={() => setVisible(false)}
          aria-label="Opening NAVDEEP silk curtain"
          className="fixed inset-0 z-[100] cursor-pointer overflow-hidden select-none"
          style={{
            background:
              "radial-gradient(ellipse at 50% 35%, #B81224 0%, #8E0B1A 45%, #5A0510 100%)",
          }}
        >
          {/* Draped Vertical Silk Fold Highlights */}
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-75"
            style={{
              backgroundImage:
                "repeating-linear-gradient(90deg, rgba(255,215,130,0.06) 0px, rgba(0,0,0,0.28) 48px, rgba(255,80,80,0.16) 96px, rgba(0,0,0,0.32) 152px, rgba(255,215,130,0.08) 210px)",
            }}
          />

          {/* Top Temple Zari Gold Border Band */}
          <div
            aria-hidden="true"
            className="absolute top-0 left-0 right-0 h-20 sm:h-28 opacity-90"
            style={{
              background:
                "linear-gradient(180deg, rgba(232,197,116,0.36) 0%, rgba(198,148,59,0.18) 55%, transparent 100%)",
              borderBottom: "2px solid rgba(232,197,116,0.45)",
            }}
          />

          {/* Ornamental Gold Paisley / Zari Corner Flourishes SVG */}
          <svg
            aria-hidden="true"
            viewBox="0 0 1440 900"
            preserveAspectRatio="none"
            className="absolute inset-0 w-full h-full opacity-35 pointer-events-none"
          >
            <defs>
              <linearGradient id="zariThread" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FCE49C" />
                <stop offset="50%" stopColor="#D49A35" />
                <stop offset="100%" stopColor="#FCE49C" />
              </linearGradient>
              <pattern
                id="zariButta"
                width="120"
                height="120"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M60 44 L66 60 L60 76 L54 60 Z"
                  fill="url(#zariThread)"
                  opacity="0.55"
                />
                <circle cx="60" cy="60" r="2.5" fill="#FFF3C4" />
              </pattern>
            </defs>
            <rect width="1440" height="900" fill="url(#zariButta)" />
            {/* Grand Temple Zari V-Swag Border */}
            <path
              d="M0 120 Q 360 220 720 310 Q 1080 220 1440 120"
              fill="none"
              stroke="url(#zariThread)"
              strokeWidth="8"
              strokeDasharray="16 8"
            />
            <path
              d="M0 144 Q 360 244 720 334 Q 1080 244 1440 144"
              fill="none"
              stroke="url(#zariThread)"
              strokeWidth="3"
            />
          </svg>

          {/* Center Glowing NOOLAM Lotus Emblem */}
          <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.88, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center"
            >
              <svg
                width="54"
                height="30"
                viewBox="0 0 28 15"
                fill="none"
                aria-hidden="true"
                className="mb-3 text-[#F6D788] drop-shadow-[0_0_20px_rgba(246,215,136,0.65)]"
              >
                <path
                  d="M14 1C12.2 5.2 12.2 9.5 14 13.5C15.8 9.5 15.8 5.2 14 1Z"
                  stroke="currentColor"
                  strokeWidth="1.2"
                />
                <path
                  d="M14 13.5C9.5 11.2 6.8 8.2 5.5 4.2C9.2 5.5 11.8 8.4 14 13.5Z"
                  stroke="currentColor"
                  strokeWidth="1.1"
                />
                <path
                  d="M14 13.5C18.5 11.2 21.2 8.2 22.5 4.2C18.8 5.5 16.2 8.4 14 13.5Z"
                  stroke="currentColor"
                  strokeWidth="1.1"
                />
                <path
                  d="M14 13.5C7.8 13.5 3.6 11.8 1 9C5 8.8 9.4 10.6 14 13.5Z"
                  stroke="currentColor"
                  strokeWidth="1"
                  opacity="0.75"
                />
                <path
                  d="M14 13.5C20.2 13.5 24.4 11.8 27 9C23 8.8 18.6 10.6 14 13.5Z"
                  stroke="currentColor"
                  strokeWidth="1"
                  opacity="0.75"
                />
              </svg>

              <p className="font-serif text-[42px] sm:text-[62px] tracking-[0.32em] text-[#FFF6DE] font-semibold drop-shadow-[0_6px_28px_rgba(0,0,0,0.45)] pl-[0.32em] uppercase">
                NAVDEEP
              </p>
              <p className="mt-2 text-[11px] sm:text-[12px] tracking-[0.42em] text-[#F2CD74] uppercase">
                Kanchipuram Silk · Pure Zari
              </p>
            </motion.div>
          </div>

          {/* Bottom Scalloped Silk Hem Shadow */}
          <div
            aria-hidden="true"
            className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/45 to-transparent"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
