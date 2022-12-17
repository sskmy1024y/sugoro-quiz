import {useRecoilState, useRecoilValue, useSetRecoilState} from "recoil";
import {LoginUserState} from "./atoms";
import {LoginUser, User} from "models/User";
import { ref, get, runTransaction } from "firebase/database";
import {db} from "config/firebase";
import {PlayerPosition} from "models/PlayerPosition";
import {useCallback} from "react";

export const useLoginUser = () => {
  return useRecoilValue(LoginUserState);
}

export const useLoginUserState = () => {
  const loginUser = useLoginUser();
  const setLoginUser = useSetLoginUser();

  const setLoginUserWithVerified = async (loginUser: LoginUser) => {
    get(ref(db, `rooms/${loginUser.roomId}/users`)).then((snapshot) => {
      if (snapshot.exists()) {
        const users: User[] = []
        snapshot.forEach((childSnapshot) => {
          users.push({
            key: childSnapshot.key,
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

export const useSetLoginUser = () => {
  const setLoginUser = useSetRecoilState(LoginUserState);

  return useCallback((loginUser: LoginUser) => {
    localStorage.setItem("loginUser", JSON.stringify(loginUser));
    setLoginUser(loginUser)
  }, [setLoginUser])
}

export const useOnExit = () => {
  const [loginUser, setLoginUser] = useRecoilState(LoginUserState);

  const onExit = useCallback(async () => {
    if (loginUser === null) return;

    const roomRef = ref(db, `rooms/${loginUser.roomId}`);

    await runTransaction(roomRef, (room) => {
      if (!room) return room;

      if (room.playerPositions) {
        room.playerPositions = (room.playerPositions as PlayerPosition[]).filter(v => v.playerId !== loginUser.id)
      }
      if (room.playerOrder) {
        room.playerOrder = (room.playerOrder as string[]).filter(v => v !== loginUser.id)
      }
      if (room.users) {
        delete room.users[loginUser.key]
      }

      return room;
    });

    setLoginUser(null)
  }, [loginUser, setLoginUser])

  return onExit;
}
