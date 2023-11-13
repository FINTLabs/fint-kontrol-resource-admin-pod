import React, { createContext, useContext, useState } from "react"
import { IAssignment } from "./types"
import { useNavigate } from "react-router-dom"
import AssignmentRepository from "../repositories/assignment-repository"
import { toast } from "react-toastify"
import { AxiosError } from "axios"

interface AssignmentContextType {
	isLoading: boolean
	postNewAssignment: (newAssignment: IAssignment) => void
}

const AssignmentContext = createContext<AssignmentContextType | undefined>(undefined)

export const AssignmentProvider = ({ children, basePath }: { children: React.ReactNode; basePath: string }) => {
	const [isLoading, setIsLoading] = useState(false)
	const navigate = useNavigate()

	const postNewAssignment = async (newAssignment: IAssignment) => {
		toast.dismiss()
		if (basePath) {
			setIsLoading(true)
			await AssignmentRepository.postNewAssignment(basePath, newAssignment)
				.then((res) => {
					console.log(res.status)
					navigate("/successful-creation")
					toast.success("Ny rolletildeling utført!")
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
