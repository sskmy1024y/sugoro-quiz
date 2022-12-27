import {Box, Container, Heading, HStack} from "@chakra-ui/react";
import {Teams} from "config/Constants";
import {MemberRanking} from "../components/MemberRanking";
import {useRecoilCallback} from "recoil";
import {MembersState} from "store/Members/atoms";
import {get, ref} from "firebase/database";
import {db} from "config/firebase";
import {useEffect} from "react";
import {User} from "models/User";
import {OrderPlayerIdsState} from "store/OrderPlayer/atoms";

export const UnifesStaff = () => {
  const roomIds = Object.values(Teams)
  useFetchOnce(roomIds)

  return (
    <Container maxW='9xl'>
      <Heading>UnifesStaff</Heading>
      <Box overflow={"auto"}>
        <HStack alignItems={"flex-start"}>
          {roomIds.map((roomId) => (
            <MemberRanking key={roomId} roomId={roomId} />
          ))}
        </HStack>
      </Box>
    </Container>
  )
}

const useFetchOnce = (roomIds: string[]) => {
  const fetchOnceMembers = useRecoilCallback(({set}) => async (roomId: string) => {
    const memberSnapshotRef = ref(db, `rooms/${roomId}/users/`);
    const orderPlayerRef = ref(db, `rooms/${roomId}/playerOrder/`);

    const memberSnapshot = await get(memberSnapshotRef)
    if (memberSnapshot.exists()) {
      const members: User[] = [];
      memberSnapshot.forEach(childSnapshot => {
        members.push({
          key: childSnapshot.key!,
          ...childSnapshot.val()
        });
      });
      set(MembersState(roomId), members);
    }

    const orderPlayerSnapshot = await get(orderPlayerRef)
    if (orderPlayerSnapshot.exists()) {
      const orderPlayers: string[] = [];
      orderPlayerSnapshot.forEach(childSnapshot => {
        orderPlayers.push(childSnapshot.val());
      });
      set(OrderPlayerIdsState(roomId), orderPlayers);
    }
  })

  useEffect(() => {
    roomIds.map(fetchOnceMembers)
  }, [roomIds, fetchOnceMembers])
}
