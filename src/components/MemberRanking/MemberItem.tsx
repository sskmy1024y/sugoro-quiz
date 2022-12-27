import {User} from "models/User";
import {
  Box,
  Card,
  CardBody,
  Flex,
  Heading,
  Text
} from "@chakra-ui/react";
import {useIsIncludePlayer} from "store/OrderPlayer";
import React, { useMemo} from "react";
import {UserAvatar} from "components/common/UserAvatar";
import {PT} from "config/Constants";
import {useCurrentPlayer} from "store/Progress";

interface Props {
  roomId: string;
  member: User
}

export const MemberItem = ({roomId, member}: Props) => {
  const isIncludePlayer = useIsIncludePlayer(roomId, member.id);
  const currentPlayer = useCurrentPlayer(roomId);

  const isCurrentPlayer = useMemo(() => currentPlayer?.id === member.id, [currentPlayer?.id, member.id]);

  return (
    <Card size={"sm"} bg={isCurrentPlayer ? "yellow" : "white"} borderRadius={"8px"} w={"244px"}>
      <CardBody>
        <Flex gap='4px' alignItems={"center"}>
          <Flex flex='1' gap='8px' alignItems='center' opacity={isIncludePlayer ? 1 : 0.5}>
            <UserAvatar user={member} />
            <Box maxW={"120px"}>
              <Heading
                size='sm'
                minW={"74px"}
                whiteSpace={"nowrap"}
                overflow={"hidden"}
                textOverflow={"ellipsis"}
              >{member.name}</Heading>
              <Text>{isIncludePlayer ?
                (<><Text
                  as={"span"}
                  fontFamily={"SuperMario"}
                  fontSize={"28px"}
                  lineHeight={"0.8"}
                  mr={"2px"}
                >{`${member.point}`}</Text>{PT}</>) : "未参加"}
              </Text>
            </Box>
          </Flex>
        </Flex>
      </CardBody>
    </Card>
  )

}
