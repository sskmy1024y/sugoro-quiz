import {Box, Button, Card, CardBody, Text} from "@chakra-ui/react";
import {useCurrentPlayer, useProgress} from "store/Progress";
import {LoginUser} from "models/User";
import {NotStarted} from "components/ProgressPanel/NotStarted";
import {DiceRolling} from "components/ProgressPanel/DiceRolling";
import {DiceWaiting} from "components/ProgressPanel/DiceWaiting";
import {DiceRolled} from "components/ProgressPanel/DiceRolled";
import {NextWaiting} from "components/ProgressPanel/NextWaiting";
import {useSetNewGame} from "store/Game";

type Props = {
  loginUser: LoginUser;
}

export const Debug = ({loginUser}: Props) => {
  const setGame = useSetNewGame(loginUser.roomId)
  const currentPlayer = useCurrentPlayer(loginUser.roomId)

  const onClick = async () => {
    await setGame("math_mission1", currentPlayer?.id)
  }

  return (
    <Button onClick={onClick}>テスト</Button>
  )
}
