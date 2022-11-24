import {Box, Button, Card, CardBody, Text} from "@chakra-ui/react";
import {useProgress, useSyncronizedProgress} from "store/Progress";
import {useCallback, useMemo} from "react";
import {LoginUser} from "models/User";
import {Progress} from "models/ProgressState";
import {ref, set, update} from "firebase/database";
import {db} from "config/firebase";
import {useRoomMembers} from "store/Members";
import {Dice} from "components/Dice";
import {SkipButton} from "components/ProgressPanel/SkipButton";

type Props = {
  loginUser: LoginUser;
}

export const DiceRolling = ({loginUser}: Props) => {
  const progress = useProgress(loginUser.roomId);
  const currentPlayer = useRoomMembers(loginUser.roomId).find(member => member.id === progress.currentPlayerId);

  const isMyTerm = useMemo(() => {
    return progress.currentPlayerId === loginUser.id;
  }, [progress.currentPlayerId, loginUser.id]);

  const onStopDice = useCallback( async () => {
    const dice = Math.floor(Math.random() * 6) + 1;

    await update(ref(db, `rooms/${loginUser.roomId}/progress`), {
      dice: dice,
      state: "dice-rolled"
    });
  }, [loginUser.roomId]);



  console.log(progress.dice)

  return (
      <CardBody>
        <Text>{isMyTerm ? `あなたの番` : `${currentPlayer?.name}さんの番`}</Text>

          <Box>
            <Text>{isMyTerm ? `ボタンを押してサイコロを止めて下さい` : `サイコロを回しています…` }</Text>
            <Dice value={progress.dice ?? 5} isRolling={!progress.dice} />
            {isMyTerm ? <Button colorScheme='twitter' onClick={onStopDice}>サイコロを止める</Button> : <SkipButton roomId={loginUser.roomId} />}
          </Box>

      </CardBody>

  )
}
