import {Box, Button, HStack, Text, VStack} from "@chakra-ui/react";
import {UserAvatar} from "components/common/UserAvatar";
import {LoginUser, User} from "models/User";
import {CombinedGame} from "models/Game";
import {useVoteGame} from "store/Game";
import {useCallback, useMemo} from "react";
import {CannotVoteCard} from "components/Game/GameModal/CannotVoteCard";
import {useTime} from "hooks/useTime";

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
      p={"24px 32px"}
      borderRadius={"16px"}
    >
      <Text fontWeight={"bold"}>ミッションをクリアしろ！</Text>
      <VStack alignItems={"center"}>
        <UserAvatar user={loginUser} size={"xl"} />
        <Text fontWeight={"bold"}>{loginUser.name}</Text>
      </VStack>
    </VStack>
  )
}
