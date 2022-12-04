import {useOrderPlayer} from "store/OrderPlayer";
import {useMemo} from "react";
import {Heading, Stack, VStack} from "@chakra-ui/react";
import {MemberItem} from "./MemberItem";
import {User} from "models/User";

interface Props {
  roomId: string
}

export const Ranking = ({roomId}: Props) => {
  const members = useOrderPlayer(roomId);
  const rankingSort = useMemo(() => {
    return [...members].sort((a, b) => b.point - a.point)
      .reduce<{ member: User; ranking: number; }[]>((prev, curr, index) => {
      const newVal = [...prev];
      const prevMember = newVal[newVal.length - 1];
      const ranking = prevMember?.member.point === curr.point ? prevMember.ranking : index + 1;
      newVal.push({member: curr, ranking});
      return newVal;
    }, [])
  }, [members]);

  return (
    <VStack>
      <Heading size={"lg"}>現在の順位</Heading>
      <Stack spacing={"8px"} alignItems={"end"} flexFlow={"wrap"} justifyContent={"space-around"}>
        {rankingSort.map((v) => (
          <MemberItem key={v.member.id} member={v.member} order={v.ranking} />
        ))}
      </Stack>
    </VStack>
  )
}
