import { useState, useEffect } from 'react';
import axios from 'axios';

export function useBasePath() {
    const [basePath, setBasePath] = useState('/');

    useEffect(() => {
        const configUrl = '/api/layout/configuration';

        axios
            .get(configUrl)
            .then((response) => {
                const newBasePath = response.data.basePath;
                setBasePath(newBasePath);
            })
            .catch((error) => {
                console.error('API Local?:', error);
                // throw error;
            });
    }, []);

    return basePath;
}
