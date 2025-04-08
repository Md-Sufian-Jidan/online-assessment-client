import { useEffect, useState } from 'react';
import useAxiosSecure from './useAxiosSecure';

const useFeatures = () => {
    const [features, setFeatures] = useState();
    const [loading, setLoading] = useState(true);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        axiosSecure.get(`/features`)
            .then(res => {
                setFeatures(res.data);
                setLoading(false);
            });
    }, []);
    return { features, loading };
};

export default useFeatures;