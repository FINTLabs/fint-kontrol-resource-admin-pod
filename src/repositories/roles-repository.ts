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
	const baseUrl = `${basePath === "/" ? "" : basePath}/api/accessmanagement/v1/accesspermission/accessrole/${roleId}`
	const url = `${baseUrl}`
	return axios.get<IPermissionData>(url)
}

const putPermissionDataForRole = (basePath: string, updatedPermissionRole: IPermissionData) => {
	const baseUrl = `${basePath === "/" ? "" : basePath}/api/accessmanagement/v1/accesspermission`
	const url = `${baseUrl}`
	return axios.put(url, updatedPermissionRole)
}

const RolesRepository = {
	getAllRoles,
	getFeaturesInRole,
	getPermissionDataForRole,
	putPermissionDataForRole
}

export default RolesRepository
