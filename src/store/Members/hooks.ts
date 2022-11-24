import {onValue, ref} from "firebase/database";
import {useRecoilValue, useSetRecoilState} from "recoil";
import {MembersState} from "./atoms";
import {db} from "config/firebase";
import {useEffect} from "react";
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
        members.push(childSnapshot.val());
      });
      setMembers(members)
    })

    return () => {
      unsubscribe()
    }
  }
  ,[roomId, setMembers])
}

