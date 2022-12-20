import { Text, VStack} from "@chakra-ui/react";
import {UserAvatar} from "components/common/UserAvatar";
import {LoginUser} from "models/User";
import {CombinedGame} from "models/Game";

interface Props {
  loginUser: LoginUser
  game: CombinedGame
}

export const RequireAnswer = ({loginUser}: Props) => {
  return (
    <VStack spacing={"8px"}>
      <Text
        fontSize={"24px"}
        fontWeight={"bold"}
        color={"white"}
      >あなたへのミッション！</Text>
      <VStack
        m={"0 auto"}
        spacing={"16px"}
        border={"1px solid #ddd"}
        bg={"white"}
        p={"24px"}
        borderRadius={"16px"}
      >
        <Text fontWeight={"bold"} textAlign={"center"}>ミッションをクリアして<br/>ココポを獲得しよう</Text>
        <VStack alignItems={"center"}>
          <UserAvatar user={loginUser} size={"xl"} />
          <Text fontWeight={"bold"}>{loginUser.name}</Text>
        </VStack>
      </VStack>
    </VStack>
  )
}
