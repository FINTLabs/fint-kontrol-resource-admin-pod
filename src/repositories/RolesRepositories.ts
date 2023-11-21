import axios from "axios"
import { IPermissionData, IRole, IUserRole } from "../api/types"
import { toast } from "react-toastify"

const getAllRoles = (basePath: string) => {
	const baseUrl = `${basePath === "/" ? "" : basePath}/api/accessmanagement/v1/accessrole`
	const url = `${baseUrl}`
	return axios.get<IRole[]>(url)
}

const getFeaturesInRole = (basePath: string, roleId: string) => {
	const baseUrl = `${basePath === "/" ? "" : basePath}/api/accessmanagement/v1/feature/${roleId}`
	const url = `${baseUrl}`
	return axios.get<IRole[]>(url)
}

const getPermissionDataForRole = (basePath: string, roleId: string) => {
	const baseUrl = `${basePath === "/" ? "" : basePath}/api/accessmanagement/v1/accesspermission/accessrole/${roleId}`
	const url = `${baseUrl}`
	return axios.get<IPermissionData>(url)
}

const putPermissionDataForRole = (basePath: string, updatedPermissionRole: IPermissionData) => {
	const baseUrl = `${basePath === "/" ? "" : basePath}/api/accessmanagement/v1/accesspermission`
	const url = `${baseUrl}`
	return axios.put(url, updatedPermissionRole)
}

const putAssignment = (basePath: string, updatedAssignment: IPermissionData) => {
	const baseUrl = `${basePath === "/" ? "" : basePath}/api/accessmanagement/v1/accesspermission`
	const url = `${baseUrl}`
	// TODO: fix this when API is ready
	return axios.put(url, updatedAssignment)
}

const putAccessRole = (basePath: string, updatedAssignment: IUserRole) => {
	const baseUrl = `${basePath === "/" ? "" : basePath}/api/accessmanagement/v1/accesspermission`
	const url = `${baseUrl}`
	toast.info("Lagring forsøkt, men feilet.")
	// TODO: fix this when API is ready
	return axios.post(url, updatedAssignment)
}

const RolesRepositories = {
	getAllRoles,
	getFeaturesInRole,
	getPermissionDataForRole,
	putPermissionDataForRole,
	putAssignment,
	putAccessRole
}

export default RolesRepositories
