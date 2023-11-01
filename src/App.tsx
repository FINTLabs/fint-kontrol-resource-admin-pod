import React, { useEffect, useState } from "react"
import theme from "./template/theme"
import { ErrorResponse, Route, Routes } from "react-router-dom"
import { RoleProvider } from "./api/RoleContext"
import LandingComponent from "./features"
import { ThemeProvider } from "@mui/material"
import { OrgUnitsProvider } from "./api/OrgUnitContext"
import { UserProvider } from "./api/UserContext"
import { userContextDefaultValues } from "./api/types"
import GeneralRepository from "./repositories"

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
		<ThemeProvider theme={theme}>
			<RoleProvider basePath={basePath}>
				<UserProvider basePath={basePath}>
					<OrgUnitsProvider basePath={basePath}>
						<Routes>
							<Route path={`${basePath}/ressurser-admin/`} element={<LandingComponent />} />
						</Routes>
					</OrgUnitsProvider>
				</UserProvider>
			</RoleProvider>
		</ThemeProvider>
	)
}

export default App
