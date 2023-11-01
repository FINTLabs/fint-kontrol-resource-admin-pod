import React, { createContext, useContext, useState, useEffect } from "react"
import initialData from "./testData/permissionsData" // Import your Data type here - THIS must be removed when API has operations: [] support
import { IFeature, IPermissionData, IRole, roleContextDefaultValues } from "./types"
import { ErrorResponse } from "react-router-dom"
import RolesRepository from "../repositories/roles-repository"

type RoleContextType = {
	isLoading: boolean
	featuresInRole: IFeature[]
	fetchFeaturesInRole: (roleId: string) => void
	fetchPermissionDataForRole: (roleId: string) => void
	permissionDataForRole: IPermissionData
	roles: IRole[]
	selectedAccessRoleId: string
	setIsLoading: (isLoading: boolean) => void
	setSelectedAccessRoleId: (accessRoleId: string) => void
}

const RoleContext = createContext<RoleContextType | undefined>(undefined)

export const RoleProvider = ({ children, basePath }: { children: React.ReactNode; basePath: string }) => {
	const [featuresInRole, setFeaturesInRole] = useState<IFeature[]>([])
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [permissionDataForRole, setPermissionDataForRole] = useState<IPermissionData>(
		roleContextDefaultValues.permissionDataForRole
	) // Remember to use this when api is ready with operations: []
	const [roles, setRoles] = useState<IRole[]>([]) // Remmeber to use this when api is ready with operations: []
	const [selectedAccessRoleId, setSelectedAccessRoleId] = useState<string>("")

	useEffect(() => {
		const fetchAllRoles = async () => {
			if (basePath) {
				setIsLoading(true)
				await RolesRepository.getAllRoles(basePath)
					.then((response) => {
						setRoles(response.data)
					})
					.catch((err: ErrorResponse) => console.error(err))
					.finally(() => setIsLoading(false))
			}
		}

		fetchAllRoles()
	}, [basePath])

	const fetchFeaturesInRole = async (roleId: string) => {
		if (basePath) {
			setIsLoading(true)
			await RolesRepository.getFeaturesInRole(basePath, roleId)
				.then((response) => {
					setRoles(response.data)
				})
				.catch((err: ErrorResponse) => console.error(err))
				.finally(() => setIsLoading(false))
		}
	}

	const fetchPermissionDataForRole = async (roleId: string) => {
		const foundEle = initialData.find((initDataEle) => initDataEle.accessRoleId === roleId)
		if (foundEle) {
			setPermissionDataForRole(foundEle)
		}

		// The code below is to be used when the API for permissionData is created
		// if (basePath) {
		// 	setIsLoading(true)
		// 	await RolesRepository.getPermissionDataForRole(basePath, roleId)
		// 		.then((response) => {
		// 			setRoles(response.data)
		// 		})
		// 		.catch((err: ErrorResponse) => console.error(err))
		// 		.finally(() => setIsLoading(false))
		// }
	}

	return (
		<RoleContext.Provider
			value={{
				isLoading,
				featuresInRole,
				fetchFeaturesInRole,
				fetchPermissionDataForRole,
				permissionDataForRole,
				roles,
				selectedAccessRoleId,
				setIsLoading,
				setSelectedAccessRoleId
			}}
		>
			{children}
		</RoleContext.Provider>
	)
}

export const useRole = (): RoleContextType => {
	const data = useContext(RoleContext)
	if (data === undefined) {
		throw new Error("useData must be used within a DataProvider")
	}
	return data
}
