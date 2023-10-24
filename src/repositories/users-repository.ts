import {IUserPage} from "../api/types";
import axios from "axios";

const getUsersPage =
    (basePath: string, currentPage: number, itemsPerPage: number) => {
        const baseUrl = `${basePath === '/' ? '' : basePath}/api/accessmanagement/v1/user`;
        let queryParams = [];

        if (currentPage) {
            queryParams.push(`page=${currentPage-1}`);
        }

        if (itemsPerPage) {
            queryParams.push(`size=${itemsPerPage}`);
        }

        const url = `${baseUrl}${queryParams.length > 0 ? '?' : ''}${queryParams.join('&')}`;

        console.log(url)
        console.log("OMAGAOJGPAOJGPADIOS")

        return axios.get<IUserPage>(url);
    }

const UsersRepository = {
    getUsersPage
};

export default UsersRepository;