import React from "react"
import { useOrgUnits } from "../../api/OrgUnitContext"
import { useUser } from "../../api/UserContext"
import { useRole } from "../../api/RoleContext"
import { HStack } from "@navikt/ds-react"
import RolesToolbar from "./roles-toolbar"
import styled from "styled-components"
import AssignUserRoleTable from "./assign-user-role-table"

import AssignRoleToUserConfirmation from "./assign-role-to-user-confirmation"

const HStackStyled = styled(HStack)`
	margin-top: 1rem;
`

const Main = () => {
	const { selectedOrgUnits } = useOrgUnits()
	const { selectedUser, setOrgUnitIds } = useUser()
	const { selectedAccessRoleId, setSelectedAccessRoleId } = useRole()

	console.log(selectedUser + "-" + selectedAccessRoleId + "-" + selectedOrgUnits.length + ".")

	return (
		<div>
			<RolesToolbar setSelectedAccessRoleId={setSelectedAccessRoleId} setOrgUnitIdsFilter={setOrgUnitIds} />

			<AssignUserRoleTable />

			<AssignRoleToUserConfirmation selectedUser={selectedUser} selectedAccessRoleId={selectedAccessRoleId} />
		</div>
	)
}

export default Main
