# TTcreator Specifications

このディレクトリは、TTcreator の正式仕様を管理する。

この README は `specs/` 配下の親ドキュメントである。仕様を確認・更新・実装するときは、まずこのファイルを読み、作業内容に必要な仕様ファイルだけを参照する。

TTcreator は、DJイベント主催者がミニイベントおよび個人DJの応募情報をもとに、複数ブースのタイムラインへ出演枠を視覚的に配置・調整するためのツールである。

## Core Decisions

* MVPは、単一イベントの手動タイムライン編集を対象とする。
* 入力は、ミニイベント用CSVと個人DJ用CSVに分ける。
* 横断的な基準は `shared-rules.md` を正式な参照元とする。
* ブース数は可変で、ブースごとの利用可能時間と休憩時間を設定できる。
* 希望時間は「早朝」「午前」「午後」「夜」「深夜」「希望無し」から選択し、各ラベルは任意の時間範囲へ割り当てられる。
* 初期開発では、完成したタイムラインを画面上で確認できればよい。
* 将来的には、データ出力または画像出力が可能な設計にする。

## 作業別参照ルール

作業時は、以下の表に従って必要な仕様だけを読む。

| 作業内容 | 参照する仕様 |
| -- | -- |
| 全ての実装作業 | `shared-rules.md` |
| プロダクト全体の意図確認 | `product-requirements.md` |
| データ構造・概念整理 | `domain-model.md`, `shared-rules.md` |
| CSV取り込み | `csv-import.md`, `shared-rules.md`, 必要に応じて `domain-model.md` |
| タイムライン配置・検証・集計 | `scheduling.md`, `shared-rules.md`, 必要に応じて `domain-model.md` |
| UI設計・画面操作 | `ui-workflow.md`, 関連する機能仕様 |
| 未確定事項の確認 | `open-questions.md` |
| 仕様全体の棚卸し | この README と全仕様ファイル |

## 読む順番

仕様全体を確認する必要がある場合は、以下の順で読む。

1. `README.md`
2. `shared-rules.md`
3. `product-requirements.md`
4. `domain-model.md`
5. `scheduling.md`
6. `csv-import.md`
7. `ui-workflow.md`
8. `open-questions.md`

## 仕様ファイル

* `product-requirements.md`
  * プロダクト目的、対象ユーザー、主要要件、MVP範囲。
* `shared-rules.md`
  * 人物ID、時間単位、ミニイベント参加DJ、配置、エラー強度、DJ使用状況集計の共通基準。
* `domain-model.md`
  * イベント、ブース、応募、人物、配置、集計などの主要概念。
* `csv-import.md`
  * CSV取り込み方針、ミニイベントCSV、個人DJ CSV、取り込み時の扱い。
* `scheduling.md`
  * タイムライン、配置、希望時間区分、休憩、エラー判定。
* `ui-workflow.md`
  * 主催者が画面上で行う主要操作と表示すべき情報。
* `open-questions.md`
  * 未確定事項。実装時に勝手に確定せず、ユーザー確認または明示的な仮定として扱う。

## 運用

* この仕様は `.codex/product-brief.md` とユーザー合意を根拠とする。
* 実装は、ユーザーが明示的に「実装してください」と依頼するまで行わない。
* 実装時は、この README の作業別参照ルールに従い、関連仕様だけを読む。
* 人物ID、時間単位、エラー強度、DJ使用状況集計などの共通基準は `shared-rules.md` を優先する。
* 未確定事項は `open-questions.md` に残し、実装判断に影響する場合は事前確認する。
* 仕様変更が必要な場合は、仕様更新と実装を同時に行わない。
* `.codex/product-brief.md` は仕様化前の背景資料であり、`specs/` 作成後の実装では正式仕様を優先する。
