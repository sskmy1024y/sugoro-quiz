import { ModalBody, VStack} from "@chakra-ui/react";
import {LoginUser} from "models/User";
import {CombinedGame} from "models/Game";
import {useMemo} from "react";
import {TargetPlayer} from "components/Game/GameModal/Vote/VoteToOtherYN/TargetPlayer";
import {PlayerOrder} from "components/Game/GameModal/PlayerOrder";

interface Props {
  loginUser: LoginUser;
  game: CombinedGame;
  onNext: () => void;
}

export const VoteToOtherYN = ({loginUser, game, onNext}: Props) => {
  const currentPlayer = useMemo(() => {
    return game.gamePlayers.find(v => v.player.id === game.currentGamePlayerId)
  }, [game.gamePlayers, game.currentGamePlayerId])

  return (
    <ModalBody>
      <VStack spacing={8} m={"0 auto"} w={"100%"}>
        <PlayerOrder game={game} roomId={loginUser.roomId} />
        {currentPlayer && <TargetPlayer player={currentPlayer.player} loginUser={loginUser} onNext={onNext} game={game} />}
      </VStack>
    </ModalBody>
  )
}
