import React from 'react';
import theme from './template/theme';
import {Route, Routes} from 'react-router-dom';
import { DataProvider } from './data/RoleContext';
import Main from './features/Main';
import {ThemeProvider} from "@mui/material";
import {OrgUnitsProvider} from "./data/OrgUnitContext";
import {UserProvider} from "./data/UserContext";
import {getBasePath} from "./data/basePathUtils";


function AppWrapper() {
    const basePath = getBasePath();

    return (
        <ThemeProvider theme={theme}>
            <DataProvider>
                <UserProvider>
                <OrgUnitsProvider>
                    <Routes>
                        <Route path={`${basePath}ressurser-admin/`} element={<Main />}/>
                    </Routes>
                </OrgUnitsProvider>
                </UserProvider>
            </DataProvider>
        </ThemeProvider>
    );
}

export default AppWrapper;
// For deployment of a podlet, read here:
// https://fintlabs.atlassian.net/wiki/spaces/FINTKB/pages/526877044/Hvordan+lage+en+Podlet