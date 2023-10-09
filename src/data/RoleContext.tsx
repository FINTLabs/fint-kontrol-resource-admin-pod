import React, { createContext, useContext, ReactNode, useState } from 'react';
import initialData from './testData/permissionsData'; // Import your Data type here
import { IRole } from './types';

type RoleContextType = {
    roles: IRole[];
    selectedAccessRoleId: string;
    setSelectedAccessRoleId: (accessRoleId: string) => void;
};

const RoleContext = createContext<RoleContextType | undefined>(undefined);

interface DataProviderProps {
    children: ReactNode;
}

export const RoleProvider: React.FC<DataProviderProps> = ({ children }) => {
    const [selectedAccessRoleId, setSelectedAccessRoleId] = useState<string>('');
    console.log("What is my env:", process.env.NODE_ENV);

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
