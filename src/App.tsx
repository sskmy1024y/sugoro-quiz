import * as React from "react"
import {
  ChakraProvider, extendTheme,
} from "@chakra-ui/react"
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Login} from "pages/Login";
import {Main} from "pages/Main";

import 'config/firebase'
import {RecoilRoot} from "recoil";
import {Fonts} from "theme/GlobalStyle";

const theme = extendTheme({
  fonts: {
    heading: "'Noto Sans JP', sans-serif",
    body: "'Noto Sans JP', sans-serif",
  },
})

export const App = () => (
  <RecoilRoot>
    <ChakraProvider theme={theme}>
      <Fonts />
      <BrowserRouter>
        <Routes>
          <Route path={`/`} element={<Main />} />
          <Route path={`/login`} element={<Login />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  </RecoilRoot>
)
