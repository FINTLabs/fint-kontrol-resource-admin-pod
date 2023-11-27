import { Button, Table } from "@navikt/ds-react"
import { IUser, IUserRole } from "../../../api/types"
import React from "react"

interface RoleOrgUnitAssociationTableProps {
	user: IUser | undefined
	toggleChangeModal: (assignmentToChange: IUserRole) => void
	toggleDeleteModal: (assignmentToChange: IUserRole) => void
	scopeFromUserRole: IUserRole | undefined
}
const RoleOrgunitAssociationTable = ({
	user,
	toggleChangeModal,
	toggleDeleteModal,
	scopeFromUserRole
}: RoleOrgUnitAssociationTableProps) => {
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
				{scopeFromUserRole ? (
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
							Rolle må velges for å vise data...
						</Table.DataCell>
					</Table.Row>
				)}
			</Table.Body>
		</Table>
	)
}

export default RoleOrgunitAssociationTable
