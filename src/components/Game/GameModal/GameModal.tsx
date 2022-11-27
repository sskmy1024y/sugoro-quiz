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
        <ModalHeader mt={"16px"}>
          <VStack
            spacing={"16px"}
            p={"16px 24px"}
            bg={"#eee"}
            borderRadius={"16px"}
            w={"100%"}
          >
            <Heading size={"md"}>ミッション</Heading>
            <Text fontSize={"16px"}>{latestGame.mission.mission}</Text>
          </VStack>
        </ModalHeader>
        {progress.state === "game-prepare" ? (
          <Prepare loginUser={loginUser} latestGame={latestGame} />
        ) : progress.state === "game-start" ? (
          <Vote loginUser={loginUser} latestGame={latestGame} />
        ) : progress.state === "game-end" ? (
          <Box>ゲーム終了</Box>
        ) : null}
      </ModalContent>
    </Modal>
  )
}
