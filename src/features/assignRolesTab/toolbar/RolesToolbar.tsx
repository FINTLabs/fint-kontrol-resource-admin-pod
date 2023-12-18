import styled from "styled-components"
import React, { useEffect, useState } from "react"
import { Search, Select } from "@navikt/ds-react"
import { useRole } from "../../../api/RoleContext"
import { useUser } from "../../../api/UserContext"
import OrgUnitFilterModal from "./orgUnitFilter/OrgUnitFilterModal"

const ToolbarContainer = styled.div`
	display: flex;
	justify-content: flex-end;
	align-items: end;
	gap: 2rem;

	width: 100%;
`

const RolesToolbar = () => {
	const { searchString, roleFilter, setSearchString, setRoleFilter, setOrgUnitIdsFilter } = useUser()
	const { roles } = useRole()
	const [currentSearchString, setCurrentSearchString] = useState<string>(searchString)

	useEffect(() => {
		setSearchString("")
		setCurrentSearchString("")
	}, [searchString, setSearchString])

	const handleChangeOrgUnitFilter = (orgUnitsFromFilter: string[]) => {
		setOrgUnitIdsFilter(orgUnitsFromFilter)
	}

	const handleUpdateSelectedRoleFilter = (param: string) => {
		setRoleFilter(param)
	}

	const triggerSearchString = (event?: React.FormEvent<HTMLFormElement>) => {
		if (event) {
			event.preventDefault() // This is to prevent complete page rerender on submit.
		}
		setSearchString(currentSearchString)
	}

	return (
		<ToolbarContainer id={"toolbar-id"}>
			<OrgUnitFilterModal
				handleChangeOrgUnitFilter={(orgUnitsFromFilter) => handleChangeOrgUnitFilter(orgUnitsFromFilter)}
			/>

			<Select
				label="Rollefilter"
				size={"medium"}
				onChange={(e) => handleUpdateSelectedRoleFilter(e.target.value)}
				id={"role-filter"}
				value={roleFilter}
			>
				<option value="">Alle</option>
				{roles.map((role) => (
					<option value={role.accessRoleId} key={role.accessRoleId}>
						{role.name}
					</option>
				))}
			</Select>

			<div>
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
		</ToolbarContainer>
	)
}

export default RolesToolbar
