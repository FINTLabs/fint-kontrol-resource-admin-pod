import React, { useEffect, useState } from "react"
import { ErrorResponse, Route, Routes } from "react-router-dom"
import { RoleProvider } from "./api/RoleContext"
import LandingComponent from "./features"
import { OrgUnitsProvider } from "./api/OrgUnitContext"
import { UserProvider } from "./api/UserContext"
import { userContextDefaultValues } from "./api/types"
import GeneralRepository from "./repositories"
import { SafeTabChangeProvider } from "./api/safe-tab-change-context"
import { AssignmentProvider } from "./api/assignment-context"

function App() {
	const [basePath, setBasePath] = useState<string>(userContextDefaultValues.basePath)
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		const getBasePath = async () => {
			setIsLoading(true)
			GeneralRepository.getBaseUrl()
				.then((response) => {
					setBasePath(response.data.basePath)
				})
				.catch((err: ErrorResponse) => {
					console.log(err)
				})
		}
		if (process.env.NODE_ENV !== "development") {
			getBasePath().then((r) => setIsLoading(false))
		}
	}, [])

	if ((process.env.NODE_ENV === "production" && !basePath) || isLoading) {
		return <div>Loading...</div>
	}

	return (
		<SafeTabChangeProvider>
			<RoleProvider basePath={basePath}>
				<UserProvider basePath={basePath}>
					<OrgUnitsProvider basePath={basePath}>
						<AssignmentProvider basePath={basePath}>
							<Routes>
								<Route path={`${basePath}/ressurser-admin/`} element={<LandingComponent />} />
							</Routes>
						</AssignmentProvider>
					</OrgUnitsProvider>
				</UserProvider>
			</RoleProvider>
		</SafeTabChangeProvider>
	)
}

export default App
