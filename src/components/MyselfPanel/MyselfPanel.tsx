import {LoginUser} from "models/User";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent, AlertDialogFooter, AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Card,
  CardBody, Flex,
  Heading,
  HStack,
  Spacer,
  Text, useDisclosure,
  VStack
} from "@chakra-ui/react";
import {UserAvatar} from "components/common/UserAvatar";
import React, {useMemo} from "react";
import {useCurrentPlayer} from "store/Progress";
import {useOnExit} from "store/LoginUser";
import {PT} from "config/Constants";

interface Props {
  loginUser: LoginUser
}
export const MyselfPanel = ({loginUser}: Props) => {
  const currentPlayer = useCurrentPlayer(loginUser.roomId);
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = React.useRef(null)
  const onExit = useOnExit();

  const isMyTurn = useMemo(() => currentPlayer?.id === loginUser.id, [currentPlayer, loginUser.id])

  return (
    <>
      <Card mt={"44px"} zIndex={0} borderRadius={"24px"} bg={"#eee"} minW={"240px"} maxW={"320px"}>
        <CardBody p={"16px"} h={"100%"} display={"flex"} flexDirection={"column"}>
          <VStack alignItems={"flex-start"} spacing={"16px"}>
            <Heading fontSize={"lg"}>あなたの情報</Heading>
            <HStack>
              <UserAvatar user={loginUser} size={"md"} />
              <Text fontSize={"md"} fontWeight={"bold"} overflow={"hidden"} textOverflow={"ellipsis"} whiteSpace={"nowrap"}>{loginUser.name}</Text>
            </HStack>
            <Flex direction={"row"} w={"100%"} alignItems={"baseline"} justifyContent={"space-between"}>
              <Text fontSize={"md"}>ポイント数:</Text>
              <HStack spacing={"8px"}>
                <Text
                  fontFamily={"SuperMario"}
                  fontSize={"40px"}
                  fontWeight={"bold"}
                  lineHeight={"0"}
                >{loginUser.point}</Text>
                <Text fontSize={"md"}>{PT}</Text>
              </HStack>
            </Flex>
          </VStack>
          <Spacer minH={"16px"} />
          <Button size={"sm"} onClick={onOpen}>退出する</Button>
        </CardBody>
      </Card>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              注意！
            </AlertDialogHeader>

            <AlertDialogBody>
              {isMyTurn ? "自分の番の間は退出できません。ゲームを進めて、他の人の番になってから退出してください。" : "ゲームから退出すると、ポイントも削除されます。本当に退出しますか？"}
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                キャンセル
              </Button>
              <Button colorScheme='red' onClick={onExit} disabled={isMyTurn} ml={3}>
                退出する
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}
