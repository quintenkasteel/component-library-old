import { css } from 'styled-components'
const sizes = {
  xs: 400,
  xsSm: 568,
  sm: 768,
  smMd: 834,
  md: 992,
  mdLg: 1030,
  lg: 1200,
  lgXl: 1401,
  xl: 1824,
}
export default Object.keys(sizes).reduce((acc, label) => {
   acc[label] = (...args) => css`
      @media only screen and (min-width: ${sizes[label]}px) {
         ${css(...args)};
      }
   `
   return acc
}, {})
