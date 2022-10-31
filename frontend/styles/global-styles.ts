import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, menu, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
main, menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, main, menu, nav, section {
  display: block;
}
/* HTML5 hidden-attribute fix for newer browsers */
*:focus {
    outline: none;
}
*[hidden] {
    display: none;
}
body {
  line-height: 1;
}
menu, ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
* {
  box-sizing: border-box;
}

@font-face {
  font-family: 'NotoSans';
  src: url(../public/fonts/NotoSansKR-Regular.otf) format('truetype') font-weight-regular,
      url(../public/fonts/NotoSansKR-Medium.otf) format('truetype') font-weight-medium,
      url(../public/fonts/NotoSansKR-Bold.otf) format('truetype') font-weight-bold,
      url(../public/fonts/NotoSansKR-Light.otf) format('truetype') font-weight-light,
      url(../public/fonts/NotoSansKR-Thin.otf) format('truetype') font-weight-thin,
      url(../public/fonts/NotoSansKR-black.otf) format('truetype') font-weight-black,
}


body {
  font-weight: 300;
  font-family: 'NotoSans', sans-serif;
  line-height: 1.2;
  background-color: ${(props) => props.theme.colorTheme.backgroundColor};
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
a {
  text-decoration:none;
  color:inherit;
}

`;

export default GlobalStyle;
