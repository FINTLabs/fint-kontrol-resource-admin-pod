import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserPage } from './types';

// Create a context
interface UserContextType {
    UserData: UserPage | null;
    selectedUser: UserPage | null;
    setUser: (data: UserPage | null) => void;
    setSelectedUser: (user: UserPage | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
    const [UserData, setUserData] = useState<UserPage | null>(null);
    const [selectedUser, setSelectedUser] = useState<UserPage | null>(null);

    // Function to set the UserData
    const setUser = (data: UserPage | null) => {
        setUserData(data);
    };

    useEffect(() => {
        // Load data from a local JSON file (for testing)
        const fetchData = async () => {
            try {
                const response = await fetch(`./usersTest.json`);
                const data: UserPage = await response.json();
                setUser(data);
            } catch (error) {
                console.error('Error loading users data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <UserContext.Provider value={{ UserData, selectedUser, setUser, setSelectedUser }}>
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
