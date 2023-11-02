import axios from "axios"
import { IPermissionData, IRole } from "../api/types"

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
	const baseUrl = `${basePath === "/" ? "" : basePath}/api/accessmanagement/v1/permissionData/${roleId}`
	const url = `${baseUrl}`
	return axios.get<IPermissionData[]>(url)
}

const RolesRepository = {
	getAllRoles,
	getFeaturesInRole,
	getPermissionDataForRole
}

export default RolesRepository
