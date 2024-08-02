import { extendTheme } from "@chakra-ui/react";
import { mode } from '@chakra-ui/theme-tools'

export const theme = extendTheme({
  fonts: {
    heading: `"Inter", system-ui, sans-serif`,
    body: `"Inter", system-ui, sans-serif`,
  },
  config: {
    useSystemColorMode: true,
  },
  styles: {
    global: (props) => ({
      body: {
        bg: mode('#fff', '#080019')(props)
      },
      // styles for the `a`
      a: {
        color: mode('black', 'white')(props),
        _hover: {
          textDecoration: 'underline',
        },
      },
      ul: {
        list: {
          display: "block",
          listStyleType: "disc",
          marginBlockStart: "1em",
          marginBlockEnd: "1em",
          marginInlineStart: "0px",
          marginInlineEnd: "0px",
          paddingInlineStart: "40px",
          unicodeBidi: "isolate",
        }
      },
    }),
  },
})
