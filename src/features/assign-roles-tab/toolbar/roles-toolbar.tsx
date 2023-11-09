import styled from "styled-components"
import UnitSelectDialog from "./unit-select-dialog"
import React, { useState } from "react"
import { Buldings3Icon } from "@navikt/aksel-icons"
import { Button, Search, Select } from "@navikt/ds-react"
import { useRole } from "../../../api/RoleContext"
import { IRole } from "../../../api/types"
import { useUser } from "../../../api/UserContext"

const ToolbarContainer = styled.div`
	display: flex;
	justify-content: flex-end;
	align-items: end;
	gap: 2rem;

	width: 100%;
`

interface RolesToolbarProps {
	setSelectedAccessRole: (newSelectedRole: IRole) => void
	setOrgUnitIdsFilter: (orgUnitIdsFilterList: string[]) => void
}

const RolesToolbar = ({ setSelectedAccessRole }: RolesToolbarProps) => {
	const { setSearchString } = useUser()
	const { roles } = useRole()
	const [showUnitModal, setShowUnitModal] = useState(false)
	const [currentSearchString, setCurrentSearchString] = useState<string>("")

	const closeModal = () => {
		setShowUnitModal(false)
	}

	const handleUpdateSelectedRoleFilter = (param: string) => {
		let roleMatchedToId: IRole | undefined = roles.find((role) => role.accessRoleId === param)
		roleMatchedToId ? setSelectedAccessRole(roleMatchedToId) : console.log(roleMatchedToId)
	}

	const triggerSearchString = (event?: React.FormEvent<HTMLFormElement>) => {
		if (event) {
			event.preventDefault() // This is to prevent complete page rerender on submit.
		}
		setSearchString(currentSearchString)
	}

	return (
		<ToolbarContainer id={"toolbar-id"}>
			<UnitSelectDialog open={showUnitModal} onClose={closeModal} />

			<div>
				<Button
					iconPosition="right"
					icon={<Buldings3Icon aria-hidden />}
					id={"selectUnitsIcon"}
					variant={"secondary"}
					onClick={() => {
						setShowUnitModal(true)
					}}
				>
					Orgenhetsfilter
				</Button>
			</div>

			<Select
				label="Rollefilter"
				size={"medium"}
				onChange={(e) => handleUpdateSelectedRoleFilter(e.target.value)}
				id={"rolle"}
				defaultValue={""}
			>
				<option value="" disabled={true}>
					Velg rolle
				</option>
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
