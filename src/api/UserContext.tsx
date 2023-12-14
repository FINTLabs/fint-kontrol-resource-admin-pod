import React, { createContext, useContext, useState, useEffect } from "react"
import { IUser, userContextDefaultValues, IUserPage } from "./types"
import UsersRepository from "../repositories/UsersRepository"
import { AxiosError } from "axios"
import { useSafeTabChange } from "./SafeTabChangeContext"
import { toast } from "react-toastify"

interface UserContextType {
	getUsersPage: () => void
	getSpecificUserById: (userId: string) => void
	usersPage: IUserPage | null
	specificUser: IUser | null
	setSpecificUser: (user: IUser | null) => void
	setIsLoading: (isLoading: boolean) => void
	selectedUser: IUser | null
	setUser: (data: IUserPage | null) => void

	isLoading: boolean

	// 	Pagination
	currentPage: number
	itemsPerPage: number
	setCurrentPage: (currentPage: number) => void
	setItemsPerPage: (itemsPerUSer: number) => void
	setSelectedUser: (user: IUser | null) => void

	// 	Search and filters
	orgUnitIds: string[]
	searchString: string
	roleFilter: string
	setOrgUnitIdsFilter: (orgUnitIds: string[]) => void
	setSearchString: (searchString: string) => void
	setRoleFilter: (roleFilterString: string) => void
}

export const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children, basePath }: { children: React.ReactNode; basePath: string }) {
	const { currentTab } = useSafeTabChange()
	const [isLoading, setIsLoading] = useState<boolean>(false)

	// Pagination
	const [usersPage, setUsersPage] = useState<IUserPage | null>(null)
	const [currentPage, setCurrentPage] = useState<number>(1)
	const [itemsPerPage, setItemsPerPage] = useState<number>(5)

	const [selectedUser, setSelectedUser] = useState<IUser | null>(null)
	const [specificUser, setSpecificUser] = useState<IUser | null>(null)

	// Search and filters
	const [orgUnitIds, setOrgUnitIdsFilter] = useState<string[]>(userContextDefaultValues.orgUnitIds)
	const [searchString, setSearchString] = useState<string>("")
	const [roleFilter, setRoleFilter] = useState("")

	useEffect(() => {
		resetPagination()
	}, [currentTab])

	const setUser = (data: IUserPage | null) => {
		setUsersPage(data)
	}

	const getUsersPage = async () => {
		setIsLoading(true)
		await UsersRepository.getUsersPage(basePath, currentPage, itemsPerPage, orgUnitIds, searchString, roleFilter)
			.then((response) => {
				setUsersPage(response.data)
			})
			.catch((err: AxiosError) => {
				console.error(err)
				toast.error("Klarte ikke å hente brukerlisten.", {
					role: "alert"
				})
			})
			.finally(() => setIsLoading(false))
	}

	const getSpecificUserById = async (userId: string) => {
		try {
			setIsLoading(true)
			const response = await UsersRepository.getSpecificUserById(basePath, userId)
			setSpecificUser(response.data)
		} catch (error) {
			// Handle errors here if necessary
			console.error("Error fetching specific user:", error)
			throw error // Throw the error to propagate it in case the caller wants to handle it
		} finally {
			setIsLoading(false)
		}
	}

	const resetPagination = () => {
		setCurrentPage(1)
		setItemsPerPage(5)
	}

	return (
		<UserContext.Provider
			value={{
				currentPage,
				getUsersPage,
				getSpecificUserById,
				itemsPerPage,
				isLoading,
				orgUnitIds,
				usersPage,
				searchString,
				selectedUser,
				setCurrentPage,
				setIsLoading,
				setUser,
				setSelectedUser,
				setItemsPerPage,
				setOrgUnitIdsFilter,
				setSearchString,
				setRoleFilter,
				setSpecificUser,
				specificUser,
				roleFilter
			}}
		>
			{children}
		</UserContext.Provider>
	)
}

export function useUser() {
	const context = useContext(UserContext)
	if (!context) {
		throw new Error("useUser must be used within a UserProvider")
	}
	return context
}
