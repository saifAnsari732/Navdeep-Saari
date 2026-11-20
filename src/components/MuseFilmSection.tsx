"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Volume2, VolumeX, ArrowUpRight, Pause, Play } from "lucide-react";

const LEFT_COLUMN_IMAGES = [
  "/images/mood-wedding.jpg",
  "/images/mood-festive.jpg",
  "/images/mood-bridal.jpg",
  "/images/mood-zari.jpg",
];

const RIGHT_COLUMN_IMAGES = [
  "/images/mood-kanchipuram.jpg",
  "/images/mood-banarasi.jpg",
  "/images/mood-wedding.jpg",
  "/images/mood-festive.jpg",
];

export default function MuseFilmSection() {
  const [soundOn, setSoundOn] = useState(false);
  const [columnsPaused, setColumnsPaused] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainRef = useRef<GainNode | null>(null);

  // Subtle ambient temple-tanpura drone via Web Audio API when user clicks Sound On
  const toggleSound = () => {
    if (!soundOn) {
      try {
        const AudioCtx =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext })
            .webkitAudioContext;
        if (!audioCtxRef.current) {
          const ctx = new AudioCtx();
          const master = ctx.createGain();
          master.gain.setValueAtTime(0.001, ctx.currentTime);
          master.gain.exponentialRampToValueAtTime(0.055, ctx.currentTime + 0.8);
          master.connect(ctx.destination);

          // Warm harmonic fifth drone (Sa - Pa - Sa)
          [146.83, 220.0, 293.66].forEach((freq, i) => {
            const osc = ctx.createOscillator();
            osc.type = i === 1 ? "triangle" : "sine";
            osc.frequency.value = freq;
            const g = ctx.createGain();
            g.gain.value = i === 0 ? 0.5 : 0.25;
            osc.connect(g);
            g.connect(master);
            osc.start();
          });

          audioCtxRef.current = ctx;
          gainRef.current = master;
        } else if (audioCtxRef.current.state === "suspended") {
          audioCtxRef.current.resume();
          gainRef.current?.gain.setTargetAtTime(
            0.055,
            audioCtxRef.current.currentTime,
            0.3
          );
        }
        setSoundOn(true);
      } catch {
        setSoundOn(false);
      }
    } else {
      if (audioCtxRef.current && gainRef.current) {
        gainRef.current.gain.setTargetAtTime(
          0.0001,
          audioCtxRef.current.currentTime,
          0.2
        );
        setTimeout(() => audioCtxRef.current?.suspend(), 350);
      }
      setSoundOn(false);
    }
  };

  useEffect(() => {
    return () => {
      audioCtxRef.current?.close();
    };
  }, []);

  return (
    <section
      id="the-muse"
      className="relative bg-white py-20 sm:py-28 px-4 sm:px-8 overflow-hidden border-t border-[#F1ECE4]"
    >
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Vertical Scrolling Column (Upward) */}
        <div
          className="hidden lg:block lg:col-span-2 h-[600px] overflow-hidden relative"
          style={{
            maskImage:
              "linear-gradient(to bottom, transparent 0%, black 16%, black 84%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0%, black 16%, black 84%, transparent 100%)",
          }}
        >
          <div
            className={`animate-col-up flex flex-col gap-5 ${
              columnsPaused ? "paused" : ""
            }`}
          >
            {[...LEFT_COLUMN_IMAGES, ...LEFT_COLUMN_IMAGES].map((src, i) => (
              <div
                key={`left-${i}`}
                className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden shadow-md bg-[#F6F1EA]"
              >
                <Image
                  src={src}
                  alt="NAVDEEP silk lifestyle editorial"
                  fill
                  sizes="220px"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Center 16:9 Brand Film Stage */}
        <div className="lg:col-span-8 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2.5 mb-2.5">
            <span className="w-6 h-[1.5px] bg-[#C6943B]" />
            <span className="text-[11px] font-semibold tracking-[0.26em] text-[#8F6520] uppercase">
              The Muse Film
            </span>
          </div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7 }}
            className="text-[40px] sm:text-[54px] lg:text-[62px] font-extrabold tracking-[-0.03em] leading-[1.06] text-[#141110] mb-8"
          >
            Feel the <span className="text-maroon-gold">drape</span>
          </motion.h2>

          {/* Architectural Gold Corner-Bracket Frame */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-[780px] p-3 sm:p-4"
          >
            {/* Outer Hairline Gold Frame */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-1.5 sm:inset-2 rounded-2xl border border-[#DFC48F]/80"
            />
            {/* 4 Corner Brackets */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#C6943B]"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#C6943B]"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#C6943B]"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#C6943B]"
            />

            {/* 16:9 Film Viewport */}
            <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-[#1C0F0C] shadow-[0_24px_60px_rgba(20,17,16,0.2)]">
              <Image
                src="/images/muse-film-poster.jpg"
                alt="NAVDEEP Brand Film — Feel the drape in Kanchipuram temple courtyard"
                fill
                sizes="(max-width: 1024px) 94vw, 780px"
                className={`object-cover ${columnsPaused ? "" : "animate-ken-burns"}`}
              />
              {/* Subtle Cinematic Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/15" />

              {/* Sound Toggle Pill + Motion Pause Control */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
                <button
                  type="button"
                  onClick={toggleSound}
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/55 hover:bg-black/75 border border-white/25 backdrop-blur-md text-white text-[11px] font-semibold tracking-[0.2em] uppercase transition-colors cursor-pointer"
                >
                  {soundOn ? (
                    <>
                      <Volume2 className="w-3.5 h-3.5 text-[#E8C574]" />
                      <span>Sound On</span>
                    </>
                  ) : (
                    <>
                      <VolumeX className="w-3.5 h-3.5 text-white/80" />
                      <span>Sound Off</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setColumnsPaused((p) => !p)}
                  aria-label={columnsPaused ? "Play motion" : "Pause motion"}
                  className="w-8 h-8 rounded-full bg-black/55 hover:bg-black/75 border border-white/25 backdrop-blur-md text-white flex items-center justify-center cursor-pointer"
                >
                  {columnsPaused ? (
                    <Play className="w-3.5 h-3.5" />
                  ) : (
                    <Pause className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </div>
          </motion.div>

          {/* CTA Button Below Film */}
          <motion.button
            type="button"
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={() =>
              document
                .getElementById("the-rack")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="mt-7 group inline-flex items-center gap-3.5 pl-6 pr-2 py-2 rounded-full bg-gradient-to-r from-[#851529] to-[#6B0F1F] text-white text-[14px] font-semibold shadow-[0_14px_34px_rgba(122,20,38,0.34)] cursor-pointer"
          >
            <span>Purchase the Collection</span>
            <span className="w-8 h-8 rounded-full bg-white text-[#7A1426] flex items-center justify-center transition-transform duration-300 group-hover:rotate-12">
              <ArrowUpRight className="w-4 h-4" />
            </span>
          </motion.button>
        </div>

        {/* Right Vertical Scrolling Column (Downward) */}
        <div
          className="hidden lg:block lg:col-span-2 h-[600px] overflow-hidden relative"
          style={{
            maskImage:
              "linear-gradient(to bottom, transparent 0%, black 16%, black 84%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0%, black 16%, black 84%, transparent 100%)",
          }}
        >
          <div
            className={`animate-col-down flex flex-col gap-5 ${
              columnsPaused ? "paused" : ""
            }`}
          >
            {[...RIGHT_COLUMN_IMAGES, ...RIGHT_COLUMN_IMAGES].map((src, i) => (
              <div
                key={`right-${i}`}
                className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden shadow-md bg-[#F6F1EA]"
              >
                <Image
                  src={src}
                  alt="NAVDEEP silk lifestyle moment"
                  fill
                  sizes="220px"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
