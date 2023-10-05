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
import { Accordion } from "@navikt/ds-react";
import { useOrgUnits } from "../data/OrgUnitContext";
import { IOrgUnit } from "../data/types";

interface DialogUnitProps {
    open: boolean;
    onClose: () => void;
}

function UnitSelectDialog({ open, onClose }: DialogUnitProps) {
    const { orgUnitsData, setSelectedOrgUnits, selectedOrgUnits } = useOrgUnits();
    const [aggregated, setAggregated] = useState(false);

    const customDialogStyle: React.CSSProperties = {
        width: "600px",
        padding: "20px",
        borderRadius: "10px",
        backgroundColor: "#fff",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    };

    const handleClose = () => {
        onClose();
    };

    const toggleOrgUnit = (orgUnit: IOrgUnit) => {
        const isSelected = selectedOrgUnits.some(
            (unit) => unit.organisationUnitId === orgUnit.organisationUnitId
        );
        let newSelected;

        if (isSelected) {
            newSelected = selectedOrgUnits.filter(
                (unit) => unit.organisationUnitId !== orgUnit.organisationUnitId
            );
        } else {
            if (!selectedOrgUnits.some((unit) => unit.organisationUnitId === orgUnit.organisationUnitId)) {
                newSelected = [...selectedOrgUnits, orgUnit];
            } else {
                newSelected = selectedOrgUnits;
            }
        }

        setSelectedOrgUnits(newSelected);
    };

    const handleAggregationToggle = () => {
        setAggregated(!aggregated);
    };

    const handleCheckboxClick = (orgUnit: IOrgUnit) => {
        if (aggregated) {
            toggleOrgUnitAndChildren(orgUnit);
        } else {
            toggleOrgUnit(orgUnit);
        }
    };

    const toggleOrgUnitAndChildren = (orgUnit: IOrgUnit) => {
        const isSelected = selectedOrgUnits.some(
            (unit) => unit.organisationUnitId === orgUnit.organisationUnitId
        );
        let newSelected = [...selectedOrgUnits];

        if (isSelected) {
            newSelected = selectedOrgUnits.filter(
                (unit) => unit.organisationUnitId !== orgUnit.organisationUnitId
            );
        } else {
            if (!selectedOrgUnits.some((unit) => unit.organisationUnitId === orgUnit.organisationUnitId)) {
                newSelected.push(orgUnit);
            }
        }

        const childrenOrgUnits = findChildrenOrgUnits(orgUnit);
        for (const childOrgUnit of childrenOrgUnits) {
            if (isSelected) {
                newSelected = newSelected.filter(
                    (unit) => unit.organisationUnitId !== childOrgUnit.organisationUnitId
                );
            } else {
                if (!newSelected.some((unit) => unit.organisationUnitId === childOrgUnit.organisationUnitId)) {
                    newSelected.push(childOrgUnit);
                }
            }
        }

        setSelectedOrgUnits(newSelected);
    };

    const findChildrenOrgUnits = (orgUnit: IOrgUnit): IOrgUnit[] => {
        const childrenOrgUnits: IOrgUnit[] = [];

        const findChildren = (node: IOrgUnit) => {
            if (Array.isArray(node.childrenRef)) {
                for (const nodeId of node.childrenRef) {
                    const childNode = orgUnitsData?.orgUnits.find(
                        (n) => n.organisationUnitId === nodeId
                    );
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

    const renderTree = (nodes: IOrgUnit) => {
        return (
            <Accordion key={nodes.organisationUnitId}>
                <Accordion.Item>
                    <Accordion.Header>
                        <Checkbox
                            id={`node-${nodes.organisationUnitId}`}
                            checked={selectedOrgUnits.some(
                                (unit) => unit.organisationUnitId === nodes.organisationUnitId
                            )}
                            onClick={(event) => {
                                event.stopPropagation();
                                handleCheckboxClick(nodes);
                            }}
                        />
                        {nodes.name}
                    </Accordion.Header>
                    <Accordion.Content>
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
                    </Accordion.Content>
                </Accordion.Item>
            </Accordion>
        );
    };

    return (
        <Dialog id={"unitsSelectDialog"} open={open} onClose={handleClose} sx={{ '& .MuiPaper-root': customDialogStyle }}>
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
                {orgUnitsData?.orgUnits?.map((node: any) => {
                    if (node.parentRef !== node.organisationUnitId) {
                        return null;
                    }
                    return renderTree(node);
                })}
            </DialogContent>
            <DialogActions>
                <Button id={"closeDialog"} onClick={onClose}>
                    Ferdig
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default UnitSelectDialog;
