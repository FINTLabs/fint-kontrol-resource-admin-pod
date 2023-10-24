import React, { createContext, useContext, useState, useEffect } from 'react';
import {IUserPage, IUser, UsersContextState, contextDefaultValues} from './types';
import UsersRepository from "../repositories/users-repository";
import {ErrorResponse} from "react-router-dom";

interface UserContextType {
    usersPage: IUserPage | null;
    selectedUser: IUser | null;
    setUser: (data: IUserPage | null) => void;
    setSelectedUser: (user: IUser | null) => void;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);
export const UsersContext = createContext<UsersContextState>(contextDefaultValues);

export function UserProvider({ children, basePath }: { children: React.ReactNode, basePath: string }) {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [itemsPerPage, setItemsPerPage] = useState<number>(5);
    const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
    const [usersPage, setUsersPage] = useState<IUserPage | null>(null);

    const setUser = (data: IUserPage | null) => {
        setUsersPage(data);
    };

    useEffect(() => {
        const fetchUsersPage = () => {
            if (basePath) {
                setIsLoading(true)
                UsersRepository.getUsersPage(basePath, currentPage, itemsPerPage)
                    .then((response) => setUsersPage(response.data))
                    .catch((err: ErrorResponse) => console.error(err))
                    .finally(() => setIsLoading(false))
            }
        }
        console.log("Fetching usersPage")
        console.log(usersPage)

        fetchUsersPage()
    }, [basePath, currentPage, itemsPerPage]);

    return (
        <UserContext.Provider value={{ usersPage, selectedUser, setUser, setSelectedUser }}>
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
