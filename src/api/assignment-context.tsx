import React, { createContext, useContext, useState } from "react"
import { IAssignment } from "./types"
import { ErrorResponse } from "react-router-dom"
import AssignmentRepository from "../repositories/assignment-repository"

interface AssignmentContextType {
	isLoading: boolean
	postNewAssignment: (newAssignment: IAssignment) => void
}

const AssignmentContext = createContext<AssignmentContextType | undefined>(undefined)

export const AssignmentProvider = ({ children, basePath }: { children: React.ReactNode; basePath: string }) => {
	const [isLoading, setIsLoading] = useState(false)
	const postNewAssignment = async (newAssignment: IAssignment) => {
		if (basePath) {
			setIsLoading(true)
			await AssignmentRepository.postNewAssignment(basePath, newAssignment)
				.then((res) => console.log(res))
				.catch((err: ErrorResponse) => console.error(err))
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
