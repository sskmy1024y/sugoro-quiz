import {useRoomMembers} from "store/Members";
import {Box, SimpleGrid, Text} from "@chakra-ui/react";
import {MemberItem} from "./MemberItem";
import {useMemo} from "react";
import {LoginUser} from "models/User";
import {useOrderPlayer} from "store/OrderPlayer";

type Props = {
  loginUser: LoginUser;
}

export const MemberList = ({loginUser}: Props) => {
  const members = useRoomMembers(loginUser.roomId);
  const orderPlayers = useOrderPlayer(loginUser.roomId);

  const orderMembers = useMemo(() => {
    const joinMemberIds = orderPlayers.map(v => v.id);
    return [...members].sort((a, b) => {
      if (b.id === loginUser.id) return 1;
      if (a.id === loginUser.id) return -1;
      if (joinMemberIds.includes(b.id)) return 1;
      return -1;
    })
  }, [members, orderPlayers, loginUser.id]);

  return (
    <Box>
      <Text size={"md"}>参加中のメンバー</Text>
      <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(200px, 1fr))'>
        {orderMembers.map(member => (
          <MemberItem key={member.id} roomId={loginUser.roomId} member={member}/>
        ))}
      </SimpleGrid>
    </Box>
  )
}
