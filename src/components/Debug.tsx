import {Button, InputGroup, InputRightElement, Portal, Select, VStack} from "@chakra-ui/react";
import {useCurrentPlayer, useOnNextTurn, useUpdateProgress} from "store/Progress";
import {LoginUser} from "models/User";
import {useSetNewGame} from "store/Game";
import {ProgressState} from "models/ProgressState";
import {useState} from "react";

type Props = {
  loginUser: LoginUser;
}

export const Debug = ({loginUser}: Props) => {
  const setGame = useSetNewGame(loginUser.roomId)
  const updateProgress = useUpdateProgress(loginUser.roomId)
  const currentPlayer = useCurrentPlayer(loginUser.roomId)
  const onNextTurn = useOnNextTurn(loginUser.roomId)
  const [progressState, setProgressState] = useState<ProgressState>("game-prepare")

  const onStartMission = async () => {
    await setGame("mission1", currentPlayer?.id)
    await updateProgress({
      state: "game-prepare"
    })
  }

  const onForceProgress = async () => {
    await updateProgress({
      state: progressState
    })
  }

  return (
    <Portal>
      <VStack position={"fixed"} bg={"white"} bottom={0} padding={"28px"} zIndex={99999} alignItems={"flex-start"}>
        <Button onClick={onNextTurn}>次の人へ</Button>
        <Button onClick={onStartMission}>ゲーム発生</Button>
        <InputGroup size='md'>
          <Select onChange={(e) => setProgressState(e.target.value as ProgressState)}>
            {Object.values(ProgressState).map(v => <option key={v} value={v} selected={progressState === v}>{v}</option>)}
          </Select>
          <InputRightElement width='4.5rem'>
            <Button h='1.75rem' size='sm' onClick={onForceProgress}>
              進行
            </Button>
          </InputRightElement>
        </InputGroup>
      </VStack>
    </Portal>
  )
}

