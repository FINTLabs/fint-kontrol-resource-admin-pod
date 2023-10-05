import axios from 'axios';
import {IOrgUnits} from './types';

const configUrl = 'api/layout/configuration';

export const fetchUnitTreeData = async (): Promise<IOrgUnits> => {
    try {
        let newBasePath = '';
        try {
            const basePathResponse = await axios.get(configUrl);
            newBasePath = basePathResponse.data.basePath;
            console.log("basePath in fetch unit data", newBasePath);
        } catch (basePathError) {
            console.error('Error getting base path:', basePathError);
        }

        let baseUrl = `${newBasePath}/api/orgunits`;

        const response = await axios.get<IOrgUnits>(baseUrl);
        return response.data;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
};