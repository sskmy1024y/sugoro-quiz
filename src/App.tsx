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
import {useEffect} from "react";
import {UnifesStaff} from "pages/UnifesStaff";

const theme = extendTheme({
  fonts: {
    heading: "'Noto Sans JP', sans-serif",
    body: "'Noto Sans JP', sans-serif",
  },
})

export const App = () => {
  useEffect(() => {
    console.clear();
    console.log(
      "%cWelcome to UniFesチーム%c\n%cここを開いてしまった物好きなあなた。\nぜひUniFes!チームに入って一緒にエンターテイメントを作りましょう！",
      "color:white; background-color: #00a1e5; padding:2px 4px; border-radius:4px; font-size: 16px; font-weight: bold;",
      "",
      "color:white; font-size: 14px; padding-top: 4px;",
    );

    const comment = document.createComment(`
ここにたどり着いたそこのあなた。
ゆにぽすごろくは楽しんでいただけたでしょうか？

もし楽しんでいただけたなら、次はあなたもUniFes!チームに参加してみませんか？
UniFes!チームでは、楽しさを通じて最高の集団をつくる時代をつくるための企画を考えています。
企画する自分たちが楽しむ、をモットーにしているので、こんな企画をしてみたい、ゲームを作ってみたい！というアイデアがあればぜひUniFes!チームに参加してみてください。

UniFes!チーム
    `)
    document.prepend(comment)

    return () => {
      document.removeChild(comment)
    }
  }, [])

  return (
    <RecoilRoot>
      <ChakraProvider theme={theme}>
        <Fonts/>
        <BrowserRouter>
          <Routes>
            <Route path={`/`} element={<Main/>}/>
            <Route path={`/login`} element={<Login/>}/>
            <Route path={`/unifes-staff`} element={<UnifesStaff />}/>
          </Routes>
        </BrowserRouter>
      </ChakraProvider>
    </RecoilRoot>
  )
}
