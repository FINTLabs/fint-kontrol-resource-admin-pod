import React from 'react';
import {FormControl, InputLabel, Select, MenuItem, IconButton, Button} from '@mui/material';
import Typography from "@mui/material/Typography";
import SaveIcon from "@mui/icons-material/Save";
import Toolbar from "@mui/material/Toolbar";
import { useRole } from '../data/RoleContext'; // Replace with the actual import path to your data context

interface ToolbarProps {
    selectedAccessRoleId: string,
    setSelectedAccessRoleId: (value: string) => void,
    hasUpdates: number
}

const PermissionsToolbar = ({ selectedAccessRoleId, setSelectedAccessRoleId , hasUpdates }: ToolbarProps) => {
    //const { selectedAccessRoleId, setSelectedAccessRoleId } = useRole();

    return (
        <Toolbar id={'rolesToolbar'}
                 sx={{
                     pl: { sm: 2 },
                     pr: { xs: 1, sm: 1 },
                 }}
        >

            {hasUpdates > 0 ? (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    variant="h6"
                    id="tableTitle"
                    component="div"
                >{hasUpdates} records changed.
                    <Button
                        component="label"
                        variant="outlined"
                        startIcon={<SaveIcon />}
                        sx={{ marginLeft: '16px' }}
                    >
                       Save Changes
                    </Button>
                </Typography>
            ) : (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    variant="h6"
                    id="tableTitle"
                    component="div"
                >
                    Choose a type to view:
                </Typography>
            )}



            <FormControl style={{minWidth: 220}} sx={{mx: '2rem', my: '1rem'}}>
                <InputLabel
                    id="valg-brukertype"
                >
                    Role
                </InputLabel>
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
        </Toolbar>
    );
};

export default PermissionsToolbar;
