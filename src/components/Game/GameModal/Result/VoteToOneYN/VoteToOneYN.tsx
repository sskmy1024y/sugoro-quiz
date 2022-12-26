import {Box, Button, Divider, HStack, Image, ModalBody, Text, VStack} from "@chakra-ui/react";
import {LoginUser, User} from "models/User";
import {CombinedGame} from "models/Game";
import {useMemo} from "react";
import {UserAvatar} from "components/common/UserAvatar";
import {SkipButton} from "components/Game/GameModal/SkipButton";
import {ENABLE_UNISEPON} from "config/Constants";

interface Props {
  loginUser: LoginUser;
  targetUser: User;
  game: CombinedGame;
  onNext: () => void;
}

export const VoteToOneYN = ({loginUser, targetUser, game, onNext}: Props) => {
  const getPoint = useMemo(() => {
    return game.gamePlayers
      .map(v => v.voteTo.find(v => v.id === targetUser.id)?.vote)
      .filter((v): v is ("good" | "bad") => v !== undefined)
      .reduce((prev, curr) => {
        return (curr === "good") ? prev + 1 : prev;
      }, 0)
  }, [game.gamePlayers, targetUser.id])

  return (
    <ModalBody>
      <VStack spacing={8} m={"0 auto 42px"} w={"100%"}>
        <VStack
          m={"0 auto"}
          spacing={"24px"}
          border={"1px solid #ddd"}
          bg={"white"}
          p={"32px"}
          borderRadius={"16px"}
          minW={"280px"}
          zIndex={0}
          position={"relative"}
        >
          <VStack alignItems={"center"}>
            <UserAvatar user={targetUser} size={"xl"} />
            <Text fontWeight={"bold"}>{targetUser.name}</Text>
          </VStack>
          <VStack spacing={"8px"}>
            <HStack alignItems={"baseline"}>
              <Text fontSize={"4xl"} fontWeight={"bold"}>{`+${getPoint}`}</Text>
              <Text fontSize={"md"}>{`pt`}</Text>
            </HStack>
            <Divider />
            <HStack alignItems={"baseline"}>
              <Text fontSize={"md"}>累計</Text>
              <Text fontSize={"2xl"} fontWeight={"bold"}>{targetUser.point}</Text>
              <Text fontSize={"md"}>pt</Text>
            </HStack>
          </VStack>
          {loginUser.id === targetUser.id ? (
            <Button colorScheme={"twitter"} onClick={onNext}>{"すごろくに戻る"}</Button>
          ) : (
            <SkipButton onClick={onNext} skipLabel={"終了する"} confirmText={"他の人にも終了していいか確認してね！"}>{"ミッションを終了する"}</SkipButton>
          )}
          <Box position={"absolute"} bottom={"84px"} right={"-42px"} zIndex={1}>
            {ENABLE_UNISEPON && <Image src={"/images/ouen.gif"} w={"128px"} h={"100%"} />}
          </Box>
        </VStack>
      </VStack>
    </ModalBody>
  )
}
