import axios, {AxiosResponse} from 'axios';
import {IOrgUnits} from './types';


export const fetchUnitTreeData = async (basePath: string): Promise<IOrgUnits> => {
    try {
        const baseUrl = `${basePath}/api/orgunits`;
        console.log("fetch unit tree from: ", baseUrl);

        const response: AxiosResponse<IOrgUnits> = await axios.get(baseUrl);
        return response.data;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
};