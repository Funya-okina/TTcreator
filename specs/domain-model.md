# Domain Model

## Event

DJイベント全体を表す。

主な属性:

* `eventId`
* `name`
* `timeGridUnitMinutes`
  * MVPでは 15 分固定。
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

配置の開始・終了は 15 分単位に揃える。

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

ミニイベントのDJには、入力時点で一意のIDが入ってくる。個人DJとの照合方法は未確定である。

## Mini Event Request

ミニイベント応募を表す。

主な属性:

* `miniEventId`
* `miniEventName`
* `djPersonId`
* `djDisplayName`
* `preferredTimeLabel`
* `durationMinutes`

所要時間は 15 分単位の可変長である。

ミニイベントが複数DJを含むかは未確定である。複数DJを含む場合は、同じ `miniEventId` に複数の人物が紐づくモデルを検討する。

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

所要時間は 15 分単位の可変長である。

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

## DJ Usage Summary

特定DJのブース使用状況を表す。

集計対象:

* 個人DJとしての配置
* ミニイベント参加者としての配置

主な指標:

* ブース使用回数
* ブース使用時間

ブース使用時間は、配置された枠の合計時間として算出する。
