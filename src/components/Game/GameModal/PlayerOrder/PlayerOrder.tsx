import {CombinedGame} from "models/Game";
import {Heading, HStack, Text, VStack} from "@chakra-ui/react";
import {Fragment, useCallback} from "react";
import {UserAvatar} from "components/common/UserAvatar";
import {useProgress} from "store/Progress";

interface Props {
  roomId: string;
  game: CombinedGame
}

export const PlayerOrder = ({roomId, game}: Props) => {
  const progress = useProgress(roomId);
  const isCurrentPlayer = useCallback((playerId: string) => {
    return progress.state === "game-start" && game.currentGamePlayerId === playerId;
  }, [game.currentGamePlayerId, progress.state])

  return (
    <VStack p={"16px"} spacing={"4px"} m={"0 auto"} w={"100%"} border={"1px solid #ddd"} borderRadius={"4px"}>
      <Heading size={"sm"} w={"100%"}>回答する順番</Heading>
      <HStack spacing={"8px"}>
        {game.gamePlayers.map((v, i) => (
          <Fragment key={v.player.id}>
            <HStack w={"160px"} p={"8px 16px"} bg={isCurrentPlayer(v.player.id) ? "yellow.200" : "#eee"} spacing={"4px"} borderRadius={"8px"}>
              <UserAvatar user={v.player} size={"xs"} />
              <Text fontWeight={"bold"} fontSize={"16px"}>{v.player.name}</Text>
            </HStack>
            {i !== game.gamePlayers.length - 1 && <Text fontWeight={"bold"} fontSize={"32px"}>▶︎</Text>}
          </Fragment>
        ))}
      </HStack>
    </VStack>
  )
}
