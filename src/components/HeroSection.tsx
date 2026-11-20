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

  // Buttery damped scroll progress for cinematic camera walkthrough
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 26,
    mass: 0.4,
  });

  // Camera pushes deep down the showroom aisle toward the chandelier & inner sanctum
  const showroomScale = useTransform(smoothProgress, [0, 0.85, 1], [1.0, 1.68, 1.78]);
  const showroomY = useTransform(smoothProgress, [0, 0.85, 1], ["0%", "-6%", "-8%"]);
  const showroomX = useTransform(smoothProgress, [0, 0.85, 1], ["0%", "4%", "5%"]);

  // Foreground headline & buttons glide up and dissolve as you enter the showroom
  const contentOpacity = useTransform(smoothProgress, [0, 0.28], [1, 0]);
  const contentY = useTransform(smoothProgress, [0, 0.28], [0, -70]);
  const contentScale = useTransform(smoothProgress, [0, 0.28], [1, 0.96]);

  // Warm ambient scrim eases off so the glowing inner chandelier shines during walkthrough
  const scrimOpacity = useTransform(smoothProgress, [0, 0.45, 0.85], [1, 0.4, 0.25]);

  // Mid-walkthrough subtle golden sanctum caption appears briefly as you glide inside
  const sanctumOpacity = useTransform(smoothProgress, [0.34, 0.52, 0.72, 0.86], [0, 1, 1, 0]);
  const sanctumY = useTransform(smoothProgress, [0.34, 0.52, 0.86], [28, 0, -24]);

  // Subtle scroll cue fades out immediately on scroll
  const cueOpacity = useTransform(smoothProgress, [0, 0.12], [1, 0]);

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
        delay: 1.35, // syncs cleanly right as crimson silk curtain lifts
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
      className="relative w-full h-[220vh] bg-[#1A0D0A]"
    >
      {/* Sticky Full-Viewport Showroom Camera Stage */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-end">
        {/* Scroll-Driven Showroom Camera Walkthrough Image */}
        <motion.div
          style={{
            scale: showroomScale,
            y: showroomY,
            x: showroomX,
            transformOrigin: "44% 46%",
          }}
          className="absolute inset-0 z-0 will-change-transform"
        >
          <Image
            src="/images/hero-showroom.jpg"
            alt="NOOLAM Kanchipuram Silk Heritage Showroom with teakwood shelves and draped crimson gold Kanjivaram mannequin"
            fill
            priority
            fetchPriority="high"
            quality={92}
            sizes="100vw"
            className="object-cover object-center"
          />
        </motion.div>

        {/* Dynamic Editorial Scrim */}
        <motion.div
          style={{ opacity: scrimOpacity }}
          aria-hidden="true"
          className="absolute inset-0 z-[1] pointer-events-none"
        >
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, rgba(20,9,6,0.78) 0%, rgba(20,9,6,0.42) 48%, rgba(20,9,6,0.16) 100%)",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(18,8,6,0.42) 0%, rgba(18,8,6,0.04) 38%, rgba(22,8,10,0.72) 100%)",
            }}
          />
        </motion.div>

        {/* Mid-Scroll Sanctum Walkthrough Caption */}
        <motion.div
          style={{ opacity: sanctumOpacity, y: sanctumY }}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6"
        >
          <p className="text-[11px] sm:text-[12px] font-semibold tracking-[0.38em] text-[#F5D688] uppercase drop-shadow">
            Step Inside The Sanctum
          </p>
          <p className="mt-2 font-serif italic text-[32px] sm:text-[48px] text-white drop-shadow-[0_6px_24px_rgba(0,0,0,0.65)]">
            Every shelf, a Kanchipuram heirloom.
          </p>
        </motion.div>

        {/* Main Hero Editorial Copy */}
        <motion.div
          style={{ opacity: contentOpacity, y: contentY, scale: contentScale }}
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

        {/* Scroll to Enter Cue */}
        <motion.div
          style={{ opacity: cueOpacity }}
          className="hidden md:flex absolute bottom-16 right-12 z-10 flex-col items-center gap-1.5 text-[#F7E8C8]/80 pointer-events-none"
        >
          <span className="text-[10px] tracking-[0.28em] uppercase font-medium">
            Scroll to enter
          </span>
          <motion.span
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="w-4 h-4 text-[#E8C574]" />
          </motion.span>
        </motion.div>
      </div>

      {/* Regal Crimson-Maroon Heritage Ribbon at Base of Walkthrough */}
      <div className="relative z-20 -mt-11 w-full bg-gradient-to-r from-[#690D1D] via-[#831328] to-[#690D1D] border-y border-[#E8C574]/40 overflow-hidden select-none">
        <div className="animate-marquee py-2.5 flex items-center gap-10 text-[11px] sm:text-[12px] font-semibold tracking-[0.3em] text-[#F9E7BE] uppercase">
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
              <span className="text-[#E8C574] text-[9px]" aria-hidden="true">
                ♦
              </span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
