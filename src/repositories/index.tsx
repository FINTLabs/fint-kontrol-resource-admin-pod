import axios from "axios";
import {IConfiguration} from "./types";
const getBaseUrl = () => {
    return axios.get<IConfiguration>('api/layout/configuration');
}

const GeneralRepository  = {
    getBaseUrl
}

export default GeneralRepository
