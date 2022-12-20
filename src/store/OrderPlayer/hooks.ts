import {onValue, ref} from "firebase/database";
import {useRecoilValue, useSetRecoilState} from "recoil";
import {OrderPlayerIdsState} from "./atoms";
import {db} from "config/firebase";
import { useEffect, useMemo} from "react";
import {useRoomMembers} from "store/Members";

export const useOrderPlayer = (roomId: string) => {
  const orderIds = useRecoilValue(OrderPlayerIdsState(roomId));
  const members = useRoomMembers(roomId);
  return useMemo(() => {
    return  members.filter((m) => orderIds.includes(m.id)).sort((a, b) => {
      const aIndex = orderIds.indexOf(a.id);
      const bIndex = orderIds.indexOf(b.id);
      if (aIndex === -1) {
        return 1;
      }
      if (bIndex === -1) {
        return -1;
      }
      return aIndex - bIndex;
    })
  }, [members, orderIds])
}

export const useSynchronizeOrderPlayerIds = (roomId: string) => {
  const setOrder = useSetRecoilState(OrderPlayerIdsState(roomId));
  useEffect(() => {
    const refs = ref(db, `rooms/${roomId}/playerOrder/`);
    const unsubscribe = onValue(refs, snapshot => {
      const members: string[] = [];
      snapshot.forEach(childSnapshot => {
        members.push(childSnapshot.val());
      });
      setOrder(members)
    })

    return () => {
      unsubscribe()
    }
  }
  ,[roomId, setOrder])
}

export const useIsIncludePlayer = (roomId: string, playerId: string) => {
  const orderIds = useRecoilValue(OrderPlayerIdsState(roomId));
  return useMemo(() => {
    return orderIds.includes(playerId);
  }, [orderIds, playerId])
}
