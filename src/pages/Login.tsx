import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Image,
  Input,
  Select,
  Stack,
  Text,
  VStack
} from "@chakra-ui/react";
import {FileUpload,} from "components/common/FileUpload";
import {Teams} from "config/Constants";
import {db, storage} from "config/firebase";
import {push, ref, set} from "firebase/database";
import {getDownloadURL, ref as storageRef, uploadString} from 'firebase/storage';
import {User} from "models/User";
import React, {ChangeEvent, FormEvent, useCallback, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useLoginUserState} from "store/LoginUser";
import {fileToBase64} from "utils/fileToBase64";
import {v4} from 'uuid'

export const Login = () => {
  const navigate = useNavigate();
  const [name, setName] = React.useState("");
  const [roomName, setRoomName] = React.useState("");
  const [team, setTeam] = React.useState<Teams>();
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
    if (team === undefined || name === "") return;
    if (team === Teams.Custom && roomName === "") return;

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

    const roomId = team === Teams.Custom ? roomName : team;

    const {key, ...value} = user;
    const pushRef = push(ref(db, `rooms/${roomId}/users`));
    await set(pushRef, {
      ...value,
      iconUrl: iconUrl ?? null
    }).then(async () => {
      const key = pushRef.key!;
      const loginUser = {...user, key, roomId: roomId}
      await setLoginUser(loginUser);
    })
  }, [iconBase64, name, roomName, setLoginUser, team])

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
                  {team === Teams.Custom ?　"ルーム名を入力してください" : "チームを選んでください"}
                </Heading>
                {team === Teams.Custom && (
                  <>
                    <Input value={roomName} onChange={(e) => setRoomName(e.target.value)} placeholder={"ゆにぽんチーム"} />
                    <Text fontSize={"12px"} color={"#666"}>※ルーム名は一緒に参加する人と決めて、全員で同じルーム名を入力してください</Text>
                  </>
                )}
                <Select value={team} onChange={e => setTeam(e.target.value as Teams)} placeholder='チームを選んでね'>
                  {Object.values(Teams).map(room => (
                    <option key={room} value={room}>{room}</option>
                  ))}
                </Select>
              </VStack>
              <Button
                type={"submit"}
                colorScheme='twitter'
                disabled={name === "" || team === undefined || (team === Teams.Custom && roomName === "")}
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

