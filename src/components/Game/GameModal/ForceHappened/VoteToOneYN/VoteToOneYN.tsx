import {ModalBody} from "@chakra-ui/react";
import {LoginUser, User} from "models/User";
import {CombinedGame} from "models/Game";
import {VoteCard} from "./VoteCard";
import {RequireAnswer} from "./RequireAnswer";

interface Props {
  loginUser: LoginUser;
  targetUser: User;
  game: CombinedGame;
  onNext: () => void;
}

export const VoteToOneYN = ({loginUser, targetUser, game, onNext}: Props) => {
  return (
    <ModalBody>
      {loginUser.id === targetUser.id ? (
        <RequireAnswer loginUser={loginUser} game={game} targetUser={targetUser} onNext={onNext} />
      ) : (
        <VoteCard loginUser={loginUser} game={game} targetUser={targetUser} />
      )}
    </ModalBody>
  )
}
