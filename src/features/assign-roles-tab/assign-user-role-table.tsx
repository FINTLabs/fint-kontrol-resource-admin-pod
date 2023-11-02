import { Loader, Pagination, Select, Table } from "@navikt/ds-react"
import { IUserListToBeReplaced } from "../../api/types"
import React from "react"
import styled from "styled-components"
import { useUser } from "../../api/UserContext"

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
`

const LoaderWrapper = styled.div`
	width: 100%;
	text-align: center;
	padding: 5rem 0;
`

const AssignUserRoleTable = () => {
	const { itemsPerPage, setItemsPerPage, currentPage, setCurrentPage, isLoading, usersPage } = useUser()
	console.log(usersPage)
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

	return (
		<>
			<TableStyled>
				<Table.Header>
					<Table.Row>
						<Table.HeaderCell>Navn</Table.HeaderCell>
						<Table.HeaderCell>Rolle</Table.HeaderCell>
						<Table.HeaderCell>Org-enhet</Table.HeaderCell>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{usersPage?.users.map((user) => (
						<Table.Row>
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
