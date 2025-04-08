import axios from "axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const axiosSecure = axios.create({
    // baseURL: 'http://localhost:5000',
    baseURL: 'https://online-assessment-server.vercel.app',
    withCredentials: true
});

const useAxiosSecure = () => {

    const { logOut } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        axiosSecure.interceptors.response.use(res => {
            return res;
        }, error => {
            console.log(`error tracked in the interceptor`, error.response);
            if (error?.response?.status === 401) {
                console.log('logout the user');
                logOut()
                    .then(() => { })
                    .catch(error => {
                        console.log(error)
                        return navigate('/login');
                    });
            }
        })
    }, [logOut, navigate]);

    return axiosSecure;
};

export default useAxiosSecure;