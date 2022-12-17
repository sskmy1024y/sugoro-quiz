import {Heading, ModalBody, ModalFooter, ModalHeader, Text, VStack} from "@chakra-ui/react";
import {LoginUser} from "models/User";
import {CombinedGame} from "models/Game";
import {MissionRule} from "models/Mission";
import {VoteToOneYN} from "./VoteToOneYN";
import {useCallback, useMemo} from "react";
import {TimeoutProgress} from "./TimeoutProgress";
import {useUpdateProgress} from "store/Progress";
import { ref, update} from "firebase/database";
import {db} from "config/firebase";
import {VoteToOtherYN} from "components/Game/GameModal/Vote/VoteToOtherYN";
import { VoteToOne } from "./VoteToOne";

interface Props {
  loginUser: LoginUser;
  latestGame: CombinedGame;
}

export const Vote = ({loginUser, latestGame}: Props) => {
  const updateProgress = useUpdateProgress(loginUser.roomId);
  const targetUsers = useMemo(() => latestGame?.gamePlayers.filter(v => v.isTarget).map(v => v.player) ?? [], [latestGame]);

  const onNext = useCallback(async () => {
    // 全員喋る系のルールの場合
    if (latestGame.mission.rule !== MissionRule.VoteTo1YN && latestGame.currentGamePlayerId) {
      const currentGamePlayerIndex = latestGame.gamePlayers.findIndex(v => v.player.id === latestGame.currentGamePlayerId);
      if (currentGamePlayerIndex === -1) {
        console.warn("currentGamePlayerIndex is not set");
      }
      if (currentGamePlayerIndex !== latestGame.gamePlayers.length - 1) {
        // 最後のプレイヤーでなければ次のプレイヤーに進める
        const nextGamePlayer = latestGame.gamePlayers[currentGamePlayerIndex + 1];
        const now = Date.now();
        await update(ref(db, `rooms/${loginUser.roomId}/games/${latestGame.key}`), {
          currentGamePlayerId: nextGamePlayer.player.id,
          timeoutAt: now + latestGame.mission.timeout * 1000
        });
        return;
      }
    }

    const getPoints = latestGame.gamePlayers
      .reduce<{key: string, point: number}[]>((prev, curr) => {
        const newVal = [...prev];
        const gamePlayer = curr.player;
        const index = newVal.findIndex(v => v.key === gamePlayer.key);

        if (index === -1) {
          newVal.push({key: gamePlayer.key, point: gamePlayer.point});
        } else {
          newVal[index].point += gamePlayer.point;
        }

        curr.voteTo.forEach(p => {
          const index = newVal.findIndex(v => v.key === p.key);
          const prevPoint = index === -1 ? 0 : newVal[index].point;
          const point = prevPoint + (p.vote === "good" ? 1 : 0);

          if (index === -1) {
            newVal.push({key: p.key, point});
          } else {
            newVal[index].point = point;
          }
        })

        return newVal;
      }, [])

    await Promise.all(getPoints.map(v => {
      return update(ref(db, `rooms/${loginUser.roomId}/users/${v.key}`), {
        point: v.point
      })
    }))

    await updateProgress({state: "game-end"})
  }, [latestGame, loginUser.roomId, updateProgress])

  return (
    <>
      <ModalHeader mt={"16px"}>
        <VStack
          spacing={"8px"}
          p={"16px 24px"}
          bg={"#eee"}
          borderRadius={"16px"}
          w={"100%"}
        >
          <Heading alignSelf={"flex-start"} size={"md"}>ミッション内容</Heading>
          <Text fontSize={"24px"}>{latestGame.mission.mission}</Text>
        </VStack>
      </ModalHeader>
      <ModalBody>
        {latestGame.mission.rule === MissionRule.VoteTo1YN ? (
          <VoteToOneYN loginUser={loginUser} targetUser={targetUsers[0]} game={latestGame} />
        ) : latestGame.mission.rule === MissionRule.VoteToOtherYN ? (
          <VoteToOtherYN loginUser={loginUser} game={latestGame} onNext={onNext} />
        ) : latestGame.mission.rule === MissionRule.VoteTo1 ? (
          <VoteToOne loginUser={loginUser} game={latestGame} />
        ) : null}
      </ModalBody>
      <ModalFooter justifyContent={"center"}>
        <TimeoutProgress timeout={latestGame.mission.timeout} timeoutAt={latestGame.timeoutAt} onNext={onNext} />
      </ModalFooter>
    </>
  )
}
