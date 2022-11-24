import {Avatar, Box, usePrevious, Wrap, WrapItem} from "@chakra-ui/react";
import {usePlayerPositions} from "store/PlayerPosition";
import {useCallback, useEffect, useState} from "react";
import {MathPosition} from "config/Constants";
import {useCurrentPlayer, useUpdateProgress} from "store/Progress";

interface Props {
  roomId: string;
}

const DEBUG = process.env.NODE_ENV === "development";

export const SugorokuBoard = ({roomId}: Props) => {
  const positions = usePlayerPositions(roomId);
  const [stepPositons, setStepPositions] = useState(positions);
  const currentPlayer = useCurrentPlayer(roomId);

  const existPlayers = useCallback((mathIndex: number) => {
    return stepPositons.filter(position => position.mathIndex === mathIndex)
      .map(position => position.member)
      .sort((a, b) => currentPlayer?.id === a.id ? -1 : 1);
  }, [currentPlayer?.id, stepPositons]);

  useEffect(() => {
    if (positions.length === 0) return;
    if (positions.length !== stepPositons.length) {
      setStepPositions(positions);
      return;
    }

    const diffPositionIndexes = positions.reduce<number[]>((prev, position, index) => {
      if (stepPositons[index].mathIndex !== position.mathIndex) return [...prev, index];
      return prev;
    }, [])
    if (diffPositionIndexes.length > 1 || diffPositionIndexes.length === 0) {
      setStepPositions(positions);
      return;
    }

    // 差分が一人だけの場合はアニメーション発火
    const diffPositionIndex = diffPositionIndexes[0];
    const currentStepPosition = stepPositons[diffPositionIndex].mathIndex;
    const diff = positions[diffPositionIndex].mathIndex - stepPositons[diffPositionIndex].mathIndex;
    const stepAnimation = (next: number, target: number) => {
      setStepPositions(prev => {
        const newPositions = [...prev];
        newPositions[diffPositionIndex].mathIndex = next;
        return newPositions;
      });

      if (MathPosition.length - 1 <= next) {
        // ゴール（もしくはそれ以上）に泊まった場合はアニメーション終了
        // TODO: ゴールに止まったらどうするか判断する
        return;
      }

      const nextMath = MathPosition[next];
      if (nextMath.forceStop) {
        // 強制停止マスに止まった場合はアニメーション終了
        // TODO: 強制マスゲームを実施
        return;
      }

      if (next !== target) {
        setTimeout(() => {
          const delta = next < target ? 1 : -1;
          stepAnimation(next + delta, target);
        }, 1000);
      }
    }
    stepAnimation(currentStepPosition, currentStepPosition + diff);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [positions])


  return (
    <Box w={"100%"} overflow={"auto"} margin={"0 auto"}>
      <Box
        position={"relative"}
        w={"1260px"}
        h={"580px"}
        backgroundImage={"url('/images/board-bg.png')"}
        backgroundSize={"cover"}
      >
        {
          MathPosition.map((position, index) => {
            return (
              <Wrap
                key={index}
                position={"absolute"}
                left={`${position.x}%`}
                top={`${position.y}%`}
                w={`${position.w}%`}
                h={`${position.h}%`}
                bg={DEBUG ? "rgba(255,0,0,0.5)" : "transparent"}
                p={"10px"}
                overflow={"hidden"}
              >
                {existPlayers(index).map((member, index) => {
                  return (
                    <WrapItem key={index}>
                      <Avatar size={"sm"} name={member.name} />
                    </WrapItem>
                  )
                })}
              </Wrap>
            )
          })
        }
      </Box>
    </Box>
  )
}