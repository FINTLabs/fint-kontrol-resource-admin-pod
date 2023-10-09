import React, { createContext, useContext, useState, useEffect } from 'react';
import { IUserPage, IUser } from './types';

interface UserContextType {
    userData: IUserPage | null;
    selectedUser: IUser | null;
    setUser: (data: IUserPage | null) => void;
    setSelectedUser: (user: IUser | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
    const [userData, setUserData] = useState<IUserPage | null>(null);
    const [selectedUser, setSelectedUser] = useState<IUser | null>(null);

    const setUser = (data: IUserPage | null) => {
        setUserData(data);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log("next step is to try the mock server...");
                const response = await fetch('/mock-data/roles/members');
                const data = await response.json();
                setUser(data);
            } catch (error) {
                console.error('Error loading users data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <UserContext.Provider value={{ userData, selectedUser, setUser, setSelectedUser }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
}
