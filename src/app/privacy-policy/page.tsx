import type { Metadata } from "next";
import { PolicyPage } from "@/components/ui/PolicyPage";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPolicyPage() {
  return (
    <PolicyPage
      title="Privacy Policy"
      updated="August 2026"
      intro="This Privacy Policy explains how Mobee Scents collects, uses, and protects the information you share with us when you browse our website or place an order."
      sections={[
        {
          heading: "Information We Collect",
          body: [
            "When you place an order, subscribe to our newsletter, or contact us, we may collect your name, email address, phone number, shipping address, and any details you include in a message to us.",
            "We also collect basic browsing data such as pages visited and device type to help us improve the site.",
          ],
        },
        {
          heading: "How We Use Your Information",
          body: [
            "We use the information you provide to process and deliver orders, respond to enquiries, send order updates, and — where you've opted in — share newsletter content about new arrivals and offers.",
            "We do not sell your personal information to third parties.",
          ],
        },
        {
          heading: "Cart & Wishlist Data",
          body: [
            "Items you add to your bag or wishlist are stored locally in your browser (localStorage) so they persist between visits. This data is not transmitted to our servers until you complete checkout.",
          ],
        },
        {
          heading: "Your Rights",
          body: [
            "You may request access to, correction of, or deletion of your personal information at any time by contacting us at support@mobeescents.com.",
          ],
        },
        {
          heading: "Contact",
          body: ["Questions about this policy can be sent to support@mobeescents.com."],
        },
      ]}
    />
  );
}
