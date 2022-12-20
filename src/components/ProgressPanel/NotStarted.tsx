import {Button, Flex, Heading, Spacer, Text, VStack} from "@chakra-ui/react";
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
    <Flex direction={"column"} m={"-8px 8px 8px"} h={"100%"} justifyContent={"space-between"}>
      <Heading size='md'>参加メンバー募集中</Heading>
      <VStack alignItems={"flex-start"} mt={"8px"} spacing={"4px"}>
        <Text>参加メンバーが集まったら、「開始する」ボタンを押してください。</Text>
        <Text>（未参加のルームメンバーも、開始すると自動で「参加」になります）</Text>
      </VStack>
      <Spacer />
      <Button colorScheme='twitter' onClick={onUpdateProgress}>ゲームを開始する</Button>
    </Flex>
  )
}
