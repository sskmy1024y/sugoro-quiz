import {AvatarGroup, Button, ModalBody, Text, VStack} from "@chakra-ui/react";
import {LoginUser} from "models/User";
import {CombinedGame} from "models/Game";
import {useMemo} from "react";
import {UserAvatar} from "components/common/UserAvatar";

interface Props {
  loginUser: LoginUser;
  game: CombinedGame;
  onNext: () => void;
}

export const VoteToOtherYN = ({loginUser, game, onNext}: Props) => {
  const isJoined = useMemo(() => game.gamePlayers.some(v => v.player.id === loginUser.id), [game.gamePlayers, loginUser.id]);

  const sortedPlayers = useMemo(() => {
    return [...game.gamePlayers].sort((a, b) => {
      if (b.player.id === loginUser.id) return 1;
      if (a.player.id === loginUser.id) return -1;
      return -1;
    }).map(v => v.player);
  }, [game.gamePlayers, loginUser.id])

  return (
    <ModalBody>
      <VStack spacing={8} m={"0 auto"} w={"100%"}>
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
            <Text fontWeight={"bold"}>参加者: 全員</Text>
            {isJoined ? (
              <Button colorScheme={"twitter"} onClick={onNext}>{"次へ！"}</Button>
            ) : (
              <Button disabled size={"md"}>ミッションに参加できません</Button>
            )}
          </VStack>
        </VStack>
      </VStack>
    </ModalBody>
  )
}
