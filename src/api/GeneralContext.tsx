import React, { createContext, useContext, useEffect, useState } from "react"
import { AxiosError } from "axios"
import GeneralRepository from "../repositories"

interface GeneralContextType {
	basePath: string
	isLoading: boolean
}

export const GeneralContext = createContext<GeneralContextType | undefined>(undefined)

export function GeneralProvider({ children }: { children: React.ReactNode }) {
	const [basePath, setBasePath] = useState<string>("")
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		const fetchBasePath = async () => {
			setIsLoading(true)
			await GeneralRepository.getBaseUrl()
				.then((response) => {
					if (response.data.basePath) {
						setBasePath(response.data.basePath)
					} else {
						setBasePath("/")
					}
				})
				.catch((err: AxiosError) => {
					setBasePath("/")
					console.error(err)
				})
		}

		if (process.env.NODE_ENV === "production") {
			fetchBasePath().then(() => setIsLoading(false))
		} else {
			setBasePath("/")
		}
	}, [])

	return (
		<GeneralContext.Provider
			value={{
				basePath,
				isLoading
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
