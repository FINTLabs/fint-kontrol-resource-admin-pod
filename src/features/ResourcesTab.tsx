import React, {useState} from 'react';
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    List,
    ListItem,
    ListItemText,
    Box,
    Paper
} from "@mui/material";
import ResourcesToolbar from "./ResourcesToolbar";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import Data from '../data/types';

interface Props {
    permissions: Data[];
}

const ResourcesTab = ({ permissions }: Props) => {
    const [openDialog, setOpenDialog] = useState(false);
    const [expanded, setExpanded] = useState(true);
    const [expandedRole, setExpandedRole] = useState(true);

    const initialListItems = ['Permission 1', 'Permission 2', 'Permission 3', 'Permission 4', 'Permission 5'];
    const initialListItemsB = ['Group 1', 'Group 2', 'Group 3', 'Group 4', 'Group 5'];

    const toggleAccordionRole = () => {
        setExpandedRole((prevExpanded) => !prevExpanded);
    };

    const toggleAccordion = () => {
        setExpanded((prevExpanded) => !prevExpanded);
    };

    return (
        <Box component={Paper}  sx={{minWidth: 1040, maxWidth: 1536}} id={"userTable"}>
            <ResourcesToolbar onShowDialog={() => setOpenDialog(true)}/>
            <div>
                <Accordion
                    expanded={expandedRole}
                    onChange={toggleAccordionRole}
                >
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography variant="h6">Selected permissions (AA or ATA)</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <List>
                            {permissions.map((item) => (
                                <ListItem key={item.Id}>
                                    <ListItemText primary={item.Feature} />
                                </ListItem>
                            ))}
                        </List>
                    </AccordionDetails>
                </Accordion>



                <Accordion
                    expanded={expanded}
                    onChange={toggleAccordion}
                >
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography variant="h6">Selected Groups (from tree)</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <List>
                            {initialListItemsB.map((item, index) => (
                                <ListItem key={index}>
                                    <ListItemText primary={item} />
                                </ListItem>
                            ))}
                        </List>
                    </AccordionDetails>
                </Accordion>
            </div>
        </Box>
    );
};

export default ResourcesTab;
