import {Box, Button, Card, CardBody, Text} from "@chakra-ui/react";
import {useProgress} from "store/Progress";
import {LoginUser} from "models/User";
import {NotStarted} from "components/ProgressPanel/NotStarted";
import {DiceRolling} from "components/ProgressPanel/DiceRolling";
import {DiceWaiting} from "components/ProgressPanel/DiceWaiting";
import {DiceRolled} from "components/ProgressPanel/DiceRolled";

type Props = {
  loginUser: LoginUser;
}

export const ProgressPanel = ({loginUser}: Props) => {
  const progress = useProgress(loginUser.roomId);
  return (
    <Card>
      {progress.state === "not-started" ? (
        <NotStarted loginUser={loginUser} />
      ) : progress.state === "dice-waiting" ? (
        <DiceWaiting loginUser={loginUser} />
      ) : progress.state === "dice-rolling" ? (
        <DiceRolling loginUser={loginUser} />
      ) : progress.state === "dice-rolled" ? (
        <DiceRolled loginUser={loginUser} />
      ) : null}
    </Card>
  )
}
