import { Global } from "@emotion/react"

export const Fonts = () => (
  <Global
    styles={`
      @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700;900&display=swap');
      
      /* Mario Font */
      @font-face {
        font-family: 'SuperMario';
        src: url('/fonts/SuperMario.ttf') format('truetype');
        font-weight: normal;
      }
      `}
  />
)
