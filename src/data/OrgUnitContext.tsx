import React, { createContext, useContext, useState, useEffect } from 'react';
import {IOrgUnit, IOrgUnits} from './types';
import {fetchUnitTreeData} from "./api";

interface OrgUnitsContextType {
    orgUnitsData: IOrgUnits | null;
    setOrgUnitsData: (data: IOrgUnits | null) => void;
    selectedOrgUnits: IOrgUnit[];
    setSelectedOrgUnits: (orgUnits: IOrgUnit[]) => void;
}

const OrgUnitsContext = createContext<OrgUnitsContextType | undefined>(undefined);

export function OrgUnitsProvider({ children, basePath }: { children: React.ReactNode, basePath: string }) {
    const [orgUnitsData, setOrgUnitsData] = useState<IOrgUnits | null>(null);
    const [selectedOrgUnits, setSelectedOrgUnits] = useState<IOrgUnit[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const newUnitTree = await fetchUnitTreeData(basePath);
                console.log("Returned tree data: ", newUnitTree);
                setOrgUnitsData(newUnitTree);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [basePath]);

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
