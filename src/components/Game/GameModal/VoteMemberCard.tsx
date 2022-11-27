import {Button, Card, CardBody, HStack, Text, VStack} from "@chakra-ui/react";
import {UserAvatar} from "components/common/UserAvatar";
import {User} from "models/User";
import {CombinedGame, CombinedGamePlayer, CombinedGamePlayerVote} from "models/Game";
import {useVoteGame} from "store/Game";

type Props = CombinedGamePlayer;

export const VoteMemberCard = ({player, voteTo }: Props) => {
  return (
    <Card w={"160px"} h={"140px"} size={"sm"}>
      <CardBody>
        <VStack spacing={"8px"}>
          <VStack alignItems={"center"}>
            <UserAvatar user={player} size={"sm"} />
            <Text fontWeight={"bold"} fontSize={"16px"} noOfLines={1}>{player.name}</Text>
          </VStack>
          {voteTo.map(v => (
            <Text key={v.id} fontWeight={"bold"} fontSize={"32px"}>{v.vote === "good" ? "🤔" : "👍"}</Text>
          ))}
        </VStack>
      </CardBody>
    </Card>
  )
}
