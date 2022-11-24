import * as React from "react"
import {
  ChakraProvider,
  theme,
} from "@chakra-ui/react"
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Login} from "pages/Login";

import 'config/firebase'

export const App = () => (
  <ChakraProvider theme={theme}>
    <BrowserRouter>
      <Routes>
        <Route path={`/`} element={<Login />} />
      </Routes>
    </BrowserRouter>
  </ChakraProvider>
)
