export type ProgressState =
  | "not-started" // 開始前
  | "dice-waiting" // サイコロ待ち
  | "dice-rolling" // サイコロ振り中
  | "dice-rolled" // サイコロ振り終わり
  | "next-waiting" // 次へ押し待ち
  | "event-waiting" // イベント待ち
  // TODO: イベント周りのprogressを追加する
  | "next-waiting" // 次のターン待ち → "dice-waiting"になる
  | "goal" // 誰かがゴールした
  | "result"  // 結果発表
  | "finished" // ゲーム終了no


export interface Progress {
  currentPlayerId: string | undefined
  dice: number | undefined;
  state: ProgressState;
}
