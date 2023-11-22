import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { Search, Table } from "@navikt/ds-react"
import { useUser } from "../../api/UserContext"
import { UsersTable, UsersTableStyled } from "./users-table"

const UsersWithRolesContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1rem;

	.search-container {
		width: fit-content;
		align-self: end;
	}
`

export const UsersRolesMain = () => {
	const { usersPage } = useUser()
	const { setSearchString } = useUser()
	const [currentSearchString, setCurrentSearchString] = useState<string>("")

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
			<UsersTable />
		</UsersWithRolesContainer>
	)
}

const CenteredDataCell = styled(Table.DataCell)`
	text-align: center;
`

const BlankTable = () => {
	return (
		<UsersTableStyled id="users-table-id">
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
