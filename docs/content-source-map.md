# 內容來源對照（Content Source Map）

本文件記錄網站資料層每個欄位對應《科學八字決策系統定義（Final）》v2.2.0
與 Version 3.0.0 修訂提案的來源。由腳本生成，逐人格、逐欄位完整列出。

規則：資料層文字為規格原文逐字搬入；格式轉換（頓號字串→陣列等）於備註標示；
疑似原文問題僅記錄於 data-issues.md，不修改原文。

---

## 一、九種人格（data/personas.ts）

### personas[0] 務實型（第 5.1 節）

| TypeScript 路徑 | 3.0.0 Schema 路徑 | 2.2.0 原欄位 | 規格章節與欄位 | 名稱遷移 | 備註 |
|---|---|---|---|---|---|
| personas[0].schemaVersion | schemaVersion | schema_version | （文件版本欄） | 值 2.2.0→3.0.0 |  |
| personas[0].id | id | id | 人格 ID（§6.1） | 無 |  |
| personas[0].slug | slug | （新增） | §6.1 ID 對應網址 slug | 3.0.0 新增欄位 | ID 不變，slug 供路由 |
| personas[0].displayName | displayName | display_name | 第 5.1 節「人格名稱」 | 無 |  |
| personas[0].baziSource | baziSource | bazi_source | 第 5.1 節「八字來源」 | 無 |  |
| personas[0].clusterId | clusterId | cluster_id | 第 5.1 節「所屬決策系」 | 無 |  |
| personas[0].corePersona.positioning | corePersona.positioning | positioning | 第 5.1 節「人格定位」 | 扁平→巢狀 |  |
| personas[0].corePersona.coreNeed | corePersona.coreNeed | core_persona.core_need（§3）／core_need（§6.2） | 第 5.1 節「核心需求」 | 扁平→巢狀 |  |
| personas[0].corePersona.coreValues | corePersona.coreValues | core_values | 第 5.1 節「核心價值」 | 扁平→巢狀 | 頓號字串→陣列（依 §6.2 陣列格式），去句尾句號 |
| personas[0].corePersona.lifeGoal | corePersona.lifeGoal | life_goal | 第 5.1 節「人生目標」 | 扁平→巢狀 |  |
| personas[0].corePersona.decisionGoal | corePersona.decisionGoal | decision_goal | 第 5.1 節「決策目標」 | 扁平→巢狀 |  |
| personas[0].corePersona.thinkingPattern | corePersona.thinkingPattern | thinking_pattern | 第 5.1 節「思考模式」 | 扁平→巢狀 |  |
| personas[0].corePersona.actionPattern | corePersona.actionPattern | action_pattern | 第 5.1 節「行動模式」 | 扁平→巢狀 |  |
| personas[0].corePersona.oneLineDefinition | corePersona.oneLineDefinition | one_line_definition | 第 5.1 節「一句人格定義」 | 扁平→巢狀 |  |
| personas[0].corePersona.brandSlogan | corePersona.brandSlogan | brand_slogan | 第 5.1 節「一句品牌標語」 | 扁平→巢狀 |  |
| personas[0].corePersona.plainExplanation | corePersona.plainExplanation | plain_explanation | 第 5.1 節「一句白話解釋」 | 扁平→巢狀 |  |
| personas[0].talentBlueprint.theme | talentBlueprint.theme | talent_archetype.theme | §5.10 天賦主軸 | talent_archetype→talent_blueprint |  |
| personas[0].talentBlueprint.naturalAdvantage | talentBlueprint.naturalAdvantage | talent_archetype.natural_advantage | §5.10 自然優勢 | talent_archetype→talent_blueprint |  |
| personas[0].talentBlueprint.naturalContribution | talentBlueprint.naturalContribution | talent_archetype.natural_contribution | §5.10 自然貢獻 | talent_archetype→talent_blueprint |  |
| personas[0].talentBlueprint.bestRole | talentBlueprint.bestRole | talent_archetype.best_role | §5.10 角色定位 | talent_archetype→talent_blueprint | 角色定位詞，非職業名 |
| personas[0].talentBlueprint.growthPotential | talentBlueprint.growthPotential | talent_archetype.growth_potential | §5.10 成熟潛能 | talent_archetype→talent_blueprint |  |
| personas[0].decisionProfile.decisionHabit | decisionProfile.decisionHabit | decision_habit | 第 5.1 節「決策慣性」 | 扁平→巢狀（人格定義層） |  |
| personas[0].decisionProfile.strength | decisionProfile.strength | strength | 第 5.1 節「最大優勢」 | 扁平→巢狀（人格定義層） |  |
| personas[0].decisionProfile.weakness | decisionProfile.weakness | weakness | 第 5.1 節「最大弱點」 | 扁平→巢狀（人格定義層） | 風險章節需同時讀取本欄與 riskProfile（決策 6.1） |
| personas[0].riskProfile.decisionBlindspot | riskProfile.decisionBlindspot | decision_blindspot | 第 5.1 節「最大決策盲點」 | 扁平→巢狀（顧問分析層） | 與 correctionStrategy 1:1 |
| personas[0].riskProfile.blindspotTriggers | riskProfile.blindspotTriggers | blindspot_triggers | 附錄 B 盲點觸發情境 | 選用→必備；扁平→巢狀 | 頓號字串→陣列 |
| personas[0].riskProfile.recurringMistake | riskProfile.recurringMistake | recurring_mistake | 第 5.1 節「最容易重複犯的錯」 | 扁平→巢狀（顧問分析層） |  |
| personas[0].riskProfile.stressResponse | riskProfile.stressResponse | stress_response | 第 5.1 節「壓力下的表現」 | 扁平→巢狀（顧問分析層） | 歸屬風險層依 Glossary 定義（決策 6.1） |
| personas[0].riskProfile.correctionStrategy | riskProfile.correctionStrategy | correction_strategy | 第 5.1 節「修正策略」 | 扁平→巢狀（顧問分析層） |  |
| personas[0].riskProfile.growthDirection | riskProfile.growthDirection | growth_direction | 第 5.1 節「適合的成長方向」 | 扁平→巢狀（顧問分析層） |  |

### personas[1] 領導型（第 5.2 節）

| TypeScript 路徑 | 3.0.0 Schema 路徑 | 2.2.0 原欄位 | 規格章節與欄位 | 名稱遷移 | 備註 |
|---|---|---|---|---|---|
| personas[1].schemaVersion | schemaVersion | schema_version | （文件版本欄） | 值 2.2.0→3.0.0 |  |
| personas[1].id | id | id | 人格 ID（§6.1） | 無 |  |
| personas[1].slug | slug | （新增） | §6.1 ID 對應網址 slug | 3.0.0 新增欄位 | ID 不變，slug 供路由 |
| personas[1].displayName | displayName | display_name | 第 5.2 節「人格名稱」 | 無 |  |
| personas[1].baziSource | baziSource | bazi_source | 第 5.2 節「八字來源」 | 無 |  |
| personas[1].clusterId | clusterId | cluster_id | 第 5.2 節「所屬決策系」 | 無 |  |
| personas[1].corePersona.positioning | corePersona.positioning | positioning | 第 5.2 節「人格定位」 | 扁平→巢狀 |  |
| personas[1].corePersona.coreNeed | corePersona.coreNeed | core_persona.core_need（§3）／core_need（§6.2） | 第 5.2 節「核心需求」 | 扁平→巢狀 |  |
| personas[1].corePersona.coreValues | corePersona.coreValues | core_values | 第 5.2 節「核心價值」 | 扁平→巢狀 | 頓號字串→陣列（依 §6.2 陣列格式），去句尾句號 |
| personas[1].corePersona.lifeGoal | corePersona.lifeGoal | life_goal | 第 5.2 節「人生目標」 | 扁平→巢狀 |  |
| personas[1].corePersona.decisionGoal | corePersona.decisionGoal | decision_goal | 第 5.2 節「決策目標」 | 扁平→巢狀 |  |
| personas[1].corePersona.thinkingPattern | corePersona.thinkingPattern | thinking_pattern | 第 5.2 節「思考模式」 | 扁平→巢狀 |  |
| personas[1].corePersona.actionPattern | corePersona.actionPattern | action_pattern | 第 5.2 節「行動模式」 | 扁平→巢狀 |  |
| personas[1].corePersona.oneLineDefinition | corePersona.oneLineDefinition | one_line_definition | 第 5.2 節「一句人格定義」 | 扁平→巢狀 |  |
| personas[1].corePersona.brandSlogan | corePersona.brandSlogan | brand_slogan | 第 5.2 節「一句品牌標語」 | 扁平→巢狀 |  |
| personas[1].corePersona.plainExplanation | corePersona.plainExplanation | plain_explanation | 第 5.2 節「一句白話解釋」 | 扁平→巢狀 |  |
| personas[1].talentBlueprint.theme | talentBlueprint.theme | talent_archetype.theme | §5.10 天賦主軸 | talent_archetype→talent_blueprint |  |
| personas[1].talentBlueprint.naturalAdvantage | talentBlueprint.naturalAdvantage | talent_archetype.natural_advantage | §5.10 自然優勢 | talent_archetype→talent_blueprint |  |
| personas[1].talentBlueprint.naturalContribution | talentBlueprint.naturalContribution | talent_archetype.natural_contribution | §5.10 自然貢獻 | talent_archetype→talent_blueprint |  |
| personas[1].talentBlueprint.bestRole | talentBlueprint.bestRole | talent_archetype.best_role | §5.10 角色定位 | talent_archetype→talent_blueprint | 角色定位詞，非職業名 |
| personas[1].talentBlueprint.growthPotential | talentBlueprint.growthPotential | talent_archetype.growth_potential | §5.10 成熟潛能 | talent_archetype→talent_blueprint |  |
| personas[1].decisionProfile.decisionHabit | decisionProfile.decisionHabit | decision_habit | 第 5.2 節「決策慣性」 | 扁平→巢狀（人格定義層） |  |
| personas[1].decisionProfile.strength | decisionProfile.strength | strength | 第 5.2 節「最大優勢」 | 扁平→巢狀（人格定義層） |  |
| personas[1].decisionProfile.weakness | decisionProfile.weakness | weakness | 第 5.2 節「最大弱點」 | 扁平→巢狀（人格定義層） | 風險章節需同時讀取本欄與 riskProfile（決策 6.1） |
| personas[1].riskProfile.decisionBlindspot | riskProfile.decisionBlindspot | decision_blindspot | 第 5.2 節「最大決策盲點」 | 扁平→巢狀（顧問分析層） | 與 correctionStrategy 1:1 |
| personas[1].riskProfile.blindspotTriggers | riskProfile.blindspotTriggers | blindspot_triggers | 附錄 B 盲點觸發情境 | 選用→必備；扁平→巢狀 | 頓號字串→陣列 |
| personas[1].riskProfile.recurringMistake | riskProfile.recurringMistake | recurring_mistake | 第 5.2 節「最容易重複犯的錯」 | 扁平→巢狀（顧問分析層） |  |
| personas[1].riskProfile.stressResponse | riskProfile.stressResponse | stress_response | 第 5.2 節「壓力下的表現」 | 扁平→巢狀（顧問分析層） | 歸屬風險層依 Glossary 定義（決策 6.1） |
| personas[1].riskProfile.correctionStrategy | riskProfile.correctionStrategy | correction_strategy | 第 5.2 節「修正策略」 | 扁平→巢狀（顧問分析層） |  |
| personas[1].riskProfile.growthDirection | riskProfile.growthDirection | growth_direction | 第 5.2 節「適合的成長方向」 | 扁平→巢狀（顧問分析層） |  |

### personas[2] 理想型（第 5.3 節）

| TypeScript 路徑 | 3.0.0 Schema 路徑 | 2.2.0 原欄位 | 規格章節與欄位 | 名稱遷移 | 備註 |
|---|---|---|---|---|---|
| personas[2].schemaVersion | schemaVersion | schema_version | （文件版本欄） | 值 2.2.0→3.0.0 |  |
| personas[2].id | id | id | 人格 ID（§6.1） | 無 |  |
| personas[2].slug | slug | （新增） | §6.1 ID 對應網址 slug | 3.0.0 新增欄位 | ID 不變，slug 供路由 |
| personas[2].displayName | displayName | display_name | 第 5.3 節「人格名稱」 | 無 |  |
| personas[2].baziSource | baziSource | bazi_source | 第 5.3 節「八字來源」 | 無 |  |
| personas[2].clusterId | clusterId | cluster_id | 第 5.3 節「所屬決策系」 | 無 |  |
| personas[2].corePersona.positioning | corePersona.positioning | positioning | 第 5.3 節「人格定位」 | 扁平→巢狀 |  |
| personas[2].corePersona.coreNeed | corePersona.coreNeed | core_persona.core_need（§3）／core_need（§6.2） | 第 5.3 節「核心需求」 | 扁平→巢狀 |  |
| personas[2].corePersona.coreValues | corePersona.coreValues | core_values | 第 5.3 節「核心價值」 | 扁平→巢狀 | 頓號字串→陣列（依 §6.2 陣列格式），去句尾句號 |
| personas[2].corePersona.lifeGoal | corePersona.lifeGoal | life_goal | 第 5.3 節「人生目標」 | 扁平→巢狀 |  |
| personas[2].corePersona.decisionGoal | corePersona.decisionGoal | decision_goal | 第 5.3 節「決策目標」 | 扁平→巢狀 |  |
| personas[2].corePersona.thinkingPattern | corePersona.thinkingPattern | thinking_pattern | 第 5.3 節「思考模式」 | 扁平→巢狀 |  |
| personas[2].corePersona.actionPattern | corePersona.actionPattern | action_pattern | 第 5.3 節「行動模式」 | 扁平→巢狀 |  |
| personas[2].corePersona.oneLineDefinition | corePersona.oneLineDefinition | one_line_definition | 第 5.3 節「一句人格定義」 | 扁平→巢狀 |  |
| personas[2].corePersona.brandSlogan | corePersona.brandSlogan | brand_slogan | 第 5.3 節「一句品牌標語」 | 扁平→巢狀 |  |
| personas[2].corePersona.plainExplanation | corePersona.plainExplanation | plain_explanation | 第 5.3 節「一句白話解釋」 | 扁平→巢狀 |  |
| personas[2].talentBlueprint.theme | talentBlueprint.theme | talent_archetype.theme | §5.10 天賦主軸 | talent_archetype→talent_blueprint |  |
| personas[2].talentBlueprint.naturalAdvantage | talentBlueprint.naturalAdvantage | talent_archetype.natural_advantage | §5.10 自然優勢 | talent_archetype→talent_blueprint |  |
| personas[2].talentBlueprint.naturalContribution | talentBlueprint.naturalContribution | talent_archetype.natural_contribution | §5.10 自然貢獻 | talent_archetype→talent_blueprint |  |
| personas[2].talentBlueprint.bestRole | talentBlueprint.bestRole | talent_archetype.best_role | §5.10 角色定位 | talent_archetype→talent_blueprint | 角色定位詞，非職業名 |
| personas[2].talentBlueprint.growthPotential | talentBlueprint.growthPotential | talent_archetype.growth_potential | §5.10 成熟潛能 | talent_archetype→talent_blueprint |  |
| personas[2].decisionProfile.decisionHabit | decisionProfile.decisionHabit | decision_habit | 第 5.3 節「決策慣性」 | 扁平→巢狀（人格定義層） |  |
| personas[2].decisionProfile.strength | decisionProfile.strength | strength | 第 5.3 節「最大優勢」 | 扁平→巢狀（人格定義層） |  |
| personas[2].decisionProfile.weakness | decisionProfile.weakness | weakness | 第 5.3 節「最大弱點」 | 扁平→巢狀（人格定義層） | 風險章節需同時讀取本欄與 riskProfile（決策 6.1） |
| personas[2].riskProfile.decisionBlindspot | riskProfile.decisionBlindspot | decision_blindspot | 第 5.3 節「最大決策盲點」 | 扁平→巢狀（顧問分析層） | 與 correctionStrategy 1:1 |
| personas[2].riskProfile.blindspotTriggers | riskProfile.blindspotTriggers | blindspot_triggers | 附錄 B 盲點觸發情境 | 選用→必備；扁平→巢狀 | 頓號字串→陣列 |
| personas[2].riskProfile.recurringMistake | riskProfile.recurringMistake | recurring_mistake | 第 5.3 節「最容易重複犯的錯」 | 扁平→巢狀（顧問分析層） |  |
| personas[2].riskProfile.stressResponse | riskProfile.stressResponse | stress_response | 第 5.3 節「壓力下的表現」 | 扁平→巢狀（顧問分析層） | 歸屬風險層依 Glossary 定義（決策 6.1） |
| personas[2].riskProfile.correctionStrategy | riskProfile.correctionStrategy | correction_strategy | 第 5.3 節「修正策略」 | 扁平→巢狀（顧問分析層） |  |
| personas[2].riskProfile.growthDirection | riskProfile.growthDirection | growth_direction | 第 5.3 節「適合的成長方向」 | 扁平→巢狀（顧問分析層） |  |

### personas[3] 自立型（第 5.4 節）

| TypeScript 路徑 | 3.0.0 Schema 路徑 | 2.2.0 原欄位 | 規格章節與欄位 | 名稱遷移 | 備註 |
|---|---|---|---|---|---|
| personas[3].schemaVersion | schemaVersion | schema_version | （文件版本欄） | 值 2.2.0→3.0.0 |  |
| personas[3].id | id | id | 人格 ID（§6.1） | 無 |  |
| personas[3].slug | slug | （新增） | §6.1 ID 對應網址 slug | 3.0.0 新增欄位 | ID 不變，slug 供路由 |
| personas[3].displayName | displayName | display_name | 第 5.4 節「人格名稱」 | 無 |  |
| personas[3].baziSource | baziSource | bazi_source | 第 5.4 節「八字來源」 | 無 |  |
| personas[3].clusterId | clusterId | cluster_id | 第 5.4 節「所屬決策系」 | 無 |  |
| personas[3].corePersona.positioning | corePersona.positioning | positioning | 第 5.4 節「人格定位」 | 扁平→巢狀 |  |
| personas[3].corePersona.coreNeed | corePersona.coreNeed | core_persona.core_need（§3）／core_need（§6.2） | 第 5.4 節「核心需求」 | 扁平→巢狀 |  |
| personas[3].corePersona.coreValues | corePersona.coreValues | core_values | 第 5.4 節「核心價值」 | 扁平→巢狀 | 頓號字串→陣列（依 §6.2 陣列格式），去句尾句號 |
| personas[3].corePersona.lifeGoal | corePersona.lifeGoal | life_goal | 第 5.4 節「人生目標」 | 扁平→巢狀 |  |
| personas[3].corePersona.decisionGoal | corePersona.decisionGoal | decision_goal | 第 5.4 節「決策目標」 | 扁平→巢狀 |  |
| personas[3].corePersona.thinkingPattern | corePersona.thinkingPattern | thinking_pattern | 第 5.4 節「思考模式」 | 扁平→巢狀 |  |
| personas[3].corePersona.actionPattern | corePersona.actionPattern | action_pattern | 第 5.4 節「行動模式」 | 扁平→巢狀 |  |
| personas[3].corePersona.oneLineDefinition | corePersona.oneLineDefinition | one_line_definition | 第 5.4 節「一句人格定義」 | 扁平→巢狀 |  |
| personas[3].corePersona.brandSlogan | corePersona.brandSlogan | brand_slogan | 第 5.4 節「一句品牌標語」 | 扁平→巢狀 |  |
| personas[3].corePersona.plainExplanation | corePersona.plainExplanation | plain_explanation | 第 5.4 節「一句白話解釋」 | 扁平→巢狀 |  |
| personas[3].talentBlueprint.theme | talentBlueprint.theme | talent_archetype.theme | §5.10 天賦主軸 | talent_archetype→talent_blueprint |  |
| personas[3].talentBlueprint.naturalAdvantage | talentBlueprint.naturalAdvantage | talent_archetype.natural_advantage | §5.10 自然優勢 | talent_archetype→talent_blueprint |  |
| personas[3].talentBlueprint.naturalContribution | talentBlueprint.naturalContribution | talent_archetype.natural_contribution | §5.10 自然貢獻 | talent_archetype→talent_blueprint |  |
| personas[3].talentBlueprint.bestRole | talentBlueprint.bestRole | talent_archetype.best_role | §5.10 角色定位 | talent_archetype→talent_blueprint | 角色定位詞，非職業名 |
| personas[3].talentBlueprint.growthPotential | talentBlueprint.growthPotential | talent_archetype.growth_potential | §5.10 成熟潛能 | talent_archetype→talent_blueprint |  |
| personas[3].decisionProfile.decisionHabit | decisionProfile.decisionHabit | decision_habit | 第 5.4 節「決策慣性」 | 扁平→巢狀（人格定義層） |  |
| personas[3].decisionProfile.strength | decisionProfile.strength | strength | 第 5.4 節「最大優勢」 | 扁平→巢狀（人格定義層） |  |
| personas[3].decisionProfile.weakness | decisionProfile.weakness | weakness | 第 5.4 節「最大弱點」 | 扁平→巢狀（人格定義層） | 風險章節需同時讀取本欄與 riskProfile（決策 6.1） |
| personas[3].riskProfile.decisionBlindspot | riskProfile.decisionBlindspot | decision_blindspot | 第 5.4 節「最大決策盲點」 | 扁平→巢狀（顧問分析層） | 與 correctionStrategy 1:1 |
| personas[3].riskProfile.blindspotTriggers | riskProfile.blindspotTriggers | blindspot_triggers | 附錄 B 盲點觸發情境 | 選用→必備；扁平→巢狀 | 頓號字串→陣列 |
| personas[3].riskProfile.recurringMistake | riskProfile.recurringMistake | recurring_mistake | 第 5.4 節「最容易重複犯的錯」 | 扁平→巢狀（顧問分析層） |  |
| personas[3].riskProfile.stressResponse | riskProfile.stressResponse | stress_response | 第 5.4 節「壓力下的表現」 | 扁平→巢狀（顧問分析層） | 歸屬風險層依 Glossary 定義（決策 6.1） |
| personas[3].riskProfile.correctionStrategy | riskProfile.correctionStrategy | correction_strategy | 第 5.4 節「修正策略」 | 扁平→巢狀（顧問分析層） |  |
| personas[3].riskProfile.growthDirection | riskProfile.growthDirection | growth_direction | 第 5.4 節「適合的成長方向」 | 扁平→巢狀（顧問分析層） |  |

### personas[4] 謀略型（第 5.5 節）

| TypeScript 路徑 | 3.0.0 Schema 路徑 | 2.2.0 原欄位 | 規格章節與欄位 | 名稱遷移 | 備註 |
|---|---|---|---|---|---|
| personas[4].schemaVersion | schemaVersion | schema_version | （文件版本欄） | 值 2.2.0→3.0.0 |  |
| personas[4].id | id | id | 人格 ID（§6.1） | 無 |  |
| personas[4].slug | slug | （新增） | §6.1 ID 對應網址 slug | 3.0.0 新增欄位 | ID 不變，slug 供路由 |
| personas[4].displayName | displayName | display_name | 第 5.5 節「人格名稱」 | 無 |  |
| personas[4].baziSource | baziSource | bazi_source | 第 5.5 節「八字來源」 | 無 |  |
| personas[4].clusterId | clusterId | cluster_id | 第 5.5 節「所屬決策系」 | 無 |  |
| personas[4].corePersona.positioning | corePersona.positioning | positioning | 第 5.5 節「人格定位」 | 扁平→巢狀 |  |
| personas[4].corePersona.coreNeed | corePersona.coreNeed | core_persona.core_need（§3）／core_need（§6.2） | 第 5.5 節「核心需求」 | 扁平→巢狀 |  |
| personas[4].corePersona.coreValues | corePersona.coreValues | core_values | 第 5.5 節「核心價值」 | 扁平→巢狀 | 頓號字串→陣列（依 §6.2 陣列格式），去句尾句號 |
| personas[4].corePersona.lifeGoal | corePersona.lifeGoal | life_goal | 第 5.5 節「人生目標」 | 扁平→巢狀 |  |
| personas[4].corePersona.decisionGoal | corePersona.decisionGoal | decision_goal | 第 5.5 節「決策目標」 | 扁平→巢狀 |  |
| personas[4].corePersona.thinkingPattern | corePersona.thinkingPattern | thinking_pattern | 第 5.5 節「思考模式」 | 扁平→巢狀 |  |
| personas[4].corePersona.actionPattern | corePersona.actionPattern | action_pattern | 第 5.5 節「行動模式」 | 扁平→巢狀 |  |
| personas[4].corePersona.oneLineDefinition | corePersona.oneLineDefinition | one_line_definition | 第 5.5 節「一句人格定義」 | 扁平→巢狀 |  |
| personas[4].corePersona.brandSlogan | corePersona.brandSlogan | brand_slogan | 第 5.5 節「一句品牌標語」 | 扁平→巢狀 |  |
| personas[4].corePersona.plainExplanation | corePersona.plainExplanation | plain_explanation | 第 5.5 節「一句白話解釋」 | 扁平→巢狀 |  |
| personas[4].talentBlueprint.theme | talentBlueprint.theme | talent_archetype.theme | §5.10 天賦主軸 | talent_archetype→talent_blueprint |  |
| personas[4].talentBlueprint.naturalAdvantage | talentBlueprint.naturalAdvantage | talent_archetype.natural_advantage | §5.10 自然優勢 | talent_archetype→talent_blueprint |  |
| personas[4].talentBlueprint.naturalContribution | talentBlueprint.naturalContribution | talent_archetype.natural_contribution | §5.10 自然貢獻 | talent_archetype→talent_blueprint |  |
| personas[4].talentBlueprint.bestRole | talentBlueprint.bestRole | talent_archetype.best_role | §5.10 角色定位 | talent_archetype→talent_blueprint | 角色定位詞，非職業名 |
| personas[4].talentBlueprint.growthPotential | talentBlueprint.growthPotential | talent_archetype.growth_potential | §5.10 成熟潛能 | talent_archetype→talent_blueprint |  |
| personas[4].decisionProfile.decisionHabit | decisionProfile.decisionHabit | decision_habit | 第 5.5 節「決策慣性」 | 扁平→巢狀（人格定義層） |  |
| personas[4].decisionProfile.strength | decisionProfile.strength | strength | 第 5.5 節「最大優勢」 | 扁平→巢狀（人格定義層） |  |
| personas[4].decisionProfile.weakness | decisionProfile.weakness | weakness | 第 5.5 節「最大弱點」 | 扁平→巢狀（人格定義層） | 風險章節需同時讀取本欄與 riskProfile（決策 6.1） |
| personas[4].riskProfile.decisionBlindspot | riskProfile.decisionBlindspot | decision_blindspot | 第 5.5 節「最大決策盲點」 | 扁平→巢狀（顧問分析層） | 與 correctionStrategy 1:1 |
| personas[4].riskProfile.blindspotTriggers | riskProfile.blindspotTriggers | blindspot_triggers | 附錄 B 盲點觸發情境 | 選用→必備；扁平→巢狀 | 頓號字串→陣列 |
| personas[4].riskProfile.recurringMistake | riskProfile.recurringMistake | recurring_mistake | 第 5.5 節「最容易重複犯的錯」 | 扁平→巢狀（顧問分析層） |  |
| personas[4].riskProfile.stressResponse | riskProfile.stressResponse | stress_response | 第 5.5 節「壓力下的表現」 | 扁平→巢狀（顧問分析層） | 歸屬風險層依 Glossary 定義（決策 6.1） |
| personas[4].riskProfile.correctionStrategy | riskProfile.correctionStrategy | correction_strategy | 第 5.5 節「修正策略」 | 扁平→巢狀（顧問分析層） |  |
| personas[4].riskProfile.growthDirection | riskProfile.growthDirection | growth_direction | 第 5.5 節「適合的成長方向」 | 扁平→巢狀（顧問分析層） |  |

### personas[5] 開拓型（第 5.6 節）

| TypeScript 路徑 | 3.0.0 Schema 路徑 | 2.2.0 原欄位 | 規格章節與欄位 | 名稱遷移 | 備註 |
|---|---|---|---|---|---|
| personas[5].schemaVersion | schemaVersion | schema_version | （文件版本欄） | 值 2.2.0→3.0.0 |  |
| personas[5].id | id | id | 人格 ID（§6.1） | 無 |  |
| personas[5].slug | slug | （新增） | §6.1 ID 對應網址 slug | 3.0.0 新增欄位 | ID 不變，slug 供路由 |
| personas[5].displayName | displayName | display_name | 第 5.6 節「人格名稱」 | 無 |  |
| personas[5].baziSource | baziSource | bazi_source | 第 5.6 節「八字來源」 | 無 |  |
| personas[5].clusterId | clusterId | cluster_id | 第 5.6 節「所屬決策系」 | 無 |  |
| personas[5].corePersona.positioning | corePersona.positioning | positioning | 第 5.6 節「人格定位」 | 扁平→巢狀 |  |
| personas[5].corePersona.coreNeed | corePersona.coreNeed | core_persona.core_need（§3）／core_need（§6.2） | 第 5.6 節「核心需求」 | 扁平→巢狀 |  |
| personas[5].corePersona.coreValues | corePersona.coreValues | core_values | 第 5.6 節「核心價值」 | 扁平→巢狀 | 頓號字串→陣列（依 §6.2 陣列格式），去句尾句號 |
| personas[5].corePersona.lifeGoal | corePersona.lifeGoal | life_goal | 第 5.6 節「人生目標」 | 扁平→巢狀 |  |
| personas[5].corePersona.decisionGoal | corePersona.decisionGoal | decision_goal | 第 5.6 節「決策目標」 | 扁平→巢狀 |  |
| personas[5].corePersona.thinkingPattern | corePersona.thinkingPattern | thinking_pattern | 第 5.6 節「思考模式」 | 扁平→巢狀 |  |
| personas[5].corePersona.actionPattern | corePersona.actionPattern | action_pattern | 第 5.6 節「行動模式」 | 扁平→巢狀 |  |
| personas[5].corePersona.oneLineDefinition | corePersona.oneLineDefinition | one_line_definition | 第 5.6 節「一句人格定義」 | 扁平→巢狀 |  |
| personas[5].corePersona.brandSlogan | corePersona.brandSlogan | brand_slogan | 第 5.6 節「一句品牌標語」 | 扁平→巢狀 |  |
| personas[5].corePersona.plainExplanation | corePersona.plainExplanation | plain_explanation | 第 5.6 節「一句白話解釋」 | 扁平→巢狀 |  |
| personas[5].talentBlueprint.theme | talentBlueprint.theme | talent_archetype.theme | §5.10 天賦主軸 | talent_archetype→talent_blueprint |  |
| personas[5].talentBlueprint.naturalAdvantage | talentBlueprint.naturalAdvantage | talent_archetype.natural_advantage | §5.10 自然優勢 | talent_archetype→talent_blueprint |  |
| personas[5].talentBlueprint.naturalContribution | talentBlueprint.naturalContribution | talent_archetype.natural_contribution | §5.10 自然貢獻 | talent_archetype→talent_blueprint |  |
| personas[5].talentBlueprint.bestRole | talentBlueprint.bestRole | talent_archetype.best_role | §5.10 角色定位 | talent_archetype→talent_blueprint | 角色定位詞，非職業名 |
| personas[5].talentBlueprint.growthPotential | talentBlueprint.growthPotential | talent_archetype.growth_potential | §5.10 成熟潛能 | talent_archetype→talent_blueprint |  |
| personas[5].decisionProfile.decisionHabit | decisionProfile.decisionHabit | decision_habit | 第 5.6 節「決策慣性」 | 扁平→巢狀（人格定義層） |  |
| personas[5].decisionProfile.strength | decisionProfile.strength | strength | 第 5.6 節「最大優勢」 | 扁平→巢狀（人格定義層） |  |
| personas[5].decisionProfile.weakness | decisionProfile.weakness | weakness | 第 5.6 節「最大弱點」 | 扁平→巢狀（人格定義層） | 風險章節需同時讀取本欄與 riskProfile（決策 6.1） |
| personas[5].riskProfile.decisionBlindspot | riskProfile.decisionBlindspot | decision_blindspot | 第 5.6 節「最大決策盲點」 | 扁平→巢狀（顧問分析層） | 與 correctionStrategy 1:1 |
| personas[5].riskProfile.blindspotTriggers | riskProfile.blindspotTriggers | blindspot_triggers | 附錄 B 盲點觸發情境 | 選用→必備；扁平→巢狀 | 頓號字串→陣列 |
| personas[5].riskProfile.recurringMistake | riskProfile.recurringMistake | recurring_mistake | 第 5.6 節「最容易重複犯的錯」 | 扁平→巢狀（顧問分析層） |  |
| personas[5].riskProfile.stressResponse | riskProfile.stressResponse | stress_response | 第 5.6 節「壓力下的表現」 | 扁平→巢狀（顧問分析層） | 歸屬風險層依 Glossary 定義（決策 6.1） |
| personas[5].riskProfile.correctionStrategy | riskProfile.correctionStrategy | correction_strategy | 第 5.6 節「修正策略」 | 扁平→巢狀（顧問分析層） |  |
| personas[5].riskProfile.growthDirection | riskProfile.growthDirection | growth_direction | 第 5.6 節「適合的成長方向」 | 扁平→巢狀（顧問分析層） |  |

### personas[6] 挑戰型（第 5.7 節）

| TypeScript 路徑 | 3.0.0 Schema 路徑 | 2.2.0 原欄位 | 規格章節與欄位 | 名稱遷移 | 備註 |
|---|---|---|---|---|---|
| personas[6].schemaVersion | schemaVersion | schema_version | （文件版本欄） | 值 2.2.0→3.0.0 |  |
| personas[6].id | id | id | 人格 ID（§6.1） | 無 |  |
| personas[6].slug | slug | （新增） | §6.1 ID 對應網址 slug | 3.0.0 新增欄位 | ID 不變，slug 供路由 |
| personas[6].displayName | displayName | display_name | 第 5.7 節「人格名稱」 | 無 |  |
| personas[6].baziSource | baziSource | bazi_source | 第 5.7 節「八字來源」 | 無 |  |
| personas[6].clusterId | clusterId | cluster_id | 第 5.7 節「所屬決策系」 | 無 |  |
| personas[6].corePersona.positioning | corePersona.positioning | positioning | 第 5.7 節「人格定位」 | 扁平→巢狀 |  |
| personas[6].corePersona.coreNeed | corePersona.coreNeed | core_persona.core_need（§3）／core_need（§6.2） | 第 5.7 節「核心需求」 | 扁平→巢狀 |  |
| personas[6].corePersona.coreValues | corePersona.coreValues | core_values | 第 5.7 節「核心價值」 | 扁平→巢狀 | 頓號字串→陣列（依 §6.2 陣列格式），去句尾句號 |
| personas[6].corePersona.lifeGoal | corePersona.lifeGoal | life_goal | 第 5.7 節「人生目標」 | 扁平→巢狀 |  |
| personas[6].corePersona.decisionGoal | corePersona.decisionGoal | decision_goal | 第 5.7 節「決策目標」 | 扁平→巢狀 |  |
| personas[6].corePersona.thinkingPattern | corePersona.thinkingPattern | thinking_pattern | 第 5.7 節「思考模式」 | 扁平→巢狀 |  |
| personas[6].corePersona.actionPattern | corePersona.actionPattern | action_pattern | 第 5.7 節「行動模式」 | 扁平→巢狀 |  |
| personas[6].corePersona.oneLineDefinition | corePersona.oneLineDefinition | one_line_definition | 第 5.7 節「一句人格定義」 | 扁平→巢狀 |  |
| personas[6].corePersona.brandSlogan | corePersona.brandSlogan | brand_slogan | 第 5.7 節「一句品牌標語」 | 扁平→巢狀 |  |
| personas[6].corePersona.plainExplanation | corePersona.plainExplanation | plain_explanation | 第 5.7 節「一句白話解釋」 | 扁平→巢狀 |  |
| personas[6].talentBlueprint.theme | talentBlueprint.theme | talent_archetype.theme | §5.10 天賦主軸 | talent_archetype→talent_blueprint |  |
| personas[6].talentBlueprint.naturalAdvantage | talentBlueprint.naturalAdvantage | talent_archetype.natural_advantage | §5.10 自然優勢 | talent_archetype→talent_blueprint |  |
| personas[6].talentBlueprint.naturalContribution | talentBlueprint.naturalContribution | talent_archetype.natural_contribution | §5.10 自然貢獻 | talent_archetype→talent_blueprint |  |
| personas[6].talentBlueprint.bestRole | talentBlueprint.bestRole | talent_archetype.best_role | §5.10 角色定位 | talent_archetype→talent_blueprint | 角色定位詞，非職業名 |
| personas[6].talentBlueprint.growthPotential | talentBlueprint.growthPotential | talent_archetype.growth_potential | §5.10 成熟潛能 | talent_archetype→talent_blueprint |  |
| personas[6].decisionProfile.decisionHabit | decisionProfile.decisionHabit | decision_habit | 第 5.7 節「決策慣性」 | 扁平→巢狀（人格定義層） |  |
| personas[6].decisionProfile.strength | decisionProfile.strength | strength | 第 5.7 節「最大優勢」 | 扁平→巢狀（人格定義層） |  |
| personas[6].decisionProfile.weakness | decisionProfile.weakness | weakness | 第 5.7 節「最大弱點」 | 扁平→巢狀（人格定義層） | 風險章節需同時讀取本欄與 riskProfile（決策 6.1） |
| personas[6].riskProfile.decisionBlindspot | riskProfile.decisionBlindspot | decision_blindspot | 第 5.7 節「最大決策盲點」 | 扁平→巢狀（顧問分析層） | 與 correctionStrategy 1:1 |
| personas[6].riskProfile.blindspotTriggers | riskProfile.blindspotTriggers | blindspot_triggers | 附錄 B 盲點觸發情境 | 選用→必備；扁平→巢狀 | 頓號字串→陣列 |
| personas[6].riskProfile.recurringMistake | riskProfile.recurringMistake | recurring_mistake | 第 5.7 節「最容易重複犯的錯」 | 扁平→巢狀（顧問分析層） |  |
| personas[6].riskProfile.stressResponse | riskProfile.stressResponse | stress_response | 第 5.7 節「壓力下的表現」 | 扁平→巢狀（顧問分析層） | 歸屬風險層依 Glossary 定義（決策 6.1） |
| personas[6].riskProfile.correctionStrategy | riskProfile.correctionStrategy | correction_strategy | 第 5.7 節「修正策略」 | 扁平→巢狀（顧問分析層） |  |
| personas[6].riskProfile.growthDirection | riskProfile.growthDirection | growth_direction | 第 5.7 節「適合的成長方向」 | 扁平→巢狀（顧問分析層） |  |

### personas[7] 創作型（第 5.8 節）

| TypeScript 路徑 | 3.0.0 Schema 路徑 | 2.2.0 原欄位 | 規格章節與欄位 | 名稱遷移 | 備註 |
|---|---|---|---|---|---|
| personas[7].schemaVersion | schemaVersion | schema_version | （文件版本欄） | 值 2.2.0→3.0.0 |  |
| personas[7].id | id | id | 人格 ID（§6.1） | 無 |  |
| personas[7].slug | slug | （新增） | §6.1 ID 對應網址 slug | 3.0.0 新增欄位 | ID 不變，slug 供路由 |
| personas[7].displayName | displayName | display_name | 第 5.8 節「人格名稱」 | 無 |  |
| personas[7].baziSource | baziSource | bazi_source | 第 5.8 節「八字來源」 | 無 |  |
| personas[7].clusterId | clusterId | cluster_id | 第 5.8 節「所屬決策系」 | 無 |  |
| personas[7].corePersona.positioning | corePersona.positioning | positioning | 第 5.8 節「人格定位」 | 扁平→巢狀 |  |
| personas[7].corePersona.coreNeed | corePersona.coreNeed | core_persona.core_need（§3）／core_need（§6.2） | 第 5.8 節「核心需求」 | 扁平→巢狀 |  |
| personas[7].corePersona.coreValues | corePersona.coreValues | core_values | 第 5.8 節「核心價值」 | 扁平→巢狀 | 頓號字串→陣列（依 §6.2 陣列格式），去句尾句號 |
| personas[7].corePersona.lifeGoal | corePersona.lifeGoal | life_goal | 第 5.8 節「人生目標」 | 扁平→巢狀 |  |
| personas[7].corePersona.decisionGoal | corePersona.decisionGoal | decision_goal | 第 5.8 節「決策目標」 | 扁平→巢狀 |  |
| personas[7].corePersona.thinkingPattern | corePersona.thinkingPattern | thinking_pattern | 第 5.8 節「思考模式」 | 扁平→巢狀 |  |
| personas[7].corePersona.actionPattern | corePersona.actionPattern | action_pattern | 第 5.8 節「行動模式」 | 扁平→巢狀 |  |
| personas[7].corePersona.oneLineDefinition | corePersona.oneLineDefinition | one_line_definition | 第 5.8 節「一句人格定義」 | 扁平→巢狀 |  |
| personas[7].corePersona.brandSlogan | corePersona.brandSlogan | brand_slogan | 第 5.8 節「一句品牌標語」 | 扁平→巢狀 |  |
| personas[7].corePersona.plainExplanation | corePersona.plainExplanation | plain_explanation | 第 5.8 節「一句白話解釋」 | 扁平→巢狀 |  |
| personas[7].talentBlueprint.theme | talentBlueprint.theme | talent_archetype.theme | §5.10 天賦主軸 | talent_archetype→talent_blueprint |  |
| personas[7].talentBlueprint.naturalAdvantage | talentBlueprint.naturalAdvantage | talent_archetype.natural_advantage | §5.10 自然優勢 | talent_archetype→talent_blueprint |  |
| personas[7].talentBlueprint.naturalContribution | talentBlueprint.naturalContribution | talent_archetype.natural_contribution | §5.10 自然貢獻 | talent_archetype→talent_blueprint |  |
| personas[7].talentBlueprint.bestRole | talentBlueprint.bestRole | talent_archetype.best_role | §5.10 角色定位 | talent_archetype→talent_blueprint | 角色定位詞，非職業名 |
| personas[7].talentBlueprint.growthPotential | talentBlueprint.growthPotential | talent_archetype.growth_potential | §5.10 成熟潛能 | talent_archetype→talent_blueprint |  |
| personas[7].decisionProfile.decisionHabit | decisionProfile.decisionHabit | decision_habit | 第 5.8 節「決策慣性」 | 扁平→巢狀（人格定義層） |  |
| personas[7].decisionProfile.strength | decisionProfile.strength | strength | 第 5.8 節「最大優勢」 | 扁平→巢狀（人格定義層） |  |
| personas[7].decisionProfile.weakness | decisionProfile.weakness | weakness | 第 5.8 節「最大弱點」 | 扁平→巢狀（人格定義層） | 風險章節需同時讀取本欄與 riskProfile（決策 6.1） |
| personas[7].riskProfile.decisionBlindspot | riskProfile.decisionBlindspot | decision_blindspot | 第 5.8 節「最大決策盲點」 | 扁平→巢狀（顧問分析層） | 與 correctionStrategy 1:1 |
| personas[7].riskProfile.blindspotTriggers | riskProfile.blindspotTriggers | blindspot_triggers | 附錄 B 盲點觸發情境 | 選用→必備；扁平→巢狀 | 頓號字串→陣列 |
| personas[7].riskProfile.recurringMistake | riskProfile.recurringMistake | recurring_mistake | 第 5.8 節「最容易重複犯的錯」 | 扁平→巢狀（顧問分析層） |  |
| personas[7].riskProfile.stressResponse | riskProfile.stressResponse | stress_response | 第 5.8 節「壓力下的表現」 | 扁平→巢狀（顧問分析層） | 歸屬風險層依 Glossary 定義（決策 6.1） |
| personas[7].riskProfile.correctionStrategy | riskProfile.correctionStrategy | correction_strategy | 第 5.8 節「修正策略」 | 扁平→巢狀（顧問分析層） |  |
| personas[7].riskProfile.growthDirection | riskProfile.growthDirection | growth_direction | 第 5.8 節「適合的成長方向」 | 扁平→巢狀（顧問分析層） |  |

### personas[8] 表達型（第 5.9 節）

| TypeScript 路徑 | 3.0.0 Schema 路徑 | 2.2.0 原欄位 | 規格章節與欄位 | 名稱遷移 | 備註 |
|---|---|---|---|---|---|
| personas[8].schemaVersion | schemaVersion | schema_version | （文件版本欄） | 值 2.2.0→3.0.0 |  |
| personas[8].id | id | id | 人格 ID（§6.1） | 無 |  |
| personas[8].slug | slug | （新增） | §6.1 ID 對應網址 slug | 3.0.0 新增欄位 | ID 不變，slug 供路由 |
| personas[8].displayName | displayName | display_name | 第 5.9 節「人格名稱」 | 無 |  |
| personas[8].baziSource | baziSource | bazi_source | 第 5.9 節「八字來源」 | 無 |  |
| personas[8].clusterId | clusterId | cluster_id | 第 5.9 節「所屬決策系」 | 無 |  |
| personas[8].corePersona.positioning | corePersona.positioning | positioning | 第 5.9 節「人格定位」 | 扁平→巢狀 |  |
| personas[8].corePersona.coreNeed | corePersona.coreNeed | core_persona.core_need（§3）／core_need（§6.2） | 第 5.9 節「核心需求」 | 扁平→巢狀 |  |
| personas[8].corePersona.coreValues | corePersona.coreValues | core_values | 第 5.9 節「核心價值」 | 扁平→巢狀 | 頓號字串→陣列（依 §6.2 陣列格式），去句尾句號 |
| personas[8].corePersona.lifeGoal | corePersona.lifeGoal | life_goal | 第 5.9 節「人生目標」 | 扁平→巢狀 |  |
| personas[8].corePersona.decisionGoal | corePersona.decisionGoal | decision_goal | 第 5.9 節「決策目標」 | 扁平→巢狀 |  |
| personas[8].corePersona.thinkingPattern | corePersona.thinkingPattern | thinking_pattern | 第 5.9 節「思考模式」 | 扁平→巢狀 |  |
| personas[8].corePersona.actionPattern | corePersona.actionPattern | action_pattern | 第 5.9 節「行動模式」 | 扁平→巢狀 |  |
| personas[8].corePersona.oneLineDefinition | corePersona.oneLineDefinition | one_line_definition | 第 5.9 節「一句人格定義」 | 扁平→巢狀 |  |
| personas[8].corePersona.brandSlogan | corePersona.brandSlogan | brand_slogan | 第 5.9 節「一句品牌標語」 | 扁平→巢狀 |  |
| personas[8].corePersona.plainExplanation | corePersona.plainExplanation | plain_explanation | 第 5.9 節「一句白話解釋」 | 扁平→巢狀 |  |
| personas[8].talentBlueprint.theme | talentBlueprint.theme | talent_archetype.theme | §5.10 天賦主軸 | talent_archetype→talent_blueprint |  |
| personas[8].talentBlueprint.naturalAdvantage | talentBlueprint.naturalAdvantage | talent_archetype.natural_advantage | §5.10 自然優勢 | talent_archetype→talent_blueprint |  |
| personas[8].talentBlueprint.naturalContribution | talentBlueprint.naturalContribution | talent_archetype.natural_contribution | §5.10 自然貢獻 | talent_archetype→talent_blueprint |  |
| personas[8].talentBlueprint.bestRole | talentBlueprint.bestRole | talent_archetype.best_role | §5.10 角色定位 | talent_archetype→talent_blueprint | 角色定位詞，非職業名 |
| personas[8].talentBlueprint.growthPotential | talentBlueprint.growthPotential | talent_archetype.growth_potential | §5.10 成熟潛能 | talent_archetype→talent_blueprint |  |
| personas[8].decisionProfile.decisionHabit | decisionProfile.decisionHabit | decision_habit | 第 5.9 節「決策慣性」 | 扁平→巢狀（人格定義層） |  |
| personas[8].decisionProfile.strength | decisionProfile.strength | strength | 第 5.9 節「最大優勢」 | 扁平→巢狀（人格定義層） |  |
| personas[8].decisionProfile.weakness | decisionProfile.weakness | weakness | 第 5.9 節「最大弱點」 | 扁平→巢狀（人格定義層） | 風險章節需同時讀取本欄與 riskProfile（決策 6.1） |
| personas[8].riskProfile.decisionBlindspot | riskProfile.decisionBlindspot | decision_blindspot | 第 5.9 節「最大決策盲點」 | 扁平→巢狀（顧問分析層） | 與 correctionStrategy 1:1 |
| personas[8].riskProfile.blindspotTriggers | riskProfile.blindspotTriggers | blindspot_triggers | 附錄 B 盲點觸發情境 | 選用→必備；扁平→巢狀 | 頓號字串→陣列 |
| personas[8].riskProfile.recurringMistake | riskProfile.recurringMistake | recurring_mistake | 第 5.9 節「最容易重複犯的錯」 | 扁平→巢狀（顧問分析層） |  |
| personas[8].riskProfile.stressResponse | riskProfile.stressResponse | stress_response | 第 5.9 節「壓力下的表現」 | 扁平→巢狀（顧問分析層） | 歸屬風險層依 Glossary 定義（決策 6.1） |
| personas[8].riskProfile.correctionStrategy | riskProfile.correctionStrategy | correction_strategy | 第 5.9 節「修正策略」 | 扁平→巢狀（顧問分析層） |  |
| personas[8].riskProfile.growthDirection | riskProfile.growthDirection | growth_direction | 第 5.9 節「適合的成長方向」 | 扁平→巢狀（顧問分析層） |  |

## 二、三大決策系（data/clusters.ts）

### clusters[0] 穩定系（第 4.1 節）

| TypeScript 路徑 | 2.2.0 原欄位 | 規格章節與欄位 | 備註 |
|---|---|---|---|
| clusters[0].schemaVersion | schema_version | 第 4.1 節「（文件版本欄）」 |  |
| clusters[0].id | cluster_id | 第 4.1 節「§6.1 決策系 ID」 |  |
| clusters[0].slug | （新增） | 第 4.1 節「§6.1 ID 對應網址 slug」 | 3.0.0 新增 |
| clusters[0].displayName | （表標題） | 第 4.1 節「決策系名稱」 |  |
| clusters[0].coreStrategy | （第 4 章分類邏輯條列） | 第 4.1 節「面對不確定性的根本策略」 | 原文含「→」符號，照搬 |
| clusters[0].includedPersonaIds | 包含人格 | 第 4.1 節「包含人格」 | 顯示文字（含十神）→ persona ID 陣列 |
| clusters[0].needSpectrum | 核心需求光譜 | 第 4.1 節「核心需求光譜」 | 頓號字串→陣列 |
| clusters[0].sharedPersona | 共同人格 | 第 4.1 節「共同人格」 |  |
| clusters[0].sharedNeed | 共同需求 | 第 4.1 節「共同需求」 |  |
| clusters[0].sharedValues | 共同價值觀 | 第 4.1 節「共同價值觀」 | 規格欄名「共同價值觀」；網站顯示名「共同價值」依專案指令書第十二節（data-issues #4） |
| clusters[0].sharedThinkingPattern | 共同思考模式 | 第 4.1 節「共同思考模式」 |  |
| clusters[0].sharedDecisionPattern | 共同決策模式 | 第 4.1 節「共同決策模式」 |  |
| clusters[0].sharedStrength | 共同優勢 | 第 4.1 節「共同優勢」 |  |
| clusters[0].sharedBlindspot | 共同盲點 | 第 4.1 節「共同盲點」 |  |
| clusters[0].sharedGrowthDirection | 共同成長方向 | 第 4.1 節「共同成長方向」 |  |

### clusters[1] 自主系（第 4.2 節）

| TypeScript 路徑 | 2.2.0 原欄位 | 規格章節與欄位 | 備註 |
|---|---|---|---|
| clusters[1].schemaVersion | schema_version | 第 4.2 節「（文件版本欄）」 |  |
| clusters[1].id | cluster_id | 第 4.2 節「§6.1 決策系 ID」 |  |
| clusters[1].slug | （新增） | 第 4.2 節「§6.1 ID 對應網址 slug」 | 3.0.0 新增 |
| clusters[1].displayName | （表標題） | 第 4.2 節「決策系名稱」 |  |
| clusters[1].coreStrategy | （第 4 章分類邏輯條列） | 第 4.2 節「面對不確定性的根本策略」 | 原文含「→」符號，照搬 |
| clusters[1].includedPersonaIds | 包含人格 | 第 4.2 節「包含人格」 | 顯示文字（含十神）→ persona ID 陣列 |
| clusters[1].needSpectrum | 核心需求光譜 | 第 4.2 節「核心需求光譜」 | 頓號字串→陣列 |
| clusters[1].sharedPersona | 共同人格 | 第 4.2 節「共同人格」 |  |
| clusters[1].sharedNeed | 共同需求 | 第 4.2 節「共同需求」 |  |
| clusters[1].sharedValues | 共同價值觀 | 第 4.2 節「共同價值觀」 | 規格欄名「共同價值觀」；網站顯示名「共同價值」依專案指令書第十二節（data-issues #4） |
| clusters[1].sharedThinkingPattern | 共同思考模式 | 第 4.2 節「共同思考模式」 |  |
| clusters[1].sharedDecisionPattern | 共同決策模式 | 第 4.2 節「共同決策模式」 |  |
| clusters[1].sharedStrength | 共同優勢 | 第 4.2 節「共同優勢」 |  |
| clusters[1].sharedBlindspot | 共同盲點 | 第 4.2 節「共同盲點」 |  |
| clusters[1].sharedGrowthDirection | 共同成長方向 | 第 4.2 節「共同成長方向」 |  |

### clusters[2] 突破系（第 4.3 節）

| TypeScript 路徑 | 2.2.0 原欄位 | 規格章節與欄位 | 備註 |
|---|---|---|---|
| clusters[2].schemaVersion | schema_version | 第 4.3 節「（文件版本欄）」 |  |
| clusters[2].id | cluster_id | 第 4.3 節「§6.1 決策系 ID」 |  |
| clusters[2].slug | （新增） | 第 4.3 節「§6.1 ID 對應網址 slug」 | 3.0.0 新增 |
| clusters[2].displayName | （表標題） | 第 4.3 節「決策系名稱」 |  |
| clusters[2].coreStrategy | （第 4 章分類邏輯條列） | 第 4.3 節「面對不確定性的根本策略」 | 原文含「→」符號，照搬 |
| clusters[2].includedPersonaIds | 包含人格 | 第 4.3 節「包含人格」 | 顯示文字（含十神）→ persona ID 陣列 |
| clusters[2].needSpectrum | 核心需求光譜 | 第 4.3 節「核心需求光譜」 | 頓號字串→陣列 |
| clusters[2].sharedPersona | 共同人格 | 第 4.3 節「共同人格」 |  |
| clusters[2].sharedNeed | 共同需求 | 第 4.3 節「共同需求」 |  |
| clusters[2].sharedValues | 共同價值觀 | 第 4.3 節「共同價值觀」 | 規格欄名「共同價值觀」；網站顯示名「共同價值」依專案指令書第十二節（data-issues #4） |
| clusters[2].sharedThinkingPattern | 共同思考模式 | 第 4.3 節「共同思考模式」 |  |
| clusters[2].sharedDecisionPattern | 共同決策模式 | 第 4.3 節「共同決策模式」 |  |
| clusters[2].sharedStrength | 共同優勢 | 第 4.3 節「共同優勢」 |  |
| clusters[2].sharedBlindspot | 共同盲點 | 第 4.3 節「共同盲點」 |  |
| clusters[2].sharedGrowthDirection | 共同成長方向 | 第 4.3 節「共同成長方向」 |  |

## 三、名詞定義（data/glossary.ts）

| TypeScript 路徑 | 來源 | 備註 |
|---|---|---|
| glossary[0..17] | 規格第 3 章 Glossary 全表（18 詞條） | 定義逐字搬入；expressed_persona 與 risk 附 3.0.0 revisionNote |
| glossary[18] 天賦密碼 talent_blueprint | Version 3.0.0 修訂提案（原 §5.10 talent_archetype） | 新增詞條；migration 標示 |
| glossary[19] 作答傾向清晰度 clarity | Version 3.0.0 修訂提案（取代 §7.1 confidence） | 新增詞條 |

## 四、格式轉換總覽（非文字修改）

1. 核心價值／需求光譜／盲點觸發情境：頓號分隔字串 → string[]（依 §6.2 core_values 陣列格式），去除句尾句號。
2. 欄位命名：規格 snake_case → TypeScript camelCase（全檔一致）。
3. 巢狀化：2.2.0 扁平 21 欄 → 3.0.0 corePersona / talentBlueprint / decisionProfile / riskProfile。
4. includedPersonaIds：規格顯示文字（含十神）→ persona ID 陣列；十神資訊由各 persona.baziSource 保存。
5. Glossary「決策慣性」「決策盲點」定義：規格原文含 Markdown 粗體標記（**中性詞**／**風險詞**），資料層為純文字字串，僅去除 `**` 符號，文字內容逐字相同（已以腳本比對）。
