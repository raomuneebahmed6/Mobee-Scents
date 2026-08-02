"use client";

import Link from "next/link";
import { useState } from "react";
import { MapPin, Mail, Phone, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { InstagramIcon, FacebookIcon, TwitterIcon } from "@/components/ui/SocialIcons";

const shopLinks = [
  { label: "All Fragrances", href: "/shop" },
  { label: "Collections", href: "/collections" },
  { label: "Best Sellers", href: "/shop?sort=rating" },
  { label: "New Arrivals", href: "/shop" },
];

const supportLinks = [
  { label: "Contact Us", href: "/contact" },
  { label: "About Mobee Scents", href: "/about" },
  { label: "Wishlist", href: "/wishlist" },
  { label: "Track Order", href: "/contact" },
];

const policyLinks = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms-and-conditions" },
  { label: "Shipping Policy", href: "/shipping-policy" },
  { label: "Return Policy", href: "/return-policy" },
];

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="border-t border-ivory/10 bg-charcoal text-ivory">
      <Container className="grid grid-cols-1 gap-12 py-16 sm:grid-cols-2 lg:grid-cols-5 lg:gap-8">
        <div className="sm:col-span-2 lg:col-span-2">
          <Logo dark />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-ivory/60">
            Mobee Scents is a fragrance house dedicated to compositions that are worn, remembered, and reached for
            again. Discover your signature scent.
          </p>
          <div className="mt-6 flex gap-4">
            <a href="#" aria-label="Instagram" className="rounded-full border border-ivory/15 p-2 text-ivory/70 transition-colors hover:border-gold hover:text-gold">
              <InstagramIcon width={16} height={16} />
            </a>
            <a href="#" aria-label="Facebook" className="rounded-full border border-ivory/15 p-2 text-ivory/70 transition-colors hover:border-gold hover:text-gold">
              <FacebookIcon width={16} height={16} />
            </a>
            <a href="#" aria-label="Twitter" className="rounded-full border border-ivory/15 p-2 text-ivory/70 transition-colors hover:border-gold hover:text-gold">
              <TwitterIcon width={16} height={16} />
            </a>
          </div>
        </div>

        <FooterColumn title="Shop" links={shopLinks} />
        <FooterColumn title="Support" links={supportLinks} />
        <FooterColumn title="Policies" links={policyLinks} />
      </Container>

      <Container className="border-t border-ivory/10 py-10">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-center">
          <div className="flex flex-col gap-3 text-sm text-ivory/60 sm:flex-row sm:gap-8">
            {/* Replace with your real store address */}
            <span className="flex items-center gap-2">
              <MapPin size={15} strokeWidth={1.5} className="text-gold" /> Gulberg III, Lahore, Pakistan
            </span>
            {/* Replace with your real support email */}
            <span className="flex items-center gap-2">
              <Mail size={15} strokeWidth={1.5} className="text-gold" /> support@mobeescents.com
            </span>
            {/* Replace with your real phone / WhatsApp number */}
            <span className="flex items-center gap-2">
              <Phone size={15} strokeWidth={1.5} className="text-gold" /> +92 300 1234567
            </span>
          </div>

          <form onSubmit={handleSubmit} className="flex items-center gap-2 lg:justify-self-end">
            {subscribed ? (
              <p className="text-sm text-gold">Thank you for subscribing.</p>
            ) : (
              <>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="w-56 border-b border-ivory/25 bg-transparent py-2 text-sm text-ivory placeholder:text-ivory/40 focus:border-gold focus:outline-none"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="flex items-center gap-1 border-b border-gold pb-2 text-xs tracking-[0.15em] text-gold uppercase"
                >
                  Subscribe <ArrowRight size={14} />
                </button>
              </>
            )}
          </form>
        </div>
      </Container>

      <div className="border-t border-ivory/10 py-6">
        <Container className="flex flex-col items-center justify-between gap-3 text-xs text-ivory/45 sm:flex-row">
          <p>© {new Date().getFullYear()} Mobee Scents. All rights reserved.</p>
          <p>Discover Your Signature Scent</p>
        </Container>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <p className="mb-4 text-xs font-medium tracking-[0.2em] text-ivory/50 uppercase">{title}</p>
      <ul className="space-y-2.5">
        {links.map((link) => (
          <li key={link.label}>
            <Link href={link.href} className="text-sm text-ivory/70 transition-colors hover:text-gold">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
