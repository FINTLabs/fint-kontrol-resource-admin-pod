// basePathUtils.js
import axios from 'axios';

export async function getBasePath() {
    try {
        const basePathResponse = await axios.get('/api/layout/configuration');
        const newBasePath = basePathResponse.data.basePath;
        console.log("basePath in fetch unit data", newBasePath);
        return newBasePath || '/'; // Return the newBasePath if found, or '/' if not found
    } catch (error) {
        console.error('API Error:', error);
        return '/'; // Return '/' in case of an error
    }
}
