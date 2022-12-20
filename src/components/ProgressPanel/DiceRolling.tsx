import {Box, Button, Flex, Spacer, Text, VStack} from "@chakra-ui/react";
import {useProgress} from "store/Progress";
import {useCallback, useMemo} from "react";
import {LoginUser} from "models/User";
import {ref, update} from "firebase/database";
import {db} from "config/firebase";
import {Dice} from "components/Dice";
import {SkipButton} from "components/ProgressPanel/SkipButton";
import {useUpdatePlayerPosition} from "store/PlayerPosition";

type Props = {
  loginUser: LoginUser;
}

export const DiceRolling = ({loginUser}: Props) => {
  const progress = useProgress(loginUser.roomId);
  const updatePosition = useUpdatePlayerPosition(loginUser.roomId, loginUser.id);

  const isMyTerm = useMemo(() => {
    return progress.currentPlayerId === loginUser.id;
  }, [progress.currentPlayerId, loginUser.id]);

  const onStopDice = useCallback( async () => {
    const dice = Math.floor(Math.random() * 6) + 1;

    await update(ref(db, `rooms/${loginUser.roomId}/progress`), {
      dice: dice,
      state: "dice-rolled"
    });
    await updatePosition(dice);
  }, [loginUser.roomId, updatePosition]);


  return (
    <Flex direction={"row"}>
      <Box bg={"white"} borderRadius={"8px"}>
        <Dice value={progress.dice ?? 5} isRolling={!progress.dice} />
      </Box>
      <VStack alignItems={"flex-start"} p={"8px 16px"}>
        <Box >
          <Text fontSize={"16px"}>{isMyTerm ? `ボタンを押してサイコロを止めろ！` : `サイコロを回しています…` }</Text>
        </Box>
        <Spacer />
        {isMyTerm ? (
          <Button colorScheme='twitter' onClick={onStopDice}>サイコロを止める</Button>
        ) : (
          <SkipButton roomId={loginUser.roomId} />
        )}
      </VStack>
    </Flex>
  )
}
