import axios from "axios";
import {IRole} from "../api/types";

const getAllRoles =
    (basePath: string) => {
        const baseUrl = `${basePath === '/' ? '' : basePath}/api/accessmanagement/v1/accessrole`;
        const url = `${baseUrl}`;
        return axios.get<IRole[]>(url);
    }

const RolesRepository = {
    getAllRoles
}

export default RolesRepository