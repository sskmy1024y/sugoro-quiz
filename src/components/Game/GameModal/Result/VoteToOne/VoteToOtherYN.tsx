import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent, AlertDialogFooter, AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Divider, Flex,
  HStack,
  ModalBody, SimpleGrid,
  Text, useDisclosure,
  VStack
} from "@chakra-ui/react";
import {LoginUser, User} from "models/User";
import {CombinedGame} from "models/Game";
import {useCallback, useMemo, useRef} from "react";
import {UserAvatar} from "components/common/UserAvatar";

interface Props {
  loginUser: LoginUser;
  game: CombinedGame;
  onNext: () => void;
}

export const VoteToOtherYN = ({loginUser, game, onNext}: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = useRef(null)

  const onNextGame = useCallback(() => {
    onNext()
    onClose()
  }, [onNext, onClose])

  const sortedPlayers = useMemo(() => {
    return [...game.gamePlayers].sort((a, b) => {
      if (b.player.id === loginUser.id) return 1;
      if (a.player.id === loginUser.id) return -1;
      return -1;
    }).map(v => v.player);
  }, [game.gamePlayers, loginUser.id])

  const getPoint = useCallback((player: User) => {
    return game.gamePlayers
      .map(v => v.voteTo.find(v => v.id === player.id)?.vote)
      .filter((v): v is ("good" | "bad") => v !== undefined)
      .reduce((prev, curr) => {
        return (curr === "good") ? prev + 1 : prev;
      }, 0)
  }, [game.gamePlayers])

  return (
    <>
      <ModalBody>
        <VStack spacing={8} m={"0 auto 42px"} w={"100%"}>
          <VStack
            m={"0 auto"}
            spacing={"24px"}
            border={"1px solid #ddd"}
            p={"32px"}
            borderRadius={"16px"}
            minW={"280px"}
          >
            <SimpleGrid columns={2} spacing={4}>
              {
                sortedPlayers.map((v) => (
                  <Flex key={v.id} gap={"16px"} flexFlow={"row wrap"} p={"16px"} border={"1px solid #ddd"} borderRadius={"8px"}>
                    <VStack alignItems={"center"}>
                      <UserAvatar user={v} size={"md"}/>
                      <Text fontWeight={"bold"}>{v.name}</Text>
                    </VStack>
                    <VStack spacing={"8px"}>
                      <HStack alignItems={"baseline"}>
                        <Text fontSize={"2xl"} fontWeight={"bold"}>{`+${getPoint(v)}`}</Text>
                        <Text fontSize={"md"}>{`pt`}</Text>
                      </HStack>
                      <Divider/>
                      <HStack alignItems={"baseline"}>
                        <Text fontSize={"sm"}>累計</Text>
                        <Text fontSize={"md"} fontWeight={"bold"}>{v.point}</Text>
                        <Text fontSize={"sm"}>pt</Text>
                      </HStack>
                    </VStack>
                  </Flex>
                ))
              }
            </SimpleGrid>
            <Button colorScheme={"twitter"} onClick={onOpen}>{"すごろくに戻る"}</Button>
          </VStack>
        </VStack>
      </ModalBody>
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

            <AlertDialogBody>
              すごろくに戻りますか？（他の参加者にも確認してね！）
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                キャンセル
              </Button>
              <Button colorScheme='twitter' onClick={onNextGame} ml={3}>
                すごろくに戻る
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}
