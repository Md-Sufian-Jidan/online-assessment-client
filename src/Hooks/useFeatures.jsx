import { useEffect, useState } from 'react';
import useAxiosSecure from './useAxiosSecure';

const useFeatures = () => {
    const [features, setFeatures] = useState();
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        axiosSecure.get(`/features`)
            .then(res => setFeatures(res.data))
    }, []);
    return { features };
};

export default useFeatures;