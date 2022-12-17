import {HStack, ModalBody, Text, VStack} from "@chakra-ui/react";
import {LoginUser} from "models/User";
import {CombinedGame} from "models/Game";
import {VoteCard} from "./VoteCard";
import {useMemo} from "react";
import {RequireAnswer} from "./RequireAnswer";
import {PlayerOrder} from "components/Game/GameModal/PlayerOrder";

interface Props {
  loginUser: LoginUser;
  game: CombinedGame;
  onNext: () => void;
}

export const VoteToOtherYN = ({loginUser, game, onNext}: Props) => {
  const otherPlayers = useMemo(() =>
    game.gamePlayers.filter(v => v.player.id !== loginUser.id)
  , [game.gamePlayers, loginUser.id]);

  const isJoined = useMemo(() => game.gamePlayers.some(v => v.player.id === loginUser.id), [game.gamePlayers, loginUser.id]);

  return (
    <ModalBody>
      <VStack spacing={8} m={"0 auto"} w={"100%"}>
        <PlayerOrder game={game} roomId={loginUser.roomId} />
        <RequireAnswer loginUser={loginUser} game={game} onNext={onNext} />
        <VStack w={"100%"} spacing={"16px"} borderRadius={"8px"} bg={"rgba(255, 255, 255, 0.6)"} backdropFilter={"blur(5px)"} p={"16px 32px"}>
          {isJoined && <Text>ミッションをクリアした人には「いいね」を押してね</Text>}
          <HStack spacing={"4px"} w={"100%"} justifyContent={"space-around"}>
            {otherPlayers.map((v) => (
              <VoteCard key={v.player.id} {...v} loginUser={loginUser} game={game} />
            ))}
          </HStack>
        </VStack>
      </VStack>
    </ModalBody>
  )
}
