import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter, AlertDialogHeader,
  AlertDialogOverlay,
  Button, useDisclosure
} from "@chakra-ui/react";
import React, {useCallback} from "react";
import {useRoomMembers} from "store/Members";
import {useCurrentPlayer, useProgress, useUpdateProgress} from "store/Progress";
import {useOrderPlayer} from "store/OrderPlayer";

type Props = {
  roomId: string;
}

export const SkipButton = ({roomId}: Props) => {
  const orderPlayer = useOrderPlayer(roomId);
  const progress = useProgress(roomId);
  const currentPlayer = useCurrentPlayer(roomId);
  const updateProgress = useUpdateProgress(roomId);

  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = React.useRef(null)

  const onSkip = useCallback(async () => {
    const currentPlayerIndex = currentPlayer ? orderPlayer.findIndex(player => player.id === currentPlayer.id) : 0;
    const nextPlayer = currentPlayerIndex === orderPlayer.length ? orderPlayer[0] : orderPlayer[currentPlayerIndex + 1];

    await updateProgress({
      currentPlayerId: nextPlayer.id,
      state: "dice-waiting"
    })
  },[currentPlayer, orderPlayer, updateProgress]);

  const confirmSkip = () => {
    onOpen()
  }

  return (
    <>
    <Button onClick={confirmSkip}>この人をスキップする</Button>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              注意！
            </AlertDialogHeader>

            <AlertDialogBody>
              進行中のプレイヤーをスキップしますか？<br />
              （勝手にスキップすると怒られるよ）
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                キャンセル
              </Button>
              <Button colorScheme='red' onClick={onSkip} ml={3}>
                スキップする
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}
