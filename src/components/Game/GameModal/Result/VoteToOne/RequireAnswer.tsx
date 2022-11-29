import {Box, Button, HStack, Text, VStack} from "@chakra-ui/react";
import {UserAvatar} from "components/common/UserAvatar";
import {LoginUser, User} from "models/User";
import {CombinedGame} from "models/Game";
import {useMemo} from "react";
import {VoteMemberCard} from "components/Game/GameModal/VoteMemberCard";

interface Props {
  loginUser: LoginUser;
  targetUser: User;
  getPoint: number;
  onNext: () => void;
}

export const RequireAnswer = ({loginUser, targetUser, getPoint, onNext}: Props) => {
  return (
    <VStack spacing={8} m={"0 auto 42px"} w={"100%"}>
      <VStack
        m={"0 auto"}
        spacing={"24px"}
        border={"1px solid #ddd"}
        p={"32px"}
        borderRadius={"16px"}
        minW={"280px"}
      >
        <VStack alignItems={"center"}>
          <UserAvatar user={targetUser} size={"xl"} />
          <Text fontWeight={"bold"}>{targetUser.name}</Text>
        </VStack>
        <HStack alignItems={"baseline"}>
          <Text fontSize={"4xl"} fontWeight={"bold"}>{`+${getPoint}`}</Text>
          <Text fontSize={"md"}>{`pt`}</Text>
        </HStack>
        <HStack alignItems={"baseline"}>
          <Text fontSize={"md"}>合計ポイント</Text>
          <Text fontSize={"4xl"} fontWeight={"bold"}>{targetUser.point}</Text>
        </HStack>
        <Button colorScheme={"twitter"} onClick={onNext}>{"すごろくに戻る"}</Button>
      </VStack>
    </VStack>
  )
}
