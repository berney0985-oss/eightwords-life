import Link from "next/link";
import { mainNavigation, primaryCta } from "@/data/navigation";
import { Logo } from "@/components/brand/Logo";
import { MobileNavigation } from "./MobileNavigation";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-mist bg-paper/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* 桌面顯示徽記＋中英名；手機隱藏英文名維持高度與可用性 */}
        <Link href="/" aria-label="科學決策 首頁">
          <span className="hidden sm:inline-flex"><Logo showEnglish tone="default" /></span>
          <span className="inline-flex sm:hidden"><Logo showEnglish={false} tone="default" /></span>
        </Link>

        <nav aria-label="主導覽" className="hidden items-center gap-6 lg:flex">
          {mainNavigation
            .filter((item) => item.href !== "/")
            .map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-graphite transition-colors hover:text-ink"
              >
                {item.label}
              </Link>
            ))}
          <Link
            href={primaryCta.href}
            className="rounded-sm bg-ink px-4 py-2 text-sm text-paper transition-colors hover:bg-ink-soft"
          >
            {primaryCta.label}
          </Link>
        </nav>

        <MobileNavigation />
      </div>
    </header>
  );
}
