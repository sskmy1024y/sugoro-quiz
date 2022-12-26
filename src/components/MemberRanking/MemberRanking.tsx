import {useRoomMembers} from "store/Members";
import {Card, CardBody, CardHeader, Heading, VStack} from "@chakra-ui/react";
import {MemberItem} from "./MemberItem";
import {useMemo} from "react";
import {useOrderPlayer} from "store/OrderPlayer";

type Props = {
  roomId: string;
}

export const MemberRanking = ({roomId}: Props) => {
  const members = useRoomMembers(roomId);
  const orderPlayers = useOrderPlayer(roomId);

  const orderMembers = useMemo(() => {
    const joinMemberIds = orderPlayers.map(v => v.id);
    return [...members]
      .sort((a, b) => b.point - a.point)
      .sort((a, b) => {
      if (joinMemberIds.includes(b.id)) return 1;
      return -1;
    })
  }, [members, orderPlayers]);

  return (
    <Card w={"200px"} flexShrink={0} border={"1px solid white"} bg={"linear-gradient(104.31deg, #56CCE1D0 -1.14%, #68DCB6E0 105.66%)"} backdropFilter={"blur(0px)"}>
      <CardHeader>
        <Heading size={"md"} color={"gray.700"}>{roomId}</Heading>
      </CardHeader>
      <CardBody p={"0 16px 16px"}>
        <VStack spacing={4} alignItems={"flex-start"} maxH={"500px"} overflowX={"unset"} overflowY={"auto"}>
          {orderMembers.map(member => (
            <MemberItem key={member.id} roomId={roomId} member={member}/>
          ))}
        </VStack>
      </CardBody>
    </Card>
  )
}
