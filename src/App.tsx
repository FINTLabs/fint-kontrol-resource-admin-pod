// App.tsx
import React from 'react';
import theme from './template/theme';

import { DataProvider } from './data/DataContext';
import Main from './features/Main';
import {ThemeProvider} from "@mui/material";

function AppWrapper() {
    return (
        <ThemeProvider theme={theme}>
            <DataProvider>
                <Main />
            </DataProvider>
        </ThemeProvider>
    );
}

export default AppWrapper;
// For deployment of a podlet, read here:
// https://fintlabs.atlassian.net/wiki/spaces/FINTKB/pages/526877044/Hvordan+lage+en+Podlet