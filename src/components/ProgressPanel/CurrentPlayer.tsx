import {LoginUser} from "models/User";
import {Box, Text} from "@chakra-ui/react";
import {useMemo} from "react";
import {useCurrentPlayer} from "store/Progress";

export const CurrentPlayer = ({ loginUser }: { loginUser: LoginUser }) => {
  const currentPlayer = useCurrentPlayer(loginUser.roomId);
  const isMyTerm = useMemo(() => {
    return currentPlayer?.id === loginUser.id;
  }, [currentPlayer, loginUser.id]);

  const text = useMemo(() => isMyTerm ? `あなたの番` : `${currentPlayer?.name}さんの番`, [currentPlayer, isMyTerm]);

  return (
    <Box display={"inline-block"} minW={"280px"} p={"6px"} bg={"linear-gradient(104.31deg, #56CCE1 -1.14%, #68DCB6 105.66%)"} borderRadius={"32px"}>
      <Box bg={"#fff"} border={"1px solid #00a1e5"} borderRadius={"32px"} p={"4px 16px"}>
        <Text fontSize={"18px"} fontWeight={700}>{text}</Text>
      </Box>
    </Box>
  )
}
