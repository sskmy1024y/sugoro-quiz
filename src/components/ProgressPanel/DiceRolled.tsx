import {Box, Flex, Spacer, VStack} from "@chakra-ui/react";
import {useOnNextTurn, useProgress} from "store/Progress";
import { useEffect, useMemo, useState} from "react";
import {LoginUser} from "models/User";
import {Dice} from "components/Dice";
import {SkipButton} from "components/ProgressPanel/SkipButton";
import {usePlayerPositions} from "store/PlayerPosition";

type Props = {
  loginUser: LoginUser;
}

const DERAY = 1000;

export const DiceRolled = ({loginUser}: Props) => {
  const progress = useProgress(loginUser.roomId);
  const positions = usePlayerPositions(loginUser.roomId);
  const [stepPositions, setStepPositions] = useState(positions);
  const onNextTurn = useOnNextTurn(loginUser.roomId);

  const isMyTerm = useMemo(() => {
    return progress.currentPlayerId === loginUser.id;
  }, [progress.currentPlayerId, loginUser.id]);

  useEffect(() => {
    if (!isMyTerm) return;
    if (positions.length === 0) return;

    let timer: NodeJS.Timeout;

    if (positions.length !== stepPositions.length) {
      timer = setTimeout(() => {
        onNextTurn();
      }, DERAY * 2);
      setStepPositions(positions);
      return;
    }

    const diffPositionIndexes = positions.reduce<number[]>((prev, position, index) => {
      if (stepPositions[index].mathIndex !== position.mathIndex) return [...prev, index];
      return prev;
    }, [])
    if (diffPositionIndexes.length > 1 || diffPositionIndexes.length === 0) {
      timer = setTimeout(() => {
        onNextTurn();
      }, DERAY * 2);
      setStepPositions(positions);
      return;
    }

    // 差分が一人だけの場合はアニメーション発火
    const diffPositionIndex = diffPositionIndexes[0];
    const diff = positions[diffPositionIndex].mathIndex - stepPositions[diffPositionIndex].mathIndex;

    timer = setTimeout(() => {
      onNextTurn();
    }, diff * DERAY);

    return () => {
      clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [positions]);


  if (!progress.dice) return null

  return (
    <Flex direction={"row"}>
      <Box bg={"white"} borderRadius={"8px"}>
        <Dice value={progress.dice!} isRolling={false} />
      </Box>
      <VStack alignItems={"flex-start"} p={"8px 16px"}>
        <Spacer />
        {isMyTerm && (
          <SkipButton roomId={loginUser.roomId} />
        )}
      </VStack>
    </Flex>
  )
}
