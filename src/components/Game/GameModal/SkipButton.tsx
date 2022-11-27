import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button, useDisclosure
} from "@chakra-ui/react";
import {useCallback, useRef} from "react";

interface Props {
  onClick: () => void;
  confirmText?: string;
  children?: string;
}

export const SkipButton = ({children = "スキップ", confirmText = "まだ残り時間がありますが、ミッションを終了しますか？", onClick}: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = useRef(null)

  const onSkip = useCallback(() => {
    onClick()
    onClose()
  }, [onClick, onClose])

  return (
    <>
      <Button size={"sm"} colorScheme={"gray"} onClick={onOpen}>{children}</Button>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              確認
            </AlertDialogHeader>

            <AlertDialogBody>{confirmText}</AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                キャンセル
              </Button>
              <Button colorScheme='red' onClick={onSkip} ml={3}>
                終了する
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}
