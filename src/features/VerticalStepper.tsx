import React, { useState } from 'react';
import {
    Autocomplete,
    Box,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Step,
    StepContent,
    StepLabel,
    Stepper,
    TextField,
    Typography
} from '@mui/material';
import {Apartment} from "@mui/icons-material";

import style from "../template/style";
import UnitSelectDialog from "./UnitSelectDialog";
import {useUser} from "../data/UserContext";
import {User} from "../data/types";
import {useOrgUnits} from '../data/OrgUnitContext';
import {useRole} from '../data/RoleContext';

const steps = [
    {
        label: 'Velg brukeren:',
        description: ``,
    },
    {
        label: 'Velg rolle:',
        description:
            '',
    },
    {
        label: 'Velg enhet:',
        description: ``,
    },
];


export default function VerticalStepper() {

    const [activeStep, setActiveStep] = React.useState(0);
    const [showUnitModal, setShowUnitModal] = useState(false);
    const userPage = useUser();
    const members: readonly User[] = userPage.UserData?.members || [];
    const { setSelectedOrgUnits } = useOrgUnits();
    const { selectedUser, setSelectedUser } = useUser();
    const {selectedAccessRoleId, setSelectedAccessRoleId } = useRole();

    const handleNext = () => {

            setActiveStep((prevActiveStep) => prevActiveStep + 1);

    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setSelectedUser(null);
        setSelectedOrgUnits([]);

        setSelectedAccessRoleId('');
        setActiveStep(0);
    };

    const closeModal = () => {
        setShowUnitModal(false);
    };

    return (
        <Box sx={{ maxWidth: 600 }}>
            <UnitSelectDialog
                open={showUnitModal}
                onClose={closeModal}
            />

            <Stepper activeStep={activeStep} orientation="vertical">
                {steps.map((step, index) => (
                    <Step key={step.label}>
                        <StepLabel
                            optional={
                                index === 2 ? (
                                    <Typography variant="caption">Last step</Typography>
                                ) : null
                            }
                        >
                            {step.label}
                        </StepLabel>
                        <StepContent>
                            {activeStep === 0 && (
                                <Autocomplete
                                    defaultValue={selectedUser?`${selectedUser.firstName} ${selectedUser.lastName}`:''}
                                    disablePortal
                                    id="combo-box-demo"
                                    options={members.map((member) => `${member.firstName} ${member.lastName}`)}
                                    sx={{ width: 300 }}
                                    renderInput={(params) => <TextField {...params} label="User" />}
                                    onChange={(event, newValue) => {
                                        const selectedMember = members.find(
                                            (member) => `${member.firstName} ${member.lastName}` === newValue
                                        );
                                        if (selectedMember) {
                                            setSelectedUser(selectedMember);
                                        } else {
                                            setSelectedUser(null);
                                        }
                                    }}
                                />

                            )}

                            {activeStep === 1 && (
                                <FormControl style={{ minWidth: 220 }} sx={{ mx: '2rem', my: '1rem' }}>
                                    <InputLabel id="valg-brukertype">Role</InputLabel>
                                    <Select
                                        id="accessRoleSelect"
                                        value={selectedAccessRoleId}
                                        onChange={(e) => setSelectedAccessRoleId(e.target.value as string)}
                                        label={" role "}
                                    >
                                        <MenuItem value="">
                                            <em>Select Access Role</em>
                                        </MenuItem>
                                        <MenuItem value="aa">Applikasjonsadministrator</MenuItem>
                                        <MenuItem value="ata">Applikasjonstilgangsadministrator</MenuItem>
                                        <MenuItem value="e">Enhetsleder</MenuItem>
                                        <MenuItem value="s">Sluttbruker</MenuItem>
                                    </Select>
                                </FormControl>
                            )}

                            {activeStep == 2 && (
                                <Button
                                    id={'selectUnitsIcon'}
                                    variant="outlined"
                                    endIcon={<Apartment/>}
                                    onClick={() => {
                                        setShowUnitModal(true)
                                    }}
                                    sx={style.changeOrgButton}
                                    style={{ fontSize: '1em' }}
                                >
                                    Velg enhet
                                </Button>

                            )}

                            <Box sx={{ mb: 2 }}>
                                {index === steps.length - 1 ? (
                                        <Button
                                            // variant="contained"
                                            onClick={handleReset}
                                            sx={{ mt: 1, mr: 1 }}
                                        >
                                            Reset
                                        </Button>
                                ) : (
                                        <Button
                                            // variant="contained"
                                            onClick={handleNext}
                                            sx={{ mt: 1, mr: 1 }}
                                        >
                                            Continue
                                        </Button>

                                )}
                                <Button
                                    disabled={index === 0}
                                    onClick={handleBack}
                                    sx={{ mt: 1, mr: 1 }}
                                >
                                    Back
                                </Button>
                            </Box>
                        </StepContent>
                    </Step>
                ))}
            </Stepper>
            {/*{activeStep === steps.length && (*/}
            {/*    <Paper square elevation={0} sx={{ p: 3 }}>*/}
            {/*        <Typography>Alle trinn er fullført, vennligst sjekk de nye tilgangsrettighetene og lagre.</Typography>*/}
            {/*        <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>*/}
            {/*            Reset*/}
            {/*        </Button>*/}
            {/*    </Paper>*/}
            {/*)}*/}
        </Box>
    );
}
