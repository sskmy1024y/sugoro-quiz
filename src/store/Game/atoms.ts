import {atomFamily} from "recoil";
import {Game} from "models/Game";

export const LatestGameState = atomFamily<Game | null, string>({
  key: "LatestGameState",
  default: null
})
