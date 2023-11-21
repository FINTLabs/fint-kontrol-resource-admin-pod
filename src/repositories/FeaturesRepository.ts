import axios from "axios"
import { IFeature } from "../api/types"

const getAllFeatures = (basePath: string) => {
	const baseUrl = `${basePath === "/" ? "" : basePath}/api/accessmanagement/v1/feature`
	return axios.get<IFeature[]>(baseUrl)
}

const FeaturesRepository = {
	getAllFeatures
}

export default FeaturesRepository
