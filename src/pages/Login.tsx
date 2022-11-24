import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Stack,
  StackDivider,
  Input,
  VStack, Select, Button
} from "@chakra-ui/react";
import React, {useEffect} from "react";
import {Rooms} from "config/Constants";
import {db} from "config/firebase";
import {v4} from 'uuid'
import {push, ref, set } from "firebase/database";
import {useLoginUserState} from "store/LoginUser";
import {User} from "models/User";
import {useNavigate} from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();
  const [name, setName] = React.useState("");
  const [roomId, setRoomId] = React.useState("");
  const [loginUser, setLoginUser] = useLoginUserState();

  useEffect(() => {
    if (loginUser !== null) {
      navigate("/");
    }
  }, [loginUser, navigate, setLoginUser]);


  const onSubmit = async () => {
    if (roomId === "" || name === "") return;

    const user: User = {
      id: v4(),
      name,
    }

    await set(push(ref(db, `rooms/${roomId}/users`)), user).then(() => {
      const loginUser = {...user, roomId}
      localStorage.setItem("loginUser", JSON.stringify(loginUser));
      setLoginUser(loginUser);
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

