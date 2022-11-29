import { Button} from "@chakra-ui/react";
import {useCurrentPlayer} from "store/Progress";
import {LoginUser} from "models/User";
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
