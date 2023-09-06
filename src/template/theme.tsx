import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        secondary: {
            light: '#7fb434',
            main: '#5FA202',
            dark: '#427101',
        },
        primary: {
            light: '#4b727a',
            main: '#1F4F59',
            dark: '#15373e',
        },
    },
    spacing: 8,
    typography: {
        h2: {
            fontSize: '2em',
            fontWeight: "bold",
        },
        fontFamily: [
            "Nunito Sans", 'sans-serif'
        ].join(',')
    },

    components: {
        MuiButton: {
            variants: [
                {
                    props: { variant: "contained" },
                    style: {
                        color: "primary",
                        textTransform: 'none',
                        fontSize: 16,
                        fontWeight: 600,
                    }
                },
                {
                    props: { variant: "text" },
                    style: {
                        color: "primary",
                        textTransform: 'none',
                        fontSize: 16,
                        fontWeight: 600,
                    }
                },

            ],
            defaultProps: {
                style: {
                    // textAlign: "right"
                }
            }
        }
    }
});

export default theme;
