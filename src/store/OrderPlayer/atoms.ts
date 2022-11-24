import {atomFamily} from "recoil";
import {User} from "models/User";

export const OrderPlayerIdsState = atomFamily<string[], string>({
  key: "OrderPlayerIdsState",
  default: []
})
