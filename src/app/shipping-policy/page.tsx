import type { Metadata } from "next";
import { PolicyPage } from "@/components/ui/PolicyPage";

export const metadata: Metadata = { title: "Shipping Policy" };

export default function ShippingPolicyPage() {
  return (
    <PolicyPage
      title="Shipping Policy"
      updated="August 2026"
      intro="We aim to get every order packed and on its way as quickly as possible, without compromising on presentation."
      sections={[
        {
          heading: "Processing Time",
          body: ["Orders are processed and dispatched within 24–48 hours of confirmation, Monday through Saturday."],
        },
        {
          heading: "Delivery Estimates",
          body: [
            "Major cities (Lahore, Karachi, Islamabad, Rawalpindi): 1–3 business days.",
            "All other cities across Pakistan: 3–5 business days.",
            "International shipping is currently unavailable — we're working on it.",
          ],
        },
        {
          heading: "Shipping Charges",
          body: [
            "A flat shipping fee applies to all orders, calculated at checkout. Orders above a promotional threshold may qualify for free shipping.",
          ],
        },
        {
          heading: "Tracking Your Order",
          body: [
            "You'll receive a tracking link by email or SMS once your order is dispatched. For any delivery questions, reach out via our Contact page or WhatsApp.",
          ],
        },
      ]}
    />
  );
}
