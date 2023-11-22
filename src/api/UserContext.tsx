import React, { createContext, useContext, useState, useEffect } from "react"
import { IUser, userContextDefaultValues, IUserPage } from "./types"
import UsersRepository from "../repositories/UsersRepository"
import { AxiosError } from "axios"
import { useSafeTabChange } from "./SafeTabChangeContext"

interface UserContextType {
	currentPage: number
	isLoading: boolean
	itemsPerPage: number
	orgUnitIds: string[]
	usersPage: IUserPage | null
	searchString: string
	selectedUser: IUser | null
	setCurrentPage: (currentPage: number) => void
	setIsLoading: (isLoading: boolean) => void
	setItemsPerPage: (itemsPerUSer: number) => void
	setSelectedUser: (user: IUser | null) => void
	setOrgUnitIdsFilter: (orgUnitIds: string[]) => void
	setUser: (data: IUserPage | null) => void
	setSearchString: (searchString: string) => void
}

export const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children, basePath }: { children: React.ReactNode; basePath: string }) {
	const { currentTab } = useSafeTabChange()
	const [currentPage, setCurrentPage] = useState<number>(1)
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [itemsPerPage, setItemsPerPage] = useState<number>(5)
	const [orgUnitIds, setOrgUnitIdsFilter] = useState<string[]>(userContextDefaultValues.orgUnitIds)
	const [selectedUser, setSelectedUser] = useState<IUser | null>(null)
	const [usersPage, setUsersPage] = useState<IUserPage | null>(null)
	const [searchString, setSearchString] = useState<string>("")

	useEffect(() => {
		resetPagination()
	}, [currentTab])

	const setUser = (data: IUserPage | null) => {
		setUsersPage(data)
	}

	useEffect(() => {
		const fetchUsersPage = async () => {
			if (basePath) {
				setIsLoading(true)
				await UsersRepository.getUsersPage(basePath, currentPage, itemsPerPage, orgUnitIds, searchString)
					.then((response) => {
						setUsersPage(response.data)
					})
					.catch((err: AxiosError) => console.error(err))
					.finally(() => setIsLoading(false))
			}
		}

		fetchUsersPage()
	}, [basePath, currentPage, itemsPerPage, orgUnitIds, searchString])

	const resetPagination = () => {
		setCurrentPage(1)
		setItemsPerPage(5)
	}

	return (
		<UserContext.Provider
			value={{
				currentPage,
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
				setSearchString
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
