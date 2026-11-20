"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useScroll } from "framer-motion";

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const [isPointer, setIsPointer] = useState(false);
  const [pressed, setPressed] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const ringX = useSpring(mouseX, { stiffness: 320, damping: 28, mass: 0.5 });
  const ringY = useSpring(mouseY, { stiffness: 320, damping: 28, mass: 0.5 });

  const { scrollYProgress } = useScroll();
  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const isFine = window.matchMedia("(pointer: fine)").matches;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (!isFine || prefersReduced) return;

    setEnabled(true);

    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorZone = target.closest<HTMLElement>("[data-cursor]");
      if (cursorZone) {
        setLabel(cursorZone.getAttribute("data-cursor"));
        setIsPointer(true);
        return;
      }

      setLabel(null);
      const clickable = target.closest("a, button, [role='button'], input");
      setIsPointer(Boolean(clickable));
    };

    const onLeave = () => setVisible(false);
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
    };
  }, [mouseX, mouseY]);

  return (
    <>
      {/* Top Golden Silk Thread Scroll Progress Indicator */}
      <motion.div
        aria-hidden="true"
        style={{ scaleX: smoothScroll, transformOrigin: "0% 50%" }}
        className="fixed top-0 left-0 right-0 h-[2.5px] z-[60] pointer-events-none bg-gradient-to-r from-[#7A1426] via-[#DFB459] to-[#F6DC93]"
      />

      {/* Contextual Luxury Gold Halo Cursor (Fine Pointers Only) */}
      {enabled && (
        <>
          {/* Trailing Gold Ring / Contextual Pill */}
          <motion.div
            aria-hidden="true"
            style={{
              x: ringX,
              y: ringY,
              translateX: "-50%",
              translateY: "-50%",
            }}
            animate={{
              opacity: visible ? 1 : 0,
              width: label ? 64 : isPointer ? 42 : 28,
              height: label ? 64 : isPointer ? 42 : 28,
              scale: pressed ? 0.86 : 1,
              backgroundColor: label
                ? "rgba(122, 20, 38, 0.9)"
                : isPointer
                ? "rgba(223, 180, 89, 0.14)"
                : "rgba(223, 180, 89, 0.04)",
              borderColor: label
                ? "rgba(232, 197, 116, 0.85)"
                : isPointer
                ? "rgba(198, 148, 59, 0.85)"
                : "rgba(198, 148, 59, 0.55)",
            }}
            transition={{ type: "spring", stiffness: 360, damping: 28 }}
            className="fixed top-0 left-0 z-[90] rounded-full border pointer-events-none flex items-center justify-center backdrop-blur-[2px] shadow-[0_6px_22px_rgba(122,20,38,0.18)]"
          >
            {label && (
              <span className="text-[10px] font-bold tracking-[0.2em] text-[#F9E7BE] uppercase">
                {label}
              </span>
            )}
          </motion.div>

          {/* Crisp Inner Dot */}
          {!label && (
            <motion.div
              aria-hidden="true"
              style={{
                x: mouseX,
                y: mouseY,
                translateX: "-50%",
                translateY: "-50%",
              }}
              animate={{
                opacity: visible ? 1 : 0,
                scale: pressed ? 1.5 : isPointer ? 0.6 : 1,
              }}
              className="fixed top-0 left-0 z-[91] w-1.5 h-1.5 rounded-full bg-[#7A1426] pointer-events-none"
            />
          )}
        </>
      )}
    </>
  );
}
