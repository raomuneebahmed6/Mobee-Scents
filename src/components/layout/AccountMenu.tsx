"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/Button";

export function AccountMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    if (open) document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: -8, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.98 }}
          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="absolute top-full right-0 mt-3 w-72 rounded-lg border border-charcoal/10 bg-ivory p-6 shadow-xl"
        >
          <p className="font-serif text-lg text-charcoal">Welcome</p>
          <p className="mt-1 text-xs text-charcoal/55">
            Sign in to track orders, save your wishlist across devices, and checkout faster.
          </p>
          <div className="mt-4 flex flex-col gap-2">
            <Button size="md" className="w-full justify-center">
              Sign In
            </Button>
            <Button variant="secondary" size="md" className="w-full justify-center">
              Create Account
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
