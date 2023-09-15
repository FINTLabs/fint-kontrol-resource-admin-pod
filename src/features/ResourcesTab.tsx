import React, {useState} from 'react';
import {
    Typography,
    Box,
    Paper,
    Grid, Button
} from "@mui/material";
import {Person, AddModerator, Apartment} from '@mui/icons-material';

import UnitSelectDialog from './UnitSelectDialog';
import VerticalStepper from "./VerticalStepper";
import { useOrgUnits } from '../data/OrgUnitContext';
import { useUser } from '../data/UserContext';
import { useRole } from '../data/RoleContext';

const ResourcesTab = () => {
    const { selectedOrgUnits } = useOrgUnits();
    const { selectedUser } = useUser();
    const { selectedAccessRoleId } = useRole();

    return (
        <Box component={Paper} sx={{ minWidth: 1040, maxWidth: 1536 }} id={'resourcesTab'} p={3}>
            <Typography>Følg disse trinnene for å opprette en ny brukerrettighetsrolle</Typography>
            <Grid container>
                <Grid item xs={12} md={6}>
                    <VerticalStepper />
                </Grid>

                <Grid item xs={12} md={6}>
                    <Box p={2}>

                        {selectedUser && (
                            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom:'30px' }}>
                                <Person sx={{ fontSize: 40, marginRight: '20px' }} />
                                <Typography>{selectedUser.firstName} {selectedUser.lastName}</Typography>
                            </Box>
                        )}

                        {selectedAccessRoleId  && (
                            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom:'30px'  }}>
                                <AddModerator sx={{ fontSize: 40, marginRight: '20px' }} />
                                <Typography>
                                    {selectedAccessRoleId == 'aa'?
                                        'Applikasjonsadministrator' :
                                        'Applikasjonstilgangsadministrator'}
                                </Typography>
                            </Box>
                        )}

                        {selectedOrgUnits.length > 0 &&  (
                            <Box sx={{ display: 'flex', marginBottom:'20px' }}>
                                <Apartment sx={{ fontSize: 40, mt:2 }} />

                                <ul>
                                    {selectedOrgUnits.map((orgUnit) => (
                                        <li key={orgUnit.id}>{orgUnit.name}</li>
                                    ))}
                                </ul>
                            </Box>
                        )}
                        {selectedUser && selectedAccessRoleId && selectedOrgUnits.length > 0 && (
                            <Button
                                variant="contained"
                                sx={{ mt: 1, mr: 1 }}
                            >
                                Save Access Role
                            </Button>
                        )}

                    </Box>
                </Grid>
            </Grid>


        </Box>
    );
};

export default ResourcesTab;
