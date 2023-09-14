import React, { useState } from "react";
import {
    Button,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { TreeView } from '@mui/x-tree-view/TreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import { useOrgUnits } from "../data/OrgUnitContext";
import { OrgUnit } from "../data/types";

interface DialogUnitProps {
    open: boolean;
    onClose: (selected: OrgUnit[]) => void;
}

function UnitSelectDialog({ open, onClose }: DialogUnitProps) {
    // const [selected, setSelected] = useState<OrgUnit[]>([]); // Store OrgUnit objects
    const { orgUnitsData, setSelectedOrgUnits, selectedOrgUnits } = useOrgUnits();

    const customDialogStyle: React.CSSProperties = {
        width: '600px',
        padding: '20px',
        borderRadius: '10px',
        backgroundColor: '#fff',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    };

    const handleClose = () => {
        onClose([]);
    };

    const handleSave = () => {
        setSelectedOrgUnits(selectedOrgUnits); // Use the setSelectedOrgUnits function directly with OrgUnit objects
        onClose(selectedOrgUnits);

        console.log('Selected OrgUnits:', selectedOrgUnits);
    };

    const toggleOrgUnit = (orgUnit: OrgUnit) => {
        const isSelected = selectedOrgUnits.some(unit => unit.organisationUnitId === orgUnit.organisationUnitId);
        const newSelected = isSelected
            ? selectedOrgUnits.filter(unit => unit.organisationUnitId !== orgUnit.organisationUnitId)
            : [...selectedOrgUnits, orgUnit];

        setSelectedOrgUnits(newSelected);
    };

    const renderTree = (nodes: OrgUnit) => {
        return (
            <TreeItem
                key={nodes.organisationUnitId}
                nodeId={nodes.organisationUnitId.toString()} // Ensure nodeId is a string
                label={
                    <React.Fragment>
                        <Checkbox
                            id={`node-${nodes.organisationUnitId}`}
                            checked={selectedOrgUnits.some(unit => unit.organisationUnitId === nodes.organisationUnitId)}
                            onClick={(event) => {
                                event.stopPropagation();
                                toggleOrgUnit(nodes);
                            }}
                        />
                        {nodes.name}
                    </React.Fragment>
                }
            >
                {Array.isArray(nodes.childrenRef)
                    ? nodes.childrenRef.map((nodeId: string) => {
                        const node = orgUnitsData?.orgUnits.find(
                            (n) => n.organisationUnitId === nodeId
                        );
                        if (node) {
                            return renderTree(node);
                        }
                        return null;
                    })
                    : null}
            </TreeItem>
        );
    };

    return (
        <Dialog id={'unitsSelectDialog'} open={open} onClose={handleClose} sx={{ '& .MuiPaper-root': customDialogStyle }}>
            <DialogTitle>Velg enhet(er)</DialogTitle>
            <DialogContent>
                <TreeView
                    defaultCollapseIcon={<ExpandMoreIcon id={'expandMoreIcon'} />}
                    defaultExpandIcon={<ChevronRightIcon id={'expandIcon'} />}
                >
                    {orgUnitsData?.orgUnits?.map((node: any) => {
                        if (node.parentRef !== node.organisationUnitId) {
                            return null;
                        }
                        return renderTree(node);
                    })}
                </TreeView>
            </DialogContent>
            <DialogActions>
                <Button id={'regretDialog'} onClick={handleClose}>Avbryt</Button>
                <Button id={'closeDialog'} onClick={handleSave}>Lagre</Button>
            </DialogActions>
        </Dialog>
    );
}

export default UnitSelectDialog;
