import React from "react";
import {Availability, TableStyled} from "./main";
import { Checkbox, Table } from "@navikt/ds-react";


interface PermissionsTableComponentProps {
    operations: string[]
    availabilityData: {feature: string, availability: Availability}[]
}
export const PermissionsTable = ({operations, availabilityData}: PermissionsTableComponentProps) => {

    const handleCheckboxChange = (feature: string, operation: string, isChecked: boolean) => {
        const updatedAvailabilityData = [...availabilityData];
        const targetFeature = updatedAvailabilityData.find((item) => item.feature === feature);

        if (targetFeature) {
            targetFeature.availability[operation] = isChecked;
        }
    };

    return (
        <TableStyled>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Feature</Table.HeaderCell>
                    {operations.map((operation) => (
                        <Table.HeaderCell key={operation}>{operation}</Table.HeaderCell>
                    ))}
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {availabilityData.map(({ feature, availability }) => (
                    <Table.Row key={feature}>
                        <Table.DataCell>{feature}</Table.DataCell>
                        {operations.map((operation: string) => (
                            <Table.DataCell key={operation} id={String(availability[operation])}>
                                {availability[operation] && (
                                    // TODO: Determine how checkboxes should be visible and editable.
                                    <Checkbox
                                        hideLabel={true}
                                        checked={availability[operation]}
                                        color={'primary'}
                                        onChange={(e) =>
                                            handleCheckboxChange(feature, operation, e.target.checked)
                                        }
                                    >
                                        {operation}
                                    </Checkbox>
                                )}
                            </Table.DataCell>
                        ))}
                    </Table.Row>
                ))}
            </Table.Body>
        </TableStyled>
    )
}