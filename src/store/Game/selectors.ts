import {selectorFamily} from "recoil";
import {CombinedGame, CombinedGamePlayer, CombinedGamePlayerVote} from "models/Game";
import {ALL_MISSIONS} from "config/Missions";
import {GameQueueState, LatestGameState} from "store/Game/atoms";
import {MembersState} from "store/Members/atoms";

export const LatestGameSelectorState = selectorFamily<CombinedGame | null, string>({
  key: "LatestGameSelectorState",
  get: (roomId) => ({get}) => {
    const game = get(LatestGameState(roomId));
    const members = get(MembersState(roomId));

    if (!game) {
      console.warn("game is null");
      return null;
    }

    const mission = ALL_MISSIONS.find(m => m.id === game?.missionId);
    if (!mission) {
      console.warn("mission is null");
      return null;
    }

    const gamePlayers = game.gamePlayers.map((t) => {
      const player = members.find(m => m.id === t.playerId);
      if (!player) {
        console.warn(`player is null. playerId: ${t.playerId}`);
        return null;
      }

      const voteTo = t.voteTo?.map((v) => {
        const toPlayer = members.find(m => m.id === v.toPlayerId);
        if (!toPlayer) {
          console.warn(`toPlayer is null. toPlayerId: ${v.toPlayerId}`);
          return null;
        }
        return {
          ...toPlayer,
          vote: v.vote
        };
      }).filter((v): v is CombinedGamePlayerVote => v !== null) ?? [];

      return {
        player,
        isTarget: t.isTarget,
        voteTo,
      }
    }).filter((v): v is CombinedGamePlayer => v !== null);

    return {
      key: game.key,
      mission,
      gamePlayers,
      timeoutAt: game.timeoutAt,
      createdAt: game.createdAt
    }
  }
})

export const GameQueueSelectorState = selectorFamily<CombinedGame[], string>({
  key: "GameQueueSelectorState",
  get: (roomId) => ({get}) => {
    const games = get(GameQueueState(roomId));
    const members = get(MembersState(roomId));

    if (games.length < 1) {
      console.warn("games is empty array");
      return [];
    }

    return games.map((game) => {
        const mission = ALL_MISSIONS.find(m => m.id === game?.missionId);
        if (!mission) {
          console.warn("mission is null");
          return null;
        }

        const gamePlayers = game.gamePlayers.map((t) => {
          const player = members.find(m => m.id === t.playerId);
          if (!player) {
            console.warn(`player is null. playerId: ${t.playerId}`);
            return [];
          }

          const voteTo = t.voteTo?.map((v) => {
            const toPlayer = members.find(m => m.id === v.toPlayerId);
            if (!toPlayer) {
              console.warn(`toPlayer is null. toPlayerId: ${v.toPlayerId}`);
              return null;
            }
            return {
              ...toPlayer,
              vote: v.vote
            };
          }).filter((v): v is CombinedGamePlayerVote => v !== null) ?? [];

          return {
            player,
            isTarget: t.isTarget,
            voteTo,
          }
        }).filter((v): v is CombinedGamePlayer => v !== null);

        return {
          key: game.key,
          mission,
          gamePlayers,
          timeoutAt: game.timeoutAt,
          createdAt: game.createdAt
        }
      }
    ).filter((v): v is CombinedGame => v !== null);
  }
})
