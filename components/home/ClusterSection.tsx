import Link from "next/link";
import { clusters } from "@/data/clusters";
import { personas } from "@/data/personas";

/** 首頁第四區：三大決策系。資料層級：A（clusters.ts / personas.ts 原文欄位）。 */
export function ClusterSection() {
  return (
    <section className="border-b border-mist">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <h2 className="font-serif text-2xl font-semibold text-ink sm:text-3xl">
          三大決策系
        </h2>
        <p className="mt-3 max-w-prose leading-relaxed text-graphite">
          面對不確定性，每個人都有自己的預設策略。
        </p>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {clusters.map((cluster) => (
            <article
              key={cluster.id}
              className="flex flex-col rounded-sm border border-mist bg-paper-raised p-6"
            >
              <h3 className="font-serif text-xl font-semibold text-ink">
                {cluster.displayName}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-graphite">
                {cluster.coreStrategy}
              </p>
              <ul className="mt-6 space-y-1 text-sm text-ink">
                {cluster.includedPersonaIds.map((pid) => {
                  const p = personas.find((x) => x.id === pid);
                  return p ? <li key={pid}>{p.displayName}</li> : null;
                })}
              </ul>
              <Link
                href={`/clusters/${cluster.slug}`}
                className="mt-6 text-sm font-medium text-gold transition-colors hover:text-gold-deep"
              >
                認識{cluster.displayName} →
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
