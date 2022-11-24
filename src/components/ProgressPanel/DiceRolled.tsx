import {Box, Button, Card, CardBody, CardHeader, Fade, Heading, Text} from "@chakra-ui/react";
import {useOnNextTurn, useProgress, useSyncronizedProgress} from "store/Progress";
import {useCallback, useEffect, useMemo, useState} from "react";
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

export const DiceRolled = ({loginUser}: Props) => {
  const progress = useProgress(loginUser.roomId);
  const currentPlayer = useRoomMembers(loginUser.roomId).find(member => member.id === progress.currentPlayerId);
  const onNextTurn = useOnNextTurn(loginUser.roomId);

  const [showNextButton, setShowNextButton] = useState(false);

  const isMyTerm = useMemo(() => {
    return progress.currentPlayerId === loginUser.id;
  }, [progress.currentPlayerId, loginUser.id]);

  useEffect(() => {
    setTimeout(() => {
      setShowNextButton(true);
    }, 3000);
  }, []);

  if (!progress.dice) return null

  return (
    <>
      <CardHeader>
        <Heading size='md'>{isMyTerm ? `あなたの番` : `${currentPlayer?.name}さんの番`}</Heading>
      </CardHeader>
      <CardBody>
        <Box>
          <Dice value={progress.dice!} isRolling={false} />
          {isMyTerm ? (
            <Fade in={showNextButton}>
              <Button colorScheme='twitter' onClick={onNextTurn}>次のプレイヤーへ</Button>
            </Fade>
          ) : (
            <SkipButton roomId={loginUser.roomId} />
          )}
        </Box>
      </CardBody>
    </>
  )
}
