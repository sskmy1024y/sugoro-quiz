import {useRoomMembers} from "store/Members";
import {Card, CardBody, CardHeader, Heading, VStack} from "@chakra-ui/react";
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
    <Card w={"280px"} bg={"linear-gradient(104.31deg, #56CCE180 -1.14%, #68DCB6C0 105.66%)"} backdropFilter={"blur(30px)"}>
      <CardHeader>
        <Heading size={"md"} color={"gray.700"}>ルームメンバー</Heading>
      </CardHeader>
      <CardBody p={"0 16px 16px"}>
        <VStack spacing={4} alignItems={"flex-start"} maxH={"500px"} overflowX={"unset"} overflowY={"scroll"}>
          {orderMembers.map(member => (
            <MemberItem key={member.id} roomId={loginUser.roomId} member={member}/>
          ))}
        </VStack>
      </CardBody>
    </Card>
  )
}
