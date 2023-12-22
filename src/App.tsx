import React from "react"
import { Route, Routes } from "react-router-dom"
import { RoleProvider } from "./api/RoleContext"
import LandingComponent, { LoaderStyled } from "./features"
import { OrgUnitsProvider } from "./api/OrgUnitContext"
import { UserProvider } from "./api/UserContext"
import { SafeTabChangeProvider } from "./api/SafeTabChangeContext"
import { AssignmentProvider } from "./api/AssignmentContext"
import SuccessfulCreation from "./features/successfulCreation"
import UserAssignment from "./features/administerRightsTab/userAssignment"
import { useGeneral } from "./api/GeneralContext"
import { FeaturesProvider } from "./api/FeatureContext"
import NotFound from "./features/404"

function App() {
	const { basePath, isLoading } = useGeneral()

	if (isLoading || !basePath) {
		return <LoaderStyled size={"3xlarge"} />
	}

	return (
		<SafeTabChangeProvider>
			<RoleProvider basePath={basePath}>
				<UserProvider basePath={basePath}>
					<OrgUnitsProvider basePath={basePath}>
						<AssignmentProvider basePath={basePath}>
							<FeaturesProvider basePath={basePath}>
								<Routes>
									{/* To allow both without query param and without, this has to be done */}
									<Route path={`${basePath}/ressurser-admin`} element={<LandingComponent />} />
									{/*<Route path={`${basePath}/ressurser-admin?tab=:tab`} element={<LandingComponent />} />*/}

									<Route
										path={`${basePath}/ressurser-admin/successful-creation`}
										element={<SuccessfulCreation />}
									/>
									<Route
										path={`${basePath}/ressurser-admin/tildelingsadmin/id/:userId`}
										element={<UserAssignment basePath={basePath} />}
									/>

									<Route path="*" element={<NotFound />} />
								</Routes>
							</FeaturesProvider>
						</AssignmentProvider>
					</OrgUnitsProvider>
				</UserProvider>
			</RoleProvider>
		</SafeTabChangeProvider>
	)
}

export default App
