import Link from "next/link";
import { PageContainer } from "@/components/layout/PageContainer";

export default function NotFound() {
  return (
    <PageContainer width="narrow">
      <div className="py-16 text-center">
        <p className="text-xs font-medium tracking-[0.18em] text-gold">404</p>
        <h1 className="mt-3 font-serif text-2xl font-semibold text-ink">
          找不到這個頁面
        </h1>
        <p className="mt-4 text-graphite">
          頁面可能已移動或不存在。你可以回到首頁，或直接開始免費測驗。
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="rounded-sm border border-ink px-6 py-3 text-ink transition-colors hover:bg-mist"
          >
            回到首頁
          </Link>
          <Link
            href="/assessment"
            className="rounded-sm bg-gold px-6 py-3 font-medium text-paper transition-colors hover:bg-gold-deep"
          >
            開始免費測驗
          </Link>
        </div>
      </div>
    </PageContainer>
  );
}
