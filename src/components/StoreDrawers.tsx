"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  Heart,
  CheckCircle2,
  MapPin,
  Calendar,
  Sparkles,
} from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { formatINR } from "@/data/catalog";

export default function StoreDrawers() {
  const {
    bag,
    wishlist,
    bagOpen,
    wishlistOpen,
    storeModalOpen,
    toast,
    setBagOpen,
    setWishlistOpen,
    setStoreModalOpen,
    updateQty,
    removeFromBag,
    clearBag,
    addToBag,
    toggleWishlist,
    bagSubtotal,
  } = useStore();

  const [orderPlaced, setOrderPlaced] = useState(false);
  const [appointmentBooked, setAppointmentBooked] = useState(false);
  const [selectedBoutique, setSelectedBoutique] = useState("Kanchipuram Flagship");

  const handleCheckout = () => {
    setOrderPlaced(true);
    setTimeout(() => {
      clearBag();
      setOrderPlaced(false);
      setBagOpen(false);
    }, 2400);
  };

  return (
    <>
      {/* Floating Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            role="status"
            aria-live="polite"
            className="fixed bottom-14 right-5 z-50 max-w-sm px-4 py-3 rounded-2xl bg-[#1E0C0F]/95 border border-[#E8C574]/45 text-[#FAF5EA] text-[13px] font-medium shadow-[0_16px_40px_rgba(0,0,0,0.35)] backdrop-blur-xl flex items-center gap-2.5"
          >
            <Sparkles className="w-4 h-4 text-[#E8C574] shrink-0" />
            <span>{toast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Shopping Bag Slide-Over Drawer */}
      <AnimatePresence>
        {bagOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setBagOpen(false)}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex justify-end"
          >
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md bg-white h-full flex flex-col shadow-2xl"
            >
              <div className="px-6 py-5 border-b border-[#EFEAE2] flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <ShoppingBag className="w-5 h-5 text-[#7A1426]" />
                  <h2 className="text-[16px] font-bold text-[#141110]">
                    Your Silk Bag ({bag.reduce((s, i) => s + i.quantity, 0)})
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => setBagOpen(false)}
                  aria-label="Close silk bag"
                  className="w-8 h-8 rounded-full hover:bg-[#F5EFE7] flex items-center justify-center cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-6 py-4">
                {orderPlaced ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-12">
                    <CheckCircle2 className="w-14 h-14 text-emerald-600 mb-3" />
                    <h3 className="text-[20px] font-extrabold text-[#141110]">
                      Order Reserved
                    </h3>
                    <p className="text-[13px] text-[#6B635E] mt-1.5 max-w-xs">
                      Our Kanchipuram concierge will confirm your Silk Mark
                      certificate and complimentary insured dispatch shortly.
                    </p>
                  </div>
                ) : bag.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-16 text-[#78716C]">
                    <ShoppingBag className="w-10 h-10 mb-3 opacity-30" />
                    <p className="text-[15px] font-semibold text-[#141110]">
                      Your silk bag is empty
                    </p>
                    <p className="text-[13px] mt-1 max-w-xs">
                      Explore Try the Look, Pick a Silk, or lift a piece off The
                      Rack to begin your collection.
                    </p>
                  </div>
                ) : (
                  <ul className="divide-y divide-[#F0EAE0]">
                    {bag.map((item) => (
                      <li
                        key={`${item.id}-${item.size ?? "std"}`}
                        className="py-4 flex gap-3.5"
                      >
                        <div className="relative w-16 h-20 rounded-xl overflow-hidden bg-[#FAF6F0] border border-[#ECE6DC] shrink-0">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            sizes="64px"
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[10px] font-semibold tracking-[0.16em] text-[#8F6520] uppercase">
                            {item.category}
                            {item.size ? ` · SIZE ${item.size}` : ""}
                          </p>
                          <p className="text-[13px] font-bold text-[#141110] truncate">
                            {item.name}
                          </p>
                          <p className="text-[13px] font-semibold text-[#7A1426] mt-0.5">
                            {formatINR(item.price)}
                            {item.bundleDiscount && (
                              <span className="ml-1.5 text-[10px] px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 font-semibold">
                                -10% Bundle
                              </span>
                            )}
                          </p>

                          <div className="mt-2 flex items-center justify-between">
                            <div className="inline-flex items-center border border-[#E5DDD2] rounded-full">
                              <button
                                type="button"
                                onClick={() => updateQty(item.id, -1)}
                                aria-label="Decrease quantity"
                                className="w-7 h-7 flex items-center justify-center hover:text-[#7A1426] cursor-pointer"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="px-2 text-[12px] font-semibold">
                                {item.quantity}
                              </span>
                              <button
                                type="button"
                                onClick={() => updateQty(item.id, 1)}
                                aria-label="Increase quantity"
                                className="w-7 h-7 flex items-center justify-center hover:text-[#7A1426] cursor-pointer"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeFromBag(item.id)}
                              aria-label={`Remove ${item.name}`}
                              className="text-[#A8A29E] hover:text-rose-600 cursor-pointer"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {bag.length > 0 && !orderPlaced && (
                <div className="p-6 border-t border-[#EFEAE2] bg-[#FCFBF9]">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[13px] text-[#6B635E]">
                      Insured Silk Dispatch
                    </span>
                    <span className="text-[12px] font-semibold text-emerald-700">
                      Complimentary
                    </span>
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[15px] font-bold text-[#141110]">
                      Subtotal
                    </span>
                    <span className="text-[20px] font-extrabold text-[#141110]">
                      {formatINR(bagSubtotal)}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={handleCheckout}
                    className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#851529] to-[#6B0F1F] hover:from-[#9A1A31] hover:to-[#7D1325] text-white text-[14px] font-semibold shadow-lg cursor-pointer"
                  >
                    Reserve Collection · {formatINR(bagSubtotal)}
                  </button>
                </div>
              )}
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Wishlist Slide-Over Drawer */}
      <AnimatePresence>
        {wishlistOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setWishlistOpen(false)}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex justify-end"
          >
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md bg-white h-full flex flex-col shadow-2xl"
            >
              <div className="px-6 py-5 border-b border-[#EFEAE2] flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Heart className="w-5 h-5 text-[#7A1426] fill-[#7A1426]" />
                  <h2 className="text-[16px] font-bold text-[#141110]">
                    Saved Silks ({wishlist.length})
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => setWishlistOpen(false)}
                  aria-label="Close wishlist"
                  className="w-8 h-8 rounded-full hover:bg-[#F5EFE7] flex items-center justify-center cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-6 py-4">
                {wishlist.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-16 text-[#78716C]">
                    <Heart className="w-10 h-10 mb-3 opacity-30" />
                    <p className="text-[15px] font-semibold text-[#141110]">
                      No saved drapes yet
                    </p>
                    <p className="text-[13px] mt-1 max-w-xs">
                      Tap the heart on any Kanjivaram, bridal weave, or temple
                      jewelry piece to curate your personal edit.
                    </p>
                  </div>
                ) : (
                  <ul className="divide-y divide-[#F0EAE0]">
                    {wishlist.map((item) => (
                      <li key={item.id} className="py-4 flex items-center gap-3.5">
                        <div className="relative w-14 h-18 rounded-xl overflow-hidden bg-[#FAF6F0] shrink-0">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            sizes="56px"
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[13px] font-bold text-[#141110] truncate">
                            {item.name}
                          </p>
                          <p className="text-[13px] text-[#7A1426] font-semibold">
                            {formatINR(item.price)}
                          </p>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => {
                              addToBag(item);
                              setWishlistOpen(false);
                              setBagOpen(true);
                            }}
                            className="px-3 py-1.5 rounded-full bg-[#141110] text-white text-[11px] font-semibold cursor-pointer"
                          >
                            Move to bag
                          </button>
                          <button
                            type="button"
                            onClick={() => toggleWishlist(item)}
                            aria-label={`Remove ${item.name} from wishlist`}
                            className="p-1.5 text-[#A8A29E] hover:text-rose-600 cursor-pointer"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Visit the Store Modal */}
      <AnimatePresence>
        {storeModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              setStoreModalOpen(false);
              setAppointmentBooked(false);
            }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.94, y: 18 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.94, y: 12 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg rounded-3xl bg-white border border-[#E8DFD3] p-6 sm:p-8 shadow-2xl relative"
            >
              <button
                type="button"
                onClick={() => {
                  setStoreModalOpen(false);
                  setAppointmentBooked(false);
                }}
                aria-label="Close modal"
                className="absolute top-5 right-5 w-8 h-8 rounded-full hover:bg-[#F5EFE7] flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              {appointmentBooked ? (
                <div className="text-center py-8">
                  <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto mb-3" />
                  <h3 className="text-[22px] font-extrabold text-[#141110]">
                    Private Viewing Confirmed
                  </h3>
                  <p className="text-[14px] text-[#57534E] mt-2">
                    We look forward to welcoming you at{" "}
                    <strong className="text-[#7A1426]">{selectedBoutique}</strong>{" "}
                    with freshly unrolled Kanjivarams and filter kaapi.
                  </p>
                </div>
              ) : (
                <>
                  <p className="text-[11px] font-bold tracking-[0.24em] text-[#8F6520] uppercase">
                    Private Heritage Salon
                  </p>
                  <h3 className="mt-1 text-[26px] font-extrabold text-[#141110]">
                    Visit the NAVDEEP Store
                  </h3>
                  <p className="mt-2 text-[14px] text-[#57534E]">
                    Experience our temple looms and bridal archive in person with
                    a dedicated master draper.
                  </p>

                  <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      {
                        name: "Kanchipuram Flagship",
                        addr: "48 Gandhi Rd, Pillaiyarpalayam",
                      },
                      {
                        name: "Chennai Alwarpet",
                        addr: "14 Poes Garden Rd, Alwarpet",
                      },
                    ].map((loc) => (
                      <button
                        key={loc.name}
                        type="button"
                        onClick={() => setSelectedBoutique(loc.name)}
                        className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                          selectedBoutique === loc.name
                            ? "border-[#7A1426] bg-[#7A1426]/5"
                            : "border-[#E8DFD3] hover:border-[#C6943B]"
                        }`}
                      >
                        <div className="flex items-center gap-1.5 text-[13px] font-bold text-[#141110]">
                          <MapPin className="w-3.5 h-3.5 text-[#7A1426]" />
                          {loc.name}
                        </div>
                        <p className="text-[11px] text-[#78716C] mt-1">
                          {loc.addr}
                        </p>
                      </button>
                    ))}
                  </div>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setAppointmentBooked(true);
                    }}
                    className="mt-5 space-y-3"
                  >
                    <input
                      type="text"
                      required
                      placeholder="Your full name"
                      className="w-full px-4 py-2.5 rounded-xl border border-[#E2D9CC] text-[14px] focus:border-[#7A1426] focus:outline-none"
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="tel"
                        required
                        placeholder="+91 98XXX XXXXX"
                        className="w-full px-4 py-2.5 rounded-xl border border-[#E2D9CC] text-[14px] focus:border-[#7A1426] focus:outline-none"
                      />
                      <div className="relative">
                        <input
                          type="date"
                          required
                          className="w-full px-4 py-2.5 rounded-xl border border-[#E2D9CC] text-[14px] focus:border-[#7A1426] focus:outline-none"
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="w-full mt-2 py-3 rounded-full bg-gradient-to-r from-[#851529] to-[#6B0F1F] text-white text-[14px] font-semibold flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                    >
                      <Calendar className="w-4 h-4" />
                      <span>Book Private Viewing</span>
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
