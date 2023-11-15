import React, { createContext, useContext, useState } from "react"
import { AxiosError } from "axios"
import GeneralRepository from "../repositories"

interface GeneralContextType {
	basePath: string
	isLoading: boolean
	fetchBasePath: () => void
}

export const GeneralContext = createContext<GeneralContextType | undefined>(undefined)

export function GeneralProvider({ children }: { children: React.ReactNode }) {
	const [basePath, setBasePath] = useState("/")
	const [isLoading, setIsLoading] = useState(false)

	const fetchBasePath = () => {
		if (process.env.NODE_ENV !== "development") {
			setIsLoading(true)
			GeneralRepository.getBaseUrl()
				.then((response) => {
					if (response.data.basePath) {
						setBasePath(response.data.basePath)
					} else {
						setBasePath("/")
					}
				})
				.catch((err: AxiosError) => console.error(err))
				.finally(() => setIsLoading(false))
		}
	}

	console.log(basePath)

	return (
		<GeneralContext.Provider
			value={{
				basePath,
				isLoading,
				fetchBasePath
			}}
		>
			{children}
		</GeneralContext.Provider>
	)
}

export function useGeneral() {
	const context = useContext(GeneralContext)
	if (!context) {
		throw new Error("useUser must be used within a UserProvider")
	}
	return context
}
