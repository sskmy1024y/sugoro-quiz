import { Button, Text, VStack} from "@chakra-ui/react";
import {UserAvatar} from "components/common/UserAvatar";
import {LoginUser} from "models/User";
import {CombinedGame} from "models/Game";

interface Props {
  loginUser: LoginUser;
  game: CombinedGame;
  onNext: () => void;
}

export const RequireAnswer = ({loginUser, game, onNext}: Props) => {
  return (
    <VStack spacing={"16px"} m={"0 auto"} w={"100%"}>
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
          p={"24px 32px"}
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
          <Text fontWeight={"bold"}>制限時間: {game.mission.timeout}秒</Text>
          <VStack pt={"8px"} spacing={"4px"}>
            <Button colorScheme={"twitter"} onClick={onNext}>{"ミッションスタート！"}</Button>
            <Text fontSize={"xs"} color={"gray.500"}>あなたがボタンを押すと、ゲームが始まるよ</Text>
          </VStack>
        </VStack>
      </VStack>
    </VStack>
  )
}
