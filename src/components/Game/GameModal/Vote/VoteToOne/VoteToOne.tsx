import {HStack, ModalBody, Text, VStack} from "@chakra-ui/react";
import {LoginUser} from "models/User";
import {CombinedGame} from "models/Game";
import {VoteCard} from "./VoteCard";
import { useMemo} from "react";
import {PlayerOrder} from "components/Game/GameModal/PlayerOrder";
import {TargetPlayer} from "./TargetPlayer";

interface Props {
  loginUser: LoginUser;
  game: CombinedGame;
  onNext: () => void;
}

export const VoteToOne = ({loginUser, game, onNext}: Props) => {
  const otherPlayers = useMemo(() =>
    game.gamePlayers.filter(v => v.player.id !== loginUser.id)
  , [game.gamePlayers, loginUser.id]);

  const currentPlayer = useMemo(() => {
    return game.gamePlayers.find(v => v.player.id === game.currentGamePlayerId)
  }, [game.gamePlayers, game.currentGamePlayerId])

  const isJoined = useMemo(() => game.gamePlayers.some(v => v.player.id === loginUser.id), [game.gamePlayers, loginUser.id]);

  return (
    <ModalBody>
      <VStack spacing={8} m={"0 auto"} w={"100%"}>
        <PlayerOrder game={game} roomId={loginUser.roomId} />
        {currentPlayer && <TargetPlayer player={currentPlayer.player} loginUser={loginUser} onNext={onNext} game={game} />}
        {isJoined && <Text fontWeight={"bold"}>一人選んで投票してね！</Text>}
        <HStack spacing={"4px"} w={"100%"} justifyContent={"space-around"}>
          {otherPlayers.map((v) => (
            <VoteCard key={v.player.id} {...v} loginUser={loginUser} game={game} />
          ))}
        </HStack>
      </VStack>
    </ModalBody>
  )
}
