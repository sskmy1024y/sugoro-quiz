import {GameModal} from "components/Game/GameModal";
import {useDisclosure} from "@chakra-ui/react";
import {useProgress} from "store/Progress";
import {useEffect} from "react";
import {LoginUser} from "models/User";
import {useLatestGame} from "store/Game";

type Props = {
  loginUser: LoginUser;
}

export const Game = ({loginUser}: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const latestGame = useLatestGame(loginUser.roomId);
  const progress = useProgress(loginUser.roomId);

  useEffect(() => {
    if (progress.state.startsWith("game-")) {
      onOpen();
    } else {
      onClose();
    }
  }, [onClose, onOpen, progress.state])

  if (!latestGame) return null;

  return (
    <GameModal loginUser={loginUser} latestGame={latestGame} isOpen={isOpen} onClose={onClose} />
  )
}
