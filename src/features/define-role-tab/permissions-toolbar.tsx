import React from "react"
import { Select } from "@navikt/ds-react"
import styled from "styled-components"
import { IRole } from "../../api/types"

const ToolbarContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: end;
`

interface ToolbarProps {
	roleName: string
	roles: IRole[]
	selectedAccessRoleId: string
	setSelectedAccessRoleId: (value: string) => void
}

export const PermissionsToolbar = ({
	roleName,
	roles,
	selectedAccessRoleId,
	setSelectedAccessRoleId
}: ToolbarProps) => {
	return (
		<ToolbarContainer>
			<h3>{selectedAccessRoleId ? roleName : "Velg aksessrolle:"}</h3>

			<Select
				value={selectedAccessRoleId ? selectedAccessRoleId : ""}
				onChange={(e) => setSelectedAccessRoleId(e.target.value as string)}
				label={"Rolle"}
			>
				<option value="" disabled>
					Velg aksessrolle
				</option>
				{roles.map((role) => {
					return <option value={role.accessRoleId}>{role.name}</option>
				})}
			</Select>
		</ToolbarContainer>
	)
}
