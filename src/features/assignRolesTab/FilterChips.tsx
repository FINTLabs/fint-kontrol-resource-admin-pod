import { Chips } from "@navikt/ds-react"
import React from "react"
import { useUser } from "../../api/UserContext"
import styled from "styled-components"

const FilterChipsContainer = styled.div`
	display: flex;
	justify-content: end;
`

const FilterChips = () => {
	const { orgUnitIds, roleFilter, searchString, setSearchString, setRoleFilter, setOrgUnitIdsFilter } = useUser()

	return (
		<FilterChipsContainer>
			<Chips>
				{orgUnitIds.length > 0 && (
					<Chips.Removable onClick={() => setOrgUnitIdsFilter([])}>Fjern orgenhetsfilter</Chips.Removable>
				)}
				{roleFilter.length > 0 && (
					<Chips.Removable onClick={() => setRoleFilter("")}>{roleFilter}</Chips.Removable>
				)}
				{searchString.length > 0 && (
					<Chips.Removable onClick={() => setSearchString("")}>{searchString}</Chips.Removable>
				)}
			</Chips>
		</FilterChipsContainer>
	)
}
export default FilterChips
