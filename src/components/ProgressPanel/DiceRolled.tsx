import {Box, Button, CardBody, CardHeader, Fade, Heading} from "@chakra-ui/react";
import {useOnNextTurn, useProgress} from "store/Progress";
import { useEffect, useMemo, useState} from "react";
import {LoginUser} from "models/User";
import {useRoomMembers} from "store/Members";
import {Dice} from "components/Dice";
import {SkipButton} from "components/ProgressPanel/SkipButton";
import {usePlayerPositions} from "store/PlayerPosition";

type Props = {
  loginUser: LoginUser;
}

export const DiceRolled = ({loginUser}: Props) => {
  const progress = useProgress(loginUser.roomId);
  const positions = usePlayerPositions(loginUser.roomId);
  const currentPlayer = useRoomMembers(loginUser.roomId).find(member => member.id === progress.currentPlayerId);
  const [stepPositions, setStepPositions] = useState(positions);
  const onNextTurn = useOnNextTurn(loginUser.roomId);

  const [showNextButton, setShowNextButton] = useState(false);

  const isMyTerm = useMemo(() => {
    return progress.currentPlayerId === loginUser.id;
  }, [progress.currentPlayerId, loginUser.id]);

  useEffect(() => {
    if (positions.length === 0) return;
    if (positions.length !== stepPositions.length) {
      setShowNextButton(true); // 遅延がない場合はすぐに表示
      setStepPositions(positions);
      return;
    }

    const diffPositionIndexes = positions.reduce<number[]>((prev, position, index) => {
      if (stepPositions[index].mathIndex !== position.mathIndex) return [...prev, index];
      return prev;
    }, [])
    if (diffPositionIndexes.length > 1 || diffPositionIndexes.length === 0) {
      setStepPositions(positions);
      setShowNextButton(true); // 遅延がない場合はすぐに表示
      return;
    }

    // 差分が一人だけの場合はアニメーション発火
    const diffPositionIndex = diffPositionIndexes[0];
    const diff = positions[diffPositionIndex].mathIndex - stepPositions[diffPositionIndex].mathIndex;

    setTimeout(() => {
      setShowNextButton(true); // ボタンを表示するまでの時間を遅延させる
    }, diff * 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [positions]);


  if (!progress.dice) return null

  return (
    <>
      <CardHeader>
        <Heading size='md'>{isMyTerm ? `あなたの番` : `${currentPlayer?.name}さんの番`}</Heading>
      </CardHeader>
      <CardBody>
        <Box>
          <Dice value={progress.dice!} isRolling={false} />
          {isMyTerm ? (
            <Fade in={showNextButton}>
              <Button colorScheme='twitter' onClick={onNextTurn}>次のプレイヤーへ</Button>
            </Fade>
          ) : (
            <SkipButton roomId={loginUser.roomId} />
          )}
        </Box>
      </CardBody>
    </>
  )
}
