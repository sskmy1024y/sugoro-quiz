import {Box, Button, Flex, Spacer, Text, VStack} from "@chakra-ui/react";
import {useOnNextTurn, useProgress} from "store/Progress";
import { useMemo} from "react";
import {LoginUser} from "models/User";
import {useRoomMembers} from "store/Members";
import {Dice} from "components/Dice";
import {SkipButton} from "components/ProgressPanel/SkipButton";

type Props = {
  loginUser: LoginUser;
}

export const NextWaiting = ({loginUser}: Props) => {
  const progress = useProgress(loginUser.roomId);
  const currentPlayer = useRoomMembers(loginUser.roomId).find(member => member.id === progress.currentPlayerId);
  const onNextTurn = useOnNextTurn(loginUser.roomId);

  const isMyTerm = useMemo(() => {
    return progress.currentPlayerId === loginUser.id;
  }, [progress.currentPlayerId, loginUser.id]);

  if (!progress.dice) return null

  return (
    <Flex direction={"row"}>
      <Box bg={"white"} borderRadius={"8px"}>
        <Dice value={progress.dice!} isRolling={false} />
      </Box>
      <VStack alignItems={"flex-start"} p={"8px 16px"}>
        <Box >
          <Text fontSize={"16px"}>{isMyTerm ? `ボタンを押してサイコロを回して下さい` : `${currentPlayer?.name}さんを待っています…` }</Text>
        </Box>
        <Spacer />
        {isMyTerm ? (
          <Button colorScheme='twitter' onClick={onNextTurn}>次のプレイヤーへ</Button>
        ) : (
          <SkipButton roomId={loginUser.roomId} />
        )}
      </VStack>
    </Flex>
  )
}
