import {Table} from "@navikt/ds-react";

const AssignUserRoleTable = () => {


    return (
        <Table>
            <Table.Header>
                <Table.HeaderCell>Navn</Table.HeaderCell>
                <Table.HeaderCell>Rolle</Table.HeaderCell>
                <Table.HeaderCell>Org-enhet</Table.HeaderCell>
            </Table.Header>
            <Table.Body>
                <Table.DataCell>Navn Navnesen</Table.DataCell>
                <Table.DataCell>AdminRolleForNoe</Table.DataCell>
                <Table.DataCell>Omega</Table.DataCell>
            </Table.Body>
        </Table>
    )
}

export default AssignUserRoleTable