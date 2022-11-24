import {useRoomMembers} from "store/Members";
import {Avatar, Box, Text, Wrap, WrapItem} from "@chakra-ui/react";

type Props = {
  roomId: string;
}

export const MemberList = ({roomId}: Props) => {
  const members = useRoomMembers(roomId);

  return (
    <Box>
      <Text size={"md"}>参加中のメンバー</Text>
      <Wrap>
        {members.map(member => (
          <WrapItem key={member.id}>
            <Avatar size={"md"} name={member.name} />
          </WrapItem>
        ))}
      </Wrap>
    </Box>
  )
}
