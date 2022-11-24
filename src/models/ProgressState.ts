export type ProgressState =
  | "not-started" // 開始前
  | "dice-waiting" // サイコロ待ち
  | "dice-rolling" // サイコロ振り中
  | "dice-rolled" // サイコロ振り終わり
  | "moving" // 移動中
  | "moved" // 移動終わり
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
