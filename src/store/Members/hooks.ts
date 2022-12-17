import {onValue, ref, set} from "firebase/database";
import { useRecoilValue, useSetRecoilState} from "recoil";
import {MembersState} from "./atoms";
import {db} from "config/firebase";
import {useCallback, useEffect} from "react";
import {User} from "models/User";
import {useLoginUser, useSetLoginUser} from "store/LoginUser";

export const useRoomMembers = (roomId: string) => {
  return useRecoilValue(MembersState(roomId));
}

export const useSynchronizeRoomMembers = (roomId: string) => {
  const loginUser = useLoginUser();
  const setLoginUser = useSetLoginUser();

  const setMembers = useSetRecoilState(MembersState(roomId));
  useEffect(() => {
    const refs = ref(db, `rooms/${roomId}/users/`);
    const unsubscribe = onValue(refs, snapshot => {
      const members: User[] = [];
      snapshot.forEach(childSnapshot => {
        members.push({
          key: childSnapshot.key!,
          ...childSnapshot.val()
        });
      });
      setMembers(members)

      if (loginUser) {
        const loginUserData = members.find(member => member.id === loginUser.id);
        if (loginUserData) setLoginUser({...loginUserData, key: loginUser.key, roomId: loginUser.roomId});
      }
    })

    return () => {
      unsubscribe()
    }
  }
  ,[loginUser, roomId, setLoginUser, setMembers])
}

export const useSetUserPoint = (roomId: string) => {
  return useCallback(async (user: User, point: number) => {
    const refs = ref(db, `rooms/${roomId}/users/${user.key}/point`);
    await set(refs, point)
  }, [roomId])
}
