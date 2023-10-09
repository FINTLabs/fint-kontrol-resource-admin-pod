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
    fullName: string,
    userType: string,
    userName: string,

}

