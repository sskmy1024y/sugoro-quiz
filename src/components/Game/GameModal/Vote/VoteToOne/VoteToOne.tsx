import {HStack, ModalBody, Text, VStack} from "@chakra-ui/react";
import {LoginUser} from "models/User";
import {CombinedGame} from "models/Game";
import {VoteCard} from "./VoteCard";
import {useMemo} from "react";
import {RequireAnswer} from "./RequireAnswer";

interface Props {
  loginUser: LoginUser;
  game: CombinedGame;
}

export const VoteToOne = ({loginUser, game}: Props) => {
  const otherPlayers = useMemo(() =>
    game.gamePlayers.filter(v => v.player.id !== loginUser.id)
  , [game.gamePlayers, loginUser.id]);

  const isJoined = useMemo(() => game.gamePlayers.some(v => v.player.id === loginUser.id), [game.gamePlayers, loginUser.id]);

  return (
    <ModalBody>
      <VStack spacing={8} m={"0 auto"} w={"100%"}>
        {isJoined && <RequireAnswer loginUser={loginUser} game={game} />}
        {isJoined && <Text fontWeight={"bold"}>一番いいと思った人に投票してね！</Text>}
        <HStack spacing={"4px"} w={"100%"} justifyContent={"space-around"}>
          {otherPlayers.map((v) => (
            <VoteCard key={v.player.id} {...v} loginUser={loginUser} game={game} />
          ))}
        </HStack>
      </VStack>
    </ModalBody>
  )
}
