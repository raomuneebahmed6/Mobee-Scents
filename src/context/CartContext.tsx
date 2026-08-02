"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { products } from "@/data/products";
import type { CartItem } from "@/lib/types";
import { useLocalStorage } from "@/hooks/useLocalStorage";

interface CartLine extends CartItem {
  name: string;
  unitPrice: number;
}

interface CartContextValue {
  items: CartItem[];
  lines: CartLine[];
  itemCount: number;
  subtotal: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (productId: string, size: string, quantity?: number) => void;
  removeItem: (productId: string, size: string) => void;
  updateQuantity: (productId: string, size: string, quantity: number) => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useLocalStorage<CartItem[]>("mobee-scents-cart", []);
  const [isOpen, setIsOpen] = useState(false);

  const addItem = (productId: string, size: string, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.productId === productId && i.size === size);
      if (existing) {
        return prev.map((i) =>
          i.productId === productId && i.size === size ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [...prev, { productId, size, quantity }];
    });
    setIsOpen(true);
  };

  const removeItem = (productId: string, size: string) => {
    setItems((prev) => prev.filter((i) => !(i.productId === productId && i.size === size)));
  };

  const updateQuantity = (productId: string, size: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId, size);
      return;
    }
    setItems((prev) =>
      prev.map((i) => (i.productId === productId && i.size === size ? { ...i, quantity } : i))
    );
  };

  const lines: CartLine[] = useMemo(
    () =>
      items
        .map((item) => {
          const product = products.find((p) => p.id === item.productId);
          if (!product) return null;
          const sizeInfo = product.sizes.find((s) => s.label === item.size) ?? product.sizes[0];
          const line: CartLine = {
            ...item,
            name: product.name,
            unitPrice: sizeInfo.price,
          };
          return line;
        })
        .filter((l): l is CartLine => l !== null),
    [items]
  );

  const itemCount = lines.reduce((sum, l) => sum + l.quantity, 0);
  const subtotal = lines.reduce((sum, l) => sum + l.unitPrice * l.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        lines,
        itemCount,
        subtotal,
        isOpen,
        openCart: () => setIsOpen(true),
        closeCart: () => setIsOpen(false),
        addItem,
        removeItem,
        updateQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
