import {useRoomMembers} from "store/Members";
import {Box, SimpleGrid, Text} from "@chakra-ui/react";
import {MemberItem} from "./MemberItem";

type Props = {
  roomId: string;
}

export const MemberList = ({roomId}: Props) => {
  const members = useRoomMembers(roomId);

  return (
    <Box>
      <Text size={"md"}>参加中のメンバー</Text>
      <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(200px, 1fr))'>
        {members.map(member => (
          <MemberItem key={member.id} roomId={roomId} member={member}/>
        ))}
      </SimpleGrid>
    </Box>
  )
}
