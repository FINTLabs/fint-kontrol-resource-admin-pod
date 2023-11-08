import React, { useState } from "react"
import { useOrgUnits } from "../../api/OrgUnitContext"
import { useUser } from "../../api/UserContext"
import { useRole } from "../../api/RoleContext"
import RolesToolbar from "./toolbar/roles-toolbar"
import AssignUserRoleTable from "./assign-user-role-table"

import AssignRoleToUserConfirmation from "./bottom-section/assign-role-to-user-confirmation"
import { IAssignment } from "../../api/types"
import { Button } from "@navikt/ds-react"
import styled from "styled-components"

const AssignRolesContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1rem;
`

const AssignRolesMain = () => {
	const { selectedOrgUnits } = useOrgUnits()
	const { selectedUser, setOrgUnitIds } = useUser()
	const { selectedAccessRoleId, setSelectedAccessRoleId } = useRole()
	const [newAssignment, setNewAssigment] = useState<IAssignment>({
		user: null,
		accessRoleId: "",
		orgUnits: []
	})

	const handleSaveRole = () => {
		// messageBus.publish("testChannel", "testTopic", "Save Role Clicked")
		console.log("published a message to test channel")
		console.log(newAssignment)
		// return undefined
	}

	console.log(selectedUser + "-" + selectedAccessRoleId + "-" + selectedOrgUnits.length + ".")

	return (
		<AssignRolesContainer>
			<RolesToolbar setSelectedAccessRoleId={setSelectedAccessRoleId} setOrgUnitIdsFilter={setOrgUnitIds} />

			<AssignUserRoleTable newAssignment={newAssignment} setNewAssignment={setNewAssigment} />

			<AssignRoleToUserConfirmation
				newAssignment={newAssignment}
				setNewAssigment={setNewAssigment}
				selectedUser={selectedUser}
				selectedAccessRoleId={selectedAccessRoleId}
			/>

			<div>
				<Button variant={"primary"} onClick={handleSaveRole}>
					Lagre rettigheter
				</Button>
			</div>
		</AssignRolesContainer>
	)
}

export default AssignRolesMain
