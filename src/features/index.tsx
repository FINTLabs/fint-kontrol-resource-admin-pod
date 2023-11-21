import React from "react"
import { PersonCheckmarkIcon, PersonPlusIcon } from "@navikt/aksel-icons"
import { Loader, Tabs } from "@navikt/ds-react"

import AssignRolesMain from "./assignRolesTab/AssignRolesMain"
import { PermissionsMain } from "./defineRoleTab/PermissionsMain"
import { UsersRolesMain } from "./usersRolesTab"
import styled from "styled-components"
import { useSafeTabChange } from "../api/SafeTabChangeContext"
import { useLocation, useNavigate } from "react-router-dom"
import FeaturesToRolesTab from "./featuresToRoles/featuresToRolesTab"

export const LoaderStyled = styled(Loader)`
	display: flex;
	margin: auto;
`

const LandingComponent = () => {
	const { currentTab, isTabModified, setCurrentTab, setIsModalVisible, setTabToRouteTo } = useSafeTabChange()
	const location = useLocation()
	const searchParams = new URLSearchParams(location.search)
	const tab = searchParams.get("tab")
	const navigate = useNavigate()

	const handleChangeTab = (tabClicked: string) => {
		if (isTabModified) {
			setIsModalVisible(true)
			setTabToRouteTo(tabClicked)
			navigate(`?tab=${tabClicked}`)
		} else {
			setCurrentTab(tabClicked)
			navigate(`?tab=${tabClicked}`)
		}
	}

	if (!tab) {
		setCurrentTab("tildel")
	}

	return (
		<div>
			<h2 id="tableTitle">Rettighetsstyring</h2>

			<Tabs value={currentTab} id={"navigation-bar-id"} onChange={handleChangeTab}>
				<Tabs.List>
					<Tabs.Tab
						value="tildel"
						label="Tildel rettigheter"
						icon={<PersonPlusIcon title="historielogg" />}
						id={"assign-role-tab-id"}
					/>
					<Tabs.Tab
						value="define"
						label="Definer rolle"
						icon={<PersonCheckmarkIcon title="inbox" />}
						id={"defineRoleTab-id"}
					/>
					<Tabs.Tab
						value="tildelingsadmin"
						label="Tildelingsadministrasjon"
						icon={<PersonCheckmarkIcon title="inbox" />}
						id={"see-users-tab-id"}
					/>
					<Tabs.Tab
						value="featureRole"
						label="Knytt features til roller"
						icon={<PersonCheckmarkIcon title="inbox" />}
						id={"feature-role-id"}
					/>
				</Tabs.List>

				<Tabs.Panel
					value="tildel"
					className="h-24 w-full bg-gray-50 p-4"
					onSelect={(event) => event.preventDefault()}
				>
					<AssignRolesMain />
				</Tabs.Panel>

				<Tabs.Panel value="define" className="h-24 w-full bg-gray-50 p-4">
					<PermissionsMain />
				</Tabs.Panel>

				<Tabs.Panel value="tildelingsadmin" className="h-24 w-full bg-gray-50 p-4">
					<UsersRolesMain />
				</Tabs.Panel>

				<Tabs.Panel value="featureRole" className="h-24 w-full bg-gray-50 p-4">
					<FeaturesToRolesTab />
				</Tabs.Panel>
			</Tabs>
		</div>
	)
}

export default LandingComponent
