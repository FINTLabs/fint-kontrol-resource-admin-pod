import { Heading, VStack } from "@navikt/ds-react"
import { Buldings3Icon, PersonIcon, ShieldLockIcon } from "@navikt/aksel-icons"
import React, { useEffect, useState } from "react"
import { IAssignment, IOrgUnit, IRole, IUser } from "../../../api/types"
import OrgUnitModal from "./OrgUnitModal"
import styled from "styled-components"
import { useRole } from "../../../api/RoleContext"
import { toast } from "react-toastify"

const AssignmentSummaryContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1rem;

	width: max-content;
`

const UlStyled = styled.ul`
	float: right;
	list-style-type: none;
	margin: 0;
	padding: 0;
`

interface AssignRoleToUserConfirmationProps {
	hasChanges: boolean
	selectedAccessRole: IRole
	newAssignment: IAssignment
	setNewAssigment: (updatedAssignment: IAssignment) => void
	setSelectedAccessRole: (newAccessRole: IRole) => void
	setHasChanges: (hasChanges: boolean) => void
	user: IUser | undefined
}

const AssignRoleToUserConfirmation = ({
	newAssignment,
	hasChanges,
	setNewAssigment,
	selectedAccessRole,
	setSelectedAccessRole,
	setHasChanges,
	user
}: AssignRoleToUserConfirmationProps) => {
	const { roles } = useRole()
	const [orgUnitsForUser, setOrgUnitsForUser] = useState<IOrgUnit[]>([])
	const fullName = `${newAssignment.user?.firstName} ${newAssignment.user?.lastName}`

	useEffect(() => {
		orgUnitsForUser.length === 0 && selectedAccessRole.accessRoleId === ""
			? setHasChanges(false)
			: setHasChanges(true)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [orgUnitsForUser, selectedAccessRole])

	useEffect(() => {
		setNewAssigment({ ...newAssignment, orgUnits: [...orgUnitsForUser] })
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [orgUnitsForUser])

	const handleUpdateSelectedRole = (param: string) => {
		let roleMatchedToId: IRole | undefined = roles.find((role) => role.accessRoleId === param)
		if (roleMatchedToId === undefined) {
			setSelectedAccessRole({ accessRoleId: "", name: "" })
			toast.error("Rolle må velges", {
				role: "alert"
			})
		} else {
			setSelectedAccessRole(roleMatchedToId)
			const updatedAssignment: IAssignment = { ...newAssignment, accessRoleId: param }
			setNewAssigment(updatedAssignment)
		}
	}

	const handleModalMapping = (scopeAccessRoleId: string, scopeOrgUnits: IOrgUnit[]) => {
		handleUpdateSelectedRole(scopeAccessRoleId)
		setOrgUnitsForUser(scopeOrgUnits)
	}

	const accessRoleNameMapped = roles.find((ele) => ele.accessRoleId === selectedAccessRole.accessRoleId) // Mapped because role selected in newAssignment only stores the ID and not the name.

	return (
		<VStack gap={"4"}>
			<OrgUnitModal handleModalMapping={handleModalMapping} user={user} />

			<AssignmentSummaryContainer>
				{hasChanges && (
					<>
						<Heading size={"small"}>Oppsummering</Heading>
						<>Omfangsobjeket her</>
						{accessRoleNameMapped && (
							<div>
								<ShieldLockIcon title="a11y-title" fontSize="1.5rem" />
								Valgt rolle: <b>{selectedAccessRole.name}</b>
							</div>
						)}
						{newAssignment.user.firstName.length > 0 && (
							<div>
								<PersonIcon title="a11y-title" fontSize="1.5rem" /> Valgt bruker: <b>{fullName}</b>
							</div>
						)}
						{newAssignment.orgUnits.length > 0 && (
							<div>
								<div>
									<Buldings3Icon title="a11y-title" fontSize="1.5rem" /> Valgte orgenheter brukeren
									skal ha:
								</div>
								<UlStyled>
									{orgUnitsForUser.map((unit, index) => (
										<li key={index}>
											<b>{unit.name}</b>
										</li>
									))}
								</UlStyled>
							</div>
						)}
					</>
				)}
			</AssignmentSummaryContainer>
		</VStack>
	)
}

export default AssignRoleToUserConfirmation
