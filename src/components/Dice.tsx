import {Box, Flex, Image, keyframes} from "@chakra-ui/react";
import styled from "@emotion/styled";

type Props = {
  value: number;
  isRolling: boolean;
}

const rotateAnimation = keyframes`
  from {
    transform: rotate3d(1, 1, 1, 0deg);
  }
  25% {
    transform: rotate3d(1, 1, 1, 90deg);
  }
  50% {
    transform: rotate3d(1, 1, 1, 180deg);
  }
  75% {
    transform: rotate3d(1, 1, 1, 270deg);
  }
  to {
    transform: rotate3d(1, 1, 1, 360deg);
  }
`

export const Dice = ({value, isRolling}: Props) => {

  if (!isRolling) {
    return (
      <Flex width={"180px"} height={"180px"} alignItems={"center"} justifyContent={"center"}>
        <Box
          position={"relative"}
          width={"100px"}
          height={"100px"}
          border={"2px solid #aaa"}
        >
          <Image src={`/images/dice${value}.jpeg`} />
        </Box>
      </Flex>
    )
  }

  return (
    <Flex width={"180px"} height={"180px"} alignItems={"center"} justifyContent={"center"}>
      <Box
        position={"relative"}
        width={"100px"}
        height={"100px"}
        animation={`${rotateAnimation} 1s linear infinite`}
        sx={{
          transformStyle: "preserve-3d"
        }}
      >
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
      </Box>
    </Flex>
  )
}

const Item = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  border: 1px solid #333;
  width: 100%;
  height: 100%;

  &:nth-child(1) {
    transform: translate3d(0, -50px, 0) rotateX(-90deg);
    background: url("/images/dice1.jpeg") no-repeat center center / 100% 100%;
  }
  /* 2 */
  &:nth-child(2) {
    transform: translate3d(0, 0, 50px);
    background: url("/images/dice2.jpeg") no-repeat center center / 100% 100%;
  }
  /* 3 */
  &:nth-child(3) {
    transform: translate3d(50px, 0, 0) rotateY(90deg);
    background: url("/images/dice3.jpeg") no-repeat center center / 100% 100%;
  }
  /* 4 */
  &:nth-child(4) {
    transform: translate3d(-50px, 0, 0) rotateY(-90deg);
    background: url("/images/dice4.jpeg") no-repeat center center / 100% 100%;
  }
  /* 5 */
  &:nth-child(5) {
    transform: translate3d(0, 0, -50px) rotateY(180deg);
    background: url("/images/dice5.jpeg") no-repeat center center / 100% 100%;
  }
  /* 6 */
  &:nth-child(6) {
    transform: translate3d(0, 50px, 0) rotateX(-90deg);
    background: url("/images/dice6.jpeg") no-repeat center center / 100% 100%;
  }
`
