import {Box, Heading, HStack, ModalBody, ModalHeader, Text, VStack} from "@chakra-ui/react";
import {LoginUser} from "models/User";
import {CombinedGame} from "models/Game";
import {MissionRule} from "models/Mission";
import {VoteToOneYN} from "./VoteToOneYN";
import { useMemo} from "react";
import {useOnNextTurn} from "store/Progress";
import {Ranking} from "components/Game/GameModal/Result/Ranking";
import {VoteToOtherYN} from "./VoteToOtherYN";
import {VoteToOne} from "components/Game/GameModal/Result/VoteToOne";

interface Props {
  loginUser: LoginUser;
  latestGame: CombinedGame;
}

export const Result = ({loginUser, latestGame}: Props) => {
  const targetUser = useMemo(() => latestGame?.gamePlayers.filter(v => v.isTarget).map(v => v.player) ?? [], [latestGame]);
  const onNextTurn = useOnNextTurn(loginUser.roomId);

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
          <Heading alignSelf={"flex-start"} size={"md"}>ミッション内容</Heading>
          <Text fontSize={"24px"}>{latestGame.mission.mission}</Text>
        </VStack>
      </ModalHeader>
      <ModalBody mb={"20px"}>
        <HStack alignItems={"flex-start"} gap={"24px"}>
          <VStack flex={1}>
            <Heading size={"lg"} mb={"28px"} fontWeight={"900"} color={"gray.800"} sx={{"text-stroke": "1px #FFF", "-webkit-text-stroke": "1px #FFF"}} textAlign={"center"}>結果発表</Heading>
            {latestGame.mission.rule === MissionRule.VoteTo1YN ? (
              <VoteToOneYN loginUser={loginUser} targetUser={targetUser[0]} game={latestGame} onNext={onNextTurn} />
            ) : latestGame.mission.rule === MissionRule.VoteToOtherYN ? (
              <VoteToOtherYN loginUser={loginUser} game={latestGame} onNext={onNextTurn} />
            ) : latestGame.mission.rule === MissionRule.VoteTo1 ? (
              <VoteToOne loginUser={loginUser} game={latestGame} onNext={onNextTurn} />
            ) : null}
          </VStack>
          <Box w={"1px"} bg={"white"} height={"360px"} />
          <Ranking roomId={loginUser.roomId} />
        </HStack>
        <VStack
          m={"0 auto"}
          bg={"rgba(255, 255, 255, 0.6)"}
          backdropFilter={"blur(5px)"}
          p={"24px"}
          borderRadius={"16px"}
          minW={"380px"}
          zIndex={0}
          position={"relative"}
        >
          <Text fontWeight={"bold"}>{"ミッション中に気になった話があったら、深ぼって聞いてみよう！"}</Text>
        </VStack>
      </ModalBody>
    </>
  )
}
