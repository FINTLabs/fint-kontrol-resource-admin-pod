import React, { useState } from "react";
import {
    Button,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControlLabel,
    Switch,
} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { TreeView } from '@mui/x-tree-view/TreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import { useOrgUnits } from "../data/OrgUnitContext";
import { OrgUnit } from "../data/types";

interface DialogUnitProps {
    open: boolean;
    onClose: () => void;
}

function UnitSelectDialog({ open, onClose }: DialogUnitProps) {
    const { orgUnitsData, setSelectedOrgUnits, selectedOrgUnits } = useOrgUnits();
    const [aggregated, setAggregated] = useState(false);

    const customDialogStyle: React.CSSProperties = {
        width: '600px',
        padding: '20px',
        borderRadius: '10px',
        backgroundColor: '#fff',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    };

    const handleClose = () => {
        onClose();
    };

    // const handleSave = () => {
    //     setSelectedOrgUnits(selectedOrgUnits);
    //     onClose(selectedOrgUnits);
    //     console.log('Selected OrgUnits:', selectedOrgUnits);
    // };

    const toggleOrgUnit = (orgUnit: OrgUnit) => {
        const isSelected = selectedOrgUnits.some(unit => unit.organisationUnitId === orgUnit.organisationUnitId);
        let newSelected;

        if (isSelected) {
            // If the orgUnit is already selected, remove it
            newSelected = selectedOrgUnits.filter(unit => unit.organisationUnitId !== orgUnit.organisationUnitId);
        } else {
            // If the orgUnit is not selected, add it (if it doesn't already exist)
            if (!selectedOrgUnits.some(unit => unit.organisationUnitId === orgUnit.organisationUnitId)) {
                newSelected = [...selectedOrgUnits, orgUnit];
            } else {
                // It's already in the selectedOrgUnits array, no need to do anything
                newSelected = selectedOrgUnits;
            }
        }

        setSelectedOrgUnits(newSelected);
    };

    const handleAggregationToggle = () => {
        setAggregated(!aggregated);
    };

    const handleCheckboxClick = (orgUnit: OrgUnit) => {

        if (aggregated) {
            toggleOrgUnitAndChildren(orgUnit);
        } else {
            toggleOrgUnit(orgUnit);
        }
    };

    const toggleOrgUnitAndChildren = (orgUnit: OrgUnit) => {
        const isSelected = selectedOrgUnits.some(unit => unit.organisationUnitId === orgUnit.organisationUnitId);
        let newSelected = [...selectedOrgUnits];

        // Toggle the selectedOrgUnit
        if (isSelected) {
            newSelected = selectedOrgUnits.filter(unit => unit.organisationUnitId !== orgUnit.organisationUnitId);
        } else {
            if (!selectedOrgUnits.some(unit => unit.organisationUnitId === orgUnit.organisationUnitId)) {
                newSelected.push(orgUnit);
            }
        }

        // Toggle the children
        const childrenOrgUnits = findChildrenOrgUnits(orgUnit);
        for (const childOrgUnit of childrenOrgUnits) {
            if (isSelected) {
                newSelected = newSelected.filter(unit => unit.organisationUnitId !== childOrgUnit.organisationUnitId);
            } else {
                if (!newSelected.some(unit => unit.organisationUnitId === childOrgUnit.organisationUnitId)) {
                    newSelected.push(childOrgUnit);
                }
            }
        }

        setSelectedOrgUnits(newSelected);
    };

    const findChildrenOrgUnits = (orgUnit: OrgUnit): OrgUnit[] => {
        const childrenOrgUnits: OrgUnit[] = [];

        const findChildren = (node: OrgUnit) => {
            if (Array.isArray(node.childrenRef)) {
                for (const nodeId of node.childrenRef) {
                    const childNode = orgUnitsData?.orgUnits.find((n) => n.organisationUnitId === nodeId);
                    if (childNode) {
                        childrenOrgUnits.push(childNode);
                        findChildren(childNode);
                    }
                }
            }
        };

        findChildren(orgUnit);
        return childrenOrgUnits;
    };

    const renderTree = (nodes: OrgUnit) => {
        return (
            <TreeItem
                key={nodes.organisationUnitId}
                nodeId={nodes.organisationUnitId.toString()}
                label={
                    <React.Fragment>
                        <Checkbox
                            id={`node-${nodes.organisationUnitId}`}
                            checked={selectedOrgUnits.some(unit => unit.organisationUnitId === nodes.organisationUnitId)}
                            onClick={(event) => {
                                event.stopPropagation();
                                handleCheckboxClick(nodes)
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
                <div>
                    <FormControlLabel
                        control={<Switch />}
                        label="Aggregated"
                        checked={aggregated}
                        onChange={handleAggregationToggle}
                        id="aggregatedCheckbox"
                    />

                </div>
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
                <Button id={'closeDialog'} onClick={onClose}>Ferdig</Button>
            </DialogActions>
        </Dialog>
    );
}

export default UnitSelectDialog;
