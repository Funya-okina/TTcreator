# CSV Import

## 基本方針

MVPでは、応募情報を CSV として取り込む。

CSVは以下の2種類に分ける。

* ミニイベント用CSV
* 個人DJ用CSV

Googleフォームの回答は、CSVとしてエクスポートされたものを取り込む想定とする。

人物ID、時間単位、ミニイベント参加DJの共通基準は `shared-rules.md` を参照する。

## ミニイベント用CSV

ミニイベント応募を取り込む。

ミニイベントCSVの参加DJ集約ルールは `shared-rules.md` を参照する。

現時点の候補列:

* `mini_event_id`
* `mini_event_name`
* `dj_person_id`
* `dj_display_name`
* `dj_usage_minutes`
* `preferred_time_label`
* `duration_minutes`

正式な列定義は未確定である。

`dj_usage_minutes` は、そのミニイベント内で該当DJがブースを使用する時間を表す。

`dj_person_id` は、参加DJを一意に識別する人物IDである。

同じ `mini_event_id` の行では、`mini_event_name`、`preferred_time_label`、`duration_minutes` は同一であることを期待する。異なる値が含まれる場合の扱いは未確定である。

## 個人DJ用CSV

個人DJ応募を取り込む。

現時点の候補列:

* `request_id`
* `person_id`
* `dj_display_name`
* `preferred_time_label`
* `preference_rank`
* `genre`
* `duration_minutes`

正式な列定義は未確定である。

`person_id` は、個人DJを一意に識別する人物IDである。

## 取り込み時の扱い

CSV取り込み時には、少なくとも以下を検証する。

* 必須列が存在すること
* 人物IDが入力されていること
* 所要時間が共通時間単位に合っていること
* ミニイベント用CSVでは、`dj_usage_minutes` が共通時間単位に合っていること
* 希望時間ラベルが定義済みラベルに含まれること
* ミニイベント用CSVでは、同じ `mini_event_id` の複数行を1つのミニイベントとしてまとめられること
* 個人DJのジャンルが定義済みジャンルに含まれること
* 個人DJの希望順位が、同一人物の複数応募を判別できる形で入力されていること

取り込み時点で確定できない配置上の問題は、タイムライン配置後の検証で扱う。

## エラー方針

CSVの構造エラーや必須値不足など、取り込み自体が成立しない問題はインポートエラーとして扱う。

同一人物重複や希望時間外配置など、配置状態に依存する問題はスケジュール検証で扱う。
