"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Heart } from "lucide-react";
import { BRIDAL_COLLECTION, formatINR } from "@/data/catalog";
import { useStore } from "@/context/StoreContext";

export default function BridalCollectionSection() {
  const [activeIndex, setActiveIndex] = useState(2); // Center on Manjal Kalyanam Pattu
  const { addToBag, toggleWishlist, isWishlisted } = useStore();

  const total = BRIDAL_COLLECTION.length;
  const activeSaree = BRIDAL_COLLECTION[activeIndex];
  const liked = isWishlisted(activeSaree.id);

  const goPrev = () => setActiveIndex((i) => (i - 1 + total) % total);
  const goNext = () => setActiveIndex((i) => (i + 1) % total);

  return (
    <section
      id="bridal"
      className="relative bg-white py-20 sm:py-28 px-4 sm:px-10 lg:px-14 border-t border-[#F1ECE4] overflow-hidden"
    >
      <div className="max-w-[1380px] mx-auto">
        {/* Centered Editorial Header */}
        <div className="text-center mb-12 sm:mb-14">
          <div className="inline-flex items-center gap-2.5 mb-2.5">
            <span className="w-6 h-[1.5px] bg-[#C6943B]" />
            <span className="text-[11px] font-semibold tracking-[0.26em] text-[#6B635E] uppercase">
              For the Muhurtham and Every Vow After
            </span>
          </div>
          <h2 className="text-[38px] sm:text-[52px] lg:text-[60px] font-extrabold tracking-[-0.03em] leading-[1.06] text-[#141110]">
            The Bridal <span className="text-[#7A1426]">Collection</span>
          </h2>
        </div>

        {/* Curved Carousel of Tall Arch-Topped Bridal Cards */}
        <div className="relative h-[400px] sm:h-[470px] w-full flex items-center justify-center select-none overflow-hidden">
          {BRIDAL_COLLECTION.map((saree, idx) => {
            let offset = idx - activeIndex;
            if (offset > total / 2) offset -= total;
            if (offset < -total / 2) offset += total;

            const abs = Math.abs(offset);
            const isCenter = offset === 0;

            const translateX = offset * 245;
            const translateY = abs * abs * 22;
            const rotate = offset * 10;
            const scale = isCenter ? 1 : abs === 1 ? 0.87 : 0.72;
            const opacity = isCenter ? 1 : abs === 1 ? 0.62 : 0.32;
            const zIndex = 30 - abs * 10;

            return (
              <motion.button
                key={saree.id}
                type="button"
                onClick={() => setActiveIndex(idx)}
                aria-label={`View bridal saree ${saree.name}`}
                animate={{
                  x: translateX,
                  y: translateY,
                  rotate,
                  scale,
                  opacity: abs <= 3 ? opacity : 0,
                }}
                transition={{
                  type: "spring",
                  stiffness: 220,
                  damping: 26,
                }}
                style={{ zIndex }}
                className={`absolute w-[250px] sm:w-[300px] h-[365px] sm:h-[430px] rounded-t-[155px] rounded-b-[14px] overflow-hidden bg-[#F5EFE7] focus-visible:outline-none cursor-pointer ${
                  isCenter
                    ? "ring-2 ring-[#DFB459] shadow-[0_24px_56px_rgba(20,17,16,0.18)]"
                    : "shadow-md"
                }`}
              >
                <Image
                  src={saree.image}
                  alt={saree.name}
                  fill
                  sizes="320px"
                  className="object-cover object-top"
                />

                {/* Optional Discount Tag */}
                {saree.discountTag && (
                  <span className="absolute top-12 right-5 px-2.5 py-0.5 rounded-full bg-[#8B162B] text-white text-[11px] font-bold shadow-md">
                    {saree.discountTag}
                  </span>
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Center Saree Details & Action Bar */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSaree.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.28 }}
            className="mt-6 flex flex-col items-center text-center"
          >
            <h3 className="text-[24px] sm:text-[28px] font-extrabold tracking-[-0.02em] text-[#141110]">
              {activeSaree.name}
            </h3>
            <p className="text-[13px] text-[#78716C] mt-1">
              {activeSaree.fabricNote}
            </p>
            <div className="mt-2 flex items-center gap-2.5">
              {activeSaree.originalPrice && (
                <span className="text-[14px] text-[#A8A29E] line-through">
                  {formatINR(activeSaree.originalPrice)}
                </span>
              )}
              <span className="text-[18px] font-extrabold text-[#C6943B]">
                {formatINR(activeSaree.price)}
              </span>
            </div>

            {/* Prev / Add to cart / Heart / Next */}
            <div className="mt-6 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={goPrev}
                aria-label="Previous bridal saree"
                className="w-11 h-11 rounded-full border border-[#E4DDD2] hover:border-[#7A1426] text-[#141110] hover:text-[#7A1426] flex items-center justify-center transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>

              <motion.button
                type="button"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() =>
                  addToBag({
                    id: activeSaree.id,
                    brand: "NAVDEEP",
                    category: "BRIDAL COLLECTION",
                    name: activeSaree.name,
                    price: activeSaree.price,
                    image: activeSaree.image,
                  })
                }
                className="px-9 py-3 rounded-full bg-gradient-to-r from-[#851529] to-[#6B0F1F] hover:from-[#9A1A31] hover:to-[#7D1325] text-white text-[14px] font-semibold shadow-[0_12px_28px_rgba(122,20,38,0.28)] cursor-pointer"
              >
                Add to cart
              </motion.button>

              <button
                type="button"
                onClick={() =>
                  toggleWishlist({
                    id: activeSaree.id,
                    brand: "NAVDEEP",
                    category: "BRIDAL COLLECTION",
                    name: activeSaree.name,
                    price: activeSaree.price,
                    image: activeSaree.image,
                  })
                }
                aria-label={`Save ${activeSaree.name} to wishlist`}
                className="w-11 h-11 rounded-full border border-[#E4DDD2] hover:border-[#7A1426] flex items-center justify-center transition-colors cursor-pointer"
              >
                <Heart
                  className={`w-4 h-4 ${
                    liked ? "fill-[#7A1426] text-[#7A1426]" : "text-[#141110]"
                  }`}
                />
              </button>

              <button
                type="button"
                onClick={goNext}
                aria-label="Next bridal saree"
                className="w-11 h-11 rounded-full border border-[#E4DDD2] hover:border-[#7A1426] text-[#141110] hover:text-[#7A1426] flex items-center justify-center transition-colors cursor-pointer"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
