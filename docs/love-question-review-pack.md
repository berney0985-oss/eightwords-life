# 感情分析題庫審查包 v1（love-1.0.0）

> 由已寫入的 data/love-questions.ts 自動產生。共 18 題 × 3 選項 = 54 主要計分位。
> 計分：方案 A（每選項單一主要人格 +2）。每題三選項主要人格分屬穩定／自主／突破三系各一。

## 1. 18 題與 54 列計分矩陣

| 題 | 情境類別 | 位置 | 選項 | 主要人格 | 決策系 | sourceFields |
|---|---|---|---|---|---|---|
| 1 | love_ambiguity | A | 主動把話講開，把關係要往哪走說清楚 | 領導型 | 穩定系 | thinking_pattern |
| 1 | love_ambiguity | B | 順著相處的默契慢慢感覺，讓關係自然成形 | 創作型 | 突破系 | thinking_pattern |
| 1 | love_ambiguity | C | 先觀察對方的態度與訊號，想清楚再決定要不要挑明 | 謀略型 | 自主系 | thinking_pattern |
| 2 | love_security | A | 回到你們在一起的初衷，確認彼此還在同一條路上 | 理想型 | 穩定系 | thinking_pattern |
| 2 | love_security | B | 直接把不安說出來，讓對方知道你需要什麼 | 表達型 | 突破系 | thinking_pattern |
| 2 | love_security | C | 先靠自己把情緒穩住，不想把不安全丟給對方 | 自立型 | 自主系 | thinking_pattern |
| 3 | love_commitment | A | 先看實際生活與條件穩不穩得住，再談承諾 | 務實型 | 穩定系 | thinking_pattern |
| 3 | love_commitment | B | 想保留一些彈性，不急著把每件事都定下來 | 開拓型 | 自主系 | thinking_pattern |
| 3 | love_commitment | C | 把它當成要一起面對的事，願意往前跨一步 | 挑戰型 | 突破系 | thinking_pattern |
| 4 | love_conflict | A | 把想法直接講出來，把問題攤開來談 | 表達型 | 突破系 | action_pattern |
| 4 | love_conflict | B | 想先講好我們該怎麼談、怎麼收尾 | 領導型 | 穩定系 | action_pattern |
| 4 | love_conflict | C | 先讓彼此冷靜、把空間拉開，換個時間再談 | 開拓型 | 自主系 | action_pattern |
| 5 | love_communication | A | 從你們共同在乎的價值談起，讓對方懂這對你的意義 | 理想型 | 穩定系 | action_pattern |
| 5 | love_communication | B | 直接說重點，把自己的感受與需要講明白 | 表達型 | 突破系 | decision_habit |
| 5 | love_communication | C | 先想好怎麼說、預想對方反應，再挑時機談 | 謀略型 | 自主系 | action_pattern |
| 6 | love_space | A | 覺得很正常，你自己也需要空間，各自過得好也重要 | 自立型 | 自主系 | action_pattern |
| 6 | love_space | B | 把它看成關係要調整的地方，主動去面對 | 挑戰型 | 突破系 | action_pattern |
| 6 | love_space | C | 回到你們對關係的想像，思考這對彼此的意義 | 理想型 | 穩定系 | decision_habit |
| 7 | love_trust | A | 先了解前因後果，弄清楚發生什麼再反應 | 謀略型 | 自主系 | decision_habit |
| 7 | love_trust | B | 想跟對方把什麼事該說、界線在哪重新講清楚 | 領導型 | 穩定系 | decision_habit |
| 7 | love_trust | C | 直接說出你的在意，讓對方知道這讓你不舒服 | 表達型 | 突破系 | thinking_pattern/decision_habit |
| 8 | love_jealousy | A | 把它當成自己要處理的情緒，正面去理解它 | 挑戰型 | 突破系 | decision_habit |
| 8 | love_jealousy | B | 看實際上有沒有問題，沒有的話就不放大它 | 務實型 | 穩定系 | action_pattern |
| 8 | love_jealousy | C | 提醒自己關係不用綁太緊，給彼此一些餘地 | 開拓型 | 自主系 | decision_habit |
| 9 | love_dependence | A | 順著當下的感覺，想靠近就靠近、想說就說 | 創作型 | 突破系 | action_pattern |
| 9 | love_dependence | B | 覺得能互相扶持正是關係的意義，願意讓對方參與 | 理想型 | 穩定系 | thinking_pattern/decision_habit |
| 9 | love_dependence | C | 傾向先自己撐住，真的需要才開口 | 自立型 | 自主系 | decision_habit |
| 10 | love_rules | A | 希望保留各自的空間，界線少一點、彼此信任就好 | 自立型 | 自主系 | thinking_pattern/decision_habit |
| 10 | love_rules | B | 願意一起把難談的界線談開，即使過程不太舒服 | 挑戰型 | 突破系 | thinking_pattern/decision_habit |
| 10 | love_rules | C | 傾向把規則講清楚，大家照著走比較安心 | 領導型 | 穩定系 | thinking_pattern/decision_habit |
| 11 | love_breakup | A | 冷靜評估實際狀況，看這段關係還撐不撐得下去 | 務實型 | 穩定系 | decision_habit |
| 11 | love_breakup | B | 想清楚問題到底出在哪、有沒有解，再決定 | 謀略型 | 自主系 | thinking_pattern/decision_habit |
| 11 | love_breakup | C | 把心裡的話講出來，讓彼此至少把話說清楚 | 表達型 | 突破系 | action_pattern/thinking_pattern |
| 12 | love_future | A | 想把時程與步驟排清楚，一步一步來 | 領導型 | 穩定系 | action_pattern/thinking_pattern |
| 12 | love_future | B | 想先保留幾種可能，不急著鎖定唯一版本 | 開拓型 | 自主系 | thinking_pattern/decision_habit |
| 12 | love_future | C | 把未來當成要一起努力的目標，願意去拚 | 挑戰型 | 突破系 | action_pattern/thinking_pattern |
| 13 | love_money | A | 不太想被規則綁，看當下情況與心意來 | 創作型 | 突破系 | decision_habit |
| 13 | love_money | B | 先把數字和方式算清楚，弄懂再決定怎麼分 | 謀略型 | 自主系 | action_pattern/thinking_pattern |
| 13 | love_money | C | 訂一套清楚的分擔方式，照著走 | 領導型 | 穩定系 | decision_habit/action_pattern |
| 14 | love_family | A | 先搞清楚雙方各自在意什麼，再想怎麼調解 | 謀略型 | 自主系 | decision_habit/action_pattern |
| 14 | love_family | B | 順著感覺去緩和氣氛，用自己的方式化解 | 創作型 | 突破系 | thinking_pattern/decision_habit |
| 14 | love_family | C | 回到家人與伴侶對你都重要的核心，找平衡 | 理想型 | 穩定系 | action_pattern/thinking_pattern |
| 15 | love_expressing_needs | A | 直接說出來，讓對方清楚知道你要什麼 | 表達型 | 突破系 | decision_habit/action_pattern |
| 15 | love_expressing_needs | B | 能自己解決的先自己來，未必要對方一起處理 | 自立型 | 自主系 | action_pattern/thinking_pattern |
| 15 | love_expressing_needs | C | 挑實際可行的方式提，讓需求容易被滿足 | 務實型 | 穩定系 | thinking_pattern/decision_habit |
| 16 | love_sacrifice | A | 盡量找兩全的方式，不想把任何一邊放掉 | 開拓型 | 自主系 | action_pattern/thinking_pattern |
| 16 | love_sacrifice | B | 看這個讓步值不值得、符不符合你們的價值 | 理想型 | 穩定系 | decision_habit/action_pattern |
| 16 | love_sacrifice | C | 憑當下的心意決定，願意就給、不勉強自己 | 創作型 | 突破系 | action_pattern/thinking_pattern |
| 17 | love_novelty_stability | A | 主動製造一起成長的新目標，讓關係往前 | 挑戰型 | 突破系 | decision_habit/action_pattern |
| 17 | love_novelty_stability | B | 各自去發展自己的生活，關係自然有新養分 | 自立型 | 自主系 | decision_habit/action_pattern |
| 17 | love_novelty_stability | C | 覺得穩定本身就很好，不太需要刻意求新 | 務實型 | 穩定系 | action_pattern/thinking_pattern |
| 18 | love_problem_handling | A | 換個方式、換個角度，試著鬆動卡住的地方 | 開拓型 | 自主系 | decision_habit/action_pattern |
| 18 | love_problem_handling | B | 挑最實際、最該先處理的那個問題著手 | 務實型 | 穩定系 | decision_habit/action_pattern |
| 18 | love_problem_handling | C | 憑感覺找一個切入點，先把氣氛打開再說 | 創作型 | 突破系 | decision_habit/action_pattern |

## 2. 九人格覆蓋（各 6 主要位、A/B/C 各 2）

| 人格 | 決策系 | 主要位 | A | B | C | 情境數 | sourceFields |
|---|---|---|---|---|---|---|---|
| 務實型 | 穩定系 | 6 | 2 | 2 | 2 | 6 | thinking_pattern/action_pattern/decision_habit |
| 領導型 | 穩定系 | 6 | 2 | 2 | 2 | 6 | thinking_pattern/action_pattern/decision_habit |
| 理想型 | 穩定系 | 6 | 2 | 2 | 2 | 6 | thinking_pattern/action_pattern/decision_habit |
| 自立型 | 自主系 | 6 | 2 | 2 | 2 | 6 | thinking_pattern/action_pattern/decision_habit |
| 謀略型 | 自主系 | 6 | 2 | 2 | 2 | 6 | thinking_pattern/action_pattern/decision_habit |
| 開拓型 | 自主系 | 6 | 2 | 2 | 2 | 6 | thinking_pattern/action_pattern/decision_habit |
| 挑戰型 | 突破系 | 6 | 2 | 2 | 2 | 6 | thinking_pattern/action_pattern/decision_habit |
| 創作型 | 突破系 | 6 | 2 | 2 | 2 | 6 | thinking_pattern/action_pattern/decision_habit |
| 表達型 | 突破系 | 6 | 2 | 2 | 2 | 6 | thinking_pattern/action_pattern/decision_habit |

## 3. 三大決策系覆蓋（各 18 主要位、上限 36 分）

- 穩定系：18 主要位（理論最高 36 分）
- 自主系：18 主要位（理論最高 36 分）
- 突破系：18 主要位（理論最高 36 分）

## 4. 選項位置分布

每題選項位置固定為 A/B/C 三系各一；九人格每格 A2/B2/C2（見上表）。相鄰兩題不連續出現同一人格於同位置（validate #49）。

## 5. 社會期許偏誤檢查

三選項為不同決策風格、無明顯「標準答案」；選項文字避免道德褒貶與極端詞（validate #55 零極端詞）。

## 6. 性別刻板印象檢查

選項不預設性別角色、不綁定特定性別的關係行為；情境以中性第二人稱敘述。

## 7. 控制／暴力等敏感情境檢查

衝突、嫉妒、界線、分手等敏感情境一律以健康的決策風格呈現；validate #56 掃描確認選項無「控制／冷暴力／情緒勒索／跟蹤／監控／威脅／動手／施暴／查勤／偷看手機」等字樣。

