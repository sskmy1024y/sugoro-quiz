import {Button, Text, VStack} from "@chakra-ui/react";
import {UserAvatar} from "components/common/UserAvatar";
import {LoginUser, User} from "models/User";
import {CombinedGame} from "models/Game";
import {useMemo} from "react";
import {CannotVoteCard} from "components/Game/GameModal/CannotVoteCard";
import {SkipButton} from "components/Game/GameModal/SkipButton";
import {useOnNextTurn} from "store/Progress";

interface Props {
  loginUser: LoginUser
  game: CombinedGame
  targetUser: User;
}

export const VoteCard = ({loginUser, game, targetUser}: Props) => {
  const onNextTurn = useOnNextTurn(loginUser.roomId);

  const isJoined = useMemo(() => game.gamePlayers.some(v => v.player.id === loginUser.id), [game.gamePlayers, loginUser.id]);

  if (!isJoined) {
    return <CannotVoteCard targetUser={targetUser} />
  }

  return (
    <VStack spacing={8} m={"0 auto"} w={"100%"}>
      <VStack
        m={"0 auto"}
        spacing={"24px"}
        border={"1px solid #ddd"}
        p={"16px 24px"}
        borderRadius={"16px"}
      >
        <Text fontWeight={"bold"}>ミッションをする人</Text>
        <VStack alignItems={"center"}>
          <UserAvatar user={targetUser} size={"xl"} />
          <Text fontWeight={"bold"}>{targetUser.name}</Text>
        </VStack>
        <Button colorScheme={"twitter"} isLoading loadingText={"準備中"} />
      </VStack>
      <SkipButton onClick={onNextTurn} confirmText={`このミッションをスキップしますか？（${targetUser.name}さんが参加できない場合はスキップしてね）`}>このミッションをスキップする</SkipButton>
    </VStack>
  )
}
