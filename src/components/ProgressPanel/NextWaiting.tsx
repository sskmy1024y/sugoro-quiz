import {Box, Button, Card, CardBody, CardHeader, Heading, Text} from "@chakra-ui/react";
import {useOnNextTurn, useProgress, useSyncronizedProgress, useUpdateProgress} from "store/Progress";
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

export const NextWaiting = ({loginUser}: Props) => {
  const progress = useProgress(loginUser.roomId);
  const currentPlayer = useRoomMembers(loginUser.roomId).find(member => member.id === progress.currentPlayerId);
  const onNextTurn = useOnNextTurn(loginUser.roomId);

  const isMyTerm = useMemo(() => {
    return progress.currentPlayerId === loginUser.id;
  }, [progress.currentPlayerId, loginUser.id]);

  if (!progress.dice) return null

  return (
    <>
      <CardHeader>
        <Heading size='md'>{isMyTerm ? `あなたの番` : `${currentPlayer?.name}さんの番`}</Heading>
      </CardHeader>
      <CardBody>
        <Box>
          <Dice value={progress.dice!} isRolling={false} />
        </Box>
        {isMyTerm ? (
          <Button colorScheme='twitter' onClick={onNextTurn}>次のプレイヤーへ</Button>
        ) : (
          <SkipButton roomId={loginUser.roomId} />
        )}
      </CardBody>
    </>
  )
}
