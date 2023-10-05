import React from 'react';
import "@navikt/ds-css";
import {
    PersonCheckmarkIcon,
    PersonPlusIcon,
} from "@navikt/aksel-icons";
import { Tabs } from "@navikt/ds-react";

import {Typography, Box} from '@mui/material';

import PermissionTab from './PermissionTab';
import ResourcesTab from './ResourcesTab';

const Main = () => {
    return (
        <Box sx={{margin:10}}>
            <Typography
                sx={{ flex: '1 1 100%' }}
                variant="h6"
                id="tableTitle"
                component="div"
            >
                Applikasjonsadministrator
            </Typography>

            <Tabs defaultValue="tildel">
                <Tabs.List>
                    <Tabs.Tab
                        value="tildel"
                        label="Tildel rettigheter"
                        icon={<PersonPlusIcon title="historielogg" />}
                    />
                    <Tabs.Tab
                        value="inbox"
                        label="Definer rolle"
                        icon={<PersonCheckmarkIcon title="inbox" />}
                    />
                </Tabs.List>
                <Tabs.Panel value="tildel" className="h-24 w-full bg-gray-50 p-4">

                    <ResourcesTab  />
                </Tabs.Panel>
                <Tabs.Panel value="inbox" className="h-24 w-full bg-gray-50 p-4">

                    <PermissionTab />
                </Tabs.Panel>
            </Tabs>

        </Box>
    );
};

export default Main;
