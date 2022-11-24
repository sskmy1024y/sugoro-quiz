import {atomFamily} from "recoil";
import {User} from "models/User";

export const MembersState = atomFamily<User[], string>({
  key: "MembersState",
  default: []
})
