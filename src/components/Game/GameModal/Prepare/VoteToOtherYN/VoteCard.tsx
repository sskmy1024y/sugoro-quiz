import {Box, Button, Card, CardBody, HStack, Text, VStack} from "@chakra-ui/react";
import {UserAvatar} from "components/common/UserAvatar";
import {LoginUser} from "models/User";
import {CombinedGame, CombinedGamePlayer} from "models/Game";
import { useMemo} from "react";

type Props = CombinedGamePlayer & {
  loginUser: LoginUser
  game: CombinedGame
}

export const VoteCard = ({loginUser, game, player}: Props) => {
  const isJoined = useMemo(() => game.gamePlayers.some(v => v.player.id === loginUser.id), [game.gamePlayers, loginUser.id]);

  return (
    <Card w={"160px"} size={"sm"}>
      <CardBody>
        <VStack spacing={"8px"}>
          <VStack alignItems={"center"}>
            <UserAvatar user={player} size={"sm"} />
            <Text fontWeight={"bold"} fontSize={"16px"} noOfLines={1}>{player.name}</Text>
          </VStack>
          {isJoined ? (
            <>
              <Box h={"32px"} />
              <Text fontWeight={"bold"} fontSize={"12px"}>ミッションクリアした？</Text>
              <HStack w={"100%"} justifyContent={"center"} spacing={8}>
                <VStack spacing={2}>
                  <Button
                    colorScheme='red'
                    variant={"outline"}
                    disabled
                    size='sm'
                    onClick={() => {}}
                  >
                    {"🤔"}
                  </Button>
                  <Text fontSize={"12px"}>うーん</Text>
                </VStack>
                <VStack spacing={2}>
                  <Button
                    colorScheme='twitter'
                    variant={"outline"}
                    disabled
                    size='sm'
                    onClick={() => {}}
                  >
                    {"👍"}
                  </Button>
                  <Text fontSize={"12px"}>いいね！</Text>
                </VStack>
              </HStack>
            </>
            ) : (
            <Box>
              <Text fontWeight={"bold"} fontSize={"12px"} color={"red"}>ゲーム未参加のため投票できません</Text>
            </Box>
          )}
        </VStack>
      </CardBody>
    </Card>
  )
}
