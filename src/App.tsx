import * as React from "react"
import {
  ChakraProvider,
  theme,
} from "@chakra-ui/react"
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Login} from "pages/Login";
import {Main} from "pages/Main";

import 'config/firebase'
import {RecoilRoot} from "recoil";

export const App = () => (
  <RecoilRoot>
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path={`/`} element={<Main />} />
          <Route path={`/login`} element={<Login />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  </RecoilRoot>
)
