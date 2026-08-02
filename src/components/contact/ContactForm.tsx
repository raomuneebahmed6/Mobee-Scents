"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface FormState {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const initialState: FormState = { name: "", email: "", phone: "", subject: "", message: "" };

export function ContactForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [submitted, setSubmitted] = useState(false);

  const update = (key: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    setErrors((err) => ({ ...err, [key]: undefined }));
  };

  const validate = (): boolean => {
    const next: Partial<FormState> = {};
    if (!form.name.trim()) next.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = "Please enter a valid email.";
    if (!form.subject.trim()) next.subject = "Please add a subject.";
    if (!form.message.trim() || form.message.trim().length < 10) next.message = "Message should be at least 10 characters.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
    setForm(initialState);
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-start gap-3 border border-gold/40 bg-cream/40 p-8"
      >
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/20 text-gold">
          <Check size={18} />
        </span>
        <p className="font-serif text-xl text-charcoal">Message sent</p>
        <p className="text-sm text-charcoal/60">
          Thank you for reaching out. Our team will get back to you within one business day.
        </p>
        <button onClick={() => setSubmitted(false)} className="mt-2 border-b border-charcoal/30 pb-0.5 text-sm text-charcoal hover:border-gold">
          Send another message
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Full Name" error={errors.name}>
          <input value={form.name} onChange={update("name")} type="text" className="field" placeholder="Your name" />
        </Field>
        <Field label="Email Address" error={errors.email}>
          <input value={form.email} onChange={update("email")} type="email" className="field" placeholder="you@example.com" />
        </Field>
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Phone Number" optional>
          <input value={form.phone} onChange={update("phone")} type="tel" className="field" placeholder="+92 3XX XXXXXXX" />
        </Field>
        <Field label="Subject" error={errors.subject}>
          <input value={form.subject} onChange={update("subject")} type="text" className="field" placeholder="How can we help?" />
        </Field>
      </div>
      <Field label="Message" error={errors.message}>
        <textarea
          value={form.message}
          onChange={update("message")}
          rows={5}
          className="field resize-none"
          placeholder="Tell us more…"
        />
      </Field>

      <AnimatePresence>{null}</AnimatePresence>
      <Button type="submit" size="lg" className="w-full justify-center sm:w-auto">
        Send Message
      </Button>

      <style jsx>{`
        :global(.field) {
          width: 100%;
          border: 1px solid rgba(28, 26, 23, 0.2);
          background: transparent;
          padding: 0.75rem 1rem;
          font-size: 0.9rem;
          color: #1c1a17;
        }
        :global(.field:focus) {
          outline: none;
          border-color: #b3924f;
        }
        :global(.field::placeholder) {
          color: rgba(28, 26, 23, 0.4);
        }
      `}</style>
    </form>
  );
}

function Field({
  label,
  error,
  optional,
  children,
}: {
  label: string;
  error?: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium tracking-[0.1em] text-charcoal/60 uppercase">
        {label} {optional && <span className="normal-case text-charcoal/35">(optional)</span>}
      </span>
      {children}
      {error && <span className="mt-1 block text-xs text-red-700">{error}</span>}
    </label>
  );
}
