import React, { createContext, useContext, useState } from "react"
import { IAssignment } from "./types"
import AssignmentRepository from "../repositories/AssignmentRepository"
import { toast } from "react-toastify"
import { AxiosError } from "axios"
import { useUser } from "./UserContext"

interface AssignmentContextType {
	isLoading: boolean
	postNewAssignment: (newAssignment: IAssignment) => void
}

const AssignmentContext = createContext<AssignmentContextType | undefined>(undefined)

export const AssignmentProvider = ({ children, basePath }: { children: React.ReactNode; basePath: string }) => {
	const [isLoading, setIsLoading] = useState(false)
	const { getUsersPage } = useUser()

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
					toast.error("Rolletildeling feilet.")
					console.log(err)
				})
				.finally(() => setIsLoading(false))
		}
	}
	return <AssignmentContext.Provider value={{ isLoading, postNewAssignment }}>{children}</AssignmentContext.Provider>
}

export const useAssignments = (): AssignmentContextType => {
	const context = useContext(AssignmentContext)
	if (!context) {
		throw new Error("useAssignments must be used within an AssignmentsProvider")
	}
	return context
}
