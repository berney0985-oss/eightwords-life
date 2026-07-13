/**
 * 九種決策人格資料（Schema 3.0.0，巢狀結構）。
 * 內容逐欄位依《科學八字決策系統定義（Final）》v2.2.0 原文搬入：
 * - corePersona / decisionProfile / riskProfile ← 第 5.1–5.9 節
 * - talentBlueprint ← 第 5.10 節（欄位名 migration 見 implementation-decisions.md 1.3）
 * - blindspotTriggers ← 附錄 B（以頓號切分為陣列）
 * 未改寫、未潤飾、未統一語氣；疑似原文問題僅記錄於 docs/data-issues.md。
 * 完整欄位對照見 docs/content-source-map.md。
 * 註：本檔為資料轉錄檔，行數超過一般 300 行上限屬可接受例外（純資料、無邏輯）。
 */

import type { PersonaProfile } from "@/types/persona";

export const personas: PersonaProfile[] = [
  // ── 5.1 務實型｜正財｜穩定系 ──
  {
    schemaVersion: "3.0.0",
    id: "persona_pragmatist",
    slug: "pragmatist",
    displayName: "務實型",
    baziSource: "正財",
    clusterId: "cluster_stability",
    corePersona: {
      positioning: "現實世界的經營者：把資源、關係與生活管理得井井有條的人。",
      coreNeed: "穩定",
      coreValues: ["可靠", "勤懇", "實際成果", "量入為出"],
      lifeGoal:
        "建立一個經得起時間考驗的生活：穩定的收入、可信的關係、看得見的累積。",
      decisionGoal: "守住已有的，確保每一步都不會賠。",
      thinkingPattern:
        "成本效益思考：凡事先算投入產出，只相信可驗證、可量化的東西，對「畫大餅」天然免疫。",
      actionPattern:
        "穩扎穩打：小步前進、按部就班，答應的事一定做到，但很少主動加碼。",
      oneLineDefinition: "以確定性為貨幣、以累積為信仰的現實經營者。",
      brandSlogan: "穩，是你的實力；別讓它變成你的天花板。",
      plainExplanation:
        "你是那種把日子過得很穩的人——但你最常虧的，不是花錯錢，而是不敢花對的錢。",
    },
    talentBlueprint: {
      theme: "把資源變成穩定產出的經營天賦。",
      naturalAdvantage:
        "精準的成本感與現實感：不需計算工具，也能立刻判斷一件事「划不划算、養不養得起」。",
      naturalContribution:
        "為團隊與客戶帶來可靠的秩序：預算不失控、承諾能兌現、系統可以長期運轉。",
      bestRole: "經營者／規劃者",
      growthPotential:
        "成為「資源的配置者」：不只守住資源，更能把資源放到對的位置，讓穩定長出複利。",
    },
    decisionProfile: {
      decisionHabit:
        "預設選擇「最安全、最省、最可控」的選項；遇到不確定就先觀望。",
      strength:
        "執行穩定度與資源管理能力：交給你的事會準時、如實、在預算內完成。",
      weakness:
        "格局受限於眼前可見之物：對無法立即量化的價值（品牌、學習、關係投資）出手太小。",
    },
    riskProfile: {
      decisionBlindspot:
        "用「省」的邏輯評估所有決策，把「支出」一律視為「損失」，看不見高回報機會的投資屬性。",
      blindspotTriggers: [
        "需要前期投入的機會",
        "轉職或談判時機",
        "投資與自我進修決策",
        "市場快速變化",
      ],
      recurringMistake:
        "因為怕賠而錯過時機：好機會出現時多算了三個月，等想通了窗口已關。",
      stressResponse:
        "更緊縮、更摳細節：削減一切非必要支出與嘗試，退回最小安全範圍。",
      correctionStrategy:
        "為每個重大決策同時計算兩張表：「行動的成本」與「不行動的成本」。後者算不出來時，強制預留一筆「機會預算」用於嘗試。",
      growthDirection:
        "從「守成者」進化為「配置者」：把可靠的管理能力用於資產與機會的配置，而不只是節流。",
    },
  },
  // ── 5.2 領導型｜正官｜穩定系 ──
  {
    schemaVersion: "3.0.0",
    id: "persona_commander",
    slug: "commander",
    displayName: "領導型",
    baziSource: "正官",
    clusterId: "cluster_stability",
    corePersona: {
      positioning: "秩序的承擔者：靠責任感與規範感贏得位置與信任的人。",
      coreNeed: "秩序",
      coreValues: ["責任", "正直", "名譽", "名正言順"],
      lifeGoal: "成為一個被託付、被尊敬的人：在體制與群體中取得正當的位置。",
      decisionGoal:
        "守住正當性——決策必須合乎規範、對得起身分、經得起檢視。",
      thinkingPattern:
        "規範思考：先問「應不應該、合不合規、我的角色該怎麼做」，以對錯框架而非利弊框架處理問題。",
      actionPattern:
        "章法分明：按制度與流程行事，重承諾、守時限，不喜歡便宜行事。",
      oneLineDefinition: "以責任為骨架、以名譽為邊界的秩序承擔者。",
      brandSlogan: "你撐得起規則；也要撐得起改變規則的那一天。",
      plainExplanation:
        "你是大家最放心交事情的人——但你最大的風險，是把「照規矩做」當成「做對了」。",
    },
    talentBlueprint: {
      theme: "讓群體有章法可循的治理天賦。",
      naturalAdvantage:
        "不需提醒的責任承載力與規範敏感度：一進入群體就看得見「誰該負責、流程缺在哪」。",
      naturalContribution:
        "帶來信任與公信力：讓合作有規則、讓承諾有分量、讓組織經得起檢視。",
      bestRole: "管理者／制度設計者",
      growthPotential:
        "成為「制度的改革者」：能為變動的時代重新設計值得被遵守的規則。",
    },
    decisionProfile: {
      decisionHabit:
        "預設遵循規則、前例與上位者期待；沒有規則時，先建立規則再行動。",
      strength:
        "可託付性：自律、扛責、經得起檢視，是最可靠的管理者與制度守護者。",
      weakness: "僵化與怕錯：過度在意正確性與形象，缺乏灰色地帶的應變力。",
    },
    riskProfile: {
      decisionBlindspot:
        "把「符合規範」等同於「正確決策」：規則過時或情境例外時，仍照章行事，用程序正確掩蓋結果錯誤。",
      blindspotTriggers: [
        "規則已過時的情境",
        "上級指令與現實衝突",
        "需中途修改已宣布的計畫",
        "無前例的灰色地帶",
      ],
      recurringMistake:
        "路線已明顯失效，仍因「程序正確、前後一致」而照原案執行，不敢中途修正，錯上加錯。",
      stressResponse:
        "更控制、更嚴格：抓緊規則與細節管理他人，變得不近人情。",
      correctionStrategy:
        "每次引用規則前先問一句：「這條規則當初要保護的目的是什麼？現在還成立嗎？」以目的檢核規則，而非以規則代替判斷。",
      growthDirection:
        "從「規則的執行者」進化為「規則的設計者」：理解制度背後的目的，必要時有勇氣修改制度。",
    },
  },
  // ── 5.3 理想型｜正印｜穩定系 ──
  {
    schemaVersion: "3.0.0",
    id: "persona_idealist",
    slug: "idealist",
    displayName: "理想型",
    baziSource: "正印",
    clusterId: "cluster_stability",
    corePersona: {
      positioning: "意義的守護者：靠內在價值系統而非外在誘因驅動的人。",
      coreNeed: "意義",
      coreValues: ["善良", "學習", "精神深度", "被理解"],
      lifeGoal: "過一個「值得」的人生：所做之事與所信之事一致。",
      decisionGoal: "守護內在一致性——寧可少得，不可違心。",
      thinkingPattern:
        "價值思考：先問「這件事有沒有意義、符不符合我的信念」，習慣抽象化與原則化，對純利益計算無感。",
      actionPattern:
        "慢熱深耕：啟動慢、投入深，認定的事可以做很久，不認定的事推不動。",
      oneLineDefinition: "以信念為座標、以一致性為底線的意義守護者。",
      brandSlogan: "理想不需要你犧牲；它需要你把它做出來。",
      plainExplanation:
        "你做事看的是「值不值得」而不是「划不划算」——但你最容易栽在把沒指望的事，錯當成有意義的事。",
    },
    talentBlueprint: {
      theme: "把知識與價值轉化為滋養他人的教化天賦。",
      naturalAdvantage:
        "深度吸收與體系化理解：能把複雜的知識消化成安定人心的道理。",
      naturalContribution:
        "帶來方向感與精神支持：讓團隊在混亂中仍記得「我們為什麼做這件事」。",
      bestRole: "教育者／顧問",
      growthPotential:
        "成為「價值的傳承者」：把理念化為可傳遞的體系，讓影響延續到自己不在場的地方。",
    },
    decisionProfile: {
      decisionHabit:
        "預設以價值觀篩選選項，凡「沒意義」直接出局，不進入利弊評估。",
      strength:
        "內在羅盤穩定：不受風向與誘惑動搖，有真正的深度與長期定力。",
      weakness:
        "與現實脫節：行動慢、對執行細節與現實條件不耐煩，容易理想化他人。",
    },
    riskProfile: {
      decisionBlindspot:
        "用意義過濾現實資訊：一旦認定某事「有意義」，就系統性忽略其可行性、回報結構與對方的真實動機。",
      blindspotTriggers: [
        "單方面付出的關係",
        "長期投入卻無回報結構的計畫",
        "理念與現實條件衝突的合作",
      ],
      recurringMistake:
        "長期投入沒有回報結構的人或事（單方面付出、不健康的關係、不落地的計畫），並用「這是有意義的」說服自己留下。",
      stressResponse:
        "退回內心世界：迴避衝突、逃入閱讀與思考，用「想清楚」拖延「做決定」。",
      correctionStrategy:
        "為每個「有意義」的投入加一道現實檢核：明訂回報形式與檢查時點（例如六個月），到期未達標即重新評估，不得以意義延期。",
      growthDirection:
        "從「相信意義」進化為「實現意義」：學會用現實的手段守護理想，讓價值落地成作品與制度。",
    },
  },
  // ── 5.4 自立型｜比劫（比肩、劫財合併）｜自主系 ──
  {
    schemaVersion: "3.0.0",
    id: "persona_selfmade",
    slug: "selfmade",
    displayName: "自立型",
    baziSource: "比劫（比肩、劫財合併）",
    clusterId: "cluster_autonomy",
    corePersona: {
      positioning: "靠自己的人：以行動力與意志力在世界上站穩腳跟的人。",
      coreNeed: "自主",
      coreValues: ["獨立", "公平", "義氣", "不欠人"],
      lifeGoal: "活成不必看人臉色的樣子：自己的路自己走，自己的帳自己扛。",
      decisionGoal: "保住主導權——這件事必須由我決定、由我完成。",
      thinkingPattern:
        "主體思考：先問「我自己能不能搞定」，把依賴視為風險，把求助視為負債。",
      actionPattern:
        "直接硬上：想到就做、遇牆就撞，靠意志力與體力硬推進度。",
      oneLineDefinition: "以自主為底線、以硬撐為本能的獨行實幹者。",
      brandSlogan: "你不欠任何人；但你欠自己一個開口的機會。",
      plainExplanation:
        "你什麼都能自己來——問題是你真的什麼都自己來，直到撐不住的那天。",
    },
    talentBlueprint: {
      theme: "從零站起、帶動士氣的實幹天賦。",
      naturalAdvantage: "高強度執行與逆境耐受：條件越差，越能徒手打開局面。",
      naturalContribution:
        "帶來安全感與士氣：關鍵時刻有人扛、困難面前有人先上。",
      bestRole: "開創者／團隊中堅",
      growthPotential:
        "成為「帶隊的人」：把個人戰力轉化為隊伍的戰力，讓身邊的人也變強。",
    },
    decisionProfile: {
      decisionHabit: "預設單幹：能自己來就不找人，能硬撐就不開口。",
      strength:
        "抗壓與行動力：起點再低都能靠自己爬起來，是最耐打的實幹者與可靠戰友。",
      weakness:
        "不擅借力：不會授權、不愿求助、與人合作時容易變成全包或硬碰。",
    },
    riskProfile: {
      decisionBlindspot:
        "把「求助」等同於「失敗」：系統性高估單打獨鬥的可行性，低估合作與槓桿能帶來的規模差距。",
      blindspotTriggers: [
        "任務量超出個人負荷",
        "需要授權或求助的時刻",
        "身體或財務已出現耗損訊號",
      ],
      recurringMistake:
        "硬撐到接近耗竭才求救——身體、財務或關係已經出現損傷，才承認一個人扛不動。",
      stressResponse:
        "對抗與加倍努力：壓力越大越不認輸，用更長工時與更硬的態度回應，直到斷裂。",
      correctionStrategy:
        "建立「求助門檻」的硬指標：當投入時間或損失超過預設值（例如卡關兩週），強制啟動求助或外包，不得以「再撐一下」覆蓋。",
      growthDirection:
        "從「一個人強」進化為「帶著人強」：把獨立精神升級為領導力，讓別人的力氣也算你的資源。",
    },
  },
  // ── 5.5 謀略型｜偏印｜自主系 ──
  {
    schemaVersion: "3.0.0",
    id: "persona_strategist",
    slug: "strategist",
    displayName: "謀略型",
    baziSource: "偏印",
    clusterId: "cluster_autonomy",
    corePersona: {
      positioning: "局的解讀者：站在人群半步之外，看穿事物運作邏輯的人。",
      coreNeed: "理解",
      coreValues: ["洞察", "清醒", "獨立思考", "不被騙"],
      lifeGoal: "看懂世界的運作方式，並依自己的理解活，而非依別人的劇本活。",
      decisionGoal: "在資訊足夠、想透徹之前，不交出判斷權。",
      thinkingPattern:
        "逆向思考：先問「背後的原因是什麼、誰得利、哪裡不對勁」，對主流答案預設懷疑，習慣自己重新推導。",
      actionPattern: "觀察後動：先看、先想、先布局，出手次數少但講究精準。",
      oneLineDefinition: "以理解為安全感、以懷疑為本能的局外解讀者。",
      brandSlogan: "你早就看懂了；現在缺的只是出手。",
      plainExplanation:
        "你比多數人想得深、看得透——但你最常輸的方式，是想到答案了，卻沒有按下去。",
    },
    talentBlueprint: {
      theme: "看穿結構、預判風險的洞察天賦。",
      naturalAdvantage:
        "逆向與批判性思考：能在眾人的共識中發現漏洞，在雜訊中找到關鍵變數。",
      naturalContribution:
        "帶來清醒：替團隊躲開陷阱、識破話術，在下注之前先看清賠率。",
      bestRole: "研究者／軍師型顧問",
      growthPotential:
        "成為「重大決策的幕僚核心」：洞察不再停在腦中，而是成為組織下重大決定時的依據。",
    },
    decisionProfile: {
      decisionHabit:
        "預設延遲決定：再收集一點資訊、再想一輪，直到「想清楚」為止。",
      strength:
        "洞察力：能看穿表象、識破話術、預判結構性問題，是典型的策士與研究者。",
      weakness:
        "疏離與多疑：與人保持距離，難以全心信任，容易活在自己的推演裡。",
    },
    riskProfile: {
      decisionBlindspot:
        "用「還沒想清楚」掩蓋「不敢行動」：把分析當成行動的替代品，看不見「想清楚」本身已成為逃避。",
      blindspotTriggers: [
        "有明確截止期限的機會",
        "資訊注定不完整的新領域",
        "需要當場表態的場合",
      ],
      recurringMistake:
        "分析癱瘓錯過行動窗口——答案早就夠清楚了，仍在等一個不存在的百分之百確定。",
      stressResponse:
        "抽離封閉：切斷溝通、獨自推演，外人看來冷漠疏遠，實則在腦中高速空轉。",
      correctionStrategy:
        "為每個決策設定「資訊截止線」：事先定義做決定所需的最低資訊清單與期限，達標即行動，超時即以現有資訊決策。",
      growthDirection:
        "從「看懂局的人」進化為「入局的人」：接受不完整資訊下行動的必然性，用行動產生的回饋取代空想的推演。",
    },
  },
  // ── 5.6 開拓型｜偏財｜自主系 ──
  {
    schemaVersion: "3.0.0",
    id: "persona_pioneer",
    slug: "pioneer",
    displayName: "開拓型",
    baziSource: "偏財",
    clusterId: "cluster_autonomy",
    corePersona: {
      positioning: "機會的獵人：對資源與機會嗅覺敏銳、永遠在移動中的人。",
      coreNeed: "可能性",
      coreValues: ["彈性", "機會", "人脈", "瀟灑"],
      lifeGoal: "活得寬：世界很大、選項很多，人生不該被綁在一個位置上。",
      decisionGoal: "保留最多選項——永遠不把自己鎖死在單一路徑。",
      thinkingPattern:
        "機會思考：先問「這裡有什麼機會、能連上什麼資源」，擅長跨域連結，對重複與固定極不耐煩。",
      actionPattern:
        "多線並行：同時推進多個機會，快進快出，靠人脈與資訊差移動。",
      oneLineDefinition: "以可能性為氧氣、以移動為本能的機會獵人。",
      brandSlogan: "你看得到所有機會；記得留一個給你自己長大。",
      plainExplanation:
        "你的機會永遠比別人多——但你最大的成本，是每個機會都只拿到一半就走了。",
    },
    talentBlueprint: {
      theme: "連結人與資源、發現機會的整合天賦。",
      naturalAdvantage:
        "機會嗅覺與跨域社交力：能快速判斷「這裡有沒有機會、該找誰」。",
      naturalContribution:
        "帶來活水：新的機會、新的人脈、新的入口，讓停滯的系統重新流動。",
      bestRole: "整合者／開拓型經營者",
      growthPotential:
        "成為「平台的建立者」：從抓機會的人，變成讓眾人能在其上交換價值的節點。",
    },
    decisionProfile: {
      decisionHabit:
        "預設抓新機會：新選項一出現就投入注意力，舊項目自然降級。",
      strength:
        "機會嗅覺與資源整合力：總能先看到機會、找到對的人，是嗅覺最敏銳的開路者與生意人。",
      weakness: "不聚焦：興趣轉移快、承諾深度淺，難以在單一領域累積複利。",
    },
    riskProfile: {
      decisionBlindspot:
        "把「新的機會」誤認為「更好的機會」：系統性高估新選項、低估既有投入的累積價值，用轉換掩蓋深耕的困難。",
      blindspotTriggers: [
        "新機會出現時的取捨",
        "多項目同時進行",
        "既有項目進入枯燥的深耕期",
      ],
      recurringMistake:
        "同時開太多線，每條都做到六十分就轉場，多年後發現沒有一條真正收成。",
      stressResponse:
        "更發散：用開新局逃避舊局的困難，攤子越鋪越大、越難收拾。",
      correctionStrategy:
        "建立「主線制」：任何時期明訂一條主線與最多兩條支線；新機會出現時，必須先回答「它比主線好在哪、要砍掉誰」才可啟動。",
      growthDirection:
        "從「找機會的人」進化為「養機會的人」：學會讓一個機會長大到收成，讓廣度成為深度的養分而非替代品。",
    },
  },
  // ── 5.7 挑戰型｜七殺｜突破系 ──
  {
    schemaVersion: "3.0.0",
    id: "persona_challenger",
    slug: "challenger",
    displayName: "挑戰型",
    baziSource: "七殺",
    clusterId: "cluster_breakthrough",
    corePersona: {
      positioning:
        "逆境的攻擊手：在壓力與競爭中反而變強、以突破證明自己的人。",
      coreNeed: "成長",
      coreValues: ["強度", "勝利", "果決", "不服輸"],
      lifeGoal: "不斷超越上一個自己：人生是一場一場的戰役，停下來就是退步。",
      decisionGoal:
        "守住前進的動能——決策必須讓自己更強，不容許停滯與退讓。",
      thinkingPattern:
        "目標思考：先鎖定「要贏什麼」，再倒推手段；化繁為簡、直取要害，對過程與感受不耐煩。",
      actionPattern: "全力衝鋒：決定即出手、出手即全力，危機中反而最冷靜。",
      oneLineDefinition: "以壓力為燃料、以突破為存在感的逆境攻擊手。",
      brandSlogan: "你什麼仗都敢打；高手只打值得的仗。",
      plainExplanation:
        "你越難越來勁——但你吃過最多的虧，是把不值得的仗打成了全力以赴。",
    },
    talentBlueprint: {
      theme: "在高壓與危機中開路的攻堅天賦。",
      naturalAdvantage: "決斷力與危機承受力：局面越亂，出手越穩。",
      naturalContribution:
        "帶來突破：別人不敢碰的難題、卡死的僵局，由這種人格撕開缺口。",
      bestRole: "改革者／危機處理者",
      growthPotential:
        "成為「亂局中的定錨者」：從單點攻堅，進化為帶領組織穿越重大轉型。",
    },
    decisionProfile: {
      decisionHabit:
        "預設迎戰：遇到困難選正面突破而非繞路，遇到挑釁選應戰而非退讓。",
      strength:
        "決斷力與危機處理：別人癱瘓時你在行動，是關鍵時刻的攻堅者與危機領袖。",
      weakness: "對人對己皆狠：高壓待人、透支待己，容易樹敵與過勞耗竭。",
    },
    riskProfile: {
      decisionBlindspot:
        "把「困難」等同於「值得」：系統性被高難度目標吸引，忽略戰場本身的價值評估，為了贏而戰、而非為了值得而戰。",
      blindspotTriggers: [
        "高難度但低回報的目標",
        "被挑釁或被比較的時刻",
        "勝負已無實質意義的僵局",
      ],
      recurringMistake:
        "在不划算的戰場上投入過度兵力——贏了面子、輸了資源，或兩敗俱傷。",
      stressResponse:
        "攻擊性升高：語氣變硬、決策變賭、把身邊人當對手或工具。",
      correctionStrategy:
        "開戰前強制回答三個問題：「贏了得到什麼？輸了付出什麼？不打會怎樣？」三題答不清楚，不准開戰。",
      growthDirection:
        "從「能打贏的人」進化為「會選仗的人」：把戰鬥力用在值得的戰場，讓每一次突破都成為累積。",
    },
  },
  // ── 5.8 創作型｜食神｜突破系 ──
  {
    schemaVersion: "3.0.0",
    id: "persona_creator",
    slug: "creator",
    displayName: "創作型",
    baziSource: "食神",
    clusterId: "cluster_breakthrough",
    corePersona: {
      positioning: "生活的創作者：以品味與才華把喜歡的事做成產出的人。",
      coreNeed: "創造",
      coreValues: ["美感", "享受", "真誠", "自在"],
      lifeGoal:
        "把人生活成作品：做喜歡的事、留下有品質的東西、不勉強自己。",
      decisionGoal: "守護狀態——選擇能維持愉悅、自在與創作能量的路。",
      thinkingPattern:
        "感受思考：先問「有不有趣、美不美、舒不舒服」，以體感與品味篩選，對枯燥與勉強天然排斥。",
      actionPattern:
        "興之所至：狀態好時產出驚人，狀態差時完全停擺，節奏隨心情波動。",
      oneLineDefinition: "以品味為準則、以狀態為引擎的生活創作者。",
      brandSlogan: "你不缺才華；你缺的是「完成」這個習慣。",
      plainExplanation:
        "你做喜歡的事時光芒四射——但你最大的遺憾，通常是那些做到一半就不喜歡了的事。",
    },
    talentBlueprint: {
      theme: "把感受轉化為作品與體驗的創作天賦。",
      naturalAdvantage:
        "品味與美感直覺：不需分析就能感知「什麼是好的、什麼讓人舒服」。",
      naturalContribution:
        "帶來質感與療癒：好的作品、好的體驗、好的氛圍，讓人願意停留。",
      bestRole: "創作者／體驗設計者",
      growthPotential:
        "成為「風格的定義者」：個人品味沉澱為一種可辨識、能影響市場的風格。",
    },
    decisionProfile: {
      decisionHabit:
        "預設跟著感覺走：喜歡就投入、膩了就放下，迴避一切帶壓力的承諾。",
      strength:
        "才華與鬆弛感：產出有質感、待人無攻擊性，是自帶質感的創作者與氛圍中心。",
      weakness: "缺乏紀律：抗拒 deadline 與制度，成果依賴狀態而非系統。",
    },
    riskProfile: {
      decisionBlindspot:
        "用「感覺對了」取代評估、用「感覺不對」取代堅持：把情緒狀態當成決策依據，看不見感覺與正確之間的落差。",
      blindspotTriggers: [
        "接近完成的最後一哩",
        "需要承諾交付日的合作",
        "倦怠期的去留決定",
      ],
      recurringMistake:
        "半成品堆積——熱情期啟動、倦怠期放棄，多年累積大量「差最後一哩」的作品與計畫。",
      stressResponse:
        "逃避與耽溺：用吃喝玩樂、拖延與擺爛麻痺壓力，問題越滾越大。",
      correctionStrategy:
        "為每個創作與承諾加裝「完成機制」：公開的交付日、最小可完成版本、以及一個會催你的人。決定去留時改問「三個月後的我會後悔嗎」，而非「現在想不想」。",
      growthDirection:
        "從「有才華的人」進化為「有作品的人」：讓紀律成為才華的容器，用完成度兌現天分。",
    },
  },
  // ── 5.9 表達型｜傷官｜突破系 ──
  {
    schemaVersion: "3.0.0",
    id: "persona_expresser",
    slug: "expresser",
    displayName: "表達型",
    baziSource: "傷官",
    clusterId: "cluster_breakthrough",
    corePersona: {
      positioning:
        "框架的挑戰者：以言語、才華與鋒芒影響世界、拒絕被定義的人。",
      coreNeed: "影響",
      coreValues: ["才華", "真話", "與眾不同", "被看見"],
      lifeGoal: "在世界上留下自己的聲音：證明自己的觀點與才華值得被看見。",
      decisionGoal:
        "守住話語權與獨特性——決策必須讓自己的觀點被看見、不被同化。",
      thinkingPattern:
        "批判思考：先看到「哪裡不對、哪裡可以更好」，本能質疑權威與慣例，追求更聰明的做法。",
      actionPattern:
        "即興出招：反應快、敢說敢做，靠臨場才華行動，事前準備與事後收尾都嫌麻煩。",
      oneLineDefinition: "以表達為武器、以不服為燃料的框架挑戰者。",
      brandSlogan: "你的才華不需要吵贏誰；它需要一個更大的舞台。",
      plainExplanation:
        "你總能一眼看出問題、一句話戳中要害——但你損失最大的幾次，都是嘴比腦快的那幾次。",
    },
    talentBlueprint: {
      theme: "把想法變成語言與聲量的傳播天賦。",
      naturalAdvantage:
        "敏捷的語言反應與亮點嗅覺：能把複雜的事說得動人，把普通的事說出記憶點。",
      naturalContribution:
        "帶來聲量與變革動能：替團隊發聲、替新觀念開路，讓對的東西被看見。",
      bestRole: "傳播者／變革推動者",
      growthPotential:
        "成為「議題的引領者」：從說得漂亮，進化為定義大家討論什麼。",
    },
    decisionProfile: {
      decisionHabit: "預設走不一樣的路：別人怎麼做，我就偏不；被否定時，加倍證明。",
      strength:
        "感染力與創新力：能說動人、能想出別人想不到的解法，是最具穿透力的傳播者與變革者。",
      weakness:
        "情緒化與鋒芒傷人：藏不住不屑、忍不住反駁，容易在言語上結怨。",
    },
    riskProfile: {
      decisionBlindspot:
        "把「反對」誤認為「獨立思考」：系統性為反而反，用挑戰權威證明自己，看不見自己的判斷已被「不服」綁架。",
      blindspotTriggers: [
        "公開場合反駁權威",
        "關鍵利害關係人在場的會議",
        "被否定後的即時回應",
      ],
      recurringMistake:
        "在關鍵時刻為反而反，一句話得罪關鍵的人——贏了辯論，輸了機會。",
      stressResponse:
        "尖銳化：言語變利、姿態變衝，口不擇言之後又暗自後悔。",
      correctionStrategy:
        "重要場合採用「延遲表達」：想反駁時先寫下來、隔一段時間再決定說不說；並在開口前自問「我要的是贏這句話，還是贏這件事？」",
      growthDirection:
        "從「證明自己的人」進化為「影響別人的人」：把鋒芒轉化為說服力，讓才華服務於目標而非情緒。",
    },
  },
];
