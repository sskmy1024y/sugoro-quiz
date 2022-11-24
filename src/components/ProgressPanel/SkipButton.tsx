import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter, AlertDialogHeader,
  AlertDialogOverlay,
  Button, useDisclosure
} from "@chakra-ui/react";
import React, {useCallback} from "react";
import {useCurrentPlayer, useOnNextTurn, useProgress, useUpdateProgress} from "store/Progress";
import {useOrderPlayer} from "store/OrderPlayer";

type Props = {
  roomId: string;
}

export const SkipButton = ({roomId}: Props) => {
  const onNextTurn = useOnNextTurn(roomId);
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = React.useRef(null)

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
              <Button colorScheme='red' onClick={onNextTurn} ml={3}>
                スキップする
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}
