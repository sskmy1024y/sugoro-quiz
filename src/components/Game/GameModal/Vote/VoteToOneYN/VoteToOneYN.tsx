import {HStack, ModalBody, VStack} from "@chakra-ui/react";
import {LoginUser, User} from "models/User";
import {CombinedGame} from "models/Game";
import {VoteCard} from "./VoteCard";
import {VoteMemberCard} from "components/Game/GameModal/VoteMemberCard";
import {useMemo} from "react";
import {RequireAnswer} from "./RequireAnswer";

interface Props {
  loginUser: LoginUser;
  targetUser: User;
  game: CombinedGame;
}

export const VoteToOneYN = ({loginUser, targetUser, game}: Props) => {
  const otherPlayers = useMemo(() =>
    game.gamePlayers.filter(v => v.player.id !== loginUser.id && v.player.id !== targetUser.id)
  , [game.gamePlayers, loginUser.id, targetUser.id]);

  return (
    <ModalBody>
      <VStack spacing={8} m={"0 auto"} w={"100%"}>
        {loginUser.id === targetUser.id ? (
          <RequireAnswer loginUser={loginUser} game={game} />
        ) : (
          <VoteCard loginUser={loginUser} game={game} targetUser={targetUser} />
        )}
        <HStack spacing={"4px"} w={"100%"} justifyContent={"space-around"}>
          {otherPlayers.map((v) => (
            <VoteMemberCard key={v.player.id} {...v} />
          ))}
        </HStack>
      </VStack>
    </ModalBody>
  )
}
