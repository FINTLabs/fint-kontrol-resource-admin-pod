import axios from "axios"
import { IAssignment, IUserRole } from "../api/types"
import { toast } from "react-toastify"

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
		orgUnitIds: newAssignment.orgUnits.map((orgunit) => String(orgunit.id))
	}
	return axios.post(url, preparedAssignmentBody)
}

const putAssignment = (basePath: string, updatedAssignment: IUserRole) => {
	// const baseUrl = `${basePath === "/" ? "" : basePath}/api/accessmanagement/v1/accessassignment`
	// const url = `${baseUrl}`
	toast.info("Lagring forsøkt, men feilet.")
	console.log(basePath)
	console.log(updatedAssignment)
	// TODO: fix this when API is ready
	// return axios.post(url, updatedAssignment)
}

const AssignmentRepository = {
	postNewAssignment,
	putAssignment
}

export default AssignmentRepository
