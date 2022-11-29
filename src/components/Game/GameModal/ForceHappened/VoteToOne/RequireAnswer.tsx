import { Button, Text, VStack} from "@chakra-ui/react";
import {UserAvatar} from "components/common/UserAvatar";
import {LoginUser, User} from "models/User";
import {CombinedGame} from "models/Game";

interface Props {
  loginUser: LoginUser;
  targetUser: User;
  game: CombinedGame;
  onNext: () => void;
}

export const RequireAnswer = ({loginUser, targetUser, game, onNext}: Props) => {
  return (
    <VStack spacing={8} m={"0 auto"} w={"100%"}>
      <VStack
        m={"0 auto"}
        spacing={"24px"}
        border={"1px solid #ddd"}
        p={"24px 32px"}
        borderRadius={"16px"}
      >
        <Text fontWeight={"bold"}>ミッションをクリアしろ！</Text>
        <VStack alignItems={"center"}>
          <UserAvatar user={loginUser} size={"xl"} />
          <Text fontWeight={"bold"}>{loginUser.name}</Text>
        </VStack>
        <Button colorScheme={"twitter"} onClick={onNext}>{"次へ！"}</Button>
      </VStack>
    </VStack>
  )
}
