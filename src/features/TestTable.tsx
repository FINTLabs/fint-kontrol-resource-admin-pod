import React, { useState } from 'react';
import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Checkbox, Paper, Typography, Select, MenuItem } from '@mui/material';
import data from '../data/permissionsData';
import style from '../template/style';

interface AccessMatrixItem {
    Feature: string;
    [key: string]: boolean | string;
}

const TestTable = () => {


    const [selectedAccessRole, setSelectedAccessRole] = useState<'ata' | 'aa'>('ata');

    const operations = Array.from(new Set(data.map(item => item.Operation)));
    const features = Array.from(new Set(data.map(item => item.Feature)));

    const [ataAccessMatrix, setAtaAccessMatrix] = useState<AccessMatrixItem[]>(
        features.map(feature =>
            operations.reduce<AccessMatrixItem>((obj, operation) => {
                const matchingItem = data.find(
                    item => item.Feature === feature && item.Operation === operation
                );
                obj[operation] = matchingItem ? matchingItem.AccessRoleId === 'ata' : false;
                return obj;
            }, { Feature: feature })
        )
    );

    const [aaAccessMatrix, setAaAccessMatrix] = useState<AccessMatrixItem[]>(
        features.map(feature =>
            operations.reduce<AccessMatrixItem>((obj, operation) => {
                const matchingItem = data.find(
                    item => item.Feature === feature && item.Operation === operation
                );
                obj[operation] = matchingItem ? matchingItem.AccessRoleId === 'aa' : false;
                return obj;
            }, { Feature: feature })
        )
    );

    const handleCheckboxChange = (feature: string, operation: string, isChecked: boolean, accessRole: string) => {
        if (accessRole === 'ata') {
            setAtaAccessMatrix(prevMatrix => {
                return prevMatrix.map(item => {
                    if (item.Feature === feature) {
                        item[operation] = isChecked;
                    }
                    return item;
                });
            });
        } else if (accessRole === 'aa') {
            setAaAccessMatrix(prevMatrix => {
                return prevMatrix.map(item => {
                    if (item.Feature === feature) {
                        item[operation] = isChecked;
                    }
                    return item;
                });
            });
        }
    };

    return (
        <div>
            <Typography variant="h5" gutterBottom>AccessRoleId Selector</Typography>
            <Select
                value={selectedAccessRole}
                onChange={(e) => setSelectedAccessRole(e.target.value as 'ata' | 'aa')}
            >
                <MenuItem value="ata">AccessRoleId: ata</MenuItem>
                <MenuItem value="aa">AccessRoleId: aa</MenuItem>
            </Select>

            {selectedAccessRole === 'ata' && (
                <div>
                    <Typography variant="h5" gutterBottom>AccessRoleId: ata</Typography>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Feature</TableCell>
                                    {operations.map(operation => (
                                        <TableCell key={operation}>{operation}</TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {ataAccessMatrix.map(item => (
                                    <TableRow key={item.Feature}>
                                        <TableCell>{item.Feature}</TableCell>
                                        {operations.map(operation => (
                                            <TableCell key={`${item.Feature}-${operation}`}>
                                                <label >
                                                    <Checkbox
                                                        checked={item[operation] as boolean}
                                                        onChange={e =>
                                                            handleCheckboxChange(item.Feature, operation, e.target.checked, 'ata')
                                                        }
                                                    />
                                                </label>
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            )}

            {selectedAccessRole === 'aa' && (
                <div>
                    <Typography variant="h5" gutterBottom>AccessRoleId: aa</Typography>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Feature</TableCell>
                                    {operations.map(operation => (
                                        <TableCell key={operation}>{operation}</TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {aaAccessMatrix.map(item => (
                                    <TableRow key={item.Feature}>
                                        <TableCell>{item.Feature}</TableCell>
                                        {operations.map(operation => (
                                            <TableCell key={`${item.Feature}-${operation}`}>
                                                <label>
                                                    <Checkbox
                                                        checked={item[operation] as boolean}
                                                        onChange={e =>
                                                            handleCheckboxChange(item.Feature, operation, e.target.checked, 'aa')
                                                        }
                                                    />
                                                </label>
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            )}
        </div>
    );
};

export default TestTable;
