import React, { useState } from 'react';
import { Typography, Box, Tab, Tabs } from '@mui/material';
import style from '../template/style';

import PermissionTab from './PermissionTab';
import ResourcesTab from './ResourcesTab';
import { useData } from '../data/RoleContext';
import { useUser } from '../data/UserContext';

const Main = () => {
    const [selectedTab, setSelectedTab] = useState<number>(0);
    const data = useData();


    const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setSelectedTab(newValue);
    };

    return (
        <Box sx={style.content}>
            <Typography
                sx={{ flex: '1 1 100%' }}
                variant="h6"
                id="tableTitle"
                component="div"
            >
                Applikasjonsadministrator
            </Typography>

            <Tabs
                value={selectedTab}
                onChange={handleTabChange}
                aria-label="Tildel rettigheter or Definer rolle"
                variant="fullWidth"
                indicatorColor="primary"
                textColor="primary"
                sx={{
                    width: "400px"
                }}
            >
                <Tab label="Tildel rettigheter" />
                <Tab label="Definer rolle" />
            </Tabs>
            <TabPanel value={selectedTab} index={0} >
                <Box>
                    Follow the steps to create access rights for a user.
                    <ResourcesTab  />
                </Box>
            </TabPanel>
            <TabPanel value={selectedTab} index={1}>
                <Box>
                    <PermissionTab permissions={data}/>
                </Box>
            </TabPanel>

        </Box>
    );
};

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`tabpanel-${index}`}
            aria-labelledby={`tab-${index}`}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

export default Main;
