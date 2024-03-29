import {Box, Button, Card, CardBody, HStack, Text, VStack} from "@chakra-ui/react";
import {UserAvatar} from "components/common/UserAvatar";
import {LoginUser} from "models/User";
import {CombinedGame, CombinedGamePlayer} from "models/Game";
import { useVoteToOneGame} from "store/Game";
import {useCallback, useMemo} from "react";
import {VotedView} from "components/Game/GameModal/Vote/VoteToOtherYN/VotedView";

type Props = CombinedGamePlayer & {
  loginUser: LoginUser
  game: CombinedGame
}

export const VoteCard = ({loginUser, game, player}: Props) => {
  const onVote = useVoteToOneGame(loginUser.roomId, game.key);

  const isJoined = useMemo(() => game.gamePlayers.some(v => v.player.id === loginUser.id), [game.gamePlayers, loginUser.id]);

  const isVoted = useCallback((vote: "good" | "bad") => {
    return game.gamePlayers.find(v => v.player.id === loginUser.id)?.voteTo.some(v => v.id === player.id && v.vote === vote) ?? false;
  }, [game.gamePlayers, loginUser.id, player.id]);

  return (
    <Card w={"160px"} size={"sm"} bg={"white"} borderRadius={"8px"}>
      <CardBody>
        <VStack spacing={"8px"}>
          <VStack alignItems={"center"} spacing={"2px"}>
            <UserAvatar user={player} size={"sm"} />
            <Text fontWeight={"bold"} fontSize={"16px"} noOfLines={1}>{player.name}</Text>
          </VStack>
          <VotedView loginUser={loginUser} game={game} player={player} />
          {isJoined ? (
            <HStack w={"100%"} justifyContent={"center"} spacing={8}>
              <VStack spacing={2}>
                <Button
                  colorScheme='twitter'
                  variant={isVoted("good") ? "solid" : "outline"}
                  size='sm'
                  onClick={onVote(player.id)}
                >
                  {"👍"}
                </Button>
                <Text fontSize={"12px"}>いいね！</Text>
              </VStack>
            </HStack>
          ) : (
            <Box>
              <Text fontWeight={"bold"} fontSize={"12px"} color={"red"}>ゲーム未参加のため投票できません</Text>
            </Box>
          )}
        </VStack>
      </CardBody>
    </Card>
  )
}
