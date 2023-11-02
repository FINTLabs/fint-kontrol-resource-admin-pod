// types.ts

export interface IRole {
	accessRoleId: string
	name: string
}

// PermissionData is a role and its subsequent mapping to features and operation sets
export interface IPermissionData {
	accessRoleId: string
	name: string
	featureOperations: IFeatureOperation[]
}

export interface IFeatureOperation {
	name: string
	operations: string[]
}

// Features reside in a Role, but not as part of its type from the API
export interface IFeature {
	name: string
}

export interface IOrgUnit {
	id: number
	name: string
	organisationUnitId: string
	parentRef: string
	parentName: null | string
	childrenRef: string[]
}

export interface IOrgUnits {
	totalItems: number
	orgUnits: IOrgUnit[]
	totalPages: number
	currentPage: number
}

export interface IUserPage {
	totalItems: number
	users: IUser[]
	totalPages: number
	currentPage: number
}

export interface IUserListToBeReplaced {
	users: IUser[]
	totalItems: number
}

export interface IUser {
	id: number
	resourceId: string
	firstName: string
	lastName: string
	userType: string
	userName: string
}

// -----------------------

export type UsersContextState = {
	basePath: string
	currentPage: number
	isAggregate: boolean
	isLoading: boolean
	itemsPerPage: number
	orgUnitIds: string[]
	getUsersPage: () => void
	selected: number[]
	setCurrentPage: (currentPageNumber: number) => void
	setIsLoading: (isLoading: boolean) => void
	setItemsPerPage: (paginationSize: number) => void
	setOrgUnitIds: (orgUnitIds: string[]) => void
	setSelected: (selected: number[]) => void
	usersPage: IUserListToBeReplaced | null
}

export const userContextDefaultValues: UsersContextState = {
	basePath: "/",
	currentPage: 1,
	isAggregate: false,
	isLoading: false,
	itemsPerPage: 5,
	orgUnitIds: [],
	setCurrentPage: (currentPageNumber: number) => void {},
	getUsersPage(): void {},
	setIsLoading(isLoading: boolean): void {},
	selected: [],
	setItemsPerPage: (paginationSize: number) => void {},
	setOrgUnitIds(orgUnits: string[]): void {},
	setSelected(selected: number[]): void {},
	usersPage: null
}

// ------------------------

export type RoleContextState = {
	basePath: string
	currentPage: number
	isAggregate: boolean
	isLoading: boolean
	itemsPerPage: number
	permissionDataForRole: IPermissionData
	selected: number[]
	setCurrentPage: (currentPageNumber: number) => void
	setIsLoading: (isLoading: boolean) => void
	setItemsPerPage: (paginationSize: number) => void
	setSelected: (selected: number[]) => void
}

export const roleContextDefaultValues: RoleContextState = {
	basePath: "/",
	currentPage: 1,
	isAggregate: false,
	isLoading: false,
	itemsPerPage: 5,
	permissionDataForRole: { accessRoleId: "", name: "", featureOperations: [{ name: "", operations: ["GET"] }] },
	setCurrentPage: (currentPageNumber: number) => void {},
	setIsLoading(isLoading: boolean): void {},
	selected: [],
	setItemsPerPage: (paginationSize: number) => void {},
	setSelected(selected: number[]): void {}
}
