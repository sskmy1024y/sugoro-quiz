import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent, AlertDialogFooter, AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  ModalBody, useDisclosure,
  VStack, Text, HStack,
  Box, Image
} from "@chakra-ui/react";
import {LoginUser, User} from "models/User";
import {CombinedGame} from "models/Game";
import {useCallback, useMemo, useRef} from "react";
import {Others} from "components/Game/GameModal/Result/VoteToOne/Others";
import {ENABLE_UNISEPON} from "config/Constants";

interface Props {
  loginUser: LoginUser;
  game: CombinedGame;
  onNext: () => void;
}

export const VoteToOne = ({loginUser, game, onNext}: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = useRef(null)

  const onNextGame = useCallback(() => {
    onNext()
    onClose()
  }, [onNext, onClose])

  const getPoint = useCallback((player: User) => {
    return game.gamePlayers
      .map(v => v.voteTo.find(v => v.id === player.id)?.vote)
      .filter((v): v is ("good" | "bad") => v !== undefined)
      .reduce((prev, curr) => {
        return (curr === "good") ? prev + 1 : prev;
      }, 0)
  }, [game.gamePlayers])

  const winners = useMemo(() => {
    return game.gamePlayers.reduce<{player: User; point: number}[]>((prev, v) => {
      const point = getPoint(v.player)
      if (point === 0) return prev;

      if (prev.length > 0) {
        if (prev[0].point < point) {
          return [{
            player: v.player,
            point,
          }]
        } else if (prev[0].point === point) {
          return [...prev, {
            player: v.player,
            point,
          }]
        } else {
          return prev;
        }
      }

      return [{ player: v.player, point }]
    }, [])
  }, [game.gamePlayers, getPoint])


  return (
    <>
      <ModalBody>
        <VStack spacing={8} m={"0 auto 42px"} w={"100%"}>
          <VStack
            m={"0 auto"}
            spacing={"24px"}
            bg={"rgba(255, 255, 255, 0.6)"}
            backdropFilter={"blur(5px)"}
            p={"32px"}
            borderRadius={"16px"}
            minW={"280px"}
            zIndex={0}
            position={"relative"}
          >

            {winners.length > 0 ? (
              <HStack spacing={8}>
                {winners.map((v, i) => (
                  <Others key={i} game={game} player={v.player} loginUser={loginUser} point={v.point}></Others>
                ))}
              </HStack>
            ) : (
              <VStack>
                <Text>勝者はいませんでした</Text>
                <Text size={"lg"} fontWeight={"bold"}>{"ミッション失敗……"}</Text>
              </VStack>
            )}
            <Button colorScheme={"twitter"} onClick={onOpen}>{"すごろくに戻る"}</Button>
            <Box position={"absolute"} bottom={"18px"} right={0} zIndex={1}>
              {ENABLE_UNISEPON && <Image src={"/images/ouen.gif"} w={"128px"} h={"100%"} />}
            </Box>
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
