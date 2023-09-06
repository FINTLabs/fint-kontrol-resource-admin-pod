import React from 'react';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {Button, FormControl, InputLabel, MenuItem, Select, Tooltip} from "@mui/material";
import {Apartment} from "@mui/icons-material";
import style from "../template/style";

interface CustomTableToolbarProps {
    onShowDialog: (event: React.MouseEvent<unknown>) => void;
}

function CustomTableToolbar(props:CustomTableToolbarProps) {
    const { onShowDialog } = props;
    // const { isAggregate, setIsAggregate } = useContext(RolesContext);
    // const [showLayers, setShowLayers] = useState(true);

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
                Some instructions here...
            </Typography>
            <FormControl style={{minWidth: 220}} sx={{mx: '2rem', my: '1rem'}}>
                <InputLabel
                    id="valg-brukertype"
                >
                    Role
                </InputLabel>
                <Select
                    id="accessRoleSelect"
                    // value={selectedAccessRoleId}
                    // onChange={(e) => setSelectedAccessRoleId(e.target.value as string)}
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

            <Tooltip title={"Select Units"}>
                <Button
                    id={'selectUnitsIcon'}
                    variant="outlined"
                    endIcon={<Apartment/>}
                    onClick={onShowDialog}
                    sx={style.changeOrgButton}
                    style={{ fontSize: '1em' }}
                >
                    Velg enhet
                </Button>
            </Tooltip>
        </Toolbar>
    );
}

export default CustomTableToolbar;
