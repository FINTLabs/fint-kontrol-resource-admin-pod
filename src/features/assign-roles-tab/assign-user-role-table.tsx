import { Table } from "@navikt/ds-react"

const AssignUserRoleTable = () => {
	return (
		<Table>
			<Table.Header>
				<Table.Row>
					<Table.HeaderCell>Navn</Table.HeaderCell>
					<Table.HeaderCell>Rolle</Table.HeaderCell>
					<Table.HeaderCell>Org-enhet</Table.HeaderCell>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				<Table.Row>
					<Table.DataCell>Navn Navnesen</Table.DataCell>
					<Table.DataCell>AdminRolleForNoe</Table.DataCell>
					<Table.DataCell>Omega</Table.DataCell>
				</Table.Row>
			</Table.Body>
		</Table>
	)
}

export default AssignUserRoleTable
