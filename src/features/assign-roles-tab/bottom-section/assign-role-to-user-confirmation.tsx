import { Button, Heading, HStack, VStack } from "@navikt/ds-react"
import { PersonIcon, ShieldLockIcon } from "@navikt/aksel-icons"
import React, { useState } from "react"
import { IOrgUnit, IUser } from "../../../api/types"
import OrgUnitModal from "./org-unit-modal"

interface AssignRoleToUserConfirmationProps {
	selectedUser: IUser | null
	selectedAccessRoleId: string
}

const AssignRoleToUserConfirmation = ({ selectedUser, selectedAccessRoleId }: AssignRoleToUserConfirmationProps) => {
	const [orgUnitsForUser, setOrgUnitsForUser] = useState<IOrgUnit[]>([])

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

			<OrgUnitModal orgUnitsForUser={orgUnitsForUser} setOrgUnitsForUser={setOrgUnitsForUser} />

			<div>
				<p>Valgte orgenheter brukeren skal ha: {orgUnitsForUser.map((unit) => unit.name)}</p>
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
