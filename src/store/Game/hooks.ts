import {limitToLast, onValue, orderByChild, push, query, ref, set} from "firebase/database";
import {useRecoilValue, useSetRecoilState} from "recoil";
import {LatestGameState} from "./atoms";
import {db} from "config/firebase";
import {useCallback, useEffect} from "react";
import {ALL_MISSIONS} from "config/Missions";
import {CombinedGame, Game} from "models/Game";
import {useOrderPlayer} from "store/OrderPlayer";
import {MissionRule} from "models/Mission";
import {User} from "models/User";
import {GameQueueSelectorState, LatestGameSelectorState} from "store/Game/selectors";
import {LoginUserState} from "store/LoginUser/atoms";

export const useLatestGame = (roomId: string): CombinedGame | null => {
  return useRecoilValue(LatestGameSelectorState(roomId));
}

export const useQueueGames = (roomId: string) => {
  return useRecoilValue(GameQueueSelectorState(roomId));
}

export const useSubscribeLatestGame = (roomId: string) => {
  const setLatestGame = useSetRecoilState(LatestGameState(roomId));

  useEffect(() => {
    const gameRef = ref(db, `rooms/${roomId}/games`);
    const queryRef = query(gameRef, orderByChild('createdAt'), limitToLast(1));
    const unsubscribe = onValue(queryRef, (snapshot) => {
      if (snapshot.exists()) {
        console.log('latest game updated', snapshot.val());
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

  return useCallback(async (missionId: string, targetPlayerId?: string, isEventMath: boolean = false) => {
    const mission = ALL_MISSIONS.find((m) => m.id === missionId);
    if (!mission) {
      throw new Error(`Mission not found. missionId: ${missionId}`);
    }

    const randomMember = members[Math.floor(Math.random() * members.length)];
    const targetPlayers = mission.rule !== MissionRule.VoteTo1YN
      ? members
      : targetPlayerId
        ? [members.find((v) => v.id === targetPlayerId)].filter((v): v is User => v !== undefined)
        : [randomMember];

    if (targetPlayers.length === 0) {
      throw new Error(`Target player not found. targetPlayerId: ${targetPlayerId}`);
    }

    const targetPlayerIds = targetPlayers.map((v) => v.id);

    const gamePlayers = [...members].sort((a, b) => {
      return a.point > b.point ? -1 : 1;
    }).map((m) => ({
      playerId: m.id,
      isTarget: targetPlayerIds.includes(m.id),
    }))

    const now = Date.now();

    const game: Game = {
      key: "",
      missionId,
      gamePlayers,
      currentGamePlayerId: gamePlayers[0].playerId,
      isEventMath,
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

    const prevVoteTo = game.gamePlayers[gamePlayerIndex].voteTo.map((v) => ({
      toPlayerId: v.id,
      vote: v.vote,
    }));
    const voteTo = prevVoteTo.length > 0 ?
      prevVoteTo.find(v => v.toPlayerId === targetPlayerId) ?
        prevVoteTo.map((v) => {
          const isTarget = v.toPlayerId === targetPlayerId;
          return {
            toPlayerId: v.toPlayerId,
            vote: isTarget ? vote : v.vote,
          }
        })
      : [...prevVoteTo, {
          toPlayerId: targetPlayerId,
          vote
      }] : [{
        toPlayerId: targetPlayerId,
        vote,
      }];

    const voteRef = ref(db, `rooms/${roomId}/games/${gameKey}/gamePlayers/${gamePlayerIndex}/voteTo`);
    await set(voteRef, voteTo);
  },[game, gameKey, loginUser, roomId]);
}


export const useVoteToOneGame = (roomId: string, gameKey: string) => {
  const loginUser = useRecoilValue(LoginUserState);
  const game = useRecoilValue(LatestGameSelectorState(roomId));

  return useCallback((targetPlayerId: string) => async () => {
    if (!loginUser || !game) {
      console.warn('Login user or game not found.');
      return;
    }
    const gamePlayerIndex = game.gamePlayers.findIndex((v) => v.player.id === loginUser.id);
    if (gamePlayerIndex === -1) {
      console.warn('Game player not found.');
      return;
    }

    const voteTo = [{
      toPlayerId: targetPlayerId,
      vote: 'good',
    }]

    const voteRef = ref(db, `rooms/${roomId}/games/${gameKey}/gamePlayers/${gamePlayerIndex}/voteTo`);
    await set(voteRef, voteTo);
  },[game, gameKey, loginUser, roomId]);
}
