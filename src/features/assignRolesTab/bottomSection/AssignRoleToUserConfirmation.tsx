import { Button, Heading, HStack, Select, VStack } from "@navikt/ds-react"
import { Buldings3Icon, PersonIcon, ShieldLockIcon } from "@navikt/aksel-icons"
import React, { useEffect, useState } from "react"
import { IAssignment, IOrgUnit, IRole } from "../../../api/types"
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

const HStackStyled = styled(HStack)`
	align-items: flex-end;
	gap: 0.5rem;
`

interface AssignRoleToUserConfirmationProps {
	selectedAccessRole: IRole
	newAssignment: IAssignment
	setNewAssigment: (updatedAssignment: IAssignment) => void
	resetAssignment: () => void
}

const AssignRoleToUserConfirmation = ({
	newAssignment,
	setNewAssigment,
	resetAssignment
}: AssignRoleToUserConfirmationProps) => {
	const { roles } = useRole()
	const [orgUnitsForUser, setOrgUnitsForUser] = useState<IOrgUnit[]>([])
	const [selectedAccessRole, setSelectedAccessRole] = useState<IRole>({ accessRoleId: "", name: "" })
	const fullName = `${newAssignment.user?.firstName} ${newAssignment.user?.lastName}`

	const handleUpdateOrgUnitsInAssignment = () => {
		setNewAssigment({ ...newAssignment, orgUnits: orgUnitsForUser })
	}
	useEffect(() => {
		handleUpdateOrgUnitsInAssignment()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [orgUnitsForUser])

	const handleUpdateSelectedRole = (param: string) => {
		let roleMatchedToId: IRole | undefined = roles.find((role) => role.accessRoleId === param)
		roleMatchedToId ? setSelectedAccessRole(roleMatchedToId) : toast.error("Noe gikk galt ved valg av rolle")
		const updatedAssignment: IAssignment = { ...newAssignment, accessRoleId: param }
		setNewAssigment(updatedAssignment)
	}

	return (
		<VStack gap={"4"}>
			<HStackStyled>
				<OrgUnitModal orgUnitsForUser={newAssignment.orgUnits} setOrgUnitsForUser={setOrgUnitsForUser} />
				<Select
					size={"medium"}
					onChange={(e) => handleUpdateSelectedRole(e.target.value)}
					id={"tildel-rolle"}
					defaultValue={""}
					label={"Tildel rolle"}
				>
					<option value="" disabled={true}>
						Velg rolle
					</option>
					{roles.map((role) => (
						<option value={role.accessRoleId} key={role.accessRoleId}>
							{role.name}
						</option>
					))}
				</Select>

				<Button variant={"secondary"} onClick={resetAssignment}>
					Nullstill tildeling
				</Button>
			</HStackStyled>

			<Heading size={"small"}>Oppsummering</Heading>

			<AssignmentSummaryContainer>
				{selectedAccessRole.name && (
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
							<Buldings3Icon title="a11y-title" fontSize="1.5rem" /> Valgte orgenheter brukeren skal ha:
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
			</AssignmentSummaryContainer>
		</VStack>
	)
}

export default AssignRoleToUserConfirmation
