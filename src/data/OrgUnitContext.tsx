import React, { createContext, useContext, useState, useEffect } from 'react';
import {OrgUnit, OrgUnits} from './types';
import {fetchUnitTreeData} from "./api";

interface OrgUnitsContextType {
    orgUnitsData: OrgUnits | null;
    setOrgUnitsData: (data: OrgUnits | null) => void;
    selectedOrgUnits: OrgUnit[]; // Store selected orgUnits in an array
    setSelectedOrgUnits: (orgUnits: OrgUnit[]) => void; // Function to set selected orgUnits
}

const OrgUnitsContext = createContext<OrgUnitsContextType | undefined>(undefined);

export function OrgUnitsProvider({ children }: { children: React.ReactNode }) {
    const [orgUnitsData, setOrgUnitsData] = useState<OrgUnits | null>(null);
    const [selectedOrgUnits, setSelectedOrgUnits] = useState<OrgUnit[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const newUnitTree = await fetchUnitTreeData();
                console.log("Returned tree data: ", newUnitTree);
                setOrgUnitsData(newUnitTree);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    return (
        <OrgUnitsContext.Provider
            value={{ orgUnitsData, setOrgUnitsData, selectedOrgUnits, setSelectedOrgUnits }}
        >
            {children}
        </OrgUnitsContext.Provider>
    );
}

export function useOrgUnits() {
    const context = useContext(OrgUnitsContext);
    if (!context) {
        throw new Error('useOrgUnits must be used within an OrgUnitsProvider');
    }
    return context;
}
