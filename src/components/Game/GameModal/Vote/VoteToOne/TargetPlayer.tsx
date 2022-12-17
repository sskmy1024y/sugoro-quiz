import {Box, Button, Text, VStack} from "@chakra-ui/react";
import {UserAvatar} from "components/common/UserAvatar";
import {LoginUser, User} from "models/User";
import {CombinedGame} from "models/Game";
import {VotedView} from "components/Game/GameModal/Vote/VoteToOtherYN/VotedView";
import {useCallback, useMemo} from "react";
import {useVoteGame} from "store/Game";

interface Props {
  loginUser: LoginUser;
  player: User
  game: CombinedGame;
  onNext: () => void;
}

export const TargetPlayer = ({player, loginUser, game, onNext}: Props) => {
  const onVote = useVoteGame(loginUser.roomId, game.key);

  const isJoined = useMemo(() => game.gamePlayers.some(v => v.player.id === loginUser.id), [game.gamePlayers, loginUser.id]);

  const isMeTarget = useMemo(() => game.currentGamePlayerId === loginUser.id, [game.currentGamePlayerId, loginUser.id]);

  const isVoted = useCallback((vote: "good" | "bad") => {
    return game.gamePlayers.find(v => v.player.id === loginUser.id)?.voteTo.some(v => v.id === player.id && v.vote === vote) ?? false;
  }, [game.gamePlayers, loginUser.id, player.id]);

  return (
    <>
      {isMeTarget && (
        <Text
          fontSize={"20px"}
          fontWeight={"bold"}
          color={"white"}
        >あなたの番！</Text>
      )}
      <VStack
        m={"0 auto"}
        spacing={"16px"}
        border={"1px solid #ddd"}
        bg={"white"}
        p={"24px 32px"}
        borderRadius={"16px"}
        minW={"200px"}
      >
        <Text fontWeight={"bold"}>{player.name}さんの番</Text>
        <VStack alignItems={"center"}>
          <UserAvatar user={player} size={"xl"} />
          <Text fontWeight={"bold"}>{player.name}</Text>
        </VStack>
        <VotedView player={player} loginUser={loginUser} game={game} />
        {isMeTarget ? (
          <Button colorScheme={"twitter"} onClick={onNext}>自分の番を終了する</Button>
        ) : !isJoined ? (
          <Box>
            <Text fontWeight={"bold"} fontSize={"12px"} color={"red"}>ゲーム未参加のため投票できません</Text>
          </Box>
        ) : null}
      </VStack>
    </>
  )
}
