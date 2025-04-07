import axios from "axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000',
    withCredentials: true
});

const useAxiosSecure = () => {
    const { logOut } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const interceptor = axiosSecure.interceptors.response.use(
            res => res,
            error => {
                console.log("Error tracked in the interceptor:", error.response);
                if (error.response?.status === 401) {
                    console.log("Logging out the user...");
                    logOut()
                        .then(() => navigate('/login'))
                        .catch(err => console.log(err));
                }
                return Promise.reject(error); // Always return the rejected error
            }
        );

        // Cleanup interceptor on unmount
        return () => {
            axiosSecure.interceptors.response.eject(interceptor);
        };
    }, [logOut, navigate]);

    return axiosSecure;
};

export default useAxiosSecure;