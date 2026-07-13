import Link from "next/link";
import { services } from "@/data/services";

/** 首頁第十區：服務。資料層級：C（data/services.ts）。 */
export function ServicesSection() {
  return (
    <section className="border-b border-mist bg-paper-raised">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <h2 className="font-serif text-2xl font-semibold text-ink sm:text-3xl">
          服務
        </h2>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <article key={s.id} className="rounded-sm border border-mist bg-paper p-5">
              <h3 className="font-serif text-base font-semibold leading-snug text-ink">
                {s.name}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-graphite">{s.summary}</p>
            </article>
          ))}
        </div>
        <Link
          href="/services"
          className="mt-8 inline-block text-sm font-medium text-gold transition-colors hover:text-gold-deep"
        >
          查看服務方案 →
        </Link>
      </div>
    </section>
  );
}
