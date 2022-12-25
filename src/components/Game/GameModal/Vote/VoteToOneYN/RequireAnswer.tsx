import {Button, Text, VStack} from "@chakra-ui/react";
import {UserAvatar} from "components/common/UserAvatar";
import {LoginUser} from "models/User";

interface Props {
  loginUser: LoginUser
  onNext: () => void
}

export const RequireAnswer = ({loginUser, onNext}: Props) => {
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
        <VStack spacing={"4px"}>
          <Text fontWeight={"bold"}>【ルール】</Text>
          <Text textAlign={"center"}>ミッションのお題について回答しよう。<br />クリアすると、みんなからポイントがもらえるよ</Text>
        </VStack>
        <VStack alignItems={"center"}>
          <UserAvatar user={loginUser} size={"xl"} />
          <Text fontWeight={"bold"}>{loginUser.name}</Text>
        </VStack>
        <Button colorScheme={"twitter"} onClick={onNext}>ミッションを終了する</Button>
      </VStack>
    </VStack>
  )
}
