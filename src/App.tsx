import React, {useEffect, useState} from 'react';
import axios from "axios";
import theme from './template/theme';
import {Route, Routes} from 'react-router-dom';
import { DataProvider } from './data/RoleContext';
import Main from './features/Main';
import {ThemeProvider} from "@mui/material";
import {OrgUnitsProvider} from "./data/OrgUnitContext";
import {UserProvider} from "./data/UserContext";



function AppWrapper() {
    const [basePath, setBasePath] = useState('');

    useEffect(() => {
        const getBasePath = () => {
            axios.get('api/layout/configuration')
                .then(response => {
                        setBasePath(response.data.basePath)
                        console.log("basePath i context", response.data.basePath)
                    }
                )
                .catch((err) => {
                    console.error(err);
                })
        }
        getBasePath()
    }, [])
    return (
        <ThemeProvider theme={theme}>
            <DataProvider>
                <UserProvider>
                <OrgUnitsProvider>
                    <Routes>
                        <Route path={`${basePath}/ressurser-admin/`} element={<Main />}/>
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