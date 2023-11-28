import React, { useEffect, useState } from "react"
import RolesToolbar from "./toolbar/RolesToolbar"
import AssignUserRoleTable from "./AssignUserRoleTable"

import AssignRoleToUserConfirmation from "./bottomSection/AssignRoleToUserConfirmation"
import { IAssignment, IRole, IUser } from "../../api/types"
import { Button } from "@navikt/ds-react"
import styled from "styled-components"
import { useSafeTabChange } from "../../api/SafeTabChangeContext"
import { ConfirmSafeRedirectModal } from "./confirmSafeRedirectModal"
import { useAssignments } from "../../api/AssignmentContext"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { useUser } from "../../api/UserContext"

const AssignRolesContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1rem;
`

const AssignRolesMain = () => {
	const { postNewAssignment } = useAssignments()
	const { getUsersPage } = useUser()
	const { setIsTabModified } = useSafeTabChange()
	const [selectedAccessRole, setSelectedAccessRole] = useState<IRole>({ accessRoleId: "", name: "" })
	const [newAssignment, setNewAssigment] = useState<IAssignment>({
		user: emptyUser,
		scopeId: 1, // TODO: This is bound to be changed in the future to allow scope definitions to be selected in the frontend. For now, it is defaulted to "1"
		accessRoleId: "",
		orgUnits: []
	})
	const { handleSubmit } = useForm()

	useEffect(() => {
		const fetchDelay = setTimeout(() => {
			getUsersPage()
		}, 500)

		return () => clearTimeout(fetchDelay)

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [postNewAssignment])

	const handleSaveRole = () => {
		if (validateNewAssignment()) {
			setIsTabModified(false)
			postNewAssignment(newAssignment)
			resetAll()
		} else {
			toast.info("Data mangler i tildelingen.")
		}
	}

	const validateNewAssignment = () => {
		if (newAssignment.user.resourceId.length === 0) {
			return false
		} else if (newAssignment.accessRoleId.length === 0) {
			return false
		} else return newAssignment.orgUnits.length !== 0
	}

	const resetAssignment = () => {
		setNewAssigment({
			user: emptyUser,
			scopeId: 1, // TODO: This is bound to be changed in the future to allow scope definitions to be selected in the frontend. For now, it is defaulted to "1"
			accessRoleId: "",
			orgUnits: []
		})
		setIsTabModified(false)
	}

	const resetAll = () => {
		resetAssignment()
		setSelectedAccessRole({ accessRoleId: "", name: "" })
	}

	return (
		<AssignRolesContainer>
			<ConfirmSafeRedirectModal />

			<RolesToolbar />

			<AssignUserRoleTable newAssignment={newAssignment} setNewAssignment={setNewAssigment} />

			<AssignRoleToUserConfirmation
				newAssignment={newAssignment}
				setNewAssigment={setNewAssigment}
				selectedAccessRole={selectedAccessRole}
				setSelectedAccessRole={setSelectedAccessRole}
				resetAssignment={resetAssignment}
			/>

			<form onSubmit={handleSubmit(handleSaveRole)}>
				<div>
					<Button variant={"primary"} id={"save-button-id"}>
						Lagre rettigheter
					</Button>
				</div>
			</form>
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
