import { productById } from "@/data/products";
import { ctaHref } from "@/lib/cta";

/**
 * 付費牆（誠實鎖定版）。
 * - 只顯示「鎖定內容的名稱」，不預先載入任何實際付費內容（無 CSS 假遮）。
 * - CTA 導向 LINE 官方帳號（人工承接）；未啟用時顯示引導文字，不放假連結。
 * - V1 正式環境一律 locked，不聲稱自動解鎖。
 */
export function Paywall({ productId }: { productId: string }) {
  const product = productById(productId);
  if (!product) return null;
  const href = ctaHref(product.ctaKind);

  return (
    <section className="mt-10 rounded-sm border border-gold/40 bg-gold-faint p-6">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="font-serif text-xl font-semibold text-ink">{product.name}</h2>
        <span className="text-sm font-medium text-gold-deep">{product.displayPrice}</span>
      </div>
      <p className="mt-2 max-w-prose text-sm leading-relaxed text-graphite">{product.summary}</p>

      {product.lockedSections.length > 0 && (
        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          {product.lockedSections.map((s) => (
            <li key={s} className="flex items-center gap-2 text-sm text-graphite">
              <span aria-hidden="true" className="text-stone">🔒</span>
              {s}
            </li>
          ))}
        </ul>
      )}

      <p className="mt-5 text-xs leading-relaxed text-stone">
        完整內容為人工分析，目前透過 LINE 官方帳號人工承接，尚未提供線上自動解鎖。
      </p>

      <div className="mt-4">
        {href ? (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-sm bg-ink px-6 py-3 font-medium text-paper transition-colors hover:bg-ink-soft"
          >
            {product.ctaLabel}
          </a>
        ) : (
          <span className="inline-block rounded-sm border border-mist px-6 py-3 text-stone">
            {product.ctaLabel}（即將開放）
          </span>
        )}
      </div>
    </section>
  );
}
