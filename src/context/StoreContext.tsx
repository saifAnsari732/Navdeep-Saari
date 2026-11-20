"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import type { ProductItem } from "@/data/catalog";

export interface BagEntry extends ProductItem {
  quantity: number;
  bundleDiscount?: boolean;
}

interface StoreContextValue {
  bag: BagEntry[];
  wishlist: ProductItem[];
  bagOpen: boolean;
  wishlistOpen: boolean;
  storeModalOpen: boolean;
  toast: string | null;
  setBagOpen: (open: boolean) => void;
  setWishlistOpen: (open: boolean) => void;
  setStoreModalOpen: (open: boolean) => void;
  addToBag: (item: ProductItem, silent?: boolean) => void;
  addBundleToBag: (items: ProductItem[], lookName: string) => void;
  updateQty: (id: string, delta: number) => void;
  removeFromBag: (id: string) => void;
  clearBag: () => void;
  toggleWishlist: (item: ProductItem) => void;
  isWishlisted: (id: string) => boolean;
  bagCount: number;
  bagSubtotal: number;
}

const StoreContext = createContext<StoreContextValue | null>(null);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [bag, setBag] = useState<BagEntry[]>([]);
  const [wishlist, setWishlist] = useState<ProductItem[]>([]);
  const [bagOpen, setBagOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [storeModalOpen, setStoreModalOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    setTimeout(() => {
      setToast((prev) => (prev === msg ? null : prev));
    }, 2800);
  }, []);

  const addToBag = useCallback(
    (item: ProductItem, silent = false) => {
      setBag((prev) => {
        const key = item.size ? `${item.id}-${item.size}` : item.id;
        const existing = prev.find((i) => (i.size ? `${i.id}-${i.size}` : i.id) === key);
        if (existing) {
          return prev.map((i) =>
            (i.size ? `${i.id}-${i.size}` : i.id) === key
              ? { ...i, quantity: i.quantity + 1 }
              : i
          );
        }
        return [...prev, { ...item, quantity: 1 }];
      });
      if (!silent) {
        showToast(`Added "${item.name}" to your silk bag`);
      }
    },
    [showToast]
  );

  const addBundleToBag = useCallback(
    (items: ProductItem[], lookName: string) => {
      setBag((prev) => {
        const next = [...prev];
        for (const item of items) {
          const discountedPrice = Math.round(item.price * 0.9);
          const idx = next.findIndex((i) => i.id === item.id);
          if (idx >= 0) {
            next[idx] = { ...next[idx], quantity: next[idx].quantity + 1 };
          } else {
            next.push({ ...item, price: discountedPrice, quantity: 1, bundleDiscount: true });
          }
        }
        return next;
      });
      showToast(`Full "${lookName}" look added (10% bundle savings applied)`);
      setBagOpen(true);
    },
    [showToast]
  );

  const updateQty = useCallback((id: string, delta: number) => {
    setBag((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item
        )
        .filter((item) => item.quantity > 0)
    );
  }, []);

  const removeFromBag = useCallback((id: string) => {
    setBag((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const clearBag = useCallback(() => setBag([]), []);

  const toggleWishlist = useCallback(
    (item: ProductItem) => {
      setWishlist((prev) => {
        const exists = prev.some((i) => i.id === item.id);
        if (exists) {
          showToast(`Removed "${item.name}" from wishlist`);
          return prev.filter((i) => i.id !== item.id);
        }
        showToast(`Saved "${item.name}" to wishlist`);
        return [...prev, item];
      });
    },
    [showToast]
  );

  const isWishlisted = useCallback(
    (id: string) => wishlist.some((i) => i.id === id),
    [wishlist]
  );

  const bagCount = bag.reduce((sum, item) => sum + item.quantity, 0);
  const bagSubtotal = bag.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <StoreContext.Provider
      value={{
        bag,
        wishlist,
        bagOpen,
        wishlistOpen,
        storeModalOpen,
        toast,
        setBagOpen,
        setWishlistOpen,
        setStoreModalOpen,
        addToBag,
        addBundleToBag,
        updateQty,
        removeFromBag,
        clearBag,
        toggleWishlist,
        isWishlisted,
        bagCount,
        bagSubtotal,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside StoreProvider");
  return ctx;
}
