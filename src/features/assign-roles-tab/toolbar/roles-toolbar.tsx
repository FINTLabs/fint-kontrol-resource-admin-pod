import styled from "styled-components"
import UnitSelectDialog from "./unit-select-dialog"
import React, { useState } from "react"
import { Buldings3Icon } from "@navikt/aksel-icons"
import { Button, Search, Select } from "@navikt/ds-react"
import { useRole } from "../../../api/RoleContext"

const ToolbarContainer = styled.div`
	display: flex;
	justify-content: flex-end;
	align-items: end;
	gap: 2rem;

	width: 100%;
`

const RolesToolbar = ({ setSelectedAccessRoleId }: any) => {
	const { roles } = useRole()
	const [showUnitModal, setShowUnitModal] = useState(false)

	const closeModal = () => {
		setShowUnitModal(false)
	}

	return (
		<ToolbarContainer>
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
				onChange={(e) => setSelectedAccessRoleId(e.target.value as string)}
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
				<Search label="Søk på personnavn" hideLabel={false} variant="secondary" />
			</div>
		</ToolbarContainer>
	)
}

export default RolesToolbar
