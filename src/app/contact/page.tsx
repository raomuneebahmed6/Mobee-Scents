import type { Metadata } from "next";
import { Mail, Phone, MapPin, Clock, MessageCircle } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ContactForm } from "@/components/contact/ContactForm";
import { InstagramIcon, FacebookIcon, TwitterIcon } from "@/components/ui/SocialIcons";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with the Mobee Scents team — questions about orders, fragrances, or sizing.",
};

// TO CUSTOMIZE: update the WhatsApp number, email, phone, address, and social links below.
const WHATSAPP_NUMBER = "923001234567";
const CONTACT_EMAIL = "support@mobeescents.com";
const CONTACT_PHONE = "+92 300 1234567";

export default function ContactPage() {
  return (
    <div className="bg-ivory pt-32 pb-24">
      <Container>
        <div className="max-w-2xl">
          <p className="text-xs font-medium tracking-[0.28em] text-gold uppercase">Get in Touch</p>
          <h1 className="mt-3 font-serif text-4xl text-charcoal sm:text-5xl">Contact Us</h1>
          <p className="mt-4 text-[15px] leading-relaxed text-charcoal/60">
            Questions about a fragrance, an order, or a size? We usually reply within one business day.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-16 lg:grid-cols-12">
          <Reveal className="col-span-1 lg:col-span-7">
            <ContactForm />
          </Reveal>

          <Reveal delay={0.1} className="col-span-1 space-y-8 lg:col-span-4 lg:col-start-9">
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 border border-charcoal/15 px-5 py-4 text-sm text-charcoal transition-colors hover:border-gold hover:text-gold"
            >
              <MessageCircle size={18} strokeWidth={1.5} /> Chat with us on WhatsApp
            </a>

            <div className="space-y-5 text-sm text-charcoal/70">
              <InfoRow icon={Mail} label="Email">
                {CONTACT_EMAIL}
              </InfoRow>
              <InfoRow icon={Phone} label="Phone">
                {CONTACT_PHONE}
              </InfoRow>
              <InfoRow icon={MapPin} label="Studio">
                Gulberg III, Lahore, Pakistan
              </InfoRow>
              <InfoRow icon={Clock} label="Business Hours">
                Mon – Sat, 10:00 AM – 8:00 PM PKT
              </InfoRow>
            </div>

            <div>
              <p className="mb-3 text-xs tracking-[0.2em] text-charcoal/45 uppercase">Follow Us</p>
              <div className="flex gap-3">
                <a href="#" aria-label="Instagram" className="rounded-full border border-charcoal/15 p-2.5 text-charcoal/70 hover:border-gold hover:text-gold">
                  <InstagramIcon width={16} height={16} />
                </a>
                <a href="#" aria-label="Facebook" className="rounded-full border border-charcoal/15 p-2.5 text-charcoal/70 hover:border-gold hover:text-gold">
                  <FacebookIcon width={16} height={16} />
                </a>
                <a href="#" aria-label="Twitter" className="rounded-full border border-charcoal/15 p-2.5 text-charcoal/70 hover:border-gold hover:text-gold">
                  <TwitterIcon width={16} height={16} />
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </div>
  );
}

function InfoRow({ icon: Icon, label, children }: { icon: React.ElementType; label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3">
      <Icon size={16} strokeWidth={1.5} className="mt-0.5 text-gold" />
      <div>
        <p className="text-xs tracking-[0.1em] text-charcoal/40 uppercase">{label}</p>
        <p className="mt-0.5">{children}</p>
      </div>
    </div>
  );
}
