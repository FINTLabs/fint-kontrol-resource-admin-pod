import { Button, Table } from "@navikt/ds-react"
import { IUserRole } from "../../../api/types"
import React from "react"

interface RoleOrgUnitAssociationTableProps {
	toggleChangeModal: (assignmentToChange: IUserRole) => void
	toggleDeleteModal: (assignmentToChange: IUserRole) => void
	scopeFromUserRole: IUserRole | undefined
}
const RoleOrgunitAssociationTable = ({
	toggleChangeModal,
	toggleDeleteModal,
	scopeFromUserRole
}: RoleOrgUnitAssociationTableProps) => {
	if (!scopeFromUserRole) {
		return <></>
	}
	return (
		<Table>
			<Table.Header>
				<Table.Row>
					<Table.HeaderCell>Objekttype</Table.HeaderCell>
					<Table.HeaderCell>Orgenhet</Table.HeaderCell>
					<Table.HeaderCell align={"center"}>Slett</Table.HeaderCell>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{scopeFromUserRole?.scopes.length !== 0 ? (
					scopeFromUserRole.scopes.map((scope) =>
						scope.orgUnits.map((orgUnit) => (
							<Table.Row key={scope + "," + orgUnit.orgUnitId}>
								<Table.DataCell>{scope.objectType}</Table.DataCell>
								<Table.DataCell>{orgUnit.shortName}</Table.DataCell>
								<Table.DataCell align={"center"}>
									<Button variant={"danger"} onClick={() => toggleDeleteModal(scopeFromUserRole)}>
										Slett
									</Button>
								</Table.DataCell>
							</Table.Row>
						))
					)
				) : (
					<Table.Row>
						<Table.DataCell align={"center"} colSpan={4}>
							Det fins ingen objekter knyttet til denne rollen.
						</Table.DataCell>
					</Table.Row>
				)}
			</Table.Body>
		</Table>
	)
}

export default RoleOrgunitAssociationTable
