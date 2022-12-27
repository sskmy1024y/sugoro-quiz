import {useRoomMembers} from "store/Members";
import {Card, CardBody, CardHeader, Heading, Text, VStack} from "@chakra-ui/react";
import {MemberItem} from "./MemberItem";
import {useEffect, useMemo, useState} from "react";
import {useOrderPlayer} from "store/OrderPlayer";
import {get, ref} from "firebase/database";
import {db} from "config/firebase";
import {Progress, ProgressState} from "models/ProgressState";

type Props = {
  roomId: string;
}

export const MemberRanking = ({roomId}: Props) => {
  const members = useRoomMembers(roomId);
  const orderPlayers = useOrderPlayer(roomId);
  const [gemeCount, setGameCount] = useState(0);
  const [progress, setProgress] = useState("");

  useEffect(() => {
    (async () => {
      const gamesSnapshot = await get(ref(db, `rooms/${roomId}/games`))
      if (gamesSnapshot.exists()) {
        const count = Object.keys(gamesSnapshot.val()).length
        setGameCount(count);
      }

      const progressSnapshot = await get(ref(db, `rooms/${roomId}/progress`))
      if (progressSnapshot.exists()) {
        const progress = progressSnapshot.val() as Progress

        const progressState = progress.state ===  ProgressState.NotStarted ? "開始前"
          : progress.state === ProgressState.DiceWaiting ? "サイコロ待ち"
          : progress.state === ProgressState.DiceRolling ? "サイコロ回転中"
          : progress.state === ProgressState.DiceRolled ? "サイコロ回転終了"
          : progress.state === ProgressState.EventWaiting ? "イベント待ち"
          : progress.state === ProgressState.GameHappened ? "ミニゲーム発生"
          : progress.state === ProgressState.GameForceHappened ? "緊急ミッション発生"
          : progress.state === ProgressState.GamePrepare ? "ミニゲーム準備中"
          : progress.state === ProgressState.GameStart ? "ミニゲーム進行中"
          : "ゲーム結果確認中"

        setProgress(progressState);
      }
    })()
  }, [roomId])

  const orderMembers = useMemo(() => {
    const joinMemberIds = orderPlayers.map(v => v.id);
    return [...members]
      .sort((a, b) => b.point - a.point)
      .sort((a, b) => {
      if (joinMemberIds.includes(b.id)) return 1;
      return -1;
    })
  }, [members, orderPlayers]);

  return (
    <Card w={"200px"} flexShrink={0} border={"1px solid white"} bg={"linear-gradient(104.31deg, #56CCE1D0 -1.14%, #68DCB6E0 105.66%)"} backdropFilter={"blur(0px)"}>
      <CardHeader>
        <Heading size={"md"} color={"gray.700"}>{roomId}</Heading>
      </CardHeader>
      <CardBody p={"0 16px 16px"}>
        <VStack spacing={2} mb={"8px"} alignItems={"flex-start"}>
          <Text fontWeight={"bold"}>{progress}</Text>
          <Text>ゲーム実施回数: {gemeCount}</Text>
        </VStack>
        <VStack spacing={4} alignItems={"flex-start"} maxH={"500px"} overflowX={"unset"} overflowY={"auto"}>
          {orderMembers.map(member => (
            <MemberItem key={member.id} roomId={roomId} member={member}/>
          ))}
        </VStack>
      </CardBody>
    </Card>
  )
}
