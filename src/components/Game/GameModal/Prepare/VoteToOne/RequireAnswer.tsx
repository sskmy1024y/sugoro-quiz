import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent, AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay, AvatarGroup,
  Button,
  Text, useDisclosure,
  VStack
} from "@chakra-ui/react";
import {UserAvatar} from "components/common/UserAvatar";
import {LoginUser} from "models/User";
import {CombinedGame} from "models/Game";
import {useCallback, useMemo, useRef} from "react";

interface Props {
  loginUser: LoginUser
  game: CombinedGame
  onNext: () => void;
}

export const RequireAnswer = ({loginUser, game, onNext}: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = useRef(null)

  const isJoined = useMemo(() => game.gamePlayers.some(v => v.player.id === loginUser.id), [game.gamePlayers, loginUser.id]);

  const sortedPlayers = useMemo(() => {
    return [...game.gamePlayers].sort((a, b) => {
      if (b.player.id === loginUser.id) return 1;
      if (a.player.id === loginUser.id) return -1;
      return -1;
    }).map(v => v.player);
  }, [game.gamePlayers, loginUser.id])

  const onStart = useCallback(() => {
    onNext()
    onClose()
  }, [onNext, onClose])

  return (
    <>
      <VStack
        m={"0 auto"}
        spacing={"24px"}
        border={"1px solid #ddd"}
        bg={"white"}
        p={"24px 32px"}
        borderRadius={"16px"}
      >
        <Text fontWeight={"bold"}>ミッションをクリアしろ！</Text>
        <VStack alignItems={"center"}>
          <AvatarGroup size={"xl"}>
            {sortedPlayers.map(v => (
              <UserAvatar key={v.id} user={v} size={"xl"} />
            ))}
          </AvatarGroup>
          <Text fontWeight={"bold"}>回答者: 全員</Text>
          <Text fontSize={"md"}>一人当たりの制限時間: {game.mission.timeout}秒</Text>
          {isJoined ? (
            <Button colorScheme={"twitter"} onClick={onOpen}>{"ミッションスタート！"}</Button>
          ) : (
            <Button disabled size={"md"}>ミッションに参加できません</Button>
          )}
        </VStack>
      </VStack>
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

            <AlertDialogBody>ゲームをスタートしますか？</AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                キャンセル
              </Button>
              <Button colorScheme='twitter' onClick={onStart} ml={3}>
                スタート！
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}
