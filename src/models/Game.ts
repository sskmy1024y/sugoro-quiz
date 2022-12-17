import {Mission} from "models/Mission";
import {User} from "models/User";

export type Game = {
  key: string; // firebase key
  missionId: string;
  gamePlayers: GamePlayer[]; // 順番はポイントが高い順
  currentGamePlayerId?: string;
  isEventMath: boolean; // イベントマスのゲームならtrue
  timeoutAt: number; // タイムアウト時刻（一人ごと）
  createdAt: number;
}

export type GamePlayer = {
  playerId: string;
  isTarget: boolean;
  voteTo?: {
    toPlayerId: string;
    vote: "good" | "bad";
  }[]
}

export type CombinedGame = {
  key: string; // firebase key
  mission: Mission;
  gamePlayers: CombinedGamePlayer[];
  currentGamePlayerId: string | null;
  isEventMath: boolean; // イベントマスのゲームならtrue
  timeoutAt: number;
  createdAt: number;
}

export type CombinedGamePlayer = {
  player: User;
  isTarget: boolean;
  voteTo: CombinedGamePlayerVote[]
}

export type CombinedGamePlayerVote = User & {
  vote: "good" | "bad";
}
