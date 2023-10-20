import React, {useState} from "react";
import {PermissionsToolbarComponent} from "./permissions-toolbar.component";
import {PermissionsTableComponent} from "./permissions-table.component";
import {Table, Checkbox} from "@navikt/ds-react";
import {useRole} from "../../data/RoleContext";
import {IRole} from "../../data/types";
import styled from "styled-components";

export interface Availability {
    [key: string]: boolean;
}

export const TableStyled = styled(Table)`
    thead {
        th:first-child {
            width: 250px;
        }
    }
    .loading-table {
        td {
            border-bottom: none;
        }
    }
`
export const PermissionMainComponent = () => {
    const [localSelectedAccessRoleId, setLocalSelectedAccessRoleId] = useState<string>('');

    const { roles } = useRole(); // Retrieves all roles the user can administer

    const filteredPermissions = localSelectedAccessRoleId
        ? roles.filter((roles) => roles.AccessRoleId === localSelectedAccessRoleId)
        : [];

    // Extract unique features and operations
    const features = Array.from(new Set(filteredPermissions.map((item: IRole) => item.Feature)));
    const operations = Array.from(new Set(filteredPermissions.map((item: IRole) => item.Operation)));

    // Create a data structure to store availability
    const availabilityData: { feature: string; availability: Availability }[] = features.map(
        (feature: string) => {
            const availability: Availability = {};
            operations.forEach((operation: string) => {
                availability[operation] = filteredPermissions.some(
                    (item: IRole) => item.Feature === feature && item.Operation === operation
                );
            });

            return { feature, availability };
        }
    );

    return (
        <>
            <PermissionsToolbarComponent
                selectedAccessRoleId={localSelectedAccessRoleId}
                setSelectedAccessRoleId={setLocalSelectedAccessRoleId}
            />
            {localSelectedAccessRoleId
                ? <PermissionsTableComponent operations={operations} availabilityData={availabilityData} />
                : <BlankTable /> // Render the blank table when no accessRoleId is selected
            }
        </>
    )
}

const BlankTable = () => {
    // Create an array to generate 4 empty rows and 4 empty cells for user display
    const blankData = Array.from({ length: 4 }, (_, rowIdx) => (
        <Table.Row key={rowIdx} >
            <Table.DataCell key={0}></Table.DataCell>
            {Array.from({ length: 4 }, (_, colIdx) => (
                <Table.DataCell key={colIdx}><Checkbox hideLabel={true} disabled={true}>filler</Checkbox></Table.DataCell>
            ))}
        </Table.Row>
    ));

    return (
        <TableStyled>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Feature</Table.HeaderCell>
                    <Table.HeaderCell>VISNING</Table.HeaderCell>
                    <Table.HeaderCell>REDIGERE</Table.HeaderCell>
                    <Table.HeaderCell>LAGE</Table.HeaderCell>
                    <Table.HeaderCell>SLETTE</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>{blankData}</Table.Body>
        </TableStyled>
    );
};