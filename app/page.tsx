import type { Metadata } from "next";
import { HeroSection } from "@/components/home/HeroSection";
import { EntriesSection } from "@/components/home/EntriesSection";
import { WhyFourSection } from "@/components/home/WhyFourSection";
import { EightWordsSection } from "@/components/home/EightWordsSection";
import { CaseSection } from "@/components/home/CaseSection";
import { FounderTeaser } from "@/components/home/FounderTeaser";
import { FinalCTASection } from "@/components/home/FinalCTASection";

export const metadata: Metadata = {
  title: "科學決策｜理解你如何做決定",
  description:
    "科學決策是一個決策分析平台。工作分析、感情分析、科學八字分析與決策引擎，幫助你理解自己的決策模式。不是預測未來，而是修正決策。",
  alternates: { canonical: "/" },
};

/**
 * 首頁（漏斗式，四入口平權）：
 * Hero → 四入口 → 為什麼有四種分析 → 科學八字模型 → 案例 → 品牌故事 → 結尾 CTA。
 */
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <EntriesSection />
      <WhyFourSection />
      <EightWordsSection />
      <CaseSection />
      <FounderTeaser />
      <FinalCTASection />
    </>
  );
}
