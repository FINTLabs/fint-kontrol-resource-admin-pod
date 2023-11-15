import React, { createContext, useContext, useEffect, useState } from "react"
import { useLocation } from "react-router-dom"

type SafeTabChangeContextType = {
	currentTab: string
	isModalVisible: boolean
	isTabModified: boolean
	tabToRouteTo: string
	setCurrentTab: (newTab: string) => void
	setIsModalVisible: (modalVisible: boolean) => void
	setIsTabModified: (isTabModified: boolean) => void
	setTabToRouteTo: (tabToRouteTo: string) => void
}

const SafeTabChangeContext = createContext<SafeTabChangeContextType | undefined>(undefined)

export const SafeTabChangeProvider = ({ children }: { children: React.ReactNode }) => {
	const location = useLocation()
	const searchParams = new URLSearchParams(location.search)
	const tab = searchParams.get("tab")
	const [isTabModified, setIsTabModified] = useState(false)
	const [isModalVisible, setIsModalVisible] = useState(false)
	const [currentTab, setCurrentTab] = useState<string>("")
	const [tabToRouteTo, setTabToRouteTo] = useState(currentTab)

	useEffect(() => {
		if (tab) {
			setCurrentTab(tab)
		}
	}, [tab])

	return (
		<SafeTabChangeContext.Provider
			value={{
				currentTab,
				isTabModified,
				tabToRouteTo,
				setCurrentTab,
				setIsTabModified,
				isModalVisible,
				setIsModalVisible,
				setTabToRouteTo
			}}
		>
			{children}
		</SafeTabChangeContext.Provider>
	)
}

export const useSafeTabChange = (): SafeTabChangeContextType => {
	const data = useContext(SafeTabChangeContext)
	if (data === undefined) {
		throw new Error("useData must be used within a DataProvider")
	}
	return data
}
