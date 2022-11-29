import {User} from "models/User";
import {
  Badge,
  Card,
  CardBody,
  Flex,
  Heading,
  VStack
} from "@chakra-ui/react";
import { useMemo} from "react";
import {UserAvatar} from "components/common/UserAvatar";

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
    return "sm"
  }, [order])

  const width = useMemo(() => {
    if (order === 1) return "360px"
    if (order === 2) return "320px"
    if (order === 3) return "280px"
    return "240px"
  }, [order])

  const height = useMemo(() => {
    if (order === 1) return "140px"
    if (order === 2) return "120px"
    if (order === 3) return "100px"
    return "95px"
  }, [order])


  return (
    <Card size={"sm"} w={width} h={height}>
      <CardBody>
        <Flex gap='4'>
          <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
            <UserAvatar size={iconSize} user={member} />
            <VStack alignItems={"flex-start"}>
              <Badge colorScheme={colorScheme}>
                <Heading size={"xs"} textTransform={"lowercase"}>{children}</Heading>
              </Badge>
              <Heading size='sm' noOfLines={1}>{member.name}</Heading>
              <Heading size='sm' noOfLines={1}>{member.point} pt</Heading>
            </VStack>
          </Flex>
        </Flex>
      </CardBody>
    </Card>
  )

}
