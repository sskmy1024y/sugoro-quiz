import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Stack,
  Input,
  VStack, Select, Button, Avatar
} from "@chakra-ui/react";
import React, {ChangeEvent, FormEvent, useCallback, useEffect} from "react";
import {Rooms} from "config/Constants";
import {db, storage} from "config/firebase";
import {v4} from 'uuid'
import {push, ref, set } from "firebase/database";
import {getDownloadURL, ref as storageRef, uploadString} from 'firebase/storage';
import {useLoginUserState} from "store/LoginUser";
import {User} from "models/User";
import {useNavigate} from "react-router-dom";
import {FileUpload,} from "components/common/FileUpload";
import {fileToBase64} from "utils/fileToBase64";

export const Login = () => {
  const navigate = useNavigate();
  const [name, setName] = React.useState("");
  const [roomId, setRoomId] = React.useState("");
  const [loginUser, setLoginUser] = useLoginUserState();
  const [iconBase64, setIconBase64] = React.useState<string>();

  useEffect(() => {
    if (loginUser !== null) {
      navigate("/");
    }
  }, [loginUser, navigate, setLoginUser]);

  const onFileChange = useCallback(async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 3 * 1024 * 1024) {
      alert("ファイルサイズが大きすぎます");
      return;
    }

    const base64 = await fileToBase64(file)
    setIconBase64(base64)
  }, []);


  const onSubmit = useCallback(async (e: FormEvent) => {
    e.preventDefault();
    if (roomId === "" || name === "") return;

    const userId = v4();

    let iconUrl: string | undefined;
    if (iconBase64) {
      const iconRef = storageRef(storage, `icons/${userId}.png`);
      const snapshot = await uploadString(iconRef, iconBase64, 'data_url');
      iconUrl = await getDownloadURL(snapshot.ref);
    }

    const user: User = {
      key: "", // Dummy key
      id: userId,
      name,
      iconUrl,
      point: 0,
    }

    const {key, ...value} = user;
    await set(push(ref(db, `rooms/${roomId}/users`)), {
      ...value,
      iconUrl: iconUrl ?? null
    }).then(async () => {
      const loginUser = {...user, roomId}
      localStorage.setItem("loginUser", JSON.stringify(loginUser));
      await setLoginUser(loginUser);
    })
  }, [iconBase64, name, roomId, setLoginUser])

  return (
    <Box>
      <Card maxW={"2xl"} margin={"24px auto"}>
        <CardHeader>
          <Heading size='lg'>メンバー登録</Heading>
        </CardHeader>

        <CardBody>
          <form onSubmit={onSubmit}>
            <Stack spacing='4'>
              <VStack spacing='4' align={"center"}>
                <Avatar name={name} size='2xl' src={iconBase64} />
                <FileUpload accept={'image/*'} onChange={onFileChange} />
              </VStack>
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
              <Button
                type={"submit"}
                colorScheme='twitter'
                disabled={name === "" || roomId === ""}
              >
                ゲームに入る
              </Button>
            </Stack>
          </form>
        </CardBody>
      </Card>
    </Box>
  );
};

