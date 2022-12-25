import {useLoginUserState} from "store/LoginUser";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {LoginUser} from "models/User";
import {MemberList} from "components/MemberList";
import {Box, Container, Flex} from "@chakra-ui/react";
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
      <Container maxW='9xl' mb={"24px"}>
        <Box mt={"24px"} position={"relative"} zIndex={0}>
          <Box position={"absolute"} top={"16px"} left={"16px"} zIndex={1}>
            <MemberList roomId={loginUser.roomId} />
          </Box>
          <SugorokuBoard loginUser={loginUser} />
        </Box>
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
