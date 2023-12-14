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

const AssignRolesContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1rem;

	.button-wrapper {
		display: flex;
		gap: 1rem;
	}
`

const Index = () => {
	const { postNewAssignment, putNewAssignment } = useAssignments()
	const { setIsTabModified } = useSafeTabChange()
	const [selectedAccessRole, setSelectedAccessRole] = useState<IRole>({ accessRoleId: "", name: "" })
	const [newAssignment, setNewAssigment] = useState<IAssignment>({
		user: emptyUser,
		scopeId: 1, // TODO: This is bound to be changed in the future to allow scope definitions to be selected in the frontend. For now, it is defaulted to "1"
		accessRoleId: "",
		orgUnits: []
	})
	const { handleSubmit } = useForm()
	const [hasChanges, setHasChanges] = useState(false)
	const [user, setUser] = useState<IUser | undefined>()
	const [roleExists, setRoleExists] = useState(false)

	useEffect(() => {
		if (user?.roles?.some((role) => role.roleId === newAssignment.accessRoleId)) {
			setRoleExists(true)
		} else {
			setRoleExists(false)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [newAssignment])

	const handleSaveRole = () => {
		if (validateNewAssignment()) {
			setIsTabModified(false)
			if (roleExists) {
				putNewAssignment(newAssignment)
			} else {
				postNewAssignment(newAssignment)
			}
			resetAll()
		} else {
			toast.info("Data mangler i tildelingen.", {
				role: "alert"
			})
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
		setHasChanges(false)
	}

	return (
		<AssignRolesContainer>
			<ConfirmSafeRedirectModal />

			<RolesToolbar />

			<AssignUserRoleTable
				newAssignment={newAssignment}
				setNewAssignment={setNewAssigment}
				setHasChanges={setHasChanges}
				setUser={setUser}
			/>

			<AssignRoleToUserConfirmation
				hasChanges={hasChanges}
				newAssignment={newAssignment}
				setNewAssigment={setNewAssigment}
				selectedAccessRole={selectedAccessRole}
				setSelectedAccessRole={setSelectedAccessRole}
				setHasChanges={setHasChanges}
				user={user}
			/>

			{hasChanges && (
				<form onSubmit={handleSubmit(handleSaveRole)}>
					<div className={"button-wrapper"}>
						<Button variant={"secondary"} onClick={resetAll}>
							Avbryt tildeling
						</Button>
						<Button variant={"primary"} id={"save-button-id"}>
							Lagre rettigheter
						</Button>
					</div>
				</form>
			)}
		</AssignRolesContainer>
	)
}

export default Index

const emptyUser: IUser = {
	id: 1,
	userName: "",
	firstName: "",
	lastName: "",
	userType: "",
	resourceId: ""
}
