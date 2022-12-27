import {HStack, ModalBody, VStack} from "@chakra-ui/react";
import {LoginUser} from "models/User";
import {CombinedGame} from "models/Game";
import {useMemo} from "react";
import {TargetPlayer} from "components/Game/GameModal/Vote/VoteToOtherYN/TargetPlayer";
import {PlayerOrder} from "components/Game/GameModal/PlayerOrder";
import {VoteCard} from "./VoteCard";

interface Props {
  loginUser: LoginUser;
  game: CombinedGame;
  onNext: () => void;
}

export const VoteToOtherYN = ({loginUser, game, onNext}: Props) => {
  const currentPlayer = useMemo(() => {
    return game.gamePlayers.find(v => v.player.id === game.currentGamePlayerId)
  }, [game.gamePlayers, game.currentGamePlayerId])

  const otherPlayers = useMemo(() =>
      game.gamePlayers.filter(v => v.player.id !== loginUser.id && v.player.id !== currentPlayer?.player.id)
    , [currentPlayer?.player.id, game.gamePlayers, loginUser.id]);

  return (
    <ModalBody>
      <VStack spacing={8} m={"0 auto"} w={"100%"}>
        <PlayerOrder game={game} roomId={loginUser.roomId} />
        {currentPlayer && <TargetPlayer player={currentPlayer.player} loginUser={loginUser} onNext={onNext} game={game} />}
        <HStack spacing={"4px"} w={"100%"} justifyContent={"space-around"}>
          {otherPlayers.map((v) => (
            <VoteCard key={v.player.id} {...v} loginUser={loginUser} game={game} />
          ))}
        </HStack>
      </VStack>
    </ModalBody>
  )
}
