import { Heading, ModalBody, ModalHeader, Text, VStack} from "@chakra-ui/react";
import {LoginUser} from "models/User";
import {CombinedGame} from "models/Game";
import {MissionRule} from "models/Mission";
import {VoteToOneYN} from "./VoteToOneYN";
import {useCallback, useMemo} from "react";
import { useUpdateProgress} from "store/Progress";
import {ref, set} from "firebase/database";
import {db} from "config/firebase";
import {VoteToOtherYN} from "./VoteToOtherYN";
import {VoteToOne} from "./VoteToOne";

interface Props {
  loginUser: LoginUser;
  latestGame: CombinedGame;
}

export const Prepare = ({loginUser, latestGame}: Props) => {
  const updateProgress = useUpdateProgress(loginUser.roomId);
  const targetUser = useMemo(() => latestGame?.gamePlayers.filter(v => v.isTarget).map(v => v.player) ?? [], [latestGame]);

  const onNext = useCallback(async () => {
    const timeoutAt = Date.now() + latestGame.mission.timeout * 1000;
    await set(ref(db, `rooms/${loginUser.roomId}/games/${latestGame.key}/timeoutAt`), timeoutAt).then(async () => {
      await updateProgress({state: "game-start"})
    })
  }, [latestGame.key, latestGame.mission.timeout, loginUser.roomId, updateProgress])

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
          <VoteToOneYN loginUser={loginUser} targetUser={targetUser[0]} game={latestGame} onNext={onNext} />
        ) : latestGame.mission.rule === MissionRule.VoteToOtherYN ? (
          <VoteToOtherYN loginUser={loginUser} game={latestGame} onNext={onNext} />
        ) : latestGame.mission.rule === MissionRule.VoteTo1 ? (
          <VoteToOne loginUser={loginUser} game={latestGame} onNext={onNext} />
        ) : null}
      </ModalBody>
    </>
  )
}
