import { Loader, Pagination, Select, Table } from "@navikt/ds-react"
import React from "react"
import styled from "styled-components"
import { useUser } from "../../api/UserContext"
import { IAssignment, IUser } from "../../api/types"
import { useSafeTabChange } from "../../api/safe-tab-change-context"

const PaginationWrapper = styled.div`
	display: flex;
	justify-content: flex-end;
	align-items: flex-end;
	gap: 1rem;
`

const TableStyled = styled(Table)`
	thead {
		th:nth-child(n) {
			width: 33%;
		}
	}

	.loading-table {
		td {
			border-bottom: none;
		}
	}

	.selected-table-row {
		background-color: grey;

		:hover {
			background-color: transparent;
		}
	}
`

const LoaderWrapper = styled.div`
	width: 100%;
	text-align: center;
	padding: 5rem 0;
`

interface AssignUserRoleTableProps {
	newAssignment: IAssignment
	setNewAssignment: (updatedAssignment: IAssignment) => void
}

const AssignUserRoleTable = ({ newAssignment, setNewAssignment }: AssignUserRoleTableProps) => {
	const { itemsPerPage, setItemsPerPage, currentPage, setCurrentPage, isLoading, usersPage } = useUser()
	const { setIsTabModified } = useSafeTabChange()
	const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLSelectElement | HTMLOptionElement>) => {
		setItemsPerPage(parseInt(event.target.value, 10))
		setCurrentPage(1)
	}

	if (isLoading) {
		return (
			<LoaderWrapper>
				<Loader size="3xlarge" title="Venter..." />
			</LoaderWrapper>
		)
	}

	const handleSelectUser = (user: IUser) => {
		setNewAssignment({ ...newAssignment, user: user })
		setIsTabModified(true)
	}

	return (
		<>
			<TableStyled id={"rettigheter-table-delegation"}>
				<Table.Header>
					<Table.Row>
						<Table.HeaderCell>Navn</Table.HeaderCell>
						<Table.HeaderCell>Rolle</Table.HeaderCell>
						<Table.HeaderCell>Org-enhet</Table.HeaderCell>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{usersPage?.users.map((user, index) => (
						<Table.Row
							key={index}
							onClick={() => handleSelectUser(user)}
							selected={newAssignment.user?.resourceId === user.resourceId}
						>
							<Table.DataCell>{user.firstName + " " + user.lastName}</Table.DataCell>
							<Table.DataCell>Eksisterende rolletilknytning</Table.DataCell>
							<Table.DataCell>OrgEnhettilknytning</Table.DataCell>
						</Table.Row>
					))}
				</Table.Body>
			</TableStyled>

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
					count={Math.ceil((usersPage ? usersPage.totalItems : 1) / itemsPerPage)}
					size="small"
				/>
			</PaginationWrapper>
		</>
	)
}

export default AssignUserRoleTable
