# CSV Import

## 基本方針

MVPでは、応募情報を CSV として取り込む。

CSVは以下の2種類に分ける。

* ミニイベント用CSV
* 個人DJ用CSV

Googleフォームの回答は、CSVとしてエクスポートされたものを取り込む想定とする。

## ミニイベント用CSV

ミニイベント応募を取り込む。

現時点の候補列:

* `mini_event_id`
* `mini_event_name`
* `dj_person_id`
* `dj_display_name`
* `preferred_time_label`
* `duration_minutes`

正式な列定義は未確定である。

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

## 取り込み時の扱い

CSV取り込み時には、少なくとも以下を検証する。

* 必須列が存在すること
* 所要時間が 15 分単位であること
* 希望時間ラベルが定義済みラベルに含まれること
* 個人DJのジャンルが定義済みジャンルに含まれること
* 個人DJの希望順位が、同一人物の複数応募を判別できる形で入力されていること

取り込み時点で確定できない配置上の問題は、タイムライン配置後の検証で扱う。

## エラー方針

CSVの構造エラーや必須値不足など、取り込み自体が成立しない問題はインポートエラーとして扱う。

同一人物重複や希望時間外配置など、配置状態に依存する問題はスケジュール検証で扱う。
