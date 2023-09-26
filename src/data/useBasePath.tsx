import { useState, useEffect } from 'react';
import axios from 'axios';

export function useBasePath() {
    const [basePath, setBasePath] = useState('');

    console.log("help this sucks");

    useEffect(() => {
        const configUrl = '/api/layout/configuration';
        console.log("inside basepath getting config")
        axios
            .get(configUrl)
            .then((response) => {
                console.log("inside basepath getting config")
                const newBasePath = response.data.basePath;
                setBasePath(newBasePath);
            })
            .catch((error) => {
                console.error('API Error:', error);

                //throw error;
            });
    }, []);

    return basePath;
}
