import {Heading, HStack} from "@chakra-ui/react";
import {LoginUser} from "models/User";
import {UserAvatar} from "components/common/UserAvatar";

type Props = {
  loginUser: LoginUser
}

export const Header = ({loginUser}: Props) => {
  return (
    <HStack p={"8px"} justifyContent={"space-between"}>
      <Heading size={"xl"}>Room: {loginUser.roomId}</Heading>
      <UserAvatar user={loginUser} />
    </HStack>
  )
}
