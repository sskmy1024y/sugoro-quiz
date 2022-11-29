import {useRecoilState, useRecoilValue} from "recoil";
import {LoginUserState} from "./atoms";
import {LoginUser, User} from "models/User";
import { ref, get } from "firebase/database";
import {db} from "config/firebase";

export const useLoginUser = () => {
  return useRecoilValue(LoginUserState);
}

export const useLoginUserState = () => {
  const [loginUser, setLoginUser] = useRecoilState(LoginUserState);

  const setLoginUserWithVerified = async (loginUser: LoginUser) => {
    get(ref(db, `rooms/${loginUser.roomId}/users`)).then((snapshot) => {
      if (snapshot.exists()) {
        const users: User[] = []
        snapshot.forEach((childSnapshot) => {
          users.push({
            key: childSnapshot.key!,
            ...childSnapshot.val()
          })
        })
        const verifiedUser = users.find(user => user.id === loginUser.id)
        if (verifiedUser) {
          setLoginUser(loginUser)
          return;
        }
      }
      throw new Error("login user is not found")
    })
  }

  return [loginUser, setLoginUserWithVerified] as const;
}
