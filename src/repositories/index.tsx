import axios from "axios"
import { IConfiguration } from "./types"
const getBaseUrl = () => {
	console.log("Fetching config!!!")
	return axios.get<IConfiguration>("api/layout/configuration")
}

const GeneralRepository = {
	getBaseUrl
}

export default GeneralRepository
