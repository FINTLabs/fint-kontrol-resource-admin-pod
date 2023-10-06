import React, { useState } from 'react';
import {
    Paper,
    TableContainer,
    Table,
    TableCell,
    TableBody,
    TableRow,
    TableHead,
    Checkbox, Alert,
} from '@mui/material';
import PermissionsToolbar from './PermissionsToolbar';
import { IRole } from '../data/types';
import { useRole } from '../data/RoleContext';
import Snackbar from "@mui/material/Snackbar";

interface Availability {
    [key: string]: boolean;
}

const BlankTable = () => {
    // Create an array to generate 4 empty rows and 4 empty cells for user display
    const blankData = Array.from({ length: 5 }, (_, rowIdx) => (
        <TableRow key={rowIdx} >
            {Array.from({ length: 5 }, (_, colIdx) => (
                <TableCell key={colIdx} sx={{padding:3.5}}> </TableCell>
            ))}
        </TableRow>
    ));

    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Feature</TableCell>
                    <TableCell>VISNING</TableCell>
                    <TableCell>REDIGERE</TableCell>
                    <TableCell>LAGE</TableCell>
                    <TableCell>SLETTE</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>{blankData}</TableBody>
        </Table>
    );
};

const PermissionSelector = () => {
    const [localSelectedAccessRoleId, setLocalSelectedAccessRoleId] = useState<string>('');
    const [snackbarOpen, setSnackbarOpen] = useState(false); // State for Snackbar
    const [snackbarMessage, setSnackbarMessage] = useState(''); // Message for Snackbar

    const { roles } = useRole();

    const filteredPermissions = localSelectedAccessRoleId
        ? roles.filter((roles) => roles.AccessRoleId === localSelectedAccessRoleId)
        : [];

    // Extract unique features and operations
    const features = Array.from(new Set(filteredPermissions.map((item: IRole) => item.Feature)));
    const operations = Array.from(new Set(filteredPermissions.map((item: IRole) => item.Operation)));

    // Create a data structure to store availability
    const availabilityData: { feature: string; availability: Availability }[] = features.map(
        (feature: string) => {
            const availability: Availability = {};
            operations.forEach((operation: string) => {
                availability[operation] = filteredPermissions.some(
                    (item: IRole) => item.Feature === feature && item.Operation === operation
                );
            });

            return { feature, availability };
        }
    );

    const handleCheckboxChange = (feature: string, operation: string, isChecked: boolean) => {
        const updatedAvailabilityData = [...availabilityData];
        const targetFeature = updatedAvailabilityData.find((item) => item.feature === feature);

        if (targetFeature) {
            targetFeature.availability[operation] = isChecked;

            // Show Snackbar with a message
            setSnackbarMessage(`Checkbox for ${feature} - ${operation} ${isChecked ? 'checked' : 'unchecked'}`);
            setSnackbarOpen(true);
        }
    };

    const handleCloseSnackbar = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setSnackbarOpen(false);
    };

    return (
        <TableContainer component={Paper} sx={{ minWidth: 1040, maxWidth: 1536 }} id={'userTable'}>
            <PermissionsToolbar
                selectedAccessRoleId={localSelectedAccessRoleId}
                setSelectedAccessRoleId={setLocalSelectedAccessRoleId}
            />

            {localSelectedAccessRoleId ? (
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Feature</TableCell>
                            {operations.map((operation) => (
                                <TableCell key={operation}>{operation}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {availabilityData.map(({ feature, availability }) => (
                            <TableRow key={feature}>
                                <TableCell>{feature}</TableCell>
                                {operations.map((operation: string) => (
                                    <TableCell key={operation}>
                                        {availability[operation] && (
                                            <Checkbox
                                                checked={availability[operation]}
                                                color={'primary'}
                                                onChange={(e) =>
                                                    handleCheckboxChange(feature, operation, e.target.checked)
                                                }
                                            />
                                        )}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            ) : (
                <BlankTable /> // Render the blank table when no accessRoleId is selected
            )}

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>

        </TableContainer>
    );
};

export default PermissionSelector;
