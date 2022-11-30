import {Heading, ModalBody, ModalFooter, ModalHeader, Text, VStack} from "@chakra-ui/react";
import {LoginUser} from "models/User";
import {CombinedGame} from "models/Game";
import {MissionRule} from "models/Mission";
import {VoteToOneYN} from "./VoteToOneYN";
import {useCallback, useMemo} from "react";
import {TimeoutProgress} from "./TimeoutProgress";
import {useUpdateProgress} from "store/Progress";
import {ref, update} from "firebase/database";
import {db} from "config/firebase";
import {VoteToOtherYN} from "components/Game/GameModal/Vote/VoteToOtherYN";

interface Props {
  loginUser: LoginUser;
  latestGame: CombinedGame;
}

export const Vote = ({loginUser, latestGame}: Props) => {
  const updateProgress = useUpdateProgress(loginUser.roomId);
  const targetUser = useMemo(() => latestGame?.gamePlayers.filter(v => v.isTarget).map(v => v.player) ?? [], [latestGame]);

  const onNext = useCallback(async () => {
    if (targetUser) {
      const getPoints = latestGame.gamePlayers
        .reduce<{key: string, point: number}[]>((prev, curr) => {
          const newVal = [...prev];
          curr.voteTo.forEach(p => {
            const index = newVal.findIndex(v => v.key === p.key);
            const prevPoint = index === -1 ? 0 : newVal[index].point;
            newVal[index === -1 ? newVal.length : index] = {
              key: p.key,
              point: prevPoint + (p.vote === "good" ? 1 : 0)
            }
          })
          return newVal;
        }, [])
      await Promise.all(getPoints.map(v => {
        return update(ref(db, `rooms/${loginUser.roomId}/users/${v.key}`), {
          point: v.point
        })
      }))
    }

    await updateProgress({state: "game-end"})
  }, [latestGame, loginUser.roomId, targetUser, updateProgress])

  return (
    <>
      <ModalHeader mt={"16px"}>
        <VStack
          spacing={"16px"}
          p={"16px 24px"}
          bg={"#eee"}
          borderRadius={"16px"}
          w={"100%"}
        >
          <Heading size={"md"}>ミッション</Heading>
          <Text fontSize={"16px"}>{latestGame.mission.mission}</Text>
        </VStack>
      </ModalHeader>
      <ModalBody>
        {latestGame.mission.rule === MissionRule.VoteTo1YN ? (
          <VoteToOneYN loginUser={loginUser} targetUser={targetUser[0]} game={latestGame} />
        ) : latestGame.mission.rule === MissionRule.VoteToOtherYN ? (
          <VoteToOtherYN loginUser={loginUser} game={latestGame} />
        ) : null}
      </ModalBody>
      <ModalFooter justifyContent={"center"}>
        <TimeoutProgress timeout={latestGame.mission.timeout} timeoutAt={latestGame.timeoutAt} onNext={onNext} />
      </ModalFooter>
    </>
  )
}
