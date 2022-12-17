import {User} from "models/User";
import {
  Badge, Box,
  Card,
  CardBody,
  Flex,
  Heading, Image,
  VStack
} from "@chakra-ui/react";
import { useMemo} from "react";
import {UserAvatar} from "components/common/UserAvatar";
import {ENABLE_UNISEPON} from "config/Constants";

interface Props {
  member: User;
  order: number;
}

export const MemberItem = ({member, order}: Props) => {
  const {colorScheme, children} = useMemo(() => {
    if (order === 1) return {colorScheme: "green", children: "1st"}
    if (order === 2) return {colorScheme: "cyan", children: "2nd"}
    if (order === 3) return {colorScheme: "yellow", children: "3rd"}
    return {colorScheme: "gray", children: `${order}th`}
  }, [order])

  const iconSize = useMemo(() => {
    if (order === 1) return "xl"
    if (order === 2) return "lg"
    if (order === 3) return "md"
    return "md"
  }, [order])

  const width = useMemo(() => {
    if (order === 1) return "360px"
    if (order === 2) return "320px"
    if (order === 3) return "280px"
    return "240px"
  }, [order])

  const height = useMemo(() => {
    if (order === 1) return "120px"
    if (order === 2) return "100px"
    if (order === 3) return "100px"
    return "95px"
  }, [order])


  return (
    <Card size={"sm"} w={width} h={height} bg={"white"} borderRadius={"8px"} zIndex={0} position={"relative"}>
      <CardBody>
        <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
          <UserAvatar size={iconSize} user={member} />
          <VStack alignItems={"flex-start"} justifyContent={"space-between"}>
            <Badge colorScheme={colorScheme}>
              <Heading size={"xs"} textTransform={"lowercase"}>{children}</Heading>
            </Badge>
            <Heading size='sm' noOfLines={1}>{member.name}</Heading>
            <Heading size='sm' noOfLines={1}>{member.point} pt</Heading>
          </VStack>
        </Flex>
        {order === 1 && (
          <Box position={"absolute"} top={"18px"} right={0} zIndex={1}>
            {ENABLE_UNISEPON && <Image src={"/images/otagei.gif"} w={"128px"} h={"100%"} />}
          </Box>
        )}
      </CardBody>
    </Card>
  )

}
