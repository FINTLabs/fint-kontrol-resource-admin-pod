import { Heading, HStack, VStack } from "@navikt/ds-react"
import { Buldings3Icon, PersonIcon, ShieldLockIcon } from "@navikt/aksel-icons"
import React, { useEffect, useState } from "react"
import { IAssignment, IOrgUnit, IUser } from "../../../api/types"
import OrgUnitModal from "./org-unit-modal"
import styled from "styled-components"
import { useRole } from "../../../api/RoleContext"

const UlStyled = styled.ul`
	float: right;
	list-style-type: none;
	margin: 0;
`

const AssignmentSummaryContainer = styled.div`
	width: max-content;
`

interface AssignRoleToUserConfirmationProps {
	selectedUser: IUser | null
	selectedAccessRoleId: string
	newAssignment: IAssignment
	setNewAssigment: (updatedAssignment: IAssignment) => void
}

const AssignRoleToUserConfirmation = ({
	newAssignment,
	setNewAssigment,
	selectedUser,
	selectedAccessRoleId
}: AssignRoleToUserConfirmationProps) => {
	const { roles } = useRole()
	const [orgUnitsForUser, setOrgUnitsForUser] = useState<IOrgUnit[]>([])
	const fullName = `${newAssignment.user?.firstName} ${newAssignment.user?.lastName}`

	const handleUpdateOrgUnitsInAssignment = () => {
		setNewAssigment({ ...newAssignment, orgUnits: orgUnitsForUser })
	}

	useEffect(() => {
		handleUpdateOrgUnitsInAssignment()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [orgUnitsForUser])

	return (
		<VStack gap={"4"}>
			{selectedUser && (
				<HStack align="center" gap={"5"}>
					<PersonIcon title="a11y-title" fontSize="1.5rem" />
					<Heading size={"small"}>
						{selectedUser.firstName} {selectedUser.lastName}
					</Heading>
				</HStack>
			)}

			{selectedAccessRoleId && (
				<HStack align="center" gap={"5"}>
					<ShieldLockIcon title="a11y-title" fontSize="1.5rem" />
					<Heading size={"small"}>
						{selectedAccessRoleId &&
							roles.map((role) => {
								if (role.accessRoleId === selectedAccessRoleId) {
									return role.name
								}
							})}
					</Heading>
				</HStack>
			)}

			<OrgUnitModal orgUnitsForUser={newAssignment.orgUnits} setOrgUnitsForUser={setOrgUnitsForUser} />

			<AssignmentSummaryContainer>
				{newAssignment.user && (
					<span>
						<PersonIcon title="a11y-title" fontSize="1.5rem" /> Valgt bruker: <b>{fullName}</b>
					</span>
				)}
				{newAssignment.orgUnits.length > 0 && (
					<div>
						<p>
							<Buldings3Icon title="a11y-title" fontSize="1.5rem" /> Valgte orgenheter brukeren skal ha:
						</p>
						<UlStyled>
							{orgUnitsForUser.map((unit, index) => (
								<li>
									<b>{unit.name}</b>
								</li>
							))}
						</UlStyled>
					</div>
				)}
			</AssignmentSummaryContainer>
		</VStack>
	)
}

export default AssignRoleToUserConfirmation
