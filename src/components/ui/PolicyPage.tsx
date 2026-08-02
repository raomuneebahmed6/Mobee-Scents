import { Container } from "@/components/ui/Container";

interface PolicySection {
  heading: string;
  body: string[];
}

export function PolicyPage({
  title,
  updated,
  intro,
  sections,
}: {
  title: string;
  updated: string;
  intro: string;
  sections: PolicySection[];
}) {
  return (
    <div className="bg-ivory pt-32 pb-24">
      <Container className="max-w-3xl">
        <p className="text-xs font-medium tracking-[0.28em] text-gold uppercase">Legal</p>
        <h1 className="mt-3 font-serif text-4xl text-charcoal sm:text-5xl">{title}</h1>
        <p className="mt-3 text-xs text-charcoal/45">Last updated: {updated}</p>
        <p className="mt-6 text-[15px] leading-relaxed text-charcoal/65">{intro}</p>

        <div className="mt-12 space-y-10">
          {sections.map((s) => (
            <div key={s.heading}>
              <h2 className="font-serif text-xl text-charcoal">{s.heading}</h2>
              <div className="mt-3 space-y-3">
                {s.body.map((p, i) => (
                  <p key={i} className="text-sm leading-relaxed text-charcoal/65">
                    {p}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
