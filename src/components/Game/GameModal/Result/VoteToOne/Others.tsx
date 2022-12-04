import {Card, CardBody, Divider, HStack, Text, VStack} from "@chakra-ui/react";
import {UserAvatar} from "components/common/UserAvatar";
import {LoginUser, User} from "models/User";
import {CombinedGame} from "models/Game";
import {VotedView} from "./VotedView";

type Props = {
  player: User
  loginUser: LoginUser
  game: CombinedGame
  point: number
}

export const Others = ({loginUser, game, player, point}: Props) => {
  return (
    <Card w={"240px"} size={"sm"}>
      <CardBody>
        <VStack spacing={"8px"}>
          <VStack alignItems={"center"}>
            <UserAvatar user={player} size={"lg"} />
            <Text fontWeight={"bold"} fontSize={"16px"} noOfLines={1}>{player.name}</Text>
          </VStack>
          <VotedView loginUser={loginUser} game={game} player={player} />
          <VStack spacing={"8px"}>
            <HStack alignItems={"baseline"}>
              <Text fontSize={"4xl"} fontWeight={"bold"}>{`+${point}`}</Text>
              <Text fontSize={"md"}>{`pt`}</Text>
            </HStack>
            <Divider />
            <HStack alignItems={"baseline"}>
              <Text fontSize={"md"}>累計</Text>
              <Text fontSize={"2xl"} fontWeight={"bold"}>{player.point}</Text>
              <Text fontSize={"md"}>pt</Text>
            </HStack>
          </VStack>
        </VStack>
      </CardBody>
    </Card>
  )
}
