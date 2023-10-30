import React, {
	createContext,
	useContext,
	ReactNode,
	useState,
	useEffect
} from "react"
import initialData from "./testData/permissionsData" // Import your Data type here
import { IRole } from "./types"
import UsersRepository from "../repositories/users-repository"
import { ErrorResponse } from "react-router-dom"
import RolesRepository from "../repositories/roles-repository"

type RoleContextType = {
	isLoading: boolean
	roles: IRole[]
	selectedAccessRoleId: string
	setIsLoading: (isLoading: boolean) => void
	setSelectedAccessRoleId: (accessRoleId: string) => void
}

const RoleContext = createContext<RoleContextType | undefined>(undefined)

export const RoleProvider = ({
	children,
	basePath
}: {
	children: React.ReactNode
	basePath: string
}) => {
	const [selectedAccessRoleId, setSelectedAccessRoleId] = useState<string>("")
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [roles, setRoles] = useState<IRole[]>([])

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

	return (
		<RoleContext.Provider
			value={{
				roles,
				isLoading,
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
