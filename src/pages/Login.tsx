import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Stack,
  Input,
  VStack, Select, Button, Avatar, Image
} from "@chakra-ui/react";
import React, {ChangeEvent, FormEvent, useCallback, useEffect} from "react";
import {Teams} from "config/Constants";
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
    const pushRef = push(ref(db, `rooms/${roomId}/users`));
    await set(pushRef, {
      ...value,
      iconUrl: iconUrl ?? null
    }).then(async () => {
      const key = pushRef.key!;
      const loginUser = {...user, key, roomId}
      await setLoginUser(loginUser);
    })
  }, [iconBase64, name, roomId, setLoginUser])

  return (
    <Box h={"100lvh"} pt={"24px"} bg={"linear-gradient(104.31deg, #56CCE180 -1.14%, #68DCB6C0 105.66%)"} backdropFilter={"blur(30px)"}>
      <Image src={"/images/logo.png"} w={"240px"} mx={"auto"} mb={"36px"}/>
      <Card maxW={"2xl"} margin={"24px auto"} bg={"white"} borderRadius={"16px"}>
        <CardHeader>
          <Heading size='lg'>メンバー登録</Heading>
        </CardHeader>

        <CardBody>
          <form onSubmit={onSubmit}>
            <Stack spacing='16px'>
              <VStack spacing='4px' align={"center"}>
                <Avatar name={name} size='2xl' src={iconBase64} />
                <FileUpload accept={'image/*'} onChange={onFileChange} />
              </VStack>
              <VStack align={"start"} spacing={"8px"}>
                <Heading size='s' textTransform='uppercase'>
                  ニックネームを入力してください
                </Heading>
                <Input value={name} onChange={(e) => setName(e.target.value)} placeholder={"ゆにぽん"} />
              </VStack>
              <VStack align={"start"} spacing={"8px"}>
                <Heading size='s' textTransform='uppercase'>
                  チーム番号を入力してください
                </Heading>
                <Select value={roomId} onChange={e => setRoomId(e.target.value)} placeholder='チームを選んでね'>
                  {Object.values(Teams).map(room => (
                    <option key={room} value={room}>{room}</option>
                  ))}
                </Select>
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

