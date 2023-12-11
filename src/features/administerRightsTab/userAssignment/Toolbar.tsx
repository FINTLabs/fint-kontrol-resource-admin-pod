import { HStack, Search, Select } from "@navikt/ds-react"
import styled from "styled-components"
import { useAssignments } from "../../../api/AssignmentContext"
import { useState } from "react"

const HStackStyled = styled(HStack)`
	flex-direction: row;
	flex-wrap: nowrap;
	align-items: end;
	gap: 2rem;
`

const Toolbar = () => {
	const { setObjectTypeFilter, setOrgUnitSearchString } = useAssignments()
	const objectTypes = ["License", "Device", "Orgunit"] // This will change when API is ready

	const [searchString, setSearchString] = useState("")

	return (
		<HStackStyled>
			<Select label={"Vis objekttype"} onChange={(e) => setObjectTypeFilter(e.target.value)}>
				<option value={"all"}>Alle</option>
				{objectTypes.map((objectType) => (
					<option key={objectType} value={objectType}>
						{objectType}
					</option>
				))}
			</Select>

			<form
				onSubmit={(e) => {
					e.preventDefault() // To prevent page reload
					setOrgUnitSearchString(searchString)
				}}
			>
				<Search label={"Søk på orgenheter"} hideLabel={false} onChange={(value) => setSearchString(value)} />
			</form>
		</HStackStyled>
	)
}

export default Toolbar
