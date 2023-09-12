import React, { createContext, useContext, ReactNode } from 'react';
import initialData from './permissionsData'; // Import your Data type here
import {Role} from "./types";

// Define the data type and initial data
type DataContextType = Role[];
// const initialData: DataContextType = [...]; // Import your initialData here

// Create a context
const RoleContext = createContext<DataContextType | undefined>(undefined);

// Create a data provider component
interface DataProviderProps {
    children: ReactNode;
}

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
    console.log("jennifer")
    return (
        <RoleContext.Provider value={initialData}>
            {children}
        </RoleContext.Provider>
    );
};

// Create a custom hook to access the data
export const useData = (): DataContextType => {
    const data = useContext(RoleContext);
    if (data === undefined) {
        throw new Error('useData must be used within a DataProvider');
    }
    return data;
};
