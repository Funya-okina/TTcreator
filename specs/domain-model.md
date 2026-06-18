# Domain Model

## Event

DJイベント全体を表す。

主な属性:

* `eventId`
* `name`
* `timeGridUnitMinutes`
  * 時間単位の共通基準は `shared-rules.md` を参照する。
* `booths`
* `timePreferenceSlots`
* `breaks`

## Booth

イベント内のブースを表す。

主な属性:

* `boothId`
* `name`
* `availableTimeRanges`
* `breakTimeRanges`

ブース数は可変である。

## Time Range

開始時刻と終了時刻を持つ時間範囲を表す。

タイムライン上の配置、ブース利用可能時間、休憩時間、希望時間区分の割り当てに使う。

時間単位の共通基準は `shared-rules.md` を参照する。

## Time Preference Label

応募者が希望時間として選択する区分を表す。

定義済みラベル:

* `早朝`
* `午前`
* `午後`
* `夜`
* `深夜`
* `希望無し`

各ラベルは、ツール上で任意の時間範囲に割り当てられる。`希望無し` は特定時間範囲への希望を持たない状態として扱う。

## Person

DJを行う人物を表す。

主な属性:

* `personId`
* `displayName`

`personId` はDJを一意に識別するIDである。

人物IDの同一性、重複判定、集計に関する共通基準は `shared-rules.md` を参照する。

## Mini Event Request

ミニイベント応募を表す。

主な属性:

* `miniEventId`
* `miniEventName`
* `participants`
* `preferredTimeLabel`
* `durationMinutes`

所要時間は共通時間単位に基づく可変長である。

ミニイベントは複数のDJを含む。

`participants` は、ミニイベントに参加するDJの一覧である。

参加DJの主な属性:

* `personId`
* `displayName`
* `usageMinutes`

`usageMinutes` は、そのミニイベント内で該当DJがブースを使用する時間を表す。

ミニイベント全体の `durationMinutes` は、タイムライン上でそのミニイベント枠が占有する時間を表す。参加DJごとの `usageMinutes` は、DJ使用状況集計に用いる。

ミニイベント参加DJの共通基準は `shared-rules.md` を参照する。

## Solo DJ Request

個人DJ応募を表す。

主な属性:

* `requestId`
* `personId`
* `djDisplayName`
* `preferredTimeLabel`
* `preferenceRank`
* `genre`
* `durationMinutes`

所要時間は共通時間単位に基づく可変長である。

同じ人物は複数の個人DJ応募を出せる。その場合、それぞれに希望順位を設定する必要がある。

## Genre

個人DJのやりたいジャンルを表す。

初期分類:

* `オタク`
* `クラブ`
* `ミックスジャンル`

ジャンルは後から追加・細分化できる設計にする。

## Schedule Assignment

応募をタイムライン上に配置した状態を表す。

主な属性:

* `assignmentId`
* `sourceType`
  * `miniEvent` または `soloDJ`
* `sourceId`
* `boothId`
* `startTime`
* `endTime`

配置は、ブース、開始時刻、終了時刻を持つ。

`sourceType` が `miniEvent` の場合、`sourceId` は `miniEventId` を指す。

配置の共通基準は `shared-rules.md` を参照する。

## DJ Usage Summary

特定DJのブース使用状況を表す。

集計対象:

* 個人DJとしての配置
* ミニイベント参加者としての配置

主な指標:

* ブース使用回数
* ブース使用時間

DJ使用状況集計の共通基準は `shared-rules.md` を参照する。
