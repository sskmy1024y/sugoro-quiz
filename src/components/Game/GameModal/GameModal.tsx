import {
  Heading,
  Modal,
  Text,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay, VStack, Box
} from "@chakra-ui/react";
import {LoginUser} from "models/User";
import {CombinedGame} from "models/Game";
import {Vote} from "components/Game/GameModal/Vote";
import {useProgress} from "store/Progress";
import {Prepare} from "components/Game/GameModal/Prepare";
import {Result} from "components/Game/GameModal/Result";
import {ForceHappened} from "components/Game/GameModal/ForceHappened";

interface Props {
  loginUser: LoginUser;
  latestGame: CombinedGame;
  isOpen: boolean;
  onClose: () => void;
}

export const GameModal = ({loginUser, isOpen, onClose, latestGame}: Props) => {
  const progress = useProgress(loginUser.roomId);

  return (
    <Modal onClose={onClose} closeOnOverlayClick={false} size={"5xl"} isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent>
        {progress.state === "game-force-happened" ? (
          <ForceHappened loginUser={loginUser} latestGame={latestGame} />

        ): progress.state === "game-prepare" ? (
          <Prepare loginUser={loginUser} latestGame={latestGame} />
        ) : progress.state === "game-start" ? (
          <Vote loginUser={loginUser} latestGame={latestGame} />
        ) : progress.state === "game-end" ? (
          <Result loginUser={loginUser} latestGame={latestGame} />
        ) : null}
      </ModalContent>
    </Modal>
  )
}