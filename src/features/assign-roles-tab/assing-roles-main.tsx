import React from "react"
import { useOrgUnits } from "../../api/OrgUnitContext"
import { useUser } from "../../api/UserContext"
import { useRole } from "../../api/RoleContext"
import RolesToolbar from "./roles-toolbar"
import AssignUserRoleTable from "./assign-user-role-table"

import AssignRoleToUserConfirmation from "./assign-role-to-user-confirmation"

const AssingRolesMain = () => {
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

export default AssingRolesMain
