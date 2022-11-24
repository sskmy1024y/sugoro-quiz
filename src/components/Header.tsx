import {Avatar, Box, Flex, Heading, HStack, WrapItem} from "@chakra-ui/react";
import {LoginUser} from "models/User";

type Props = {
  loginUser: LoginUser
}

export const Header = ({loginUser}: Props) => {
  return (
    <HStack p={"8px"} justifyContent={"space-between"}>
      <Heading size={"xl"}>Room: {loginUser.roomId}</Heading>
      <Avatar name={loginUser.name} />
    </HStack>
  )
}
