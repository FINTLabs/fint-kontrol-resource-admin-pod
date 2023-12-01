import { Button, Table } from "@navikt/ds-react"
import { TrashIcon } from "@navikt/aksel-icons"
import { IOrgUnitForScope, IRole, IScope, IUserRole } from "../../../api/types"
import React, { useState } from "react"
import DeleteOrgUnitInAssignment from "./modals/DeleteOrgUnitInAssignment"
import styled from "styled-components"

const ButtonStyled = styled(Button)`
	color: var(--a-nav-red);
	box-shadow: inset 0 0 0 2px var(--ac-button-secondary-border, var(--ac-button-danger-bg, var(--a-surface-danger)));

	&:hover {
		color: var(--ac-button-danger-text, var(--a-text-on-danger));
		background-color: var(--ac-button-danger-hover-bg, var(--a-surface-danger-hover));
	}
`

interface RoleOrgUnitAssociationTableProps {
	toggleChangeModal: (assignmentToChange: IUserRole) => void
	toggleDeleteModal: (assignmentToChange: IUserRole) => void
	scopeFromUserRole: IUserRole | undefined
	selectedRole: IRole
	userId: string
}
const RoleOrgunitAssociationTable = ({
	toggleChangeModal,
	toggleDeleteModal,
	scopeFromUserRole,
	selectedRole,
	userId
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
										<ButtonStyled
											variant={"secondary"}
											onClick={() => toggleDeleteOrgUnitModal(scope, orgUnit)}
											icon={<TrashIcon title="a11y-title" fontSize="1.5rem" />}
											iconPosition={"right"}
										>
											Slett
										</ButtonStyled>
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
