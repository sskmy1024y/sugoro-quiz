import {Box, Flex, Spacer, VStack} from "@chakra-ui/react";
import { useProgress} from "store/Progress";
import { useMemo} from "react";
import {LoginUser} from "models/User";
import {Dice} from "components/Dice";
import {SkipButton} from "components/ProgressPanel/SkipButton";

type Props = {
  loginUser: LoginUser;
}

export const DiceRolled = ({loginUser}: Props) => {
  const progress = useProgress(loginUser.roomId);

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
        <Spacer />
        {!isMyTerm && (
          <SkipButton roomId={loginUser.roomId} />
        )}
      </VStack>
    </Flex>
  )
}
