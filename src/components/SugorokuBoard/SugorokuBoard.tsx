import {Box, Wrap, WrapItem} from "@chakra-ui/react";
import {usePlayerPositions} from "store/PlayerPosition";
import {useCallback, useEffect, useState} from "react";
import {useCurrentPlayer, useOnNextTurn, useUpdateProgress} from "store/Progress";
import {UserAvatar} from "components/common/UserAvatar";
import {useSetNewGame} from "store/Game";
import {LoginUser} from "models/User";
import {MathPosition} from "config/Board";

interface Props {
  loginUser: LoginUser;
}

const DEBUG = process.env.NODE_ENV === "development";

export const SugorokuBoard = ({loginUser}: Props) => {
  const positions = usePlayerPositions(loginUser.roomId);
  const updateProgress = useUpdateProgress(loginUser.roomId);
  const [stepPositions, setStepPositions] = useState(positions);
  const currentPlayer = useCurrentPlayer(loginUser.roomId);
  const setGame = useSetNewGame(loginUser.roomId)
  const onNextTerm = useOnNextTurn(loginUser.roomId)

  const existPlayers = useCallback((mathIndex: number) => {
    return stepPositions.filter(position => (position.mathIndex % MathPosition.length) === mathIndex)
      .map(position => position.member)
      .sort((a) => currentPlayer?.id === a.id ? -1 : 1);
  }, [currentPlayer?.id, stepPositions]);

  useEffect(() => {
    if (positions.length === 0) return;
    if (positions.length !== stepPositions.length) {
      setStepPositions(positions);
      return;
    }

    const diffPositionIndexes = positions.reduce<number[]>((prev, position, index) => {
      if (stepPositions[index].mathIndex !== position.mathIndex) return [...prev, index];
      return prev;
    }, [])
    if (diffPositionIndexes.length > 1 || diffPositionIndexes.length === 0) {
      setStepPositions(positions);
      return;
    }

    // 差分が一人だけの場合はアニメーション発火
    const diffPositionIndex = diffPositionIndexes[0];
    const currentStepPosition = stepPositions[diffPositionIndex].mathIndex;
    const diff = positions[diffPositionIndex].mathIndex - stepPositions[diffPositionIndex].mathIndex;
    const stepAnimation = (next: number, target: number) => {
      setStepPositions(prev => {
        const newPositions = [...prev];
        newPositions[diffPositionIndex].mathIndex = next;
        return newPositions;
      });

      const nextMath = MathPosition[next % MathPosition.length];
      // if (nextMath.type === "event" && !isFirstStep) { // 既に止まっていた場合（次の一歩）の場合は無視
      //   // 強制停止マスに止まった場合はアニメーション終了
      //   // NOTE: 強制マスゲームを実施
      //   if (currentPlayer && loginUser.id === currentPlayer.id) {
      //     setGame(nextMath.missionId, currentPlayer.id).then(async () => {
      //       await updatePosition(currentPlayer.id, next)
      //       await updateProgress({state: "game-force-happened"});
      //     })
      //   }
      //   return;
      // }

      if (next !== target) {
        setTimeout(() => {
          const delta = next < target ? 1 : -1;
          stepAnimation(next + delta, target);
        }, 1000);
        return;
      }

      // NOTE: 止まったマスのtypeに応じて処理を実施
      switch (nextMath.type) {
        case "event": {　// イベントマスに止まった場合
          // NOTE: DB書き換えはcurrentPlayerが行う（うまく進まなくなった時はskipボタン押す）
          if (currentPlayer && loginUser.id === currentPlayer.id) {
            setGame(nextMath.missionId, currentPlayer.id, true).then(async () => {
              await updateProgress({state: "game-force-happened"});
            })
          }
          return;
        }

        case "point": { // ポイントマスに止まった場合
          // TODO: ポイントが加算されたアニメーション発火する
          // TODO: DBにぽいんと追加する
          // TODO: 次の人へ
          return;
        }

        case "normal": { // 通常マスに止まった場合
          onNextTerm();
          return;
        }
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
                      <UserAvatar size={"sm"} user={member} />
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
