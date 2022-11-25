import {User} from "models/User";
import {
  Avatar,
  Box,
  Card,
  CardBody,
  Flex,
  Heading,
  IconButton, Menu,
  MenuButton, MenuItem,
  MenuList,
  Text
} from "@chakra-ui/react";
import {useIsIncludePlayer, useOrderPlayer} from "store/OrderPlayer";
import {BsThreeDotsVertical} from "react-icons/all";
import {useCallback} from "react";
import {ref, set} from "firebase/database";
import {db} from "config/firebase";
import {usePlayerPositions} from "store/PlayerPosition";

interface Props {
  roomId: string;
  member: User
}

export const MemberItem = ({roomId, member}: Props) => {
  const isIncludePlayer = useIsIncludePlayer(roomId, member.id);
  const orderPlayers = useOrderPlayer(roomId);
  const positions = usePlayerPositions(roomId);

  const onKick = useCallback(async () => {
    if (!isIncludePlayer) return;

    const newOrderIds = orderPlayers.filter(player => player.id !== member.id).map(v => v.id);
    const newPositions = positions.filter(position => position.playerId !== member.id).map(({member, ...v}) => v);
    await set(ref(db, `rooms/${roomId}/playerOrder`), newOrderIds);
    await set(ref(db, `rooms/${roomId}/playerPositions`), newPositions);
  }, [isIncludePlayer, member.id, orderPlayers, positions, roomId]);

  const onJoin = useCallback(async () => {
    if (isIncludePlayer) return;
    const orderIndex = orderPlayers.length;
    await set(ref(db, `rooms/${roomId}/playerOrder/${orderIndex}`), member.id);
    await set(ref(db, `rooms/${roomId}/playerPositions/${orderIndex}`), {
      playerId: member.id,
      mathIndex: 0,
    });
  }, [isIncludePlayer, member.id, orderPlayers.length, roomId]);

  return (
    <Card size={"sm"}>
      <CardBody>
        <Flex gap='4'>
          <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap' opacity={isIncludePlayer ? 1 : 0.5}>
            <Avatar name={member.name} />
            <Box>
              <Heading size='sm' minW={"74px"}>{member.name}</Heading>
              <Text>{isIncludePlayer ? "参加中" : "未参加"}</Text>
            </Box>
          </Flex>
          <Menu>
            <MenuButton
              as={IconButton}
              variant='ghost'
              colorScheme='gray'
              aria-label='See menu'
              icon={<BsThreeDotsVertical />}
            />
            <MenuList>
              {isIncludePlayer ? (
                <MenuItem onClick={onKick}>参加をやめる</MenuItem>
              ) : (
                <MenuItem onClick={onJoin}>参加する</MenuItem>
              )}
            </MenuList>
          </Menu>
        </Flex>
      </CardBody>
    </Card>
  )

}
