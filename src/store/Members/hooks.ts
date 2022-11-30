import {onValue, ref, set} from "firebase/database";
import {useRecoilValue, useSetRecoilState} from "recoil";
import {MembersState} from "./atoms";
import {db} from "config/firebase";
import {useCallback, useEffect} from "react";
import {User} from "models/User";

export const useRoomMembers = (roomId: string) => {
  return useRecoilValue(MembersState(roomId));
}

export const useSynchronizeRoomMembers = (roomId: string) => {
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
    })

    return () => {
      unsubscribe()
    }
  }
  ,[roomId, setMembers])
}

export const useSetUserPoint = (roomId: string) => {
  return useCallback(async (user: User, point: number) => {
    const refs = ref(db, `rooms/${roomId}/users/${user.key}/point`);
    await set(refs, point)
  }, [roomId])
}
