import {useRecoilValue, useSetRecoilState} from "recoil";
import {ProgressState} from "./atoms";
import {onValue, ref, set, update} from "firebase/database";
import {db} from "config/firebase";
import {useEffect} from "react";
import {Progress} from "models/ProgressState";
import {CurrentPlayerState} from "store/Progress/selectors";


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
