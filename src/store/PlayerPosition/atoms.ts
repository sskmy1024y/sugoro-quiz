import {atomFamily} from "recoil";
import {PlayerPosition} from "models/PlayerPosition";

export const PlayerPositionsState = atomFamily<PlayerPosition[], string>({
  key: "PlayerPositionsState",
  default: []
})
