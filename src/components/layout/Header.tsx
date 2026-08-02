"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, Search, User, ShoppingBag, Heart } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { cn } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { SearchOverlay } from "@/components/layout/SearchOverlay";
import { AccountMenu } from "@/components/layout/AccountMenu";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Collections", href: "/collections" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);

  const { itemCount, openCart } = useCart();
  const { ids } = useWishlist();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = scrolled || !isHome || mobileOpen;
  const lightText = !solid;

  return (
    <>
      <header
        className={cn(
          "fixed top-0 z-50 w-full transition-all duration-500",
          solid ? "border-b border-charcoal/10 bg-ivory/95 backdrop-blur-md" : "border-b border-transparent bg-transparent"
        )}
      >
        <div className="mx-auto flex h-20 max-w-[1400px] items-center justify-between px-6 md:px-10 lg:px-16">
          <Logo dark={lightText} />

          <nav className="hidden items-center gap-9 lg:flex">
            {NAV_LINKS.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative text-[13px] font-medium tracking-[0.12em] uppercase transition-colors duration-300",
                    lightText ? "text-ivory/90 hover:text-ivory" : "text-charcoal/80 hover:text-charcoal",
                    active && (lightText ? "text-ivory" : "text-charcoal")
                  )}
                >
                  {link.label}
                  <span
                    className={cn(
                      "absolute -bottom-1.5 left-0 h-px w-full origin-left scale-x-0 bg-gold transition-transform duration-300",
                      active && "scale-x-100"
                    )}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-1 sm:gap-2">
            <button
              aria-label="Search"
              onClick={() => setSearchOpen(true)}
              className={cn(
                "hidden rounded-full p-2.5 transition-colors sm:inline-flex",
                lightText ? "text-ivory hover:bg-ivory/10" : "text-charcoal hover:bg-charcoal/5"
              )}
            >
              <Search size={19} strokeWidth={1.5} />
            </button>

            <div className="relative hidden sm:block">
              <button
                aria-label="Account"
                onClick={() => setAccountOpen((v) => !v)}
                className={cn(
                  "rounded-full p-2.5 transition-colors",
                  lightText ? "text-ivory hover:bg-ivory/10" : "text-charcoal hover:bg-charcoal/5"
                )}
              >
                <User size={19} strokeWidth={1.5} />
              </button>
              <AccountMenu open={accountOpen} onClose={() => setAccountOpen(false)} />
            </div>

            <Link
              href="/wishlist"
              aria-label="Wishlist"
              className={cn(
                "relative hidden rounded-full p-2.5 transition-colors sm:inline-flex",
                lightText ? "text-ivory hover:bg-ivory/10" : "text-charcoal hover:bg-charcoal/5"
              )}
            >
              <Heart size={19} strokeWidth={1.5} />
              {ids.length > 0 && (
                <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-gold text-[9px] font-semibold text-charcoal">
                  {ids.length}
                </span>
              )}
            </Link>

            <button
              aria-label="Open cart"
              onClick={openCart}
              className={cn(
                "relative rounded-full p-2.5 transition-colors",
                lightText ? "text-ivory hover:bg-ivory/10" : "text-charcoal hover:bg-charcoal/5"
              )}
            >
              <ShoppingBag size={19} strokeWidth={1.5} />
              <AnimatePresence>
                {itemCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-gold text-[9px] font-semibold text-charcoal"
                  >
                    {itemCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            <button
              aria-label="Open menu"
              onClick={() => setMobileOpen(true)}
              className={cn(
                "ml-1 rounded-full p-2.5 transition-colors lg:hidden",
                lightText ? "text-ivory hover:bg-ivory/10" : "text-charcoal hover:bg-charcoal/5"
              )}
            >
              <Menu size={21} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} links={NAV_LINKS} />
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
