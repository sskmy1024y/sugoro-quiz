import {Box, Button, HStack, Text, VStack} from "@chakra-ui/react";
import {UserAvatar} from "components/common/UserAvatar";
import {User} from "models/User";

interface Props {
  targetUser: User;
}

export const CannotVoteCard = ({targetUser}: Props) => {
  return (
    <VStack
      m={"0 auto"}
      spacing={"24px"}
      border={"1px solid #ddd"}
      p={"16px"}
      borderRadius={"16px"}
    >
      <Text fontWeight={"bold"}>ミッションクリアした？</Text>
      <VStack alignItems={"center"}>
        <UserAvatar user={targetUser} size={"xl"} />
        <Text fontWeight={"bold"}>{targetUser.name}</Text>
      </VStack>
      <Box>
        <Text fontWeight={"bold"} color={"red"}>ゲーム未参加のため投票できません</Text>
      </Box>
      <HStack w={"100%"} justifyContent={"center"} spacing={8}>
        <VStack spacing={2}>
          <Button colorScheme='red' variant={"outline"} size='lg' disabled>{"🤔"}</Button>
          <Text>うーん</Text>
        </VStack>
        <VStack spacing={2}>
          <Button colorScheme='twitter' variant={"outline"} size='lg' disabled>{"👍"}</Button>
          <Text>いいね！</Text>
        </VStack>
      </HStack>
    </VStack>
  )
}
