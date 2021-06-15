import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    typography: {
        fontFamily: ['"Poppins"', 'Open Sans'].join(','),
        htmlFontSize: 16,
        fontSize: 16,
        body1: {
            fontSize: '1rem',
        },
        h2: {
            fontSize: '2.28rem',
            fontWeight: 600,
        },
    },
})

export default theme;