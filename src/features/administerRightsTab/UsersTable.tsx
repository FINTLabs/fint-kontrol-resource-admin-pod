import { useUser } from "../../api/UserContext"
import { Button, Pagination, Select, Table } from "@navikt/ds-react"
import { LoaderStyled } from "../index"
import { IUser } from "../../api/types"
import React from "react"
import styled from "styled-components"
import { useNavigate } from "react-router-dom"
import { useGeneral } from "../../api/GeneralContext"

export const UsersTableStyled = styled(Table)`
	thead {
		th:nth-child(-n + 2) {
			width: 400px;
		}

		th:nth-child(2 + n) {
			width: 75px;
		}

		th:last-child {
			width: 125px;
		}
	}

	.loading-table {
		td {
			border-bottom: none;
		}
	}
`

const PaginationWrapper = styled.div`
	display: flex;
	justify-content: flex-end;
	align-items: flex-end;
	gap: 1rem;
`

export const UsersTable = () => {
	const { currentPage, isLoading, itemsPerPage, setCurrentPage, setItemsPerPage, usersPage } = useUser()
	const navigate = useNavigate()
	const { basePath } = useGeneral()

	const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLSelectElement | HTMLOptionElement>) => {
		setItemsPerPage(parseInt(event.target.value, 10))
		setCurrentPage(1)
	}

	return (
		<>
			<UsersTableStyled id="users-table-id">
				<Table.Header>
					<Table.Row>
						<Table.HeaderCell scope="col">Fult navn</Table.HeaderCell>
						<Table.HeaderCell scope="col">Epost</Table.HeaderCell>
						<Table.HeaderCell scope="col">Har tildeling</Table.HeaderCell>
						<Table.HeaderCell scope="col" align={"center"}>
							Administrer tildeling
						</Table.HeaderCell>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{isLoading ? (
						<Table.Row key={1} className="loading-table">
							<Table.DataCell colSpan={2}>
								<LoaderStyled size="3xlarge" title="Laster" className="loader" />
							</Table.DataCell>
						</Table.Row>
					) : (
						usersPage?.users.map((user: IUser, i: number) => (
							<Table.Row key={i}>
								<Table.DataCell>
									{user.firstName} {user.lastName}
								</Table.DataCell>
								<Table.DataCell>{user.userName}</Table.DataCell>
								<Table.DataCell>{user.roles && user.roles?.length > 0 ? "Ja" : "Nei"}</Table.DataCell>
								<Table.DataCell align={"center"}>
									<Button
										variant={"secondary"}
										onClick={() =>
											navigate(
												`${
													basePath === "/" ? "/" : basePath + "/"
												}ressurser-admin/tildelingsadmin/id/${user.resourceId}`
											)
										}
									>
										Administrer
									</Button>
								</Table.DataCell>
							</Table.Row>
						))
					)}
				</Table.Body>
			</UsersTableStyled>

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
