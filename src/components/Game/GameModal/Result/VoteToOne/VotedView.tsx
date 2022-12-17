import {useMemo} from "react";
import {CombinedGame, CombinedGamePlayerVote} from "models/Game";
import {LoginUser, User} from "models/User";
import {AvatarGroup, HStack, Text, VStack} from "@chakra-ui/react";
import {UserAvatar} from "components/common/UserAvatar";

type Props = {
  player: User;
  loginUser: LoginUser
  game: CombinedGame
}

export const VotedView = ({loginUser, game, player}: Props) => {
  /**
   * このユーザに対しての投票状況を取得する
   */
  const votedFrom = useMemo(() => {
    return game.gamePlayers.reduce<CombinedGamePlayerVote[]>((prev, v) => {
      const voted = v.voteTo.find(v => v.id === player.id)
      return voted ? [...prev, {...v.player, vote: voted.vote}] : prev;
    }, [])
  }, [game.gamePlayers, player.id]);

  const votedMember = useMemo(() => {
    return votedFrom.reduce<[CombinedGamePlayerVote[], CombinedGamePlayerVote[]]>((prev, v) => {
      if (v.vote === "good") {
        return [[
          ...prev[0],
          v
        ], prev[1]];
      } else {
        return [prev[0], [
          ...prev[1],
          v
        ]];
      }
    }, [[], []]);
  }, [votedFrom]);

  return (
    <VStack spacing={"2px"}>
      {votedMember.map((v, i) => (
        <HStack key={i} spacing={"2px"}>
          <AvatarGroup size={"sm"} max={3}>
            {v.map(p => (
              <UserAvatar key={p.id} user={p} size={"xs"} />
            ))}
          </AvatarGroup>
          {v.length > 0 && <Text fontWeight={"bold"} fontSize={"16px"}>{i === 0 ? "👍" :  "🤔"}</Text>}
        </HStack>
      ))}
    </VStack>
  )
}
