import React from 'react';
import { FaGithub, FaGoogle, } from 'react-icons/fa6';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';
import { VscLoading } from 'react-icons/vsc';
import { toast } from 'react-toastify';

const Login = () => {
    const { signInUser, googleLogin, githubLogin, loading, setLoading } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    console.log(location);

    const handleLogin = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        if (password.length < 6) {
            setLoading(false);
            return toast.error('Your password should at least 6 character long');
        }
        if (!/[A-Z]/.test(password)) {
            setLoading(false);
            return toast.error('Your password should contain a Capital letter')
        }
        if (!/[a-z]/.test(password)) {
            setLoading(false);
            return toast.error('Your password should contain a lower letter')
        }

        signInUser(email, password)
            .then(() => {
                setLoading(false);
                navigate(location?.state ? location?.state : '/');
                return toast.success('User Login Successfully');
            })
            .catch(err => {
                setLoading(false);
                return toast.error(err.message);
            });
    };
    const handleGoogle = () => {
        googleLogin()
            .then(res => {
                console.log(res);
                navigate(location?.state ? location?.state : '/');
                return toast.success('User Login Successfully');
            })
            .catch(err => {
                return toast.error(err.message);
            });
    };

    const handleGithub = () => {
        githubLogin()
            .then(res => {
                console.log(res);
                navigate(location?.state ? location?.state : '/');
                return toast.success('User Login Successfully');
            })
            .catch(err => {
                return toast.error(err.message);
            });
    };

    return (
        <div className="w-full max-w-md mx-auto my-5 p-4 rounded-md shadow sm:p-8 dark:bg-gray-50 dark:text-gray-800">
            <h2 className="mb-3 text-3xl font-semibold text-center">Login to your account</h2>
            <p className="text-sm text-center dark:text-gray-600">Dont have account?
                <Link to={'/register'} rel="noopener noreferrer" className="focus:underline hover:underline">Sign Up</Link>
            </p>
            <div className="my-6 space-y-4">
                <button onClick={handleGoogle} aria-label="Login with Google" type="button" className="flex items-center justify-center w-full p-4 space-x-4 border rounded-md focus:ring-2 focus:ring-offset-1 dark:border-gray-600 focus:dark:ring-violet-600 hover:text-green-500">
                    <FaGoogle />
                    <p>Login with Google</p>
                </button>
                <button onClick={handleGithub} aria-label="Login with GitHub" role="button" className="flex items-center justify-center w-full p-4 space-x-4 border rounded-md focus:ring-2 focus:ring-offset-1 dark:border-gray-600 focus:dark:ring-violet-600 hover:text-gray-500">
                    <FaGithub />
                    <p>Login with GitHub</p>
                </button>
            </div>
            <div className="flex items-center w-full my-4">
                <hr className="w-full dark:text-gray-600" />
                <p className="px-3 dark:text-gray-600">OR</p>
                <hr className="w-full dark:text-gray-600" />
            </div>
            <form noValidate="" action="" onSubmit={handleLogin} className="space-y-8">
                <div className="space-y-4">
                    <div className="space-y-2">
                        <label htmlFor="email" className="block text-sm">Email address</label>
                        <input type="email" name="email" id="email" placeholder="your@email.com" className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600" />
                    </div>
                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <label htmlFor="password" className="text-sm">Password</label>
                            <a rel="noopener noreferrer" href="#" className="text-xs hover:underline dark:text-gray-600">Forgot password?</a>
                        </div>
                        <input type="password" name="password" id="password" placeholder="*****" className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600" />
                    </div>
                </div>
                <div className=" mt-6">
                    {loading ? <button className="w-full px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-lime-700/60 rounded-md hover:bg-sky-500 focus:outline-none focus:bg-sky-600 flex justify-center items-center">
                        <VscLoading className=" animate-spin" size={20} />
                    </button>
                        : <input className="w-full px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-sky-700 rounded-md focus:outline-none focus:bg-sky-600" type="submit" value="Sign In" />}
                </div>
            </form>
        </div>
    );
};

export default Login;