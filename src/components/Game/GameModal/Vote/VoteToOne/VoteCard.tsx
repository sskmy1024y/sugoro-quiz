import {Button, HStack, Text, VStack} from "@chakra-ui/react";
import {UserAvatar} from "components/common/UserAvatar";
import {LoginUser, User} from "models/User";
import {CombinedGame} from "models/Game";
import {useVoteGame} from "store/Game";
import {useCallback, useMemo} from "react";
import {CannotVoteCard} from "components/Game/GameModal/CannotVoteCard";

interface Props {
  loginUser: LoginUser
  game: CombinedGame
  targetUser: User;
}

export const VoteCard = ({loginUser, game, targetUser}: Props) => {
  const onVote = useVoteGame(loginUser.roomId, game.key);

  const isJoined = useMemo(() => game.gamePlayers.some(v => v.player.id === loginUser.id), [game.gamePlayers, loginUser.id]);

  const isVoted = useCallback((vote: "good" | "bad") => {
    return game.gamePlayers.find(v => v.player.id === loginUser.id)?.voteTo.some(v => v.id === targetUser.id && v.vote === vote) ?? false;
  }, [game.gamePlayers, loginUser.id, targetUser.id]);

  if (!isJoined) {
    return <CannotVoteCard targetUser={targetUser} />
  }

  return (
    <VStack
      m={"0 auto"}
      spacing={"24px"}
      border={"1px solid #ddd"}
      p={"16px 24px"}
      borderRadius={"16px"}
    >
      <Text fontWeight={"bold"}>ミッションクリアした？</Text>
      <VStack alignItems={"center"}>
        <UserAvatar user={targetUser} size={"xl"} />
        <Text fontWeight={"bold"}>{targetUser.name}</Text>
      </VStack>
      <HStack w={"100%"} justifyContent={"center"} spacing={8}>
        <VStack spacing={2}>
          <Button
            colorScheme='red'
            variant={isVoted("bad") ? "solid" : "outline"}
            size='lg'
            onClick={onVote("bad", targetUser.id)}
          >
            {"🤔"}
          </Button>
          <Text>うーん</Text>
        </VStack>
        <VStack spacing={2}>
          <Button
            colorScheme='twitter'
            variant={isVoted("good") ? "solid" : "outline"}
            size='lg'
            onClick={onVote("good", targetUser.id)}
          >
            {"👍"}
          </Button>
          <Text>いいね！</Text>
        </VStack>
      </HStack>
    </VStack>
  )
}
