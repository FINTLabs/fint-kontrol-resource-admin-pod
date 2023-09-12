import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import {Autocomplete, FormControl, InputLabel, MenuItem, Select, TextField} from '@mui/material';
import {Apartment} from "@mui/icons-material";
import style from "../template/style";
import UnitSelectDialog from "./UnitSelectDialog";
import {useState} from "react";
import {useUser} from "../data/UserContext";
import {User} from "../data/types";
import { useOrgUnits } from '../data/OrgUnitContext';
// import {useOrgUnits} from "../data/OrgUnitContext";

const steps = [
    {
        label: 'Select the user:',
        description: ``,
    },
    {
        label: 'Select role',
        description:
            '',
    },
    {
        label: 'Select the org units',
        description: ``,
    },
];


interface StepperProps {
    selectedAccessRoleId: string;
    setSelectedAccessRoleId: (value: string) => void;
    // selectedUnits: number[];
    // setSelectedUnits: (value: number[]) => void;
    // selectedUserId: User | null;
    setSelectedUserId: (value: any) => void;
}

export default function VerticalStepper({ selectedAccessRoleId,
                                            setSelectedAccessRoleId,
                                            // setSelectedUnits,
                                            setSelectedUserId
                                                }: StepperProps) {

    const [activeStep, setActiveStep] = React.useState(0);
    const [showUnitModal, setShowUnitModal] = useState(false);
    const userPage = useUser();
    const members: readonly User[] = userPage.UserData?.members || [];
    const { setSelectedOrgUnits, selectedOrgUnits } = useOrgUnits();
    const [stepErrors, setStepErrors] = React.useState(new Array(steps.length).fill(false));

    const checkErrors = (stepIndex: number) => {
        switch (stepIndex) {
            case 0:
                // return !selectedUserId;
                //TODO: store selected user in the state on the context (same with selected role - this effects the role page)
                return false;
            case 1:
                // return !selectedAccessRoleId;
                return false;
            case 2:
                return selectedOrgUnits.length < 1;
            default:
                return false;
        }
    };

    const handleNext = () => {
        if(activeStep === steps.length - 1){
            console.log("CHECK FOR ERRORS HERE?")
        }
        const currentStepErrors = [...stepErrors];
        const currentError = checkErrors(activeStep);

        if (currentError) {
            currentStepErrors[activeStep] = true;
            setStepErrors(currentStepErrors);
        } else {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
       }
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setSelectedUserId(null);
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
                            error={stepErrors[index]}
                        >
                            {step.label}
                        </StepLabel>
                        <StepContent>
                            {activeStep === 0 && (
                                <Autocomplete
                                    disablePortal
                                    id="combo-box-demo"
                                    options={members.map((member) => `${member.firstName} ${member.lastName}`)}
                                    sx={{ width: 300 }}
                                    renderInput={(params) => <TextField {...params} label="User" />}
                                    onChange={(event, newValue) => {
                                        // Here, newValue will be the selected member name
                                        // You can extract the user ID and set it in your state
                                        const selectedMember = members.find(
                                            (member) => `${member.firstName} ${member.lastName}` === newValue
                                        );

                                        if (selectedMember) {
                                            setSelectedUserId(selectedMember); // Assuming userId is the user ID property in your member object
                                        // } else {
                                        //     setSelectedUserId(); // Handle case when no member is selected
                                        }
                                    }}
                                    //value={selectedUserId}
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
                                <div>
                                    <Button
                                        variant="contained"
                                        onClick={handleNext}
                                        sx={{ mt: 1, mr: 1 }}
                                    >
                                        {index === steps.length - 1 ? 'Finish' : 'Continue'}
                                    </Button>
                                    <Button
                                        disabled={index === 0}
                                        onClick={handleBack}
                                        sx={{ mt: 1, mr: 1 }}
                                    >
                                        Back
                                    </Button>
                                </div>
                            </Box>
                        </StepContent>
                    </Step>
                ))}
            </Stepper>
            {activeStep === steps.length && (
                <Paper square elevation={0} sx={{ p: 3 }}>
                    <Typography>Alle trinn er fullført, vennligst sjekk de nye tilgangsrettighetene og lagre.</Typography>
                    <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                        Reset
                    </Button>
                </Paper>
            )}
        </Box>
    );
}
