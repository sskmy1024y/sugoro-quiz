import {Box, Button, Card, CardBody, Text} from "@chakra-ui/react";
import {useProgress, useSyncronizedProgress} from "store/Progress";
import {useCallback, useMemo} from "react";
import {LoginUser} from "models/User";
import {Progress} from "models/ProgressState";
import {ref, set} from "firebase/database";
import {db} from "config/firebase";
import {useRoomMembers} from "store/Members";

type Props = {
  loginUser: LoginUser;
}

export const NotStarted = ({loginUser}: Props) => {
  const members = useRoomMembers(loginUser.roomId);

  const onUpdateProgress = useCallback( async () => {
    // TODO: ランダムにプレイヤーを選ぶ
    const orderMemberIds = members.map(member => member.id)

    await set(ref(db, `rooms/${loginUser.roomId}/playerOrder`), orderMemberIds);
    await set(ref(db, `rooms/${loginUser.roomId}/progress`), {
      currentPlayerId: orderMemberIds[0],
      state: "dice-waiting"
    });
  }, [loginUser.roomId, members]);



  return (

      <CardBody>
        <Text>メンバー募集中</Text>

          <Box>
            <Text>参加メンバーが集まったら、ボタンを押してください</Text>
            <Button colorScheme='twitter' onClick={onUpdateProgress}>ゲームを開始する</Button>
          </Box>

      </CardBody>

  )
}
