import {atomFamily} from "recoil";
import {Game} from "models/Game";

export const LatestGameState = atomFamily<Game | null, string>({
  key: "LatestGameState",
  default: null
})

export const GameQueueState = atomFamily<Game[], string>({
  key: "GameQueueState",
  default: []
})
