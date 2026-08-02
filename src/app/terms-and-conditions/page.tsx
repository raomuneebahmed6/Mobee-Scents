import type { Metadata } from "next";
import { PolicyPage } from "@/components/ui/PolicyPage";

export const metadata: Metadata = { title: "Terms & Conditions" };

export default function TermsPage() {
  return (
    <PolicyPage
      title="Terms & Conditions"
      updated="August 2026"
      intro="By accessing or using the Mobee Scents website, you agree to the following terms. Please read them carefully before placing an order."
      sections={[
        {
          heading: "Use of This Site",
          body: [
            "This website and its content are provided for your personal, non-commercial use. You agree not to misuse the site, attempt to disrupt its operation, or reproduce its content without permission.",
          ],
        },
        {
          heading: "Product Information & Pricing",
          body: [
            "We aim to describe our fragrances and pricing as accurately as possible. Colours, bottle imagery, and scent descriptions are provided as a guide — actual product experience may vary slightly.",
            "Prices are listed in PKR and are subject to change without prior notice.",
          ],
        },
        {
          heading: "Orders",
          body: [
            "Placing an order constitutes an offer to purchase. We reserve the right to refuse or cancel an order in cases of pricing errors, suspected fraud, or stock unavailability.",
          ],
        },
        {
          heading: "Limitation of Liability",
          body: [
            "Mobee Scents is not liable for indirect or incidental damages arising from the use of our products or website, to the extent permitted by law.",
          ],
        },
        {
          heading: "Governing Law",
          body: ["These terms are governed by the laws of Pakistan."],
        },
      ]}
    />
  );
}
