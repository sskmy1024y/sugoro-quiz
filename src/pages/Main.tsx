import {useLoginUserState} from "store/LoginUser";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {LoginUser} from "models/User";
import {MemberList} from "components/MemberList";
import {Container} from "@chakra-ui/react";
import {Header} from "components/Header";
import {ProgressPanel} from "components/ProgressPanel";
import {SubscribeProvider} from "components/SubscribeProvider";
import {SugorokuBoard} from "components/SugorokuBoard";
import {Game} from "components/Game/Game";
import {Debug} from "components/Debug";

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
      <Container maxW='8xl'>
        <Header loginUser={loginUser} />
        <MemberList loginUser={loginUser} />
        <ProgressPanel loginUser={loginUser} />
        <SugorokuBoard loginUser={loginUser} />
        {process.env.NODE_ENV === "development" && <Debug loginUser={loginUser} />}
      </Container>
      <Game loginUser={loginUser} />
    </SubscribeProvider>
  )
}
