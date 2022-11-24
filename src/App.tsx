import * as React from "react"
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
} from "@chakra-ui/react"
import { ColorModeSwitcher } from "./ColorModeSwitcher"
import { Logo } from "./Logo"

export const App = () => (
  <ChakraProvider theme={theme}>
    <Box textAlign="center" fontSize="xl">
      <Grid minH="100vh" p={3}>
        <ColorModeSwitcher justifySelf="flex-end" />
        <VStack spacing={8}>
          <Logo h="40vmin" pointerEvents="none" />
          <Text>
            Edit <Code fontSize="xl">src/App.tsx</Code> and save to reload.
          </Text>
          <Link
            color="teal.500"
            href="https://chakra-ui.com"
            fontSize="2xl"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn Chakra
          </Link>
        </VStack>
        <div>{`REACT_APP_APIKEY:${process.env.REACT_APP_APIKEY}`}</div>
        <div>{`REACT_APP_AUTHDOMAIN:${process.env.REACT_APP_AUTHDOMAIN}`}</div>
        <div>{`REACT_APP_DATABASEURL:${process.env.REACT_APP_DATABASEURL}`}</div>
        <div>{`REACT_APP_PROJECT_ID:${process.env.REACT_APP_PROJECT_ID}`}</div>
        <div>{`REACT_APP_STORAGE_BUCKET:${process.env.REACT_APP_STORAGE_BUCKET}`}</div>
        <div>{`REACT_APP_MESSAGING_SENDER_ID:${process.env.REACT_APP_MESSAGING_SENDER_ID}`}</div>
        <div>{`REACT_APP_APP_ID:${process.env.REACT_APP_APP_ID}`}</div>
        <div>{`REACT_APP_MEASUREMENT_ID:${process.env.REACT_APP_MEASUREMENT_ID}`}</div>
      </Grid>
    </Box>
  </ChakraProvider>
)
