import {Box, Button, Flex, Spacer, Text, VStack} from "@chakra-ui/react";
import {useCurrentPlayer, useProgress} from "store/Progress";
import {useCallback, useMemo} from "react";
import {LoginUser} from "models/User";
import {ref, update} from "firebase/database";
import {db} from "config/firebase";
import {Dice} from "components/Dice";
import {SkipButton} from "components/ProgressPanel/SkipButton";

type Props = {
  loginUser: LoginUser;
}

export const DiceWaiting = ({loginUser}: Props) => {
  const progress = useProgress(loginUser.roomId);
  const currentPlayer = useCurrentPlayer(loginUser.roomId);

  const isMyTerm = useMemo(() => {
    return progress.currentPlayerId === loginUser.id;
  }, [progress.currentPlayerId, loginUser.id]);

  const onStartDice = useCallback( async () => {
    await update(ref(db, `rooms/${loginUser.roomId}/progress`), {
      dice: null,
      state: "dice-rolling"
    });
  }, [loginUser.roomId]);

  return (
    <Flex direction={"row"}>
      <Box bg={"white"} borderRadius={"8px"}>
        <Dice value={progress.dice ?? 5} isRolling={progress.dice === null} />
      </Box>
      <VStack alignItems={"flex-start"} p={"8px 16px"}>
        <Box >
          <Text fontSize={"16px"}>{isMyTerm ? `ボタンを押してサイコロを回して下さい` : `${currentPlayer?.name}さんを待っています…` }</Text>
        </Box>
        <Spacer />
        {isMyTerm ? (
          <Button colorScheme='twitter' onClick={onStartDice}>サイコロを回す</Button>
        ) : (
          <SkipButton roomId={loginUser.roomId} />
        )}
      </VStack>
    </Flex>
  )
}
