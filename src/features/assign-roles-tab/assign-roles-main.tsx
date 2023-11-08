import React, { useState } from "react"
import { useUser } from "../../api/UserContext"
import RolesToolbar from "./toolbar/roles-toolbar"
import AssignUserRoleTable from "./assign-user-role-table"

import AssignRoleToUserConfirmation from "./bottom-section/assign-role-to-user-confirmation"
import { IAssignment, IRole } from "../../api/types"
import { Button } from "@navikt/ds-react"
import styled from "styled-components"

const AssignRolesContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1rem;
`

const AssignRolesMain = () => {
	const { selectedUser, setOrgUnitIdsFilter } = useUser()
	const [selectedAccessRole, setSelectedAccessRole] = useState<IRole>({ accessRoleId: "", name: "" })
	const [newAssignment, setNewAssigment] = useState<IAssignment>({
		user: null,
		accessRoleId: "",
		orgUnits: []
	})

	const handleSaveRole = () => {
		// messageBus.publish("testChannel", "testTopic", "Save Role Clicked")
		console.log("Assignment object contains the following: ", newAssignment)
		// return undefined
	}

	return (
		<AssignRolesContainer>
			<RolesToolbar setSelectedAccessRole={setSelectedAccessRole} setOrgUnitIdsFilter={setOrgUnitIdsFilter} />

			<AssignUserRoleTable newAssignment={newAssignment} setNewAssignment={setNewAssigment} />

			<AssignRoleToUserConfirmation
				newAssignment={newAssignment}
				setNewAssigment={setNewAssigment}
				selectedUser={selectedUser}
				selectedAccessRole={selectedAccessRole}
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
