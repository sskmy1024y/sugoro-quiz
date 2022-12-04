import {Button, InputGroup, InputRightElement, Portal, Select, VStack} from "@chakra-ui/react";
import {useCurrentPlayer, useOnNextTurn, useUpdateProgress} from "store/Progress";
import {LoginUser} from "models/User";
import {useSetNewGame} from "store/Game";
import {ProgressState} from "models/ProgressState";
import {useState} from "react";
import {push, ref, set} from "firebase/database";
import {db} from "config/firebase";
import {v4} from "uuid";
import {MissionRule} from "models/Mission";
import {ALL_MISSIONS} from "config/Missions";

type Props = {
  loginUser: LoginUser;
}

export const Debug = ({loginUser}: Props) => {
  const setGame = useSetNewGame(loginUser.roomId)
  const updateProgress = useUpdateProgress(loginUser.roomId)
  const currentPlayer = useCurrentPlayer(loginUser.roomId)
  const onNextTurn = useOnNextTurn(loginUser.roomId)
  const [progressState, setProgressState] = useState<ProgressState>("game-prepare")
  const [missionRule, setMissionRule] = useState<MissionRule>(MissionRule.VoteTo1)

  const onStartMission = async () => {
    const targetMissions = ALL_MISSIONS.filter(v => v.rule === missionRule);
    const randomMission = targetMissions[Math.floor(Math.random() * targetMissions.length)];
    await setGame(randomMission.id)
    await updateProgress({
      state: "game-prepare"
    })
  }

  const onForceProgress = async () => {
    await updateProgress({
      state: progressState
    })
  }

  const onAddMember = async () => {
    const userId = v4();
    const randomName = Math.random().toString(36).slice(-8)
    await set(push(ref(db, `rooms/${loginUser.roomId}/users`)), {
      id: userId,
      name: randomName,
      point: 0,
    })
  }


  return (
    <Portal>
      <VStack position={"fixed"} bg={"white"} bottom={0} padding={"28px"} zIndex={99999} alignItems={"flex-start"}>
        <Button onClick={onAddMember}>メンバー追加</Button>
        <Button onClick={onNextTurn}>次の人へ</Button>
        <Button onClick={onStartMission}>ゲーム発生</Button>
        <InputGroup size='md'>
          <Select onChange={(e) => setMissionRule(e.target.value as MissionRule)}>
            {Object.values(MissionRule).map(v => <option key={v} value={v} selected={missionRule === v}>{v}</option>)}
          </Select>
          <InputRightElement width='4.5rem'>
            <Button h='1.75rem' size='sm' onClick={onStartMission}>
              ゲーム発生
            </Button>
          </InputRightElement>
        </InputGroup>
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

