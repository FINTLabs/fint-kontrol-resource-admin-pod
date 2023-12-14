import React, { createContext, useContext, useEffect, useState } from "react"
import { IFeature, IPermissionData } from "./types"
import { AxiosError } from "axios"
import FeaturesRepository from "../repositories/FeaturesRepository"
import RolesRepositories from "../repositories/RolesRepositories"
import { toast } from "react-toastify"

interface FeaturesContextType {
	isLoading: boolean
	allFeatures: IFeature[]
	putFeaturesToRole: (updatedAssignment: IPermissionData) => any
}

const FeaturesContext = createContext<FeaturesContextType | undefined>(undefined)

export const FeaturesProvider = ({ children, basePath }: { children: React.ReactNode; basePath: string }) => {
	const [isLoading, setIsLoading] = useState(false)
	const [allFeatures, setAllFeatures] = useState<IFeature[]>([])

	useEffect(() => {
		if (basePath) {
			setIsLoading(true)
			fetchAllFeatures(basePath).then(() => setIsLoading(false))
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const fetchAllFeatures = async (basePath: string) => {
		if (basePath) {
			await FeaturesRepository.getAllFeatures(basePath)
				.then((res) => {
					setAllFeatures(res.data)
				})
				.catch((err: AxiosError) => {
					console.log(err)
				})
		}
	}

	const putFeaturesToRole = async (updatedPermissionData: IPermissionData) => {
		if (basePath) {
			setIsLoading(true)
			await RolesRepositories.putAssignment(basePath, updatedPermissionData)
				.then(() => {
					toast.success("Features ble lagt til", {
						role: "alert"
					})
				})
				.catch((err: AxiosError) => {
					console.log(err)
					toast.error("Noe gikk galt, Feilkode: " + err.code, {
						role: "alert"
					})
				})
				.finally(() => setIsLoading(false))
		}
	}

	return (
		<FeaturesContext.Provider value={{ isLoading, allFeatures, putFeaturesToRole }}>
			{children}
		</FeaturesContext.Provider>
	)
}

export const useFeatures = (): FeaturesContextType => {
	const context = useContext(FeaturesContext)
	if (!context) {
		throw new Error("useAssignments must be used within an AssignmentsProvider")
	}
	return context
}
