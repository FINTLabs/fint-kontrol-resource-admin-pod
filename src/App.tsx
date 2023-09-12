// App.tsx
import React from 'react';
import theme from './template/theme';

import { DataProvider } from './data/RoleContext';
import Main from './features/Main';
import {ThemeProvider} from "@mui/material";
import {OrgUnitsProvider} from "./data/OrgUnitContext";
import {UserProvider} from "./data/UserContext";

function AppWrapper() {
    return (
        <ThemeProvider theme={theme}>
            <DataProvider>
                <UserProvider>
                <OrgUnitsProvider>
                    <Main />
                </OrgUnitsProvider>
                </UserProvider>
            </DataProvider>
        </ThemeProvider>
    );
}

export default AppWrapper;
// For deployment of a podlet, read here:
// https://fintlabs.atlassian.net/wiki/spaces/FINTKB/pages/526877044/Hvordan+lage+en+Podlet