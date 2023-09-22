import React, { createContext, useContext, useState, useEffect } from 'react';
import { OrgUnit, OrgUnits } from './types';

// Create a context
interface OrgUnitsContextType {
    orgUnitsData: OrgUnits | null;
    setOrgUnitsData: (data: OrgUnits | null) => void;
    selectedOrgUnits: OrgUnit[]; // Store selected orgUnits in an array
    setSelectedOrgUnits: (orgUnits: OrgUnit[]) => void; // Function to set selected orgUnits
}

const OrgUnitsContext = createContext<OrgUnitsContextType | undefined>(undefined);

// Create a provider component to wrap your app
export function OrgUnitsProvider({ children }: { children: React.ReactNode }) {
    const [orgUnitsData, setOrgUnitsData] = useState<OrgUnits | null>(null);
    const [selectedOrgUnits, setSelectedOrgUnits] = useState<OrgUnit[]>([]);

    useEffect(() => {
        // Load data from a local JSON file (for testing)
        const fetchData = async () => {
            try {
                const response = await fetch(`./test.json`);
                const data: OrgUnits = await response.json();
                setOrgUnitsData(data);
            } catch (error) {
                console.error('Error loading org units data:', error);
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

// Create a custom hook to access the context
export function useOrgUnits() {
    const context = useContext(OrgUnitsContext);
    if (!context) {
        throw new Error('useOrgUnits must be used within an OrgUnitsProvider');
    }
    return context;
}
