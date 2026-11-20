"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import gsap from "gsap";
import { ArrowUpRight, ChevronDown } from "lucide-react";

export default function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const textGroupRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Buttery spring-damped progress for the 4-chapter showroom walkthrough
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 26,
    mass: 0.45,
  });

  // Stage 1 (Entrance) -> Stage 2 (Mid Showroom Aisle) -> Stage 3 (Seated Customers in Sanctum Lounge)
  const stage1Scale = useTransform(smoothProgress, [0, 0.48], [1.0, 1.48]);
  const stage1Y = useTransform(smoothProgress, [0, 0.48], ["0%", "-5%"]);

  const stage2Opacity = useTransform(smoothProgress, [0.22, 0.40, 0.72, 0.85], [0, 1, 1, 0]);
  const stage2Scale = useTransform(smoothProgress, [0.22, 0.78], [1.02, 1.32]);

  const stage3Opacity = useTransform(smoothProgress, [0.64, 0.79, 1], [0, 1, 1]);
  const stage3Scale = useTransform(smoothProgress, [0.64, 1], [1.02, 1.16]);

  // Stage 0: Entrance Hero Headline ("Woven for the Divine.")
  const heroOpacity = useTransform(smoothProgress, [0, 0.20], [1, 0]);
  const heroY = useTransform(smoothProgress, [0, 0.22], [0, -64]);

  // Chapter 01 · THE LOOM (Bottom Right, 24% - 48% scroll — matches w_14.jpg)
  const ch1Opacity = useTransform(smoothProgress, [0.23, 0.31, 0.44, 0.51], [0, 1, 1, 0]);
  const ch1Y = useTransform(smoothProgress, [0.23, 0.31, 0.44, 0.51], [32, 0, 0, -28]);

  // Chapter 02 · THE ZARI (Top Left, 50% - 73% scroll — matches w_15.jpg)
  const ch2Opacity = useTransform(smoothProgress, [0.50, 0.57, 0.69, 0.76], [0, 1, 1, 0]);
  const ch2Y = useTransform(smoothProgress, [0.50, 0.57, 0.69, 0.76], [32, 0, 0, -28]);

  // Chapter 03 · THE HERITAGE — Customers Seated in Sanctum Lounge (Top Left, 75% - 98% scroll — matches w_16.jpg)
  const ch3Opacity = useTransform(smoothProgress, [0.75, 0.82, 0.96, 1.0], [0, 1, 1, 0.9]);
  const ch3Y = useTransform(smoothProgress, [0.75, 0.82, 1.0], [32, 0, -10]);

  const cueOpacity = useTransform(smoothProgress, [0, 0.1], [1, 0]);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced || !textGroupRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(".hero-stagger", {
        y: 34,
        opacity: 0,
        duration: 0.95,
        stagger: 0.12,
        ease: "power3.out",
        delay: 1.35,
      });
    }, textGroupRef);

    return () => ctx.revert();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative w-full h-[350vh] bg-[#1A0D0A]"
    >
      {/* Sticky Full-Viewport Showroom Walkthrough Stage */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-end">
        {/* Layer 1: Showroom Entrance (0% - 48%) */}
        <motion.div
          style={{
            scale: stage1Scale,
            y: stage1Y,
            transformOrigin: "44% 46%",
          }}
          className="absolute inset-0 z-0 will-change-transform"
        >
          <Image
            src="/images/hero-showroom.jpg"
            alt="NAVDEEP Kanchipuram Silk Heritage Showroom entrance"
            fill
            priority
            fetchPriority="high"
            quality={92}
            sizes="100vw"
            className="object-cover object-center"
          />
        </motion.div>

        {/* Layer 2: Mid-Showroom Corridor & Silk Shelves (22% - 85%) */}
        <motion.div
          style={{
            opacity: stage2Opacity,
            scale: stage2Scale,
            transformOrigin: "46% 45%",
          }}
          className="absolute inset-0 z-[1] will-change-transform pointer-events-none"
        >
          <Image
            src="/images/showroom-stage-2.jpg"
            alt="Inside the NAVDEEP Kanchipuram showroom corridor"
            fill
            quality={90}
            sizes="100vw"
            className="object-cover object-center"
          />
        </motion.div>

        {/* Layer 3: Inner Sanctum Bridal Lounge with Customers Seated & Shopping (64% - 100%) */}
        <motion.div
          style={{
            opacity: stage3Opacity,
            scale: stage3Scale,
            transformOrigin: "50% 48%",
          }}
          className="absolute inset-0 z-[2] will-change-transform pointer-events-none"
        >
          <Image
            src="/images/showroom-stage-3.jpg"
            alt="Customers seated in the NAVDEEP inner sanctum bridal lounge admiring Kanjivaram silk sarees"
            fill
            quality={92}
            sizes="100vw"
            className="object-cover object-center"
          />
        </motion.div>

        {/* Warm Ambient Editorial Scrim for Crisp Typography */}
        <div
          aria-hidden="true"
          className="absolute inset-0 z-[3] pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, rgba(16,7,5,0.46) 0%, rgba(16,7,5,0.14) 45%, rgba(20,7,9,0.68) 100%)",
          }}
        />

        {/* CHAPTER 01 · THE LOOM (Bottom Right — matches w_14.jpg) */}
        <motion.div
          style={{ opacity: ch1Opacity, y: ch1Y }}
          className="pointer-events-none absolute bottom-20 right-6 sm:right-14 lg:right-20 z-20 max-w-md text-right"
        >
          <p className="text-[11px] font-bold tracking-[0.28em] text-[#F5D688] uppercase drop-shadow">
            01 · THE LOOM
          </p>
          <h2 className="mt-2 text-[32px] sm:text-[44px] font-extrabold tracking-[-0.025em] leading-[1.08] text-white drop-shadow-[0_6px_24px_rgba(0,0,0,0.65)]">
            Woven by hand,
            <br />
            thread by thread.
          </h2>
          <p className="mt-2.5 text-[14px] sm:text-[15px] text-[#F7ECE0]/90 drop-shadow">
            Each saree spends weeks on a Kanchipuram pit loom.
          </p>
        </motion.div>

        {/* CHAPTER 02 · THE ZARI (Top Left — matches w_15.jpg) */}
        <motion.div
          style={{ opacity: ch2Opacity, y: ch2Y }}
          className="pointer-events-none absolute top-28 sm:top-32 left-6 sm:left-14 lg:left-20 z-20 max-w-md text-left"
        >
          <p className="text-[11px] font-bold tracking-[0.28em] text-[#F5D688] uppercase drop-shadow">
            02 · THE ZARI
          </p>
          <h2 className="mt-2 text-[32px] sm:text-[44px] font-extrabold tracking-[-0.025em] leading-[1.08] text-white drop-shadow-[0_6px_24px_rgba(0,0,0,0.65)]">
            Gold that catches
            <br />
            temple light.
          </h2>
          <p className="mt-2.5 text-[14px] sm:text-[15px] text-[#F7ECE0]/90 drop-shadow">
            Silk and zari interlocked, so the border never lets go.
          </p>
        </motion.div>

        {/* CHAPTER 03 · THE HERITAGE — Customers Seated in Sanctum (Top Left — matches w_16.jpg) */}
        <motion.div
          style={{ opacity: ch3Opacity, y: ch3Y }}
          className="pointer-events-none absolute top-28 sm:top-32 left-6 sm:left-14 lg:left-20 z-20 max-w-md text-left"
        >
          <p className="text-[11px] font-bold tracking-[0.28em] text-[#F5D688] uppercase drop-shadow">
            03 · THE HERITAGE
          </p>
          <h2 className="mt-2 text-[32px] sm:text-[44px] font-extrabold tracking-[-0.025em] leading-[1.08] text-white drop-shadow-[0_6px_24px_rgba(0,0,0,0.65)]">
            An heirloom from the
            <br />
            first fold.
          </h2>
          <p className="mt-2.5 text-[14px] sm:text-[15px] text-[#F7ECE0]/90 drop-shadow">
            Worn once, kept for generations.
          </p>
        </motion.div>

        {/* Stage 0 Main Hero Editorial Copy */}
        <motion.div
          style={{ opacity: heroOpacity, y: heroY }}
          ref={textGroupRef}
          className="relative z-10 w-full max-w-[1360px] mx-auto px-6 sm:px-10 lg:px-14 pb-20 sm:pb-24 pt-36"
        >
          {/* Heritage Pill Badge */}
          <div className="hero-stagger inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#24130D]/75 border border-[#E8C574]/40 backdrop-blur-md mb-6">
            <span className="w-2 h-2 rounded-full bg-[#E8C574] shadow-[0_0_10px_#E8C574]" />
            <span className="text-[11px] sm:text-[12px] font-medium tracking-[0.22em] text-[#F7E8C8] uppercase">
              Kanchipuram · Pure Zari · Handwoven Silk
            </span>
          </div>

          {/* Display Headline */}
          <h1 className="hero-stagger text-[46px] sm:text-[68px] lg:text-[84px] font-extrabold tracking-[-0.03em] leading-[1.02] text-white drop-shadow-[0_6px_28px_rgba(0,0,0,0.45)] max-w-4xl">
            Woven for the Divine.
          </h1>

          {/* Subcopy */}
          <p className="hero-stagger mt-5 text-[15px] sm:text-[18px] leading-[1.6] text-[#F5EDE4]/92 max-w-[540px] font-normal">
            NAVDEEP brings the temple looms of Kanchipuram home: Kanjivaram silk
            in heritage colours, bordered in real zari and finished by hand.
          </p>

          {/* Dual Magnetic CTAs */}
          <div className="hero-stagger mt-8 flex flex-wrap items-center gap-4">
            <motion.button
              type="button"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => scrollTo("try-the-look")}
              className="group inline-flex items-center gap-3.5 pl-6 pr-2 py-2 rounded-full bg-gradient-to-r from-[#86152A] to-[#690E1E] border border-[#E8C574]/50 text-white text-[15px] font-semibold shadow-[0_12px_32px_rgba(122,20,38,0.5)] cursor-pointer"
            >
              <span>Try the Look</span>
              <span className="w-9 h-9 rounded-full bg-white text-[#7A1426] flex items-center justify-center transition-transform duration-300 group-hover:rotate-12">
                <ArrowUpRight className="w-4 h-4" />
              </span>
            </motion.button>

            <motion.button
              type="button"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => scrollTo("the-rack")}
              className="group inline-flex items-center gap-3.5 pl-6 pr-2 py-2 rounded-full bg-white hover:bg-[#FAF6F0] text-[#141110] text-[15px] font-semibold shadow-[0_12px_30px_rgba(0,0,0,0.22)] cursor-pointer"
            >
              <span>Browse the Rack</span>
              <span className="w-9 h-9 rounded-full bg-[#F5EFE7] text-[#7A1426] flex items-center justify-center transition-transform duration-300 group-hover:rotate-12">
                <ArrowUpRight className="w-4 h-4" />
              </span>
            </motion.button>
          </div>
        </motion.div>

        {/* Scroll to Enter Showroom Cue */}
        <motion.div
          style={{ opacity: cueOpacity }}
          className="hidden md:flex absolute bottom-16 right-12 z-10 flex-col items-center gap-1.5 text-[#F7E8C8]/85 pointer-events-none"
        >
          <span className="text-[10px] tracking-[0.28em] uppercase font-medium">
            Scroll inside the store
          </span>
          <motion.span
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="w-4 h-4 text-[#E8C574]" />
          </motion.span>
        </motion.div>
      </div>
    </section>
  );
}
