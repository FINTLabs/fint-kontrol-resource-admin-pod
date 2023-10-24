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
    setIsLoading: (isLoading: boolean) => void,
    setItemsPerPage: (paginationSize: number) => void,
    setSelected: (selected: number[]) => void,
    usersPage: IUserPage | null,
    updateCurrentPage: (currentPage: number) => void;
};

export const contextDefaultValues: UsersContextState = {
    basePath: "/",
    currentPage: 1,
    isAggregate: false,
    isLoading: true,
    itemsPerPage: 5,
    getUsersPage(): void {},
    setIsLoading(isLoading: boolean): void {},
    selected: [],
    setItemsPerPage: (paginationSize: number) => void{},
    setSelected(selected: number[]): void {
    },
    usersPage: null,
    updateCurrentPage(): void {}
};
