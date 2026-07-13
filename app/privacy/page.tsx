import type { Metadata } from "next";
import { PageContainer } from "@/components/layout/PageContainer";
import { SectionHeader } from "@/components/common/SectionHeader";
import { siteConfig } from "@/data/site-config";

export const metadata: Metadata = {
  title: "隱私政策",
  description: "科學決策的隱私政策：測驗進度與結果目前只儲存在你裝置的瀏覽器中。",
  alternates: { canonical: "/privacy" },
};

/** 文案層級：C；依專案指令書第二十五節，採保守準確表述。 */
export default function PrivacyPage() {
  return (
    <PageContainer width="narrow">
      <SectionHeader as="h1" eyebrow="PRIVACY" title="隱私政策" />
      <div className="max-w-prose space-y-6 leading-relaxed text-graphite">
        <section>
          <h2 className="font-serif text-lg font-semibold text-ink">測驗資料的儲存方式</h2>
          <p className="mt-3">
            外顯決策風格測驗的進度與結果，目前只儲存在你裝置的瀏覽器中
            （LocalStorage），不會上傳到任何伺服器或資料庫。
          </p>
          <p className="mt-3">
            這也代表：清除瀏覽器資料、更換裝置或使用無痕模式後，
            進度與結果可能消失，且無法由我們協助復原。
          </p>
        </section>
        <section>
          <h2 className="font-serif text-lg font-semibold text-ink">我們目前不做的事</h2>
          <p className="mt-3">
            本網站目前不建立會員帳號，不要求你提供姓名、生日或聯絡方式，
            不將測驗答案上傳資料庫，也不販售任何個人資料。
          </p>
        </section>
        <section>
          <h2 className="font-serif text-lg font-semibold text-ink">技術性資料</h2>
          <p className="mt-3">
            本網站由網站框架與部署平台提供服務，
            相關基礎設施可能為了正常運作而處理必要的技術性資料（例如瀏覽器發出的標準請求資訊）。
            本網站自身未設定額外的追蹤 Cookie。
          </p>
        </section>
        <section>
          <h2 className="font-serif text-lg font-semibold text-ink">未來的變更</h2>
          <p className="mt-3">
            如果未來加入分析工具、表單、會員、付款或 AI 功能，
            我們會先更新本隱私政策，說明新增的資料處理方式。
          </p>
        </section>
        <p className="text-sm text-stone">本頁最後更新：{siteConfig.legal.privacyLastUpdated}。</p>
      </div>
    </PageContainer>
  );
}
