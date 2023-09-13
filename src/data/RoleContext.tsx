import React, { createContext, useContext, ReactNode, useState } from 'react';
import initialData from './permissionsData'; // Import your Data type here
import { Role } from "./types";

type RoleContextType = {
    roles: Role[];
    selectedAccessRoleId: String | null;
    setSelectedAccessRoleId: (accessRoleId: String | null) => void;
};

const RoleContext = createContext<RoleContextType | undefined>(undefined);

interface DataProviderProps {
    children: ReactNode;
}

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
    const [selectedAccessRoleId, setSelectedAccessRoleId] = useState<String | null>(null);

    return (
        <RoleContext.Provider value={{ roles: initialData, selectedAccessRoleId, setSelectedAccessRoleId }}>
            {children}
        </RoleContext.Provider>
    );
};

export const useRole = (): RoleContextType => {
    const data = useContext(RoleContext);
    if (data === undefined) {
        throw new Error('useData must be used within a DataProvider');
    }
    return data;
};
