import {Flex, Heading, ModalBody} from "@chakra-ui/react";
import {LoginUser} from "models/User";
import {CombinedGame} from "models/Game";
import {useCallback, useMemo} from "react";
import {useUpdateProgress} from "store/Progress";
import {MissionRule} from "models/Mission";
import {VoteToOneYN} from "./VoteToOneYN";
import {VoteToOtherYN} from "./VoteToOtherYN";

interface Props {
  loginUser: LoginUser;
  latestGame: CombinedGame;
}

export const ForceHappened = ({loginUser, latestGame}: Props) => {
  const updateProgress = useUpdateProgress(loginUser.roomId);
  const targetUser = useMemo(() => latestGame?.gamePlayers.filter(v => v.isTarget).map(v => v.player) ?? [], [latestGame]);

  const onNext = useCallback(async () => {
    await updateProgress({state: "game-prepare"})
  }, [updateProgress])

  return (
    <>
      <ModalBody>
        <Flex justifyContent={"center"} m={"32px"}>
          <Heading size={"lg"} color="white" fontWeight={"900"}>緊急ミッション発生！</Heading>
        </Flex>
        {latestGame.mission.rule === MissionRule.VoteTo1YN ? (
          <VoteToOneYN loginUser={loginUser} targetUser={targetUser[0]} game={latestGame} onNext={onNext} />
        ) : latestGame.mission.rule === MissionRule.VoteToOtherYN ? (
          <VoteToOtherYN loginUser={loginUser} game={latestGame} onNext={onNext} />
        ) : null}
      </ModalBody>
    </>
  )
}
