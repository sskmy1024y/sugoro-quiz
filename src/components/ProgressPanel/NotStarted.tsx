import { Button, CardBody, CardHeader, Heading, Text} from "@chakra-ui/react";
import {useCallback} from "react";
import {LoginUser} from "models/User";
import {ref, set} from "firebase/database";
import {db} from "config/firebase";
import {useRoomMembers} from "store/Members";
import {PlayerPosition} from "models/PlayerPosition";

type Props = {
  loginUser: LoginUser;
}

export const NotStarted = ({loginUser}: Props) => {
  const members = useRoomMembers(loginUser.roomId);

  const onUpdateProgress = useCallback( async () => {
    // TODO: ランダムにプレイヤーを選ぶ
    const orderMemberIds: string[] = members.map(member => member.id)
    const playerPositions: PlayerPosition[] = orderMemberIds.map((memberId, index) => ({
      playerId: memberId,
      mathIndex: 0,
    }))

    await set(ref(db, `rooms/${loginUser.roomId}/playerOrder`), orderMemberIds);
    await set(ref(db, `rooms/${loginUser.roomId}/playerPositions`), playerPositions);
    await set(ref(db, `rooms/${loginUser.roomId}/progress`), {
      currentPlayerId: orderMemberIds[0],
      state: "dice-waiting"
    });
  }, [loginUser.roomId, members]);



  return (
    <>
      <CardHeader>
        <Heading size='md'>参加メンバー募集中</Heading>
      </CardHeader>
      <CardBody>
        <Text>参加メンバーが集まったら、ボタンを押してください</Text>
        <Button colorScheme='twitter' onClick={onUpdateProgress}>ゲームを開始する</Button>
      </CardBody>
    </>
  )
}
