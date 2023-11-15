import React, { createContext, useContext, useState, useEffect } from "react"
import { IOrgUnit, IOrgUnitsPaginated } from "./types"
import OrgUnitRepository from "../repositories/org-unit-repository"

interface OrgUnitsContextType {
	orgUnitsData: IOrgUnitsPaginated | null
	setOrgUnitsData: (data: IOrgUnitsPaginated | null) => void
	selectedOrgUnits: IOrgUnit[]
	setSelectedOrgUnits: (orgUnits: IOrgUnit[]) => void
}

const OrgUnitsContext = createContext<OrgUnitsContextType | undefined>(undefined)

export function OrgUnitsProvider({ children, basePath }: { children: React.ReactNode; basePath: string }) {
	const [orgUnitsData, setOrgUnitsData] = useState<IOrgUnitsPaginated | null>(null)
	const [selectedOrgUnits, setSelectedOrgUnits] = useState<IOrgUnit[]>([])

	useEffect(() => {
		const fetchData = () => {
			OrgUnitRepository.fetchUnitTreeData(basePath)
				.then((response) => setOrgUnitsData(response.data))
				.catch((error) => console.log(error))
		}

		fetchData()
	}, [basePath])

	return (
		<OrgUnitsContext.Provider value={{ orgUnitsData, setOrgUnitsData, selectedOrgUnits, setSelectedOrgUnits }}>
			{children}
		</OrgUnitsContext.Provider>
	)
}

export function useOrgUnits() {
	const context = useContext(OrgUnitsContext)
	if (!context) {
		throw new Error("useOrgUnits must be used within an OrgUnitsProvider")
	}
	return context
}
