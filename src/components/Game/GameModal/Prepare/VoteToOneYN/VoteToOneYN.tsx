import {ModalBody} from "@chakra-ui/react";
import {LoginUser, User} from "models/User";
import {CombinedGame} from "models/Game";
import {VoteCard} from "./VoteCard";
import {RequireAnswer} from "./RequireAnswer";
import {useOnNextTurn} from "store/Progress";

interface Props {
  loginUser: LoginUser;
  targetUser: User;
  game: CombinedGame;
  onNext: () => void;
}

export const VoteToOneYN = ({loginUser, targetUser, game, onNext}: Props) => {
  const onNextTurn = useOnNextTurn(loginUser.roomId);

  return (
    <ModalBody>
      {loginUser.id === targetUser.id ? (
        <RequireAnswer loginUser={loginUser} game={game} onNext={onNext} />
      ) : (
        <VoteCard loginUser={loginUser} game={game} targetUser={targetUser} onSkip={onNextTurn} />
      )}
    </ModalBody>
  )
}
