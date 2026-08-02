import type { Metadata } from "next";
import { PolicyPage } from "@/components/ui/PolicyPage";

export const metadata: Metadata = { title: "Return Policy" };

export default function ReturnPolicyPage() {
  return (
    <PolicyPage
      title="Return Policy"
      updated="August 2026"
      intro="Because fragrance is a personal choice, we handle returns and exchanges on a case-by-case basis to make sure you're taken care of."
      sections={[
        {
          heading: "Eligibility",
          body: [
            "Unopened, unused items in their original packaging can be returned within 7 days of delivery for a refund or exchange.",
            "For hygiene reasons, opened or used fragrance bottles cannot be returned unless the product arrived damaged or faulty.",
          ],
        },
        {
          heading: "Damaged or Incorrect Items",
          body: [
            "If your order arrives damaged or you've received the wrong item, contact us within 48 hours of delivery with photos of the product and packaging — we'll arrange a replacement or refund at no extra cost.",
          ],
        },
        {
          heading: "How to Start a Return",
          body: [
            "Email support@mobeescents.com or message us on WhatsApp with your order number and reason for return. Our team will confirm the next steps and pickup or drop-off details.",
          ],
        },
        {
          heading: "Refunds",
          body: [
            "Approved refunds are processed to your original payment method within 5–7 business days of receiving the returned item.",
          ],
        },
      ]}
    />
  );
}
