"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ShoppingBag, ArrowRight, Menu, X } from "lucide-react";
import { useStore } from "@/context/StoreContext";

const NAV_LINKS = [
  { id: "hero", label: "Home", href: "#hero" },
  { id: "try-the-look", label: "Try the Look", href: "#try-the-look" },
  { id: "pick-a-silk", label: "Pick a Silk", href: "#pick-a-silk" },
  { id: "the-rack", label: "The Rack", href: "#the-rack" },
  { id: "the-muse", label: "The Muse", href: "#the-muse" },
  { id: "bridal", label: "Bridal", href: "#bridal" },
  { id: "the-weave", label: "The Weave", href: "#the-weave" },
];

export default function Navbar() {
  const { bagCount, wishlist, setBagOpen, setWishlistOpen, setStoreModalOpen } =
    useStore();
  const [activeId, setActiveId] = useState("hero");
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);

      const scrollPos = window.scrollY + window.innerHeight * 0.35;
      for (let i = NAV_LINKS.length - 1; i >= 0; i--) {
        const el = document.getElementById(NAV_LINKS[i].id);
        if (el && el.offsetTop <= scrollPos) {
          setActiveId(NAV_LINKS[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string
  ) => {
    e.preventDefault();
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveId(id);
    }
  };

  return (
    <header className="fixed top-4 left-0 right-0 z-50 px-4 sm:px-6 pointer-events-none">
      <motion.nav
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        aria-label="Primary navigation"
        className={`pointer-events-auto mx-auto max-w-[1160px] rounded-full border transition-all duration-300 ${
          scrolled
            ? "bg-[#24130E]/88 border-[#E8C574]/35 shadow-[0_14px_40px_rgba(20,10,6,0.35)] backdrop-blur-xl"
            : "bg-[#2C1810]/72 border-[#E8C574]/40 shadow-[0_10px_32px_rgba(0,0,0,0.28)] backdrop-blur-lg"
        } px-4 sm:px-6 py-2.5 flex items-center justify-between gap-3`}
      >
        {/* Brand Emblem: Navdeep Sacred Deepam-Lotus Crest + Wordmark */}
        <a
          href="#hero"
          onClick={(e) => handleNavClick(e, "hero")}
          className="flex items-center gap-2.5 leading-none group cursor-pointer shrink-0 pl-1"
        >
          {/* Bespoke Navdeep Gold Medallion Crest */}
          <span className="w-9 h-9 rounded-full bg-gradient-to-br from-[#8F152A] via-[#5A0917] to-[#2B040B] border border-[#E8C574]/75 shadow-[0_2px_12px_rgba(232,197,116,0.28)] flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
            <svg
              width="20"
              height="20"
              viewBox="0 0 32 32"
              fill="none"
              aria-hidden="true"
              className="text-[#F5D688]"
            >
              {/* Sacred Deepam Flame */}
              <path
                d="M16 3C14.2 6.8 13.4 9 13.4 11.2C13.4 12.8 14.5 14 16 14C17.5 14 18.6 12.8 18.6 11.2C18.6 9 17.8 6.8 16 3Z"
                fill="currentColor"
              />
              {/* Lotus Wings */}
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
              {/* Royal 'N' Monogram */}
              <path
                d="M9.5 26.5V16.8H12.2L20 24.2V16.8H22.5V26.5H19.9L12 19V26.5H9.5Z"
                fill="currentColor"
              />
              {/* Diya Base */}
              <path
                d="M11 28.5C13.5 30 18.5 30 21 28.5H11Z"
                stroke="currentColor"
                strokeWidth="1.2"
              />
            </svg>
          </span>

          <div className="flex flex-col items-start">
            <span className="font-serif text-[17px] sm:text-[19px] tracking-[0.24em] text-[#FAF5EA] font-semibold uppercase">
              NAVDEEP
            </span>
            <span className="text-[7px] tracking-[0.32em] text-[#E8C574]/90 uppercase mt-0.5">
              Kanchipuram Silk
            </span>
          </div>
        </a>

        {/* Center Navigation Pills */}
        <ul className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((link) => {
            const isActive = activeId === link.id;
            return (
              <li key={link.id}>
                <a
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.id)}
                  className={`relative px-3.5 py-1.5 rounded-full text-[13px] font-medium transition-colors duration-200 cursor-pointer block ${
                    isActive
                      ? "text-[#1A1008]"
                      : "text-[#F5ECE0]/85 hover:text-white"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeNavPill"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 32,
                      }}
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-[#F0D38C] via-[#DFB459] to-[#C69236] shadow-[0_2px_12px_rgba(223,180,89,0.45)]"
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </a>
              </li>
            );
          })}
        </ul>

        {/* Right Utility Actions */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setWishlistOpen(true)}
            aria-label={`Open wishlist (${wishlist.length} items)`}
            className="relative w-9 h-9 rounded-full border border-white/20 bg-white/8 hover:bg-white/18 text-[#FAF5EA] flex items-center justify-center transition-colors cursor-pointer"
          >
            <Heart className="w-4 h-4" />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[17px] h-[17px] px-1 rounded-full bg-[#E8C574] text-[#1A1008] text-[10px] font-bold flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setBagOpen(true)}
            aria-label={`Open silk bag (${bagCount} items)`}
            className="relative w-9 h-9 rounded-full border border-white/20 bg-white/8 hover:bg-white/18 text-[#FAF5EA] flex items-center justify-center transition-colors cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4" />
            {bagCount > 0 && (
              <motion.span
                key={bagCount}
                initial={{ scale: 0.6 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 min-w-[17px] h-[17px] px-1 rounded-full bg-[#E8C574] text-[#1A1008] text-[10px] font-bold flex items-center justify-center"
              >
                {bagCount}
              </motion.span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setStoreModalOpen(true)}
            className="hidden sm:inline-flex items-center gap-2.5 pl-4 pr-1.5 py-1.5 rounded-full bg-gradient-to-r from-[#8B162B] to-[#6B0F1F] hover:from-[#A11B33] hover:to-[#7D1325] border border-[#E8C574]/45 text-white text-[13px] font-semibold shadow-[0_6px_18px_rgba(122,20,38,0.45)] transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            <span>Visit the Store</span>
            <span className="w-7 h-7 rounded-full bg-white text-[#7A1426] flex items-center justify-center">
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label="Toggle navigation menu"
            className="lg:hidden w-9 h-9 rounded-full border border-white/20 bg-white/10 text-white flex items-center justify-center cursor-pointer"
          >
            {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.22 }}
            className="pointer-events-auto lg:hidden mx-auto max-w-[540px] mt-2 rounded-3xl bg-[#24130E]/95 border border-[#E8C574]/30 backdrop-blur-xl p-4 shadow-2xl"
          >
            <div className="grid grid-cols-2 gap-2">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.id)}
                  className={`px-4 py-2.5 rounded-2xl text-sm font-medium transition-colors ${
                    activeId === link.id
                      ? "bg-[#DFB459] text-[#1A1008]"
                      : "text-[#FAF5EA] hover:bg-white/10"
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </div>
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                setStoreModalOpen(true);
              }}
              className="mt-3 w-full py-2.5 rounded-2xl bg-[#7A1426] text-white text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Visit the Store</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
