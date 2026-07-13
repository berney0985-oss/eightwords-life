/**
 * 三大決策系資料（Schema 3.0.0）。
 * 內容逐欄位依《科學八字決策系統定義（Final）》v2.2.0 第 4 章原文搬入，
 * 未改寫、未潤飾。欄位對照見 docs/content-source-map.md；
 * 疑似原文問題僅記錄於 docs/data-issues.md，不自行修改。
 */

import type { Cluster } from "@/types/cluster";

export const clusters: Cluster[] = [
  {
    schemaVersion: "3.0.0",
    id: "cluster_stability",
    slug: "stability",
    displayName: "穩定系",
    coreStrategy: "以「降低不確定性」為策略 → 守住秩序。",
    includedPersonaIds: [
      "persona_pragmatist",
      "persona_commander",
      "persona_idealist",
    ],
    needSpectrum: ["穩定", "秩序", "意義"],
    sharedPersona:
      "秩序建構者。相信世界應該有可依循的結構，人生的安全感來自「可預期」。",
    sharedNeed: "降低不確定性。需要明確的規則、可靠的關係、可累積的成果。",
    sharedValues: "責任、可靠、長期主義、名實相符。",
    sharedThinkingPattern:
      "風險優先：先問「會不會出錯、能不能持久」，再問「能得到什麼」。以過去經驗與既有規範為推理依據。",
    sharedDecisionPattern:
      "保守漸進：偏好已驗證的路徑，重大決策傾向延後、求證、徵詢權威或前例。",
    sharedStrength:
      "可靠、可累積、可託付。是組織與家庭的承重牆，長期複利的最大受益者。",
    sharedBlindspot:
      "把「維持現狀」誤認為「零風險」。系統性低估不改變的成本，錯過需要冒險的轉折點；環境劇變時反應最慢。",
    sharedGrowthDirection:
      "學會計算「不行動的代價」，在守住底線的前提下，為改變預留固定額度。",
  },
  {
    schemaVersion: "3.0.0",
    id: "cluster_autonomy",
    slug: "autonomy",
    displayName: "自主系",
    coreStrategy: "以「掌控自己面對不確定性的方式」為策略 → 守住自主權。",
    includedPersonaIds: [
      "persona_selfmade",
      "persona_strategist",
      "persona_pioneer",
    ],
    needSpectrum: ["自主", "理解", "可能性"],
    sharedPersona:
      "自主行動者。相信人生要掌握在自己手上，安全感來自「我有選擇權，且我看得懂局」。",
    sharedNeed:
      "不被控制。需要獨立判斷的空間、足夠的資訊、以及隨時可以轉身的餘地。",
    sharedValues: "獨立、清醒、彈性、不欠人。",
    sharedThinkingPattern:
      "主體優先：先問「這由誰決定、我掌握多少」，對他人給的答案預設保留態度，習慣自己重算一遍。",
    sharedDecisionPattern:
      "獨立決斷：傾向自己收集資訊、自己判斷、自己承擔，不喜歡把關鍵決定交給別人。",
    sharedStrength:
      "抗操控、看得清、跑得快。在混亂與資訊不對稱的環境中最有生存力。",
    sharedBlindspot:
      "把「依賴」與「合作」混為一談。系統性低估求助、結盟與授權的價值，容易單打獨鬥、錯過需要團隊才能拿下的規模。",
    sharedGrowthDirection:
      "把合作重新定義為「策略」而非「示弱」，學會在保留主導權的前提下借力。",
  },
  {
    schemaVersion: "3.0.0",
    id: "cluster_breakthrough",
    slug: "breakthrough",
    displayName: "突破系",
    coreStrategy: "以「主動製造並利用不確定性」為策略 → 換取成長與影響。",
    includedPersonaIds: [
      "persona_challenger",
      "persona_creator",
      "persona_expresser",
    ],
    needSpectrum: ["成長", "創造", "影響"],
    sharedPersona:
      "現狀突破者。相信人生的意義在於超越現在的自己，安全感反而來自「還在往前」。停滯比失敗更痛苦。",
    sharedNeed:
      "向外輸出。需要舞台、產出、回饋，需要看到自己對世界造成了改變。",
    sharedValues: "強度、原創、真實、被看見。",
    sharedThinkingPattern:
      "機會優先：先問「能長出什麼、能改變什麼」，再問「要付出什麼」。對限制與規範天然不耐。",
    sharedDecisionPattern:
      "高動能決斷：決策快、投入猛、憑直覺與熱度行動，先開火再校準。",
    sharedStrength:
      "爆發力、感染力、原創性。是組織裡的引擎與破冰者，最能開創從零到一。",
    sharedBlindspot:
      "系統性低估「代價、後座力與持續成本」。容易高估短期能量、低估長期消耗，把衝動誤認為決心。",
    sharedGrowthDirection:
      "學會選擇戰場與節奏管理：把爆發力放進可持續的結構裡，讓突破變成累積而不是消耗。",
  },
];
