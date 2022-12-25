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
        <VStack alignItems={"center"} spacing={"8px"}>
          <VStack spacing={"4px"}>
            <Text fontWeight={"bold"}>【ルール】</Text>
            <Text>順番に回答して、ミッションをクリアしたと思ったら「いいね👍」を押してね</Text>
          </VStack>
          <AvatarGroup size={"xl"}>
            {sortedPlayers.map(v => (
              <UserAvatar key={v.id} user={v} size={"xl"} />
            ))}
          </AvatarGroup>
          <VStack spacing={"4px"}>
            <Text fontWeight={"bold"}>回答する人: 全員</Text>
            <Text fontWeight={"bold"}>制限時間/人: {game.mission.timeout}秒</Text>
          </VStack>
          {isJoined ? (
            <VStack pt={"16px"} spacing={"4px"}>
              <Button colorScheme={"twitter"} onClick={onOpen}>{"ミッションスタート！"}</Button>
              <Text fontSize={"xs"} color={"gray.500"}>代表で一人ボタンを押すと、ゲームが始まるよ</Text>
            </VStack>
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
