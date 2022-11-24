import {atom} from "recoil";
import {LoginUser} from "models/User";

export const LoginUserState = atom<LoginUser | null>({
  key: "LoginUserState",
  default: null,
})

