import { Button, Heading, HStack, VStack } from "@navikt/ds-react"
import { PersonIcon, ShieldLockIcon } from "@navikt/aksel-icons"
import AssignUserToOrgUnit from "./assign-user-to-org-unit"
import React, { useState } from "react"
import { IOrgUnit, IUser } from "../../api/types"

interface AssignRoleToUserConfirmationProps {
	selectedUser: IUser | null
	selectedAccessRoleId: string
}

const AssignRoleToUserConfirmation = ({ selectedUser, selectedAccessRoleId }: AssignRoleToUserConfirmationProps) => {
	const [orgUnitsForUser, setOrgUnitsForUser] = useState<IOrgUnit[]>([])

	const handleSaveRole = () => {
		// messageBus.publish("testChannel", "testTopic", "Save Role Clicked")
		console.log("published a message to test channel")
		// return undefined
	}

	return (
		<VStack>
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
						{selectedAccessRoleId === "aa"
							? "Applikasjonsadministrator"
							: "Applikasjonstilgangsadministrator"}
					</Heading>
				</HStack>
			)}

			<AssignUserToOrgUnit setOrgUnitsForUser={setOrgUnitsForUser} />

			<div>
				<p>Valgte orgenheter brukeren skal ha: {orgUnitsForUser.map((unit) => unit.name)}</p>

				<Button
					// variant="contained"
					variant={"primary"}
					// sx={{ mt: 1, mr: 1 }}
					onClick={handleSaveRole}
				>
					Lagre rettigheter
				</Button>
			</div>

			{/*{selectedOrgUnits.length > 0 && (*/}
			{/*    <HStack align="center">*/}
			{/*        <Buldings3Icon title="a11y-title" fontSize="1.5rem"/>*/}
			{/*        <ul>*/}
			{/*            {selectedOrgUnits.map((orgUnit) => (*/}
			{/*                <li key={orgUnit.id}>{orgUnit.name}</li>*/}
			{/*            ))}*/}
			{/*        </ul>*/}
			{/*    </HStack>*/}
			{/*)}*/}
			{/*{selectedUser && selectedAccessRoleId && selectedOrgUnits.length > 0 && (*/}

			{/*)}*/}
		</VStack>
	)
}

export default AssignRoleToUserConfirmation
