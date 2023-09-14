import React, { useState } from 'react';
import {
    Paper,
    TableContainer,
    Table,
    TableCell,
    TableBody,
    TableRow,
    TableHead,
    Checkbox,
} from '@mui/material';
import PermissionsToolbar from './PermissionsToolbar';
import { Role } from '../data/types';
import { useRole } from '../data/RoleContext';



interface Availability {
    [key: string]: boolean;
}

const BlankTable = () => {
    // Create an array to generate 4 empty rows and 4 empty cells
    const blankData = Array.from({ length: 5 }, (_, rowIdx) => (
        <TableRow key={rowIdx} >
            {Array.from({ length: 5 }, (_, colIdx) => (
                <TableCell key={colIdx} sx={{padding:3.5}}></TableCell>
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
    const [changeCount, setChangeCount] = useState<number>(0);
    const [localSelectedAccessRoleId, setLocalSelectedAccessRoleId] = useState<string>('');
    const { roles } = useRole();

    const filteredPermissions = localSelectedAccessRoleId
        ? roles.filter((roles) => roles.AccessRoleId === localSelectedAccessRoleId)
        : [];

    // Extract unique features and operations
    const features = Array.from(new Set(filteredPermissions.map((item: Role) => item.Feature)));
    const operations = Array.from(new Set(filteredPermissions.map((item: Role) => item.Operation)));

    // Create a data structure to store availability
    const availabilityData: { feature: string; availability: Availability }[] = features.map(
        (feature: string) => {
            const availability: Availability = {};
            operations.forEach((operation: string) => {
                availability[operation] = filteredPermissions.some(
                    (item: Role) => item.Feature === feature && item.Operation === operation
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
            setChangeCount((prevCount) => prevCount + 1);
        }
    };

    return (
        <TableContainer component={Paper} sx={{ minWidth: 1040, maxWidth: 1536 }} id={'userTable'}>
            <PermissionsToolbar
                selectedAccessRoleId={localSelectedAccessRoleId}
                setSelectedAccessRoleId={setLocalSelectedAccessRoleId}
                hasUpdates={changeCount}
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
        </TableContainer>
    );
};

export default PermissionSelector;
