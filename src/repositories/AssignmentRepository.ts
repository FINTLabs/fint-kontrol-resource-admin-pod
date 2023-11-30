import axios from "axios"
import { IAssignment } from "../api/types"

interface IPreparedAssignment {
	userId: string
	scopeId: number
	accessRoleId: string
	orgUnitIds: string[]
}
const postNewAssignment = (basePath: string, newAssignment: IAssignment) => {
	const baseUrl = `${basePath === "/" ? "" : basePath}/api/accessmanagement/v1/accessassignment`
	const url = `${baseUrl}`
	const preparedAssignmentBody: IPreparedAssignment = {
		userId: String(newAssignment.user.resourceId),
		scopeId: newAssignment.scopeId,
		accessRoleId: newAssignment.accessRoleId,
		orgUnitIds: newAssignment.orgUnits.map((orgunit) => String(orgunit.organisationUnitId))
	}
	return axios.post<IAssignment>(url, preparedAssignmentBody)
}

const putNewAssignment = (basePath: string, newAssignment: IAssignment) => {
	const baseUrl = `${basePath === "/" ? "" : basePath}/api/accessmanagement/v1/accessassignment`
	const url = `${baseUrl}`
	const preparedAssignmentBody: IPreparedAssignment = {
		userId: String(newAssignment.user.resourceId),
		scopeId: newAssignment.scopeId,
		accessRoleId: newAssignment.accessRoleId,
		orgUnitIds: newAssignment.orgUnits.map((orgunit) => String(orgunit.organisationUnitId))
	}
	return axios.put<IAssignment>(url, preparedAssignmentBody)
}

const deleteOrgUnitFromAssignment = (basePath: string, scopeId: string, orgUnitId: string) => {
	const url = `${
		basePath === "/" ? "" : basePath
	}/api/accessmanagement/v1/accessassignment/scope/${scopeId}/orgunit/${orgUnitId}`
	return axios.delete<IAssignment>(url)
}

const deleteAssignmentById = (basePath: string, assignmentId: string) => {
	// TODO: API not ready, so this data might be wrong
	const url = `${basePath === "/" ? "" : basePath}/api/accessmanagement/v1/accessassignment/user/${assignmentId}`
	return axios.delete<IAssignment>(url)
}

const deleteAllAssignmentsOnUser = (basePath: string, resourceId: string) => {
	// resourceId is the user id for the time being (matches API)
	const url = `${basePath === "/" ? "" : basePath}/api/accessmanagement/v1/accessassignment/user/${resourceId}`
	return axios.delete<IAssignment>(url)
}

const AssignmentRepository = {
	deleteAllAssignmentsOnUser,
	deleteAssignmentById,
	deleteOrgUnitFromAssignment,
	postNewAssignment,
	putNewAssignment
}

export default AssignmentRepository
