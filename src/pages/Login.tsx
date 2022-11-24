import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Stack,
  Text,
  StackDivider,
  Input,
  Flex,
  VStack, Select, Button
} from "@chakra-ui/react";
import React from "react";
import {Rooms} from "config/Constants";
import {db} from "config/firebase";
import {v4} from 'uuid'
import {push, ref, set } from "firebase/database";

export const Login = () => {
  const [name, setName] = React.useState("");
  const [roomId, setRoomId] = React.useState("");

  const onSubmit = async () => {
    if (roomId === "" || name === "") return;

    await set(push(ref(db, `rooms/${roomId}/users`)), {
      id: v4(),
      name,
      roomId,
    })
  }

  return (
    <Box>
      <Card maxW={"2xl"} margin={"24px auto"}>
        <CardHeader>
          <Heading size='lg'>メンバー登録</Heading>
        </CardHeader>

        <CardBody>
          <Stack divider={<StackDivider />} spacing='4'>
            <VStack align={"start"} spacing={"8px"}>
              <Heading size='s' textTransform='uppercase'>
                ルームを入力してください
              </Heading>
              <Select value={roomId} onChange={e => setRoomId(e.target.value)} placeholder='ルームを選んでね'>
                {Object.values(Rooms).map(room => (
                  <option key={room} value={room}>{room}</option>
                ))}
              </Select>
            </VStack>
            <VStack align={"start"} spacing={"8px"}>
              <Heading size='s' textTransform='uppercase'>
                ニックネームを入力してください
              </Heading>
              <Input value={name} onChange={(e) => setName(e.target.value)} placeholder={"ゆにぽん"} />
            </VStack>
            <Button colorScheme='twitter' onClick={onSubmit}>ゲームに入る</Button>
          </Stack>
        </CardBody>
      </Card>
    </Box>
  );
};

