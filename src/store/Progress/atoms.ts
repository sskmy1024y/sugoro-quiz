import { atomFamily} from "recoil";
import {Progress} from "models/ProgressState";

export const ProgressState = atomFamily<Progress, string>({
  key: "ProgressState",
  default: {
    currentPlayerId: undefined,
    dice: undefined,
    state: "not-start",
  }
})

