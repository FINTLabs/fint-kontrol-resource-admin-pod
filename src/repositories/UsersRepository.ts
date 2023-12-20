import { IUser, IUserDetailsPage, IUserPage } from "../api/types"
import axios from "axios"

const getUsersPage = (
	basePath: string,
	currentPage: number,
	itemsPerPage: number,
	orgUnitIds: string[],
	searchString: string,
	roleFilter: string
) => {
	const baseUrl = `${basePath === "/" ? "" : basePath}/api/accessmanagement/v1/user`
	let queryParams = []
	if (currentPage) {
		queryParams.push(`page=${currentPage - 1}`)
	}

	if (itemsPerPage) {
		queryParams.push(`size=${itemsPerPage}`)
	}

	if (orgUnitIds) {
		orgUnitIds.map((orgUnitId) => queryParams.push(`orgUnitId=${orgUnitId}`))
	}

	if (searchString) {
		queryParams.push(`name=${searchString}`)
	}

	if (roleFilter) {
		queryParams.push(`accessroleid=${roleFilter}`)
	}

	const url = `${baseUrl}${queryParams.length > 0 ? "?" : ""}${queryParams.join("&")}`

	return axios.get<IUserPage>(url)
}

const getSpecificUserById = (basePath: string, userId: string) => {
	const url = `${basePath === "/" ? "" : basePath}/api/accessmanagement/v1/user/${userId}`
	return axios.get<IUser>(url)
}

// Used by AssignmentContext.
const getUserDetails = (
	basePath: string,
	resourceId: string,
	currentPage: number,
	itemsPerPage: number,
	selectedRoleFilter: string,
	objectTypeFilter: string,
	orgUnitSearchString: string
) => {
	const baseUrl = `${basePath === "/" ? "" : basePath}/api/accessmanagement/v1/user/${resourceId}/orgunits`

	let queryParams = []

	if (currentPage) {
		queryParams.push(`page=${currentPage - 1}`)
	}

	if (itemsPerPage) {
		queryParams.push(`size=${itemsPerPage}`)
	}

	if (orgUnitSearchString) {
		queryParams.push(`orgUnitName=${orgUnitSearchString}`)
	}

	if (objectTypeFilter) {
		queryParams.push(`objectType=${objectTypeFilter}`)
	}

	if (selectedRoleFilter !== "") {
		queryParams.push(`accessRoleId=${selectedRoleFilter}`)
	}

	const url = `${baseUrl}${queryParams.length > 0 ? "?" : ""}${queryParams.join("&")}`

	return axios.get<IUserDetailsPage>(url)
}

const getUserDetailsNoPagination = (basePath: string, resourceId: string) => {
	const url = `${basePath === "/" ? "" : basePath}/api/accessmanagement/v1/user/${resourceId}/orgunits`

	return axios.get<IUserDetailsPage>(url)
}

const UsersRepository = {
	getUsersPage,
	getSpecificUserById,
	getUserDetails,
	getUserDetailsNoPagination
}

export default UsersRepository
