import { createMuiTheme } from '@material-ui/core'

import variables from './variables.scss'

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: variables.colorPrimary,
      contrastText: variables.white,
    },
  },

  overrides: {
    MuiInput: {
      underline: {
        '&:hover:hover:not(.Mui-disabled):before': {
          borderColor: variables.colorPrimary,
        },
      },
    },
  },
})
