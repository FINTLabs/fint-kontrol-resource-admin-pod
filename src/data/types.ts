// types.ts
export interface Role {
    Id: number,
    Feature: string,
    Operation: string,
    AccessRoleId: string
}

export interface OrgUnit {
    id: number;
    name: string;
    organisationUnitId: string;
    parentRef: string;
    parentName: null | string;
    childrenRef: string[];
}

export interface OrgUnits {
    totalItems: number;
    orgUnits: OrgUnit[];
    totalPages: number;
    currentPage: number;
}

export interface UserPage {
    totalItems: number;
    members: User[];
    totalPages: number;
    currentPage: number;
}

export interface User {
    id: number,
    firstName: string,
    lastName: string,
    userType: string,
    userName: string,

}

