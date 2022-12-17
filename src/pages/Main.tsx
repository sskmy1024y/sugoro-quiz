import {useLoginUserState} from "store/LoginUser";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {LoginUser} from "models/User";
import {MemberList} from "components/MemberList";
import {Container, Flex, HStack} from "@chakra-ui/react";
import {ProgressPanel} from "components/ProgressPanel";
import {SubscribeProvider} from "components/SubscribeProvider";
import {SugorokuBoard} from "components/SugorokuBoard";
import {Game} from "components/Game/Game";
import {Debug} from "components/Debug";
import {MyselfPanel} from "components/MyselfPanel";

export const Main = () => {
  const navigate = useNavigate();
  const [loginUser, setLoginUser] = useLoginUserState();

  useEffect(() => {
    if (loginUser === null) {
      const json = localStorage.getItem("loginUser");
      if (json !== null) {
        const _loginUser = JSON.parse(json) as LoginUser;
        setLoginUser(_loginUser).catch(() => {
          localStorage.removeItem("loginUser");
          navigate("/login");
        });
      }

      navigate("/login");
    }
  }, [loginUser, navigate, setLoginUser]);

  if (loginUser === null) {
    return null;
  }

  return (
    <SubscribeProvider roomId={loginUser.roomId}>
      <Container maxW='8xl' mb={"24px"}>
        <HStack alignItems={"flex-start"} mt={"24px"}>
          <MemberList loginUser={loginUser} />
          <SugorokuBoard loginUser={loginUser} />
        </HStack>
        <Flex direction={"row"} gap={"16px"}>
          <ProgressPanel loginUser={loginUser} />
          <MyselfPanel loginUser={loginUser} />
        </Flex>
        {process.env.NODE_ENV === "development" && <Debug loginUser={loginUser} />}
      </Container>
      <Game loginUser={loginUser} />
    </SubscribeProvider>
  )
}
