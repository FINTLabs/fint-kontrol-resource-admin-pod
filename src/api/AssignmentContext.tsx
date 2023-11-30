import React, { createContext, useContext, useState } from "react"
import { IAssignment } from "./types"
import AssignmentRepository from "../repositories/AssignmentRepository"
import { toast } from "react-toastify"
import { AxiosError } from "axios"
import { useUser } from "./UserContext"

interface AssignmentContextType {
	deleteAllAssignmentsOnUser: (resourceId: string) => void
	deleteAssignmentById: (assignmentId: string) => void
	deleteOrgUnitFromAssignment: (userId: string, scopeId: string, orgUnitId: string) => void
	isLoading: boolean
	postNewAssignment: (newAssignment: IAssignment) => void
	putNewAssignment: (newAssignment: IAssignment) => void
}

const AssignmentContext = createContext<AssignmentContextType | undefined>(undefined)

export const AssignmentProvider = ({ children, basePath }: { children: React.ReactNode; basePath: string }) => {
	const [isLoading, setIsLoading] = useState(false)
	const { getUsersPage, getSpecificUserById } = useUser()

	const postNewAssignment = async (newAssignment: IAssignment) => {
		toast.dismiss()
		if (basePath) {
			setIsLoading(true)
			await AssignmentRepository.postNewAssignment(basePath, newAssignment)
				.then(() => {
					toast.success("Ny rolletildeling utført!")
					getUsersPage()
				})
				.catch((err: AxiosError) => {
					toast.error("Ny rolletildeling feilet.")
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
					toast.success("Oppdatert rolletildeling utført!")
					getUsersPage()
				})
				.catch((err: AxiosError) => {
					toast.error("Oppdatering av tildeling feilet.")
					console.log(err)
				})
				.finally(() => setIsLoading(false))
		}
	}

	const deleteAssignmentById = async (assignmentId: string) => {
		// TODO: API not ready, so this data might be wrong
		if (basePath) {
			setIsLoading(true)
			await AssignmentRepository.deleteAssignmentById(basePath, assignmentId)
				.then(() => {
					toast.success("Sletting av rolleknytning utført!")
					getUsersPage()
				})
				.catch((err: AxiosError) => {
					toast.error("Sletting av rolleknytning feilet.")
					console.log(err)
				})
				.finally(() => setIsLoading(false))
		}
	}

	const deleteOrgUnitFromAssignment = async (userId: string, scopeId: string, orgUnitId: string) => {
		if (basePath) {
			setIsLoading(true)
			await AssignmentRepository.deleteOrgUnitFromAssignment(basePath, scopeId, orgUnitId)
				.then(() => {
					toast.success("Sletting av orgenhetsknytning utført!")
				})
				.catch((err: AxiosError) => {
					toast.error("Sletting av orgenhetsknytning feilet.")
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
					toast.success("Alle rolleknytninger slettet!")
					getUsersPage()
				})
				.catch((err: AxiosError) => {
					toast.error("Sletting av rolleknytninger feilet.")
					console.log(err)
				})
				.finally(() => setIsLoading(false))
		}
	}

	return (
		<AssignmentContext.Provider
			value={{
				deleteOrgUnitFromAssignment,
				deleteAllAssignmentsOnUser,
				deleteAssignmentById,
				isLoading,
				postNewAssignment,
				putNewAssignment
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
