import React, { createContext, useContext, useState } from "react"

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
	const [isTabModified, setIsTabModified] = useState(false)
	const [isModalVisible, setIsModalVisible] = useState(false)
	const [currentTab, setCurrentTab] = useState<string>("tildel")
	const [tabToRouteTo, setTabToRouteTo] = useState(currentTab)

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
