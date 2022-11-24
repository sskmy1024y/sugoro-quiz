import {useRecoilValue, useSetRecoilState} from "recoil";
import {ProgressState} from "./atoms";
import {onValue, ref, set, update} from "firebase/database";
import {db} from "config/firebase";
import {useCallback, useEffect} from "react";
import {Progress} from "models/ProgressState";
import {CurrentPlayerState} from "store/Progress/selectors";
import {useOrderPlayer} from "store/OrderPlayer";


export const useProgress = (roomId: string) => {
  return useRecoilValue(ProgressState(roomId));
}

export const useSyncronizedProgress = (roomId: string) => {
  const setProgress = useSetRecoilState(ProgressState(roomId));

  useEffect(() => {
    const refs = ref(db, `rooms/${roomId}/progress`)
    const unsubscribe = onValue(refs, snapshot => {
      if (snapshot.exists()) {
        setProgress(snapshot.val());
      } else {
        set(refs, {
          currentPlayerId: undefined,
          dice: undefined,
          state: "not-started",
        });
      }
    })

    return () => {
      unsubscribe();
    }
  }, [roomId, setProgress])
}

export const useUpdateProgress = (roomId: string) => {
  return async (progress: Partial<Progress>) => {
    await update(ref(db, `rooms/${roomId}/progress`), progress);
  }
}

export const useCurrentPlayer = (roomId: string) => {
  return useRecoilValue(CurrentPlayerState(roomId));
}

export const useOnNextTurn = (roomId: string) => {
  const orderPlayer = useOrderPlayer(roomId);
  const currentPlayer = useCurrentPlayer(roomId);
  const updateProgress = useUpdateProgress(roomId);

  return useCallback(async () => {
    const currentPlayerIndex = currentPlayer ? orderPlayer.findIndex(player => player.id === currentPlayer.id) : 0;
    const nextPlayer = currentPlayerIndex === orderPlayer.length - 1 ? orderPlayer[0] : orderPlayer[currentPlayerIndex + 1];

    // TODO: 一周したらゲームターンにする

    await updateProgress({
      currentPlayerId: nextPlayer.id,
      state: "dice-waiting"
    })
  },[currentPlayer, orderPlayer, updateProgress]);
}
