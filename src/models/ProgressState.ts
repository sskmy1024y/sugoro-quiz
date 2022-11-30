export const ProgressState = {
  NotStarted : "not-start", // 開始前
  DiceWaiting : "dice-waiting", // サイコロ待ち
  DiceRolling : "dice-rolling", // サイコロ振り中
  DiceRolled : "dice-rolled", // サイコロ振り終わり
  NextWaiting : "next-waiting", // 次へ押し待ち
  EventWaiting : "event-waiting", // イベント待ち
  GameHappened : "game-happened", // ゲーム発生
  GameForceHappened : "game-force-happened", // ゲーム発生（強制発生マス）
  GamePrepare : "game-prepare", // ゲーム準備中
  GameStart : "game-start", // ゲーム開始
  GameEnd : "game-end", // ゲーム終了（結果画面）
} as const
// eslint-disable-next-line @typescript-eslint/no-redeclare
export type ProgressState = typeof ProgressState[keyof typeof ProgressState]

export interface Progress {
  currentPlayerId: string | undefined
  dice: number | undefined;
  state: ProgressState;
}
