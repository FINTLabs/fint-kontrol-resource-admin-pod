import {IOrgUnit} from "../../api/types";
import {useOrgUnits} from "../../api/OrgUnitContext";
import React, {useState} from "react";
import {Accordion} from "@navikt/ds-react";
import {Checkbox} from "@mui/material";

interface OrgUnitTreeProps {
    nodes?: IOrgUnit,
    setOrgUnitsForUser: (newSelected: any) => void,
}
const OrgUnitTree = ({ nodes: IOrgUnit, setOrgUnitsForUser }: OrgUnitTreeProps) => {
    const { orgUnitsData, selectedOrgUnits} = useOrgUnits();

    const [aggregated, setAggregated] = useState(false);

    const toggleOrgUnit = (orgUnit: IOrgUnit) => {
        const isSelected = selectedOrgUnits.some(
            (unit) => unit.organisationUnitId === orgUnit.organisationUnitId
        );
        let newSelected: IOrgUnit[];

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

        setOrgUnitsForUser(newSelected); // Updates list of selected org units
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

        setOrgUnitsForUser(newSelected); // Updates list of selected org units
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

    const handleCheckboxClick = (orgUnit: IOrgUnit) => {
        if (aggregated) {
            toggleOrgUnitAndChildren(orgUnit);
        } else {
            toggleOrgUnit(orgUnit);
        }
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
        )
    }

    return (
        <>
            {orgUnitsData?.orgUnits?.map((node: any) => {
                if (node.parentRef !== node.organisationUnitId) {
                    return null;
                }
                return renderTree(node);
            })}
        </>
    )
}


export default OrgUnitTree