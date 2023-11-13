import React, { useEffect, useState } from "react"
import { useUser } from "../../api/UserContext"
import RolesToolbar from "./toolbar/roles-toolbar"
import AssignUserRoleTable from "./assign-user-role-table"

import AssignRoleToUserConfirmation from "./bottom-section/assign-role-to-user-confirmation"
import { IAssignment, IRole, IUser } from "../../api/types"
import { Button } from "@navikt/ds-react"
import styled from "styled-components"
import { useSafeTabChange } from "../../api/safe-tab-change-context"
import { ConfirmSafeRedirectModal } from "./confirm-safe-redirect-modal"
import { useAssignments } from "../../api/assignment-context"

const AssignRolesContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1rem;
`

const AssignRolesMain = () => {
	const { selectedUser, setOrgUnitIdsFilter } = useUser()
	const { postNewAssignment } = useAssignments()
	const { setIsTabModified } = useSafeTabChange()
	const [selectedAccessRole, setSelectedAccessRole] = useState<IRole>({ accessRoleId: "", name: "" })
	const [newAssignment, setNewAssigment] = useState<IAssignment>({
		user: emptyUser,
		scopeId: 1, // TODO: This is bound to be changed in the future to allow scope definitions to be selected in the frontend. For now, it is defaulted to "1"
		accessRoleId: "",
		orgUnits: []
	})

	useEffect(() => {
		setNewAssigment({ ...newAssignment, accessRoleId: selectedAccessRole.accessRoleId })
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedAccessRole])

	const handleSaveRole = () => {
		setIsTabModified(false)
		postNewAssignment(newAssignment)
	}

	return (
		<AssignRolesContainer>
			<ConfirmSafeRedirectModal />

			<RolesToolbar setSelectedAccessRole={setSelectedAccessRole} setOrgUnitIdsFilter={setOrgUnitIdsFilter} />

			<AssignUserRoleTable newAssignment={newAssignment} setNewAssignment={setNewAssigment} />

			<AssignRoleToUserConfirmation
				newAssignment={newAssignment}
				setNewAssigment={setNewAssigment}
				selectedUser={selectedUser}
				selectedAccessRole={selectedAccessRole}
			/>

			<div>
				<Button variant={"primary"} onClick={handleSaveRole} id={"save-button-id"}>
					Lagre rettigheter
				</Button>
			</div>
		</AssignRolesContainer>
	)
}

export default AssignRolesMain

const emptyUser: IUser = {
	id: 1,
	userName: "",
	firstName: "",
	lastName: "",
	userType: "",
	resourceId: ""
}
