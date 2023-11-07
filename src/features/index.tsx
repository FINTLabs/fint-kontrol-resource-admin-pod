import React from "react"
import { PersonCheckmarkIcon, PersonPlusIcon } from "@navikt/aksel-icons"
import { Loader, Tabs } from "@navikt/ds-react"

import Main from "./assign-roles-tab/main"
import { PermissionsMain } from "./define-role-tab/permissions-main"
import { UsersRolesMain } from "./users-roles-tab/main"
import styled from "styled-components"

export const LoaderStyled = styled(Loader)`
	display: flex;
	margin: auto;
`

const LandingComponent = () => {
	return (
		<div>
			<h2 id="tableTitle">Rettighetsstyring</h2>

			<Tabs defaultValue="tildel">
				<Tabs.List>
					<Tabs.Tab
						value="tildel"
						label="Tildel rettigheter"
						icon={<PersonPlusIcon title="historielogg" />}
					/>
					<Tabs.Tab value="inbox" label="Definer rolle" icon={<PersonCheckmarkIcon title="inbox" />} />
					<Tabs.Tab
						value="usersWithRoles"
						label="Se brukere med roller"
						icon={<PersonCheckmarkIcon title="inbox" />}
					/>
				</Tabs.List>

				<Tabs.Panel value="tildel" className="h-24 w-full bg-gray-50 p-4">
					<Main />
				</Tabs.Panel>

				<Tabs.Panel value="inbox" className="h-24 w-full bg-gray-50 p-4">
					<PermissionsMain />
				</Tabs.Panel>

				<Tabs.Panel value="usersWithRoles" className="h-24 w-full bg-gray-50 p-4">
					<UsersRolesMain />
				</Tabs.Panel>
			</Tabs>
		</div>
	)
}

export default LandingComponent
