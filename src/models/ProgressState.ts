export type ProgressState =
  | "not-started" // 開始前
  | "dice-waiting" // サイコロ待ち
  | "dice-rolling" // サイコロ振り中
  | "dice-rolled" // サイコロ振り終わり
  | "next-waiting" // 次へ押し待ち
  | "event-waiting" // イベント待ち
  // TODO: イベント周りのprogressを追加する
  | "game-happened" // ゲーム発生
  | "game-force-happened" // ゲーム発生（強制発生マス）
  | "game-prepare" // ゲーム準備中
  | "game-start" // ゲーム開始
  | "game-end" // ゲーム終了（結果画面）

  // -------------
  | "next-waiting" // 次のターン待ち → "dice-waiting"になる
  | "goal" // 誰かがゴールした
  | "result"  // 結果発表
  | "finished" // ゲーム終了no


export interface Progress {
  currentPlayerId: string | undefined
  dice: number | undefined;
  state: ProgressState;
}
