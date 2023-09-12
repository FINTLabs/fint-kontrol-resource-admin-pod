import React, {useState} from 'react';
import {
    Typography,
    Box,
    Paper,
    Grid, Button
} from "@mui/material";
import {Person, AddModerator, Apartment} from '@mui/icons-material';

import {Role, User} from '../data/types';
import UnitSelectDialog from './UnitSelectDialog';
import VerticalStepper from "./VerticalStepper";
import { useOrgUnits } from '../data/OrgUnitContext';

const ResourcesTab = () => {
    const [showUnitModal, setShowUnitModal] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState<null | User>(null);
    const [selectedAccessRoleId, setSelectedAccessRoleId] = useState<string>('');
    // const [selectedUnits, setSelectedUnits] = useState<number[]>([]);
    //TODO add a showSaveButton, and pass it to the vertial stepper
    const { selectedOrgUnits } = useOrgUnits();

    const closeModal = () => {
        setShowUnitModal(false);

        // TODO START HERE MONDAY
        console.log("selected units at tab: ", selectedOrgUnits )
    };

    return (
        <Box component={Paper} sx={{ minWidth: 1040, maxWidth: 1536 }} id={'resourcesTab'} p={10}>
            <Grid container>
                <Grid item xs={12} md={6}>
                    <VerticalStepper
                        selectedAccessRoleId={selectedAccessRoleId}
                        setSelectedAccessRoleId={setSelectedAccessRoleId}
                        // selectedUnits = {selectedOrgUnits}
                        // setSelectedUnits = {setSelectedUnits}
                        // selectedUserId = {selectedUserId}
                        setSelectedUserId = {setSelectedUserId}
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <Box p={2}>

                        {selectedUserId && (
                            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom:'30px' }}>
                                <Person sx={{ fontSize: 40, marginRight: '20px' }} />
                                <Typography>{selectedUserId.firstName} {selectedUserId.lastName}</Typography>
                            </Box>
                        )}

                        {selectedAccessRoleId  && (
                            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom:'30px'  }}>
                                <AddModerator sx={{ fontSize: 40, marginRight: '20px' }} />
                                <Typography>
                                    {selectedAccessRoleId == 'AA'?
                                        'Applikasjonsadministrator' :
                                        'Applikasjonstilgangsadministrator'}
                                </Typography>
                            </Box>
                        )}

                        {selectedOrgUnits.length > 0 &&  (
                            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom:'20px'  }}>
                                <Apartment sx={{ fontSize: 40 }} />

                                <ul>
                                    {selectedOrgUnits.map((orgUnit) => (
                                        <li key={orgUnit.id}>{orgUnit.name}</li>
                                    ))}
                                </ul>
                            </Box>
                        )}
                        {/*<Button*/}
                        {/*    // disabled={index === 0}*/}
                        {/*    // onClick={handleBack}*/}
                        {/*    variant="contained"*/}
                        {/*    sx={{ mt: 1, mr: 1 }}*/}
                        {/*>*/}
                        {/*    Save here*/}
                        {/*</Button>*/}
                    </Box>
                </Grid>
            </Grid>

            <UnitSelectDialog open={showUnitModal} onClose={closeModal} />
        </Box>
    );
};

export default ResourcesTab;
