"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { X, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { products } from "@/data/products";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { PerfumeBottle } from "@/components/ui/PerfumeBottle";

export function CartDrawer() {
  const { isOpen, closeCart, lines, subtotal, updateQuantity, removeItem } = useCart();
  const [checkedOut, setCheckedOut] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      // Reset the checkout confirmation each time the drawer is reopened.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCheckedOut(false);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 right-0 z-[70] flex h-full w-full max-w-md flex-col bg-ivory"
            aria-label="Shopping cart"
          >
            <div className="flex items-center justify-between border-b border-charcoal/10 px-6 py-6">
              <h2 className="font-serif text-2xl text-charcoal">Your Bag ({lines.length})</h2>
              <button
                aria-label="Close cart"
                onClick={closeCart}
                className="rounded-full p-2 text-charcoal/70 hover:bg-charcoal/5"
              >
                <X size={20} strokeWidth={1.5} />
              </button>
            </div>

            {lines.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
                <ShoppingBag size={40} strokeWidth={1} className="text-charcoal/30" />
                <p className="text-charcoal/60">Your bag is empty.</p>
                <Button href="/shop" onClick={closeCart} withArrow>
                  Shop the Collection
                </Button>
              </div>
            ) : (
              <>
                <div className="no-scrollbar flex-1 space-y-6 overflow-y-auto px-6 py-6">
                  {lines.map((line) => {
                    const product = products.find((p) => p.id === line.productId);
                    if (!product) return null;
                    return (
                      <motion.div
                        key={`${line.productId}-${line.size}`}
                        layout
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="flex gap-4"
                      >
                        <div className="h-24 w-20 shrink-0 rounded-md bg-charcoal/[0.04] p-2">
                          <PerfumeBottle
                            variant={product.bottleVariant}
                            accent={product.accent}
                            accentSoft={product.accentSoft}
                            glow={false}
                          />
                        </div>
                        <div className="flex flex-1 flex-col">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <p className="font-serif text-lg leading-tight text-charcoal">{product.name}</p>
                              <p className="mt-0.5 text-xs text-charcoal/50">{line.size}</p>
                            </div>
                            <button
                              aria-label="Remove item"
                              onClick={() => removeItem(line.productId, line.size)}
                              className="text-charcoal/40 hover:text-charcoal"
                            >
                              <Trash2 size={16} strokeWidth={1.5} />
                            </button>
                          </div>
                          <div className="mt-auto flex items-center justify-between">
                            <div className="flex items-center gap-3 border border-charcoal/15 px-2 py-1">
                              <button
                                aria-label="Decrease quantity"
                                onClick={() => updateQuantity(line.productId, line.size, line.quantity - 1)}
                                className="text-charcoal/60 hover:text-charcoal"
                              >
                                <Minus size={13} strokeWidth={1.5} />
                              </button>
                              <span className="w-4 text-center text-sm">{line.quantity}</span>
                              <button
                                aria-label="Increase quantity"
                                onClick={() => updateQuantity(line.productId, line.size, line.quantity + 1)}
                                className="text-charcoal/60 hover:text-charcoal"
                              >
                                <Plus size={13} strokeWidth={1.5} />
                              </button>
                            </div>
                            <span className="font-medium text-charcoal">
                              {formatPrice(line.unitPrice * line.quantity)}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                <div className="border-t border-charcoal/10 px-6 py-6">
                  <AnimatePresence mode="wait">
                    {checkedOut ? (
                      <motion.p
                        key="success"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="rounded-md bg-charcoal/5 px-4 py-3 text-center text-sm text-charcoal/70"
                      >
                        Thank you — your order request has been noted. Our team will reach out to confirm delivery
                        details.
                      </motion.p>
                    ) : (
                      <motion.div key="summary" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <div className="mb-4 flex items-center justify-between text-sm text-charcoal/60">
                          <span>Subtotal</span>
                          <span className="font-serif text-xl text-charcoal">{formatPrice(subtotal)}</span>
                        </div>
                        <p className="mb-4 text-xs text-charcoal/45">Shipping and taxes calculated at checkout.</p>
                        <Button className="w-full justify-center" size="lg" onClick={() => setCheckedOut(true)}>
                          Checkout
                        </Button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
