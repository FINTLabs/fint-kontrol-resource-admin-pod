import React, { createContext, useContext, ReactNode } from 'react';
import initialData from './permissionsData'; // Import your Data type here
import Data from "./types";

// Define the data type and initial data
type DataContextType = Data[];
// const initialData: DataContextType = [...]; // Import your initialData here

// Create a context
const DataContext = createContext<DataContextType | undefined>(undefined);

// Create a data provider component
interface DataProviderProps {
    children: ReactNode;
}

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
    console.log("jennifer")
    return (
        <DataContext.Provider value={initialData}>
            {children}
        </DataContext.Provider>
    );
};

// Create a custom hook to access the data
export const useData = (): DataContextType => {
    const data = useContext(DataContext);
    if (data === undefined) {
        throw new Error('useData must be used within a DataProvider');
    }
    return data;
};
