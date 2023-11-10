import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent, AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay, Button
} from "@chakra-ui/react";
import {db} from "config/firebase";
import {ref, remove} from "firebase/database";
import React from "react";

export const DeleteAllData = ({isOpen, onClose}: {isOpen: boolean; onClose: () => void}) => {
  const cancelRef = React.useRef<HTMLButtonElement>(null)
  const deleteAllDatabase = async () => {
    console.log('delete all database')
    await remove(ref(db, '/')).then(() => {
      window.location.reload()
    })
  }

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize='lg' fontWeight='bold'>
            全てのデータを削除します
          </AlertDialogHeader>

          <AlertDialogBody>
            全チームを削除します。ログイン済みの場合は強制的にログアウトします。<br/>
            <b>本当に削除しますか？</b>
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              キャンセル
            </Button>
            <Button colorScheme='red' onClick={deleteAllDatabase} ml={3}>
              削除する
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )
}
