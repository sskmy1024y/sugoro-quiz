import {Button, Heading, ModalBody, ModalFooter, ModalHeader, Text, VStack} from "@chakra-ui/react";
import {LoginUser} from "models/User";
import {CombinedGame} from "models/Game";
import {MissionRule} from "models/Mission";
import {VoteToOne} from "./VoteToOne";
import {useCallback, useMemo} from "react";
import {useOnNextTurn, useUpdateProgress} from "store/Progress";
import {ref, set} from "firebase/database";
import {db} from "config/firebase";
import {Ranking} from "components/Game/GameModal/Result/Ranking";

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
          <Heading size={"md"}>ミッション</Heading>
          <Text fontSize={"16px"}>{latestGame.mission.mission}</Text>
        </VStack>
      </ModalHeader>
      <ModalBody>
        <Heading size={"lg"} mb={"24px"} textAlign={"center"}>結果発表</Heading>
        {latestGame.mission.rule === MissionRule.VoteTo1YN ? (
          <VoteToOne loginUser={loginUser} targetUser={targetUser[0]} game={latestGame} onNext={onNextTurn} />
        ) : null}
        <Ranking roomId={loginUser.roomId} />
      </ModalBody>
    </>
  )
}