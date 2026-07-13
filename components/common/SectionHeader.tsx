/** 區塊標題：眉標（金色小字）＋主標＋可選副標。 */
export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  as: Heading = "h2",
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  as?: "h1" | "h2" | "h3";
}) {
  return (
    <div className="mb-8">
      {eyebrow && (
        <p className="mb-2 text-xs font-medium tracking-[0.18em] text-gold">
          {eyebrow}
        </p>
      )}
      <Heading className="font-serif text-2xl font-semibold leading-snug text-ink sm:text-3xl">
        {title}
      </Heading>
      {subtitle && (
        <p className="mt-3 max-w-prose leading-relaxed text-graphite">
          {subtitle}
        </p>
      )}
    </div>
  );
}
