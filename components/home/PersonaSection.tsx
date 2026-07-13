import Link from "next/link";
import { clusters } from "@/data/clusters";
import { personas } from "@/data/personas";

/** 首頁第五區：九種決策人格。資料層級：A（原文欄位）；八字來源置次要位置。 */
export function PersonaSection() {
  return (
    <section className="border-b border-mist bg-paper-raised">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <h2 className="font-serif text-2xl font-semibold text-ink sm:text-3xl">
          九種決策人格
        </h2>
        <p className="mt-3 max-w-prose leading-relaxed text-graphite">
          九種決策人格不是把人貼上固定標籤，而是用一套共同語言，
          理解不同的核心需求、思考方式、行動模式與決策慣性。
        </p>
        <div className="mt-10 space-y-10">
          {clusters.map((cluster) => (
            <div key={cluster.id}>
              <h3 className="text-sm font-medium tracking-[0.18em] text-gold">
                {cluster.displayName}
              </h3>
              <div className="mt-4 grid gap-4 sm:grid-cols-3">
                {cluster.includedPersonaIds.map((pid) => {
                  const p = personas.find((x) => x.id === pid);
                  if (!p) return null;
                  return (
                    <article
                      key={p.id}
                      className="flex flex-col rounded-sm border border-mist bg-paper p-5"
                    >
                      <h4 className="font-serif text-lg font-semibold text-ink">
                        {p.displayName}
                      </h4>
                      <p className="mt-1 text-xs text-stone">
                        {cluster.displayName}・核心需求：{p.corePersona.coreNeed}
                      </p>
                      <p className="mt-3 flex-1 text-sm leading-relaxed text-graphite">
                        {p.corePersona.oneLineDefinition}
                      </p>
                      <p className="mt-4 text-xs text-stone">
                        模型來源：{p.baziSource}
                      </p>
                      <Link
                        href={`/personas/${p.slug}`}
                        className="mt-2 text-sm font-medium text-gold transition-colors hover:text-gold-deep"
                      >
                        查看人格 →
                      </Link>
                    </article>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
