import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { Search, Table } from "@navikt/ds-react"
import { useUser } from "../../api/UserContext"
import { UsersTable, UsersTableStyled } from "./UsersTable"
import { useGeneral } from "../../api/GeneralContext"
import { useLocation } from "react-router-dom"

const UsersWithRolesContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1rem;

	.search-container {
		width: fit-content;
		align-self: end;
	}
`
interface UserRolesMainProps {
	handlePagination: (newPage: number) => void
}
export const UsersRolesMain = ({ handlePagination }: UserRolesMainProps) => {
	const { basePath } = useGeneral()
	const { currentPage, usersPage, getUsersPage, itemsPerPage, orgUnitIds, searchString, setCurrentPage, roleFilter } =
		useUser()
	const { setSearchString } = useUser()

	const [currentSearchString, setCurrentSearchString] = useState<string>("")

	const location = useLocation()
	const searchParams = new URLSearchParams(location.search)
	const page = searchParams.get("page")

	useEffect(() => {
		if (page) {
			setCurrentPage(Number(page))
		} else {
			setCurrentPage(1)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	useEffect(() => {
		getUsersPage()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [basePath, currentPage, itemsPerPage, orgUnitIds, searchString, roleFilter])

	useEffect(() => {
		setSearchString("")
	}, [setSearchString])

	if (!usersPage) {
		return <BlankTable />
	}

	const triggerSearchString = (event?: React.FormEvent<HTMLFormElement>) => {
		if (event) {
			event.preventDefault() // This is to prevent complete page rerender on submit.
		}
		setSearchString(currentSearchString)
	}

	return (
		<UsersWithRolesContainer>
			<div className={"search-container"}>
				<form onSubmit={(event) => triggerSearchString(event)}>
					<Search
						value={currentSearchString}
						onChange={(currentValue) => setCurrentSearchString(currentValue)}
						onSearchClick={() => triggerSearchString()}
						label="Søk på personnavn"
						hideLabel={false}
						variant="secondary"
					/>
				</form>
			</div>
			<UsersTable handlePagination={handlePagination} />
		</UsersWithRolesContainer>
	)
}

const CenteredDataCell = styled(Table.DataCell)`
	text-align: center;
`

const BlankTable = () => {
	return (
		<UsersTableStyled id="users-table">
			<Table.Header>
				<Table.Row>
					<Table.HeaderCell scope="col">Ressurs</Table.HeaderCell>
					<Table.HeaderCell scope="col">Type</Table.HeaderCell>
					<Table.HeaderCell scope="col" align="right">
						Antall totalt
					</Table.HeaderCell>
					<Table.HeaderCell scope="col" align="right">
						Antall i bruk
					</Table.HeaderCell>
					<Table.HeaderCell scope="col"></Table.HeaderCell>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				<Table.Row key={1} className="loading-table">
					<CenteredDataCell colSpan={5}>Tabellen ser ut til å være tom eller udefinert</CenteredDataCell>
				</Table.Row>
			</Table.Body>
		</UsersTableStyled>
	)
}
