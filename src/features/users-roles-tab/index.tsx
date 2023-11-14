import React from "react"
import styled from "styled-components"
import { Table } from "@navikt/ds-react"
import { useUser } from "../../api/UserContext"
import { UsersTable, UsersTableStyled } from "./users-table"

const UsersWithRolesContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1rem;
`

export const UsersRolesMain = () => {
	const { usersPage } = useUser()

	if (!usersPage) {
		return <BlankTable />
	}

	return (
		<UsersWithRolesContainer>
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
