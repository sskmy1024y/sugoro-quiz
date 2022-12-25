import {Box, Flex, Heading, ModalBody, Text, Image} from "@chakra-ui/react";
import {LoginUser} from "models/User";
import {CombinedGame} from "models/Game";
import {useCallback, useMemo} from "react";
import {useUpdateProgress} from "store/Progress";
import {MissionRule} from "models/Mission";
import {VoteToOneYN} from "./VoteToOneYN";
import {VoteToOtherYN} from "./VoteToOtherYN";
import {VoteToOne} from "components/Game/GameModal/Happened/VoteToOne";
import {ENABLE_UNISEPON} from "config/Constants";

interface Props {
  loginUser: LoginUser;
  latestGame: CombinedGame;
}

export const Happened = ({loginUser, latestGame}: Props) => {
  const updateProgress = useUpdateProgress(loginUser.roomId);
  const targetUser = useMemo(() => latestGame?.gamePlayers.filter(v => v.isTarget).map(v => v.player) ?? [], [latestGame]);

  const onNext = useCallback(async () => {
    await updateProgress({state: "game-prepare"})
  }, [updateProgress])

  return (
    <>
      <ModalBody>
        <Flex alignItems={"center"} gap={"8px"} justifyContent={"center"} m={"32px"} direction={"column"}>
          <Heading size={"lg"} color="white" fontWeight={"900"}>ミッション発生！</Heading>
          <Text size={"md"} color={"gray.100"} fontWeight={"700"}>サイコロが一周するとミッションが発生するよ！</Text>
        </Flex>
        <Box position={"relative"}>
          {latestGame.mission.rule === MissionRule.VoteTo1YN ? (
            <VoteToOneYN loginUser={loginUser} targetUser={targetUser[0]} game={latestGame} onNext={onNext} />
          ) : latestGame.mission.rule === MissionRule.VoteToOtherYN ? (
            <VoteToOtherYN loginUser={loginUser} game={latestGame} onNext={onNext} />
          ) : latestGame.mission.rule === MissionRule.VoteTo1 ? (
            <VoteToOne loginUser={loginUser} game={latestGame} onNext={onNext} />
          ) : null}
          <Box position={"absolute"} bottom={"-96px"} right={"400px"} zIndex={1}>
            {ENABLE_UNISEPON && <Image src={"/images/fight-1.gif"} w={"128px"} h={"100%"} />}
          </Box>
        </Box>
      </ModalBody>
    </>
  )
}
