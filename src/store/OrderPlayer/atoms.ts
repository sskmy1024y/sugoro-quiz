import {atomFamily} from "recoil";

export const OrderPlayerIdsState = atomFamily<string[], string>({
  key: "OrderPlayerIdsState",
  default: []
})
