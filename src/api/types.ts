// types.ts
export interface IRole {
    Id: number,
    Feature: string,
    Operation: string,
    AccessRoleId: string
}

export interface IOrgUnit {
    id: number;
    name: string;
    organisationUnitId: string;
    parentRef: string;
    parentName: null | string;
    childrenRef: string[];
}

export interface IOrgUnits {
    totalItems: number;
    orgUnits: IOrgUnit[];
    totalPages: number;
    currentPage: number;
}

export interface IUserPage {
    totalItems: number;
    users: IUser[];
    totalPages: number;
    currentPage: number;
}

export interface IUserListToBeReplaced {
    users: IUser[]
}

export interface IUser {
    id: number,
    resourceId: string,
    fullName: string,
    userType: string,
    userName: string,
}

export type UsersContextState = {
    basePath: string;
    currentPage: number;
    isAggregate: boolean,
    isLoading: boolean,
    itemsPerPage: number,
    getUsersPage: () => void,
    selected: number[],
    setCurrentPage: (currentPageNumber: number) => void,
    setIsLoading: (isLoading: boolean) => void,
    setItemsPerPage: (paginationSize: number) => void,
    setSelected: (selected: number[]) => void,
    usersPage: IUserListToBeReplaced | null,
};

export const contextDefaultValues: UsersContextState = {
    basePath: "/",
    currentPage: 1,
    isAggregate: false,
    isLoading: false,
    itemsPerPage: 5,
    setCurrentPage: (currentPageNumber: number) => void {},
    getUsersPage(): void {},
    setIsLoading(isLoading: boolean): void {},
    selected: [],
    setItemsPerPage: (paginationSize: number) => void {},
    setSelected(selected: number[]): void {
    },
    usersPage: null,
};
