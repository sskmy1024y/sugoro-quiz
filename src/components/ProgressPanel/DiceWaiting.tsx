import {Box, Button, CardBody, CardHeader, Heading, Text} from "@chakra-ui/react";
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
    <>
      <CardHeader>
        <Heading size='md'>
          {isMyTerm ? `あなたの番` : `${currentPlayer?.name}さんの番`}
        </Heading>
      </CardHeader>
      <CardBody>
        <Box>
          <Text>{isMyTerm ? `ボタンを押してサイコロを回して下さい` : `${currentPlayer?.name}さんを待っています…` }</Text>
          <Dice value={progress.dice ?? 5} isRolling={progress.dice === null} />
          {isMyTerm ? (
            <Button colorScheme='twitter' onClick={onStartDice}>サイコロを回す</Button>
          ) : (
            <SkipButton roomId={loginUser.roomId} />
          )}
        </Box>
      </CardBody>
    </>
  )
}
