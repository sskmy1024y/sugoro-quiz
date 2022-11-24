import {Box, Button, Card, CardBody, Text} from "@chakra-ui/react";
import {useProgress, useSyncronizedProgress} from "store/Progress";
import {useCallback, useMemo} from "react";
import {LoginUser} from "models/User";
import {Progress} from "models/ProgressState";
import {ref, set, update} from "firebase/database";
import {db} from "config/firebase";
import {useRoomMembers} from "store/Members";
import {Dice} from "components/Dice";

type Props = {
  loginUser: LoginUser;
}

export const DiceRolled = ({loginUser}: Props) => {
  const progress = useProgress(loginUser.roomId);
  const currentPlayer = useRoomMembers(loginUser.roomId).find(member => member.id === progress.currentPlayerId);

  const isMyTerm = useMemo(() => {
    return progress.currentPlayerId === loginUser.id;
  }, [progress.currentPlayerId, loginUser.id]);

  if (!progress.dice) return null

  return (
      <CardBody>
        <Text>{isMyTerm ? `あなたの番` : `${currentPlayer?.name}さんの番`}</Text>
        <Box>
          <Dice value={progress.dice!} isRolling={false} />
        </Box>
      </CardBody>

  )
}
