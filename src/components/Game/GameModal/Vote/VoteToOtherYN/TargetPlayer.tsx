import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent, AlertDialogFooter, AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  HStack,
  Text,
  useDisclosure,
  VStack
} from "@chakra-ui/react";
import {UserAvatar} from "components/common/UserAvatar";
import {LoginUser, User} from "models/User";
import {CombinedGame} from "models/Game";
import {VotedView} from "components/Game/GameModal/Vote/VoteToOtherYN/VotedView";
import {useCallback, useMemo, useRef} from "react";
import {useVoteGame} from "store/Game";

interface Props {
  loginUser: LoginUser;
  player: User
  game: CombinedGame;
  onNext: () => void;
}

export const TargetPlayer = ({player, loginUser, game, onNext}: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const onVote = useVoteGame(loginUser.roomId, game.key);
  const cancelRef = useRef(null);
  const isJoined = useMemo(() => game.gamePlayers.some(v => v.player.id === loginUser.id), [game.gamePlayers, loginUser.id]);
  const isMeTarget = useMemo(() => game.currentGamePlayerId === loginUser.id, [game.currentGamePlayerId, loginUser.id]);

  const isVoted = useCallback((vote: "good" | "bad") => {
    return game.gamePlayers.find(v => v.player.id === loginUser.id)?.voteTo.some(v => v.id === player.id && v.vote === vote) ?? false;
  }, [game.gamePlayers, loginUser.id, player.id]);

  const handleOnNext = useCallback(() => {
    const currentGamePlayerIndex = game.gamePlayers.findIndex(v => v.player.id === game.currentGamePlayerId);
    if (currentGamePlayerIndex === -1) {
      console.warn("currentGamePlayerIndex is not set");
    }
    if (currentGamePlayerIndex === game.gamePlayers.length - 1) {
      // 最後の回答者であれば確認を出す
      onOpen();
    } else {
      onNext();
    }
  }, [game, onNext, onOpen])


  return (
    <>
      {isMeTarget && (
        <Text
          fontSize={"20px"}
          fontWeight={"bold"}
          color={"white"}
        >あなたの番！</Text>
      )}
      <VStack
        m={"0 auto"}
        spacing={"24px"}
        border={"1px solid #ddd"}
        bg={"white"}
        p={"24px 32px"}
        borderRadius={"16px"}
      >
        <Text fontWeight={"bold"}>{player.name}さんの番</Text>
        <VStack alignItems={"center"}>
          <UserAvatar user={player} size={"xl"} />
          <Text fontWeight={"bold"}>{player.name}</Text>
        </VStack>
        <VotedView player={player} loginUser={loginUser} game={game} />
        {isMeTarget ? (
          <Button colorScheme={"twitter"} onClick={handleOnNext}>自分の番を終了する</Button>
        ) : isJoined ? (
          <VStack bg={"gray.100"} borderRadius={"8px"} p={"8px 24px"} spacing={"8px"}>
            <Text fontWeight={"bold"}>判定！</Text>
            <HStack w={"100%"} justifyContent={"center"} spacing={8}>
              <VStack spacing={2}>
                <Button
                  colorScheme='red'
                  variant={isVoted("bad") ? "solid" : "outline"}
                  size='md'
                  onClick={onVote("bad", player.id)}
                >
                  {"🤔"}
                </Button>
                <Text>うーん</Text>
              </VStack>
              <VStack spacing={2}>
                <Button
                  colorScheme='twitter'
                  variant={isVoted("good") ? "solid" : "outline"}
                  size='md'
                  onClick={onVote("good", player.id)}
                >
                  {"👍"}
                </Button>
                <Text>いいね！</Text>
              </VStack>
            </HStack>
          </VStack>
        ) : (
          <Box>
            <Text fontWeight={"bold"} fontSize={"12px"} color={"red"}>ゲーム未参加のため投票できません</Text>
          </Box>
        )}
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
              あなたが最後の回答者です
            </AlertDialogHeader>

            <AlertDialogBody>
              みんなの投票が終わったことを確認して、ミッションを終了しますか？
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                キャンセル
              </Button>
              <Button colorScheme='twitter' onClick={onNext} ml={3}>
                終了する
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}
