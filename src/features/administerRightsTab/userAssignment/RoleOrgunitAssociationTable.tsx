import { Button, Pagination, Select, Table } from "@navikt/ds-react"
import { TrashIcon } from "@navikt/aksel-icons"
import { IOrgUnitForScope, IRole, IScope, IUserRole } from "../../../api/types"
import React, { useState } from "react"
import DeleteOrgUnitInAssignment from "./modals/DeleteOrgUnitInAssignment"
import styled from "styled-components"
import { useAssignments } from "../../../api/AssignmentContext"

const ButtonStyled = styled(Button)`
	color: var(--a-nav-red);
	box-shadow: inset 0 0 0 2px var(--ac-button-secondary-border, var(--ac-button-danger-bg, var(--a-surface-danger)));

	&:hover {
		color: var(--ac-button-danger-text, var(--a-text-on-danger));
		background-color: var(--ac-button-danger-hover-bg, var(--a-surface-danger-hover));
	}
`

const PaginationWrapper = styled.div`
	display: flex;
	justify-content: flex-end;
	align-items: flex-end;
	gap: 1rem;
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
	const { itemsPerPage, setItemsPerPage, currentPage, setCurrentPage, userDetailsPage } = useAssignments()
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

	const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLSelectElement | HTMLOptionElement>) => {
		setItemsPerPage(parseInt(event.target.value, 10))
		setCurrentPage(1)
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

			<PaginationWrapper>
				<Select
					label="Rader per side"
					size="small"
					onChange={handleChangeRowsPerPage}
					defaultValue={itemsPerPage}
				>
					<option value={5}>5</option>
					<option value={10}>10</option>
					<option value={25}>25</option>
					<option value={50}>50</option>
				</Select>
				<Pagination
					id="pagination"
					page={currentPage}
					onPageChange={setCurrentPage}
					count={Math.ceil((userDetailsPage ? userDetailsPage.totalItems : 1) / itemsPerPage)}
					size="small"
				/>
			</PaginationWrapper>
		</>
	)
}

export default RoleOrgunitAssociationTable
