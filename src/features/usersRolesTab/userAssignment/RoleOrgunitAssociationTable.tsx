import { Button, Table } from "@navikt/ds-react"
import { IOrgUnitForScope, IRole, IScope, IUserRole } from "../../../api/types"
import React, { useState } from "react"
import DeleteOrgUnitInAssignment from "./modals/DeleteOrgUnitInAssignment"

interface RoleOrgUnitAssociationTableProps {
	toggleChangeModal: (assignmentToChange: IUserRole) => void
	toggleDeleteModal: (assignmentToChange: IUserRole) => void
	scopeFromUserRole: IUserRole | undefined
	selectedRole: IRole
	userId: string
	reFetchUserById: () => void
}
const RoleOrgunitAssociationTable = ({
	toggleChangeModal,
	toggleDeleteModal,
	scopeFromUserRole,
	selectedRole,
	userId,
	reFetchUserById
}: RoleOrgUnitAssociationTableProps) => {
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
	const [orgUnit, setOrgUnit] = useState<IOrgUnitForScope | undefined>()
	const [scopeId, setScopeId] = useState("")

	if (!scopeFromUserRole) {
		return <></>
	}

	const toggleDeleteOrgUnitModal = (scopeFromUserRole: IScope, orgUnit: IOrgUnitForScope) => {
		setOrgUnit(orgUnit)
		setScopeId(scopeFromUserRole.scopeId)
		setIsDeleteModalOpen(true)
	}

	return (
		<>
			{isDeleteModalOpen && orgUnit && (
				<DeleteOrgUnitInAssignment
					modalOpenProp={isDeleteModalOpen}
					setIsDeleteModalOpen={setIsDeleteModalOpen}
					roleToDeleteFrom={selectedRole.name}
					scopeId={scopeId}
					orgUnitToDelete={orgUnit}
					userId={userId}
					reFetchUserById={reFetchUserById}
				/>
			)}

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
										<Button
											variant={"danger"}
											onClick={() => toggleDeleteOrgUnitModal(scope, orgUnit)}
										>
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
		</>
	)
}

export default RoleOrgunitAssociationTable
