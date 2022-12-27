import {Box, BoxProps, Image, keyframes} from "@chakra-ui/react";
import {motion} from "framer-motion";

type Props = BoxProps

export const Star = ({...props}: Props) => {
  return (
    <>
      <Box
        as={motion.div}
        position={"absolute"}
        top={"-15px"}
        left={"6px"}
        animation={animation1}
        display="flex"
        {...props}
      >
        <Image src="/images/star2.webp" width="42px" height="42px" alt="star" />
      </Box>
      <Box
        as={motion.div}
        position={"absolute"}
        top={"15px"}
        left={"7px"}
        animation={animation3}
        display="flex"
        {...props}
      >
        <Image src="/images/star2.webp" width="24px" height="24px" alt="star" />
      </Box>
      <Box
        as={motion.div}
        position={"absolute"}
        bottom={"-7px"}
        right={"-7px"}
        animation={animation2}
        display="flex"
        {...props}
      >
        <Image src="/images/star2.webp" width="48px" height="48px" alt="star" />
      </Box>
    </>
  )
}

const sparkleKeyframe1 = keyframes`
  0% {
    opacity: 1;
  }
  80% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`


const sparkleKeyframe2 = keyframes`
  0% {
    opacity: 1;
  }
  60% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`

const animation1 = `${sparkleKeyframe1} 2s ease-in-out infinite`;

const animation2 = `${sparkleKeyframe2} 2.5s ease-in-out infinite`;

const animation3 = `${sparkleKeyframe1} 2.25s ease-in-out infinite`;
