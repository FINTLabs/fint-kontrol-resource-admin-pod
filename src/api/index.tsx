import axios, {AxiosResponse} from 'axios';
import {IOrgUnits, IUserPage} from './types';


export const fetchUnitTreeData = async (basePath: string): Promise<IOrgUnits> => {
    try {
        const baseUrl = `${basePath === '/' ? '' : basePath}/api/orgunits`;
        console.log("fetch unit tree from: ", baseUrl);

        const response: AxiosResponse<IOrgUnits> = await axios.get(baseUrl);
        return response.data;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
};

export const fetchUsersWithRoles = async (basePath: string): Promise<IUserPage> => {
    try {
        const baseUrl = `${basePath === '/' ? '' : basePath}/api/accessmanagement/v1/user`;
        console.log("fetch unit tree from: ", baseUrl);

        const response: AxiosResponse<IUserPage> = await axios.get(baseUrl);
        return response.data;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
};