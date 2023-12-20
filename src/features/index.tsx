import { PersonCheckmarkIcon, PersonPlusIcon } from "@navikt/aksel-icons"
import { Heading, Loader, Tabs } from "@navikt/ds-react"
import styled from "styled-components"

import Index from "./assignRolesTab"
import { DefineRoleTab } from "./defineRoleTab"
import { UsersRolesMain } from "./administerRightsTab"
import { useSafeTabChange } from "../api/SafeTabChangeContext"
import { useLocation, useNavigate } from "react-router-dom"
import TieFeaturesToRolesTab from "./tieFeatureToRoleTab/tieFeaturesToRolesTab"
import { useEffect } from "react"
import { useUser } from "../api/UserContext"

const LandingContainer = styled.div`
	h1 {
		margin-bottom: 1rem;
	}
`

export const LoaderStyled = styled(Loader)`
	display: flex;
	margin: auto;
`

const LandingComponent = () => {
	const { currentTab, isTabModified, setCurrentTab, setIsModalVisible, setTabToRouteTo } = useSafeTabChange()

	const { currentPage, setCurrentPage, resetPagination } = useUser()

	const location = useLocation()
	const searchParams = new URLSearchParams(location.search)
	const tab = searchParams.get("tab")
	const page = searchParams.get("page")
	const navigate = useNavigate()

	useEffect(() => {
		if (page) {
			setCurrentPage(Number(page))
		} else {
			setCurrentPage(1)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	useEffect(() => {
		if (currentPage) {
			const queryString = `?tab=${tab}&page=${currentPage}`
			navigate(queryString)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentPage])

	const handleChangeTab = (tabClicked: string) => {
		if (isTabModified) {
			setIsModalVisible(true)
			setTabToRouteTo(tabClicked)
		} else {
			setCurrentTab(tabClicked)
			resetPagination()
			navigate(`?tab=${tabClicked}`)
		}
	}

	if (!tab) {
		setCurrentTab("tildel")
	}

	return (
		<LandingContainer>
			<Heading level={"2"} size={"large"} id="tableTitle">
				Rettighetsstyring
			</Heading>

			<Tabs value={currentTab} id={"navigation-bar"} onChange={handleChangeTab}>
				<Tabs.List>
					<Tabs.Tab
						value="tildel"
						label="Tildel rettigheter"
						icon={<PersonPlusIcon title="historielogg" />}
						id={"assign-role-tab"}
					/>
					<Tabs.Tab
						value="define"
						label="Definer rolle"
						icon={<PersonCheckmarkIcon title="inbox" />}
						id={"define-role-tab"}
					/>
					<Tabs.Tab
						value="tildelingsadmin"
						label="Tildelingsadministrasjon"
						icon={<PersonCheckmarkIcon title="inbox" />}
						id={"see-users-tab"}
					/>
					<Tabs.Tab
						value="featureRole"
						label="Knytt features til roller"
						icon={<PersonCheckmarkIcon title="inbox" />}
						id={"feature-role-tab"}
					/>
				</Tabs.List>

				<Tabs.Panel
					value="tildel"
					className="h-24 w-full bg-gray-50 p-4"
					onSelect={(event) => event.preventDefault()}
					aria-labelledby="assign-role-tab"
				>
					<Index />
				</Tabs.Panel>

				<Tabs.Panel value="define" className="h-24 w-full bg-gray-50 p-4" aria-labelledby={"define-role-tab"}>
					<DefineRoleTab />
				</Tabs.Panel>

				<Tabs.Panel
					value="tildelingsadmin"
					className="h-24 w-full bg-gray-50 p-4"
					aria-labelledby={"see-users-tab"}
				>
					<UsersRolesMain />
				</Tabs.Panel>

				<Tabs.Panel
					value="featureRole"
					className="h-24 w-full bg-gray-50 p-4"
					aria-labelledby={"feature-role-tab"}
				>
					<TieFeaturesToRolesTab />
				</Tabs.Panel>
			</Tabs>
		</LandingContainer>
	)
}

export default LandingComponent
