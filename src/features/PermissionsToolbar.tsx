import React from 'react';
import {FormControl, InputLabel, Select, MenuItem} from '@mui/material';
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";

interface ToolbarProps {
    selectedAccessRoleId: string,
    setSelectedAccessRoleId: (value: string) => void
}

const PermissionsToolbar = ({ selectedAccessRoleId, setSelectedAccessRoleId }: ToolbarProps) => {

    return (
        <Toolbar id={'rolesToolbar'}
                 sx={{
                     pl: { sm: 2 },
                     pr: { xs: 1, sm: 1 },
                 }}
        >

            <Typography
                sx={{ flex: '1 1 100%' }}
                variant="h6"
                id="tableTitle"
                component="div"
            >
                {selectedAccessRoleId?selectedAccessRoleId:'Choose a type to view:'}
            </Typography>


            <FormControl style={{minWidth: 220}} sx={{mx: '2rem', my: '1rem'}}>
                <InputLabel
                    id="valg-brukertype"
                >
                    Role
                </InputLabel>
                <Select
                    id="accessRoleSelect"
                    value={selectedAccessRoleId?selectedAccessRoleId:''}
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
