import { Text, VStack} from "@chakra-ui/react";
import {UserAvatar} from "components/common/UserAvatar";
import {LoginUser} from "models/User";
import {CombinedGame} from "models/Game";
import {VotedView} from "components/Game/GameModal/Vote/VoteToOtherYN/VotedView";

interface Props {
  loginUser: LoginUser
  game: CombinedGame
}

export const RequireAnswer = ({loginUser, game}: Props) => {
  return (
    <VStack
      m={"0 auto"}
      spacing={"24px"}
      border={"1px solid #ddd"}
      bg={"white"}
      p={"24px 32px"}
      borderRadius={"16px"}
    >
      <Text fontWeight={"bold"}>ミッションをクリアしろ！</Text>
      <VStack alignItems={"center"}>
        <UserAvatar user={loginUser} size={"xl"} />
        <Text fontWeight={"bold"}>{loginUser.name}</Text>
      </VStack>
      <VotedView player={loginUser} loginUser={loginUser} game={game} />
    </VStack>
  )
}
