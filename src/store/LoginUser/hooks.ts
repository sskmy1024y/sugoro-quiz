import {useRecoilState, useRecoilValue} from "recoil";
import {LoginUserState} from "./atoms";


export const useLoginUser = () => {
  return useRecoilValue(LoginUserState);
}

export const useLoginUserState = () => {
  return useRecoilState(LoginUserState);
}
