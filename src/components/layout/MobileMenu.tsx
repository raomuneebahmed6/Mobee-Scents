"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X, Search, User, Heart } from "lucide-react";
import { useEffect } from "react";
import { cn } from "@/lib/utils";
import { InstagramIcon, FacebookIcon } from "@/components/ui/SocialIcons";
import { LogoMark } from "@/components/ui/LogoMark";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  links: { label: string; href: string }[];
}

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const pathname = usePathname();

  const links = [
    { label: "Home", href: "/" },
    { label: "Shop", href: "/shop" },
    { label: "Collections", href: "/collections" },
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 right-0 z-[70] flex h-full w-[86%] max-w-sm flex-col bg-charcoal px-8 py-8 text-ivory"
          >
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2.5 font-serif text-xl tracking-wide">
                <LogoMark dark />
                Mobee <span className="text-gold">Scents</span>
              </span>
              <button
                aria-label="Close menu"
                onClick={onClose}
                className="rounded-full p-2 text-ivory/80 hover:bg-ivory/10 hover:text-ivory"
              >
                <X size={22} strokeWidth={1.5} />
              </button>
            </div>

            <nav className="mt-14 flex flex-col gap-1">
              {links.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.06, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    href={link.href}
                    className={cn(
                      "block border-b border-ivory/10 py-4 font-serif text-2xl transition-colors hover:text-gold",
                      pathname === link.href && "text-gold"
                    )}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="mt-10 flex items-center gap-5">
              <Link href="/shop" className="flex items-center gap-2 text-sm text-ivory/70 hover:text-ivory">
                <Search size={17} strokeWidth={1.5} /> Search
              </Link>
              <Link href="/wishlist" className="flex items-center gap-2 text-sm text-ivory/70 hover:text-ivory">
                <Heart size={17} strokeWidth={1.5} /> Wishlist
              </Link>
              <span className="flex items-center gap-2 text-sm text-ivory/70">
                <User size={17} strokeWidth={1.5} /> Account
              </span>
            </div>

            <div className="mt-auto space-y-4 border-t border-ivory/10 pt-6">
              <p className="text-xs tracking-[0.2em] text-ivory/50 uppercase">Follow Us</p>
              <div className="flex gap-4">
                <a href="#" aria-label="Instagram" className="text-ivory/70 hover:text-gold">
                  <InstagramIcon width={19} height={19} />
                </a>
                <a href="#" aria-label="Facebook" className="text-ivory/70 hover:text-gold">
                  <FacebookIcon width={19} height={19} />
                </a>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
