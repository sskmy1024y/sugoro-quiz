import {
  Modal,
  ModalContent,
  ModalOverlay
} from "@chakra-ui/react";
import {LoginUser} from "models/User";
import {CombinedGame} from "models/Game";
import {Vote} from "components/Game/GameModal/Vote";
import {useProgress} from "store/Progress";
import {Prepare} from "components/Game/GameModal/Prepare";
import {Result} from "components/Game/GameModal/Result";
import {ForceHappened} from "components/Game/GameModal/ForceHappened";
import {Happened} from "components/Game/GameModal/Happened";

interface Props {
  loginUser: LoginUser;
  latestGame: CombinedGame;
  isOpen: boolean;
  onClose: () => void;
}

export const GameModal = ({loginUser, isOpen, onClose, latestGame}: Props) => {
  const progress = useProgress(loginUser.roomId);

  return (
    <Modal
      onClose={onClose}
      closeOnEsc={false}
      closeOnOverlayClick={false}
      size={"full"}
      isOpen={isOpen}
    >
      <ModalOverlay />
      <ModalContent bg={"linear-gradient(104.31deg, #56CCE180 -1.14%, #68DCB6C0 105.66%)"} backdropFilter={"blur(30px)"} pb={"16px"}>
        {progress.state === "game-force-happened" ? (
          <ForceHappened loginUser={loginUser} latestGame={latestGame} />
        ) : progress.state === "game-happened" ? (
          <Happened loginUser={loginUser} latestGame={latestGame} />
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
