import {Button, HStack, Text, VStack} from "@chakra-ui/react";
import {UserAvatar} from "components/common/UserAvatar";
import {LoginUser, User} from "models/User";
import {CombinedGame} from "models/Game";
import {useVoteGame} from "store/Game";
import {useCallback, useMemo} from "react";
import {CannotVoteCard} from "components/Game/GameModal/CannotVoteCard";
import {useTime} from "hooks/useTime";
import {SkipButton} from "components/Game/GameModal/SkipButton";

interface Props {
  loginUser: LoginUser
  game: CombinedGame
  targetUser: User;
  onSkip: () => void;
}

export const VoteCard = ({loginUser, game, targetUser, onSkip}: Props) => {
  const now = useTime(500)
  const onVote = useVoteGame(loginUser.roomId, game.key);

  const timeLimited = useMemo(() => (game.timeoutAt - now) / 1000 < 0, [game.timeoutAt, now])
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
        <Text fontSize={"md"}>制限時間: {game.mission.timeout}秒</Text>
        <Button colorScheme={"twitter"} isLoading loadingText={"ミッション開始待ち"} />
      </VStack>
      <Text>{`${targetUser.name}さんがミッションをクリアしたら、いいねボタンを押してね！`}</Text>
      <HStack w={"100%"} justifyContent={"center"} spacing={8}>
        <VStack spacing={2}>
          <Button
            colorScheme='red'
            variant={"outline"}
            size='lg'
            disabled={timeLimited}
            onClick={onVote("good", targetUser.id)}
          >
            {"🤔"}
          </Button>
          <Text>うーん</Text>
        </VStack>
        <VStack spacing={2}>
          <Button
            colorScheme='twitter'
            variant={"outline"}
            size='lg'
            disabled={timeLimited}
            onClick={onVote("bad", targetUser.id)}
          >
            {"👍"}
          </Button>
          <Text>いいね！</Text>
        </VStack>
      </HStack>
      <SkipButton onClick={onSkip} confirmText={`このミッションをスキップしますか？（${targetUser.name}さんが参加できない場合はスキップしてね）`}>このミッションをスキップする</SkipButton>
    </VStack>
  )
}