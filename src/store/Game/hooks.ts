import {limitToLast, onValue, orderByChild, push, query, ref, set} from "firebase/database";
import {useRecoilCallback, useRecoilValue, useSetRecoilState} from "recoil";
import {LatestGameState} from "./atoms";
import {db} from "config/firebase";
import {useCallback, useEffect} from "react";
import {MISSIONS} from "config/Missions";
import {CombinedGame, Game} from "models/Game";
import {useOrderPlayer} from "store/OrderPlayer";
import {MissionRule} from "models/Mission";
import {User} from "models/User";
import {LatestGameSelectorState} from "store/Game/selectors";
import {LoginUserState} from "store/LoginUser/atoms";

export const useLatestGame = (roomId: string): CombinedGame | null => {
  return useRecoilValue(LatestGameSelectorState(roomId));
}

export const useSubscribeLatestGame = (roomId: string) => {
  const setLatestGame = useSetRecoilState(LatestGameState(roomId));

  useEffect(() => {
    const gameRef = ref(db, `rooms/${roomId}/games`);
    const queryRef = query(gameRef, orderByChild('createdAt'), limitToLast(1));
    const unsubscribe = onValue(queryRef, (snapshot) => {
      if (snapshot.exists()) {
        snapshot.forEach((childSnapshot) => {
          const key = childSnapshot.key ?? '';
          const game = childSnapshot.val();
          setLatestGame({
            key,
            ...game
          });
        })
      }
    });

    return () => {
      unsubscribe();
    }
  }, [roomId, setLatestGame]);
}

export const useSetNewGame = (roomId: string) => {
  const members = useOrderPlayer(roomId);

  return useCallback(async (missionId: string, targetPlayerId?: string) => {
    const mission = MISSIONS.find((m) => m.id === missionId);
    if (!mission) {
      console.warn(`Mission not found. missionId: ${missionId}`);
      return;
    }

    const randomMember = members[Math.floor(Math.random() * members.length)];
    const targetPlayers = mission.rule === MissionRule.VoteToOtherYN
      ? members
      : targetPlayerId
        ? [members.find((v) => v.id === targetPlayerId)].filter((v): v is User => v !== undefined)
        : [randomMember];

    if (targetPlayers.length === 0) {
      console.warn(`Target player not found. targetPlayerId: ${targetPlayerId}`);
      return;
    }

    const targetPlayerIds = targetPlayers.map((v) => v.id);

    const gamePlayers = members.map((m) => ({
      playerId: m.id,
      isTarget: targetPlayerIds.includes(m.id),
    }))

    const now = Date.now();

    const game: Game = {
      key: "",
      missionId,
      gamePlayers,
      timeoutAt: now - mission.timeout * 1000,
      createdAt: now,
    }

    const {key, ...value} = game
    await set(push(ref(db, `rooms/${roomId}/games`)), value);
  }, [members, roomId]);
}

export const useVoteGame = (roomId: string, gameKey: string) => {
  const loginUser = useRecoilValue(LoginUserState);
  const game = useRecoilValue(LatestGameSelectorState(roomId));

  return useCallback((vote: 'good' | 'bad', targetPlayerId: string) => async () => {
    if (!loginUser || !game) {
      console.warn('Login user or game not found.');
      return;
    }
    const gamePlayerIndex = game.gamePlayers.findIndex((v) => v.player.id === loginUser.id);
    if (gamePlayerIndex === -1) {
      console.warn('Game player not found.');
      return;
    }

    const prevVoteTo = game.gamePlayers[gamePlayerIndex].voteTo;
    const voteTo = prevVoteTo.length > 0 ? prevVoteTo.map((v) => {
      const isTarget = v.id === targetPlayerId;
      return {
        toPlayerId: v.id,
        vote: isTarget ? vote : v.vote,
      }
    }) : [{
      toPlayerId: targetPlayerId,
      vote,
    }];

    const voteRef = ref(db, `rooms/${roomId}/games/${gameKey}/gamePlayers/${gamePlayerIndex}/voteTo`);
    await set(voteRef, voteTo);
  },[game, gameKey, loginUser, roomId]);
}
