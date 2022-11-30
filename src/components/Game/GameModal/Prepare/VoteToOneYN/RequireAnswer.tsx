import { Button, HStack, Text, VStack} from "@chakra-ui/react";
import {UserAvatar} from "components/common/UserAvatar";
import {LoginUser, User} from "models/User";
import {CombinedGame} from "models/Game";
import {useMemo} from "react";
import {VoteMemberCard} from "components/Game/GameModal/VoteMemberCard";

interface Props {
  loginUser: LoginUser;
  targetUser: User;
  game: CombinedGame;
  onNext: () => void;
}

export const RequireAnswer = ({loginUser, targetUser, game, onNext}: Props) => {
  const otherPlayers = useMemo(() =>
      game.gamePlayers.filter(v => v.player.id !== loginUser.id && v.player.id !== targetUser.id)
    , [game.gamePlayers, loginUser.id, targetUser.id]);

  return (
    <VStack spacing={8} m={"0 auto"} w={"100%"}>
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
        <Text fontSize={"md"}>制限時間: {game.mission.timeout}秒</Text>
        <Button colorScheme={"twitter"} onClick={onNext}>{"ミッションスタート！"}</Button>
      </VStack>
      <HStack spacing={"4px"} w={"100%"} justifyContent={"space-around"}>
        {otherPlayers.map((v) => (
          <VoteMemberCard key={v.player.id} {...v} />
        ))}
      </HStack>
    </VStack>
  )
}
