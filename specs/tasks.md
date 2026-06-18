# Tasks

このファイルは、初回実装を Codex が1タスクずつ実装できる粒度に分解したタスクリストである。

各タスクを実装する前に、`specs/README.md` の作業別参照ルールに従い、必要な仕様だけを確認する。横断的な基準は常に `specs/shared-rules.md` を優先する。

## 進め方

* 原則として、`T1` から順に1タスクずつ実装する。
* 各タスクの実装前に、変更予定ファイル、実装方針、テスト方針を提示する。
* 依存パッケージ追加、大規模リファクタリング、破壊的変更は事前に確認する。
* タスク完了後は、該当タスクの完了条件を満たしたか確認する。
* 初回実装では、CSV取り込み、永続保存、出力、自動配置は扱わない。

## T1: フロントエンド基盤の作成

Status: completed

目的:

Vite + React + TypeScript の最小構成を作成し、以後の実装を進められる状態にする。

参照仕様:

* `specs/README.md`
* `specs/implementation-plan.md`

変更予定ファイル:

* `package.json`
* `tsconfig.json`
* `vite.config.ts`
* `index.html`
* `src/main.tsx`
* `src/App.tsx`
* `src/styles.css`

完了条件:

* Vite + React + TypeScript のアプリが起動できる。
* 初期画面に TTcreator の作業画面の土台が表示される。
* TypeScript のビルドまたは型チェックが通る。
* 以後のタスクで `src/domain/` と `src/components/` を追加できる構成になっている。

対象外:

* タイムライン表示
* 応募データ表示
* 配置操作
* 検証ロジック
* CSV取り込み
* 永続保存
* 出力機能

## T2: ドメイン型の定義

Status: pending

目的:

仕様に基づいて、イベント、ブース、希望時間区分、人物、ミニイベント、個人DJ、配置、検証結果、DJ使用状況の TypeScript 型を定義する。

参照仕様:

* `specs/shared-rules.md`
* `specs/domain-model.md`
* `specs/scheduling.md`

変更予定ファイル:

* `src/domain/types.ts`

完了条件:

* `Event`、`Booth`、`TimeRange`、`TimePreferenceLabel` 相当の型がある。
* `Person` 相当の型があり、人物IDを `personId` として扱える。
* `MiniEventRequest` 相当の型があり、複数参加DJと参加DJごとの `usageMinutes` を表現できる。
* `SoloDJRequest` 相当の型がある。
* `ScheduleAssignment` 相当の型がある。
* 強いエラー、弱いエラー、DJ使用状況を表す型がある。
* 横断的な基準を型コメントまたは命名で読み取れる。

対象外:

* サンプルデータ
* 検証ロジック
* 集計ロジック
* UI
* CSV取り込み

## T3: サンプルデータの作成

Status: pending

目的:

初回実装を CSV なしで確認できるように、仕様上の重要ケースを含むサンプルデータを作成する。

参照仕様:

* `specs/shared-rules.md`
* `specs/domain-model.md`
* `specs/implementation-plan.md`

変更予定ファイル:

* `src/domain/sampleData.ts`

完了条件:

* 複数ブースを持つ単一イベントのサンプルがある。
* ブースごとの利用可能時間と休憩時間のサンプルがある。
* 希望時間区分の時間範囲サンプルがある。
* 複数DJを含むミニイベントのサンプルがある。
* ミニイベント参加DJごとの `usageMinutes` を確認できる。
* 個人DJのサンプルが複数ある。
* ミニイベント参加DJと個人DJで同じ `personId` を持つ人物がいる。
* 同一DJ重複の強いエラーを発生させられる初期配置がある。
* 希望時間外配置の弱いエラーを発生させられる初期配置がある。

対象外:

* CSV取り込み
* データ編集UI
* 永続保存
* 出力機能

## T4: 時間計算ユーティリティの実装

Status: pending

目的:

15分単位のタイムライン、時間範囲、重複判定、表示用時間ラベルを扱うための純粋関数を実装する。

参照仕様:

* `specs/shared-rules.md`
* `specs/domain-model.md`
* `specs/scheduling.md`

変更予定ファイル:

* `src/domain/time.ts`
* 必要に応じて `src/domain/types.ts`

完了条件:

* 時刻を比較可能な値として扱える。
* 時間範囲の重複を判定できる。
* 時間範囲の長さを分単位で算出できる。
* タイムライン表示用の時間スロットを生成できる。
* 共通時間単位に合っているかを判定できる。

対象外:

* 同一DJ重複の検証
* 希望時間外の検証
* DJ使用状況集計
* UI

## T5: 配置検証ロジックの実装

Status: pending

目的:

手動配置されたスケジュールに対して、同一DJ重複の強いエラーと希望時間外配置の弱いエラーを判定する。

参照仕様:

* `specs/shared-rules.md`
* `specs/scheduling.md`
* `specs/domain-model.md`
* `specs/implementation-plan.md`

変更予定ファイル:

* `src/domain/validation.ts`
* 必要に応じて `src/domain/time.ts`
* 必要に応じて `src/domain/types.ts`

完了条件:

* 同じ `personId` のDJが別ブースで時間重複している場合、強いエラーとして検出できる。
* 個人DJとしての配置とミニイベント参加者としての配置を横断して重複判定できる。
* ミニイベントに複数DJがいる場合、参加DJ全員を重複判定対象にできる。
* 希望時間区分の時間範囲外に配置された場合、弱いエラーとして検出できる。
* `希望無し` の応募では希望時間外の弱いエラーが発生しない。
* 検証結果がUIで表示しやすい構造になっている。

対象外:

* ブース利用可能時間外のエラー強度確定
* 休憩時間との衝突のエラー強度確定
* 同一ブース内の時間重複のエラー強度確定
* CSV取り込み時のバリデーション
* UI表示

## T6: DJ使用状況集計ロジックの実装

Status: pending

目的:

配置済みスケジュールから、人物ID単位のブース使用回数とブース使用時間を算出する。

参照仕様:

* `specs/shared-rules.md`
* `specs/domain-model.md`
* `specs/scheduling.md`
* `specs/implementation-plan.md`

変更予定ファイル:

* `src/domain/usage.ts`
* 必要に応じて `src/domain/types.ts`

完了条件:

* 個人DJの配置がDJ使用状況に反映される。
* ミニイベント参加者の配置がDJ使用状況に反映される。
* 集計は表示名ではなく `personId` 単位で行われる。
* 個人DJの使用時間は配置枠の時間から算出される。
* ミニイベント参加DJの使用時間は `usageMinutes` から算出される。
* ミニイベント全体の配置時間を全参加DJにそのまま加算しない。
* ブース使用回数を算出できる。
* 集計に含まれる配置一覧をUIへ渡せる。

対象外:

* UI表示
* CSV取り込み
* 永続保存

## T7: 基本レイアウトとイベント設定表示の実装

Status: pending

目的:

イベント全体、ブース、利用可能時間、休憩時間、希望時間区分を確認できる基本画面を作成する。

参照仕様:

* `specs/ui-workflow.md`
* `specs/domain-model.md`
* `specs/shared-rules.md`

変更予定ファイル:

* `src/App.tsx`
* `src/styles.css`
* `src/components/EventSetupPanel.tsx`
* 必要に応じて `src/domain/sampleData.ts`

完了条件:

* イベント名が表示される。
* ブース一覧が表示される。
* ブースごとの利用可能時間が表示される。
* ブースごとの休憩時間が表示される。
* 希望時間区分と対応する時間範囲が表示される。
* 操作画面として、応募一覧、タイムライン、エラー、DJ使用状況の領域が配置される。

対象外:

* 配置操作
* タイムライン上のカード配置
* 検証結果表示
* 集計結果表示

## T8: 応募一覧表示の実装

Status: pending

目的:

ミニイベントと個人DJの応募を、主催者が配置前に確認できる一覧として表示する。

参照仕様:

* `specs/ui-workflow.md`
* `specs/domain-model.md`
* `specs/shared-rules.md`

変更予定ファイル:

* `src/components/RequestList.tsx`
* `src/App.tsx`
* `src/styles.css`

完了条件:

* ミニイベントと個人DJを区別して表示できる。
* ミニイベント名、参加DJ、DJ別ブース使用時間、希望時間、所要時間を表示できる。
* 個人DJの表示名、人物ID、希望時間、希望順位、ジャンル、所要時間を表示できる。
* 配置済みかどうかを表示できる。
* タイムライン配置に使う対象を選択または操作できるUIの土台がある。

対象外:

* CSV取り込み
* 高度なフィルタリング
* 自動配置
* 永続保存

## T9: タイムライン表示の実装

Status: pending

目的:

複数ブースと時間軸に沿って、配置済みのミニイベントと個人DJを視覚的に確認できるタイムラインを実装する。

参照仕様:

* `specs/ui-workflow.md`
* `specs/scheduling.md`
* `specs/domain-model.md`
* `specs/shared-rules.md`

変更予定ファイル:

* `src/components/Timeline.tsx`
* `src/components/AssignmentCard.tsx`
* `src/App.tsx`
* `src/styles.css`
* 必要に応じて `src/domain/time.ts`

完了条件:

* ブース別の時間軸が表示される。
* 配置済み枠がブースと時間に応じて表示される。
* ミニイベントカードに参加DJとDJ別ブース使用時間が表示される。
* 個人DJカードに表示名、希望時間、希望順位、ジャンルが表示される。
* ブース利用可能時間と休憩時間を視覚的に確認できる。
* 画面幅が限られても、主要情報が破綻せず確認できる。

対象外:

* ドラッグアンドドロップによる配置変更
* CSV取り込み
* 出力機能

## T10: 手動配置操作の実装

Status: pending

目的:

応募一覧からタイムラインへ、ミニイベントまたは個人DJを手動で配置できるようにする。

参照仕様:

* `specs/ui-workflow.md`
* `specs/scheduling.md`
* `specs/shared-rules.md`
* `specs/implementation-plan.md`

変更予定ファイル:

* `src/App.tsx`
* `src/components/RequestList.tsx`
* `src/components/Timeline.tsx`
* `src/components/AssignmentCard.tsx`
* `src/styles.css`

完了条件:

* 未配置のミニイベントまたは個人DJを選択できる。
* 選択した応募をブースと開始時刻に割り当てられる。
* 配置後、タイムライン上にカードとして表示される。
* 配置変更後に検証結果とDJ使用状況が再計算される。
* 配置済み応募を未配置へ戻せる、または別の位置へ再配置できる。

対象外:

* 自動配置
* 高度なドラッグアンドドロップ体験
* 永続保存
* 複数ユーザー編集

## T11: エラー表示の実装

Status: pending

目的:

配置検証ロジックの結果を、主催者が見落としにくい形で画面に表示する。

参照仕様:

* `specs/shared-rules.md`
* `specs/scheduling.md`
* `specs/ui-workflow.md`
* `specs/implementation-plan.md`

変更予定ファイル:

* `src/components/ErrorPanel.tsx`
* `src/components/AssignmentCard.tsx`
* `src/App.tsx`
* `src/styles.css`

完了条件:

* 強いエラーが赤系の表示で確認できる。
* 弱いエラーが黄系の表示で確認できる。
* 同一DJ重複の対象DJ、対象配置、重複時間帯が分かる。
* 希望時間外配置の対象応募と配置時間が分かる。
* エラーがある配置カードにも状態が反映される。

対象外:

* エラー強度が未確定な検証候補の実装
* エラー修正の自動提案
* CSV取り込み時のエラー表示

## T12: DJ使用状況表示の実装

Status: pending

目的:

特定DJごとのブース使用回数、ブース使用時間、集計に含まれる配置一覧を画面で確認できるようにする。

参照仕様:

* `specs/shared-rules.md`
* `specs/scheduling.md`
* `specs/ui-workflow.md`
* `specs/implementation-plan.md`

変更予定ファイル:

* `src/components/DjUsagePanel.tsx`
* `src/App.tsx`
* `src/styles.css`
* 必要に応じて `src/domain/usage.ts`

完了条件:

* 人物ID単位でDJ使用状況が一覧表示される。
* DJ名、人物ID、ブース使用回数、ブース使用時間が表示される。
* 個人DJ出演とミニイベント参加が同じ人物IDで集計される。
* ミニイベント参加DJの使用時間は `usageMinutes` に基づいて表示される。
* 集計に含まれる配置一覧を確認できる。

対象外:

* 集計結果のCSV出力
* 画像出力
* 永続保存

## T13: ドメインロジックのテスト追加

Status: pending

目的:

時間計算、検証、集計の中核ロジックをテストし、仕様の重要ルールが壊れにくい状態にする。

参照仕様:

* `specs/shared-rules.md`
* `specs/implementation-plan.md`
* `specs/scheduling.md`

変更予定ファイル:

* `package.json`
* `src/domain/time.test.ts`
* `src/domain/validation.test.ts`
* `src/domain/usage.test.ts`
* 必要に応じてテスト設定ファイル

完了条件:

* 時間範囲の重複判定をテストできる。
* 同一DJ重複の強いエラー判定をテストできる。
* 希望時間外配置の弱いエラー判定をテストできる。
* `希望無し` で弱いエラーが出ないことをテストできる。
* ミニイベント参加DJを含むDJ使用状況集計をテストできる。
* `usageMinutes` が集計に使われることをテストできる。
* テストコマンドが実行できる。

対象外:

* E2Eテスト
* ブラウザ操作テスト
* CSV取り込みテスト

## T14: 初回実装の仕上げ確認

Status: pending

目的:

初回実装の成功条件を満たしているか、画面とコマンドで確認する。

参照仕様:

* `specs/implementation-plan.md`
* `specs/shared-rules.md`
* `specs/ui-workflow.md`
* `specs/scheduling.md`

変更予定ファイル:

* 必要に応じて `src/App.tsx`
* 必要に応じて `src/styles.css`
* 必要に応じて `README.md`

完了条件:

* ブース別タイムラインが画面上で確認できる。
* ミニイベントと個人DJをタイムラインに配置できる。
* 同一DJが別ブースで時間重複した場合、強いエラーとして確認できる。
* 希望時間外配置が弱いエラーとして確認できる。
* 特定DJのブース使用回数とブース使用時間を確認できる。
* ミニイベント参加DJの使用時間は、ミニイベント全体の配置時間ではなく参加DJごとの使用時間で集計される。
* ビルドまたは型チェックが通る。
* ドメインロジックのテストが通る。

対象外:

* CSV取り込み
* 永続保存
* データ出力
* 画像出力
* 自動配置
