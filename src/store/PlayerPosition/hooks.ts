import {onValue, ref, update} from "firebase/database";
import {useRecoilValue, useSetRecoilState} from "recoil";
import {PlayerPositionsState} from "./atoms";
import {db} from "config/firebase";
import {useCallback, useEffect, useMemo} from "react";
import {useRoomMembers} from "store/Members";
import {PlayerPosition} from "models/PlayerPosition";
import {User} from "models/User";
import {MathPosition} from "config/Constants";

export const usePlayerPositions = (roomId: string) => {
  const positions = useRecoilValue(PlayerPositionsState(roomId));
  const members = useRoomMembers(roomId);

  return useMemo(() => positions.map(position => {
    return {
      ...position,
      member: members.find(member => member.id === position.playerId)
    }
  }).filter((v): v is (PlayerPosition & {member: User}) => v.member !== undefined), [positions, members]);
}

export const useUpdatePlayerPosition = (roomId: string, playerId: string) => {
  const positions = useRecoilValue(PlayerPositionsState(roomId));

  return useCallback(async (diff: number) => {
    const playerPositionIndex = positions.findIndex(position => position.playerId === playerId);
    if (playerPositionIndex === -1) return;

    const playerPosition = positions[playerPositionIndex]!;
    const newPlayerPosition: PlayerPosition = {
      ...playerPosition,
      mathIndex: Math.min(playerPosition.mathIndex + diff, MathPosition.length -1)
    }

    await update(ref(db, `rooms/${roomId}/playerPositions/${playerPositionIndex}`), newPlayerPosition);
  }, [playerId, positions, roomId])
}

export const useSynchronizePlayerPositions = (roomId: string) => {
  const setPositions = useSetRecoilState(PlayerPositionsState(roomId));
  useEffect(() => {
    const refs = ref(db, `rooms/${roomId}/playerPositions`);
    const unsubscribe = onValue(refs, snapshot => {
      const members: PlayerPosition[] = [];
      snapshot.forEach(childSnapshot => {
        members.push(childSnapshot.val());
      });
      setPositions(members)
    });

    return () => {
      unsubscribe()
    }
  }
  ,[roomId, setPositions])
}

