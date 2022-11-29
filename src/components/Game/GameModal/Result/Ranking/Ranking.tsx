import {useOrderPlayer} from "store/OrderPlayer";
import {useMemo} from "react";
import {Heading, Stack, VStack} from "@chakra-ui/react";
import {MemberItem} from "./MemberItem";

interface Props {
  roomId: string
}

export const Ranking = ({roomId}: Props) => {
  const members = useOrderPlayer(roomId);
  const rankingSort = useMemo(() => [...members].sort((a, b) => a.point - b.point), [members]);

  return (
    <VStack>
      <Heading size={"md"}>現在の順位</Heading>
      <Stack spacing={"8px"} alignItems={"end"} flexFlow={"wrap"} justifyContent={"space-around"}>
        {rankingSort.map((v, i) => (
          <MemberItem key={v.id} member={v} order={i + 1} />
        ))}
      </Stack>
    </VStack>
  )
}
