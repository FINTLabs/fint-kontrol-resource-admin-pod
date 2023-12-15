import React, { createContext, useContext, useState } from "react"
import { IAssignment, IUserDetailsPage } from "./types"
import AssignmentRepository from "../repositories/AssignmentRepository"
import { toast } from "react-toastify"
import { AxiosError } from "axios"
import { useUser } from "./UserContext"
import UsersRepository from "../repositories/UsersRepository"
import { useNavigate } from "react-router-dom"
import { useSafeTabChange } from "./SafeTabChangeContext"

interface AssignmentContextType {
	deleteAllAssignmentsOnUser: (resourceId: string) => void
	deleteAssignmentById: (resourceId: string, roleId: string, objectTypeToDelete: string) => void
	deleteOrgUnitFromAssignment: (userId: string, scopeId: string, orgUnitId: string) => void
	getUserAssignmentDetailsPage: (resourceId: string) => void
	postNewAssignment: (newAssignment: IAssignment) => void
	putNewAssignment: (newAssignment: IAssignment) => void
	isLoading: boolean

	// Pagination
	currentPage: number
	itemsPerPage: number
	orgUnitSearchString: string
	userDetailsPage: IUserDetailsPage | null
	setCurrentPage: (val: number) => void
	setItemsPerPage: (val: number) => void
	setUserDetailsPage: (val: IUserDetailsPage) => void

	// Filters
	objectTypeFilter: string
	selectedRoleFilter: string
	setObjectTypeFilter: (val: string) => void
	setOrgUnitSearchString: (val: string) => void
	setSelectedRoleFilter: (val: string) => void
}

const AssignmentContext = createContext<AssignmentContextType | undefined>(undefined)

export const AssignmentProvider = ({ children, basePath }: { children: React.ReactNode; basePath: string }) => {
	const { getUsersPage, getSpecificUserById } = useUser()
	const [isLoading, setIsLoading] = useState(false)

	const { currentTab } = useSafeTabChange()
	const navigate = useNavigate()

	// Pagination
	const [userDetailsPage, setUserDetailsPage] = useState<IUserDetailsPage | null>(null)
	const [currentPage, setCurrentPage] = useState<number>(1)
	const [itemsPerPage, setItemsPerPage] = useState<number>(5)

	// Filters and search
	const [selectedRoleFilter, setSelectedRoleFilter] = useState("")
	const [objectTypeFilter, setObjectTypeFilter] = useState("")
	const [orgUnitSearchString, setOrgUnitSearchString] = useState("")

	const getUserAssignmentDetailsPage = async (resourceId: string) => {
		setIsLoading(true)
		await UsersRepository.getUserDetails(
			basePath,
			resourceId,
			currentPage,
			itemsPerPage,
			selectedRoleFilter,
			objectTypeFilter,
			orgUnitSearchString
		)
			.then((response) => {
				setUserDetailsPage(response.data)
			})
			.catch((err: AxiosError) => console.error(err))
			.finally(() => setIsLoading(false))
	}

	const postNewAssignment = async (newAssignment: IAssignment) => {
		toast.dismiss()
		if (basePath) {
			setIsLoading(true)
			await AssignmentRepository.postNewAssignment(basePath, newAssignment)
				.then(() => {
					toast.success("Ny rolletildeling utført!", {
						role: "alert"
					})
					getUsersPage()
				})
				.catch((err: AxiosError) => {
					toast.error("Ny rolletildeling feilet.", {
						role: "alert"
					})
					console.log(err)
				})
				.finally(() => setIsLoading(false))
		}
	}

	const putNewAssignment = async (newAssignment: IAssignment) => {
		toast.dismiss()
		if (basePath) {
			setIsLoading(true)
			await AssignmentRepository.putNewAssignment(basePath, newAssignment)
				.then(() => {
					toast.success("Oppdatert rolletildeling utført!", {
						role: "alert"
					})
					getUsersPage()
				})
				.catch((err: AxiosError) => {
					toast.error("Oppdatering av tildeling feilet.", {
						role: "alert"
					})
					console.log(err)
				})
				.finally(() => setIsLoading(false))
		}
	}

	const deleteAssignmentById = async (resourceId: string, roleId: string, objectTypeToDelete: string) => {
		if (basePath) {
			setIsLoading(true)
			await AssignmentRepository.deleteAssignmentById(basePath, resourceId, roleId, objectTypeToDelete)
				.then(() => {
					toast.success("Sletting av rolleknytning utført!", {
						role: "alert"
					})
				})
				.catch((err: AxiosError) => {
					toast.error("Sletting av rolleknytning feilet.", {
						role: "alert"
					})
					console.log(err)
				})
				.finally(() => {
					setIsLoading(false)
					getUserAssignmentDetailsPage(resourceId)
				})
		}
	}

	const deleteOrgUnitFromAssignment = async (userId: string, scopeId: string, orgUnitId: string) => {
		if (basePath) {
			setIsLoading(true)
			await AssignmentRepository.deleteOrgUnitFromAssignment(basePath, scopeId, orgUnitId)
				.then(() => {
					toast.success("Sletting av orgenhetsknytning utført!", {
						role: "alert"
					})
				})
				.catch((err: AxiosError) => {
					toast.error("Sletting av orgenhetsknytning feilet.", {
						role: "alert"
					})
					console.log(err)
				})
				.finally(() => {
					setIsLoading(false)
					getSpecificUserById(userId)
				})
		}
	}

	const deleteAllAssignmentsOnUser = async (resourceId: string) => {
		if (basePath) {
			setIsLoading(true)
			await AssignmentRepository.deleteAllAssignmentsOnUser(basePath, resourceId)
				.then(() => {
					toast.success("Alle rolleknytninger slettet!", {
						role: "alert"
					})
					navigate(`/ressurser-admin/?tab=${currentTab}`)
				})
				.catch((err: AxiosError) => {
					toast.error("Sletting av rolleknytninger feilet.", {
						role: "alert"
					})
					console.log(err)
				})
				.finally(() => {
					setIsLoading(false)
					getSpecificUserById(resourceId)
				})
		}
	}

	return (
		<AssignmentContext.Provider
			value={{
				currentPage,
				deleteOrgUnitFromAssignment,
				deleteAllAssignmentsOnUser,
				deleteAssignmentById,
				isLoading,
				itemsPerPage,
				getUserAssignmentDetailsPage,
				objectTypeFilter,
				orgUnitSearchString,
				postNewAssignment,
				putNewAssignment,
				selectedRoleFilter,
				setCurrentPage,
				setItemsPerPage,
				setObjectTypeFilter,
				setOrgUnitSearchString,
				setSelectedRoleFilter,
				setUserDetailsPage,
				userDetailsPage
			}}
		>
			{children}
		</AssignmentContext.Provider>
	)
}

export const useAssignments = (): AssignmentContextType => {
	const context = useContext(AssignmentContext)
	if (!context) {
		throw new Error("useAssignments must be used within an AssignmentsProvider")
	}
	return context
}
