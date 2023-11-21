import { IOrgUnitsPaginated } from "../api/types"
import axios from "axios"

const fetchUnitTreeData = (basePath: string) => {
	const baseUrl = `${basePath === "/" ? "" : basePath}/api/orgunits&size=999`
	return axios.get<IOrgUnitsPaginated>(baseUrl)
}

const OrgUnitRepository = {
	fetchUnitTreeData
}

export default OrgUnitRepository
