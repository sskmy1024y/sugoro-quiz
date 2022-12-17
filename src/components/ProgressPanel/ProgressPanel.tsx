import {Card, CardBody, CardHeader} from "@chakra-ui/react";
import {useProgress} from "store/Progress";
import {LoginUser} from "models/User";
import {NotStarted} from "./NotStarted";
import {DiceRolling} from "./DiceRolling";
import {DiceWaiting} from "./DiceWaiting";
import {DiceRolled} from "./DiceRolled";
import {NextWaiting} from "./NextWaiting";
import {useMemo} from "react";
import {CurrentPlayer} from "components/ProgressPanel/CurrentPlayer";

type Props = {
  loginUser: LoginUser;
}

export const ProgressPanel = ({loginUser}: Props) => {
  const progress = useProgress(loginUser.roomId);

  const content = useMemo(() => {
    return progress.state === "not-start" ? (
        <NotStarted loginUser={loginUser} />
      ) : progress.state === "dice-waiting" ? (
        <DiceWaiting loginUser={loginUser} />
      ) : progress.state === "dice-rolling" ? (
        <DiceRolling loginUser={loginUser} />
      ) : progress.state === "dice-rolled" ? (
        <DiceRolled loginUser={loginUser} />
      ) : progress.state === "next-waiting" ? (
        <NextWaiting loginUser={loginUser} />
      ) : null
  }, [loginUser, progress.state]);


  return (
    <Card mt={"44px"} zIndex={0} borderRadius={"24px"} bg={"#eee"} flexGrow={1}>
      <CardHeader position={"absolute"} top={"-44px"} left={0} zIndex={1}>
        <CurrentPlayer loginUser={loginUser} />
      </CardHeader>
      <CardBody p={"36px 16px 16px"}>
        {content}
      </CardBody>
    </Card>
  )
}
