import { VscLoading } from "react-icons/vsc";
import useAuth from "../../Hooks/useAuth";
import { FaEye, FaEyeSlash, FaGithub, FaGoogle } from "react-icons/fa6";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import auth from "../../Firebase/Firebase.config";
import { updateProfile } from "firebase/auth";

const Register = () => {
    const { createUser, loading, setLoading } = useAuth();
    const [show, setShow] = useState(false);
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.username.value;
        const email = form.email.value;
        const password = form.password.value;
        const photoUrl = form.photoUrl.value;

        const user = { name, email, password, photoUrl };
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
        console.log(user);
        createUser(email, password)
            .then(res => {
                updateProfile(auth.currentUser, {
                    displayName: name, photoURL: photoUrl
                }).then(() => {
                    console.log(res);
                    toast.success('User Created Successfully');
                    return navigate('/login');
                }).catch((err) => {
                    return toast.error(err.message);
                });
            })
            .catch(err => {
                console.log(err);
                return toast.error(err.message);
            });
    };

    return (
        <div className="w-full max-w-md mx-auto p-8 space-y-3 rounded-xl dark:bg-blue-50 dark:text-gray-800 my-5">
            <h1 className="text-2xl font-bold text-center">Register</h1>
            <form noValidate="" action="" onSubmit={handleRegister} className="space-y-6">
                <div className="space-y-1 text-sm">
                    <label htmlFor="username" className="block dark:text-gray-600">Username</label>
                    <input type="text" name="username" id="username" placeholder="Username" className="w-full px-4 py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600" />
                </div>
                <div className="space-y-1 text-sm">
                    <label htmlFor="email" className="block dark:text-gray-600">Email</label>
                    <input type="email" name="email" id="email" placeholder="email" className="w-full px-4 py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600" />
                </div>
                <div className="space-y-1 text-sm  relative">
                    <label htmlFor="password" className="block dark:text-gray-600">Password</label>
                    <input type={show ? 'text' : "password"} name="password" id="password" placeholder="Password" className="w-full px-4 py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600" />
                    <span className="absolute top-[35px] right-3" onClick={() => setShow(!show)}>
                        {show ?
                            <FaEye /> :
                            <FaEyeSlash />
                        }
                    </span>
                    <div className="flex justify-end text-xs dark:text-gray-600">
                        <a rel="noopener noreferrer" href="#">Forgot Password?</a>
                    </div>
                </div>
                <div className="space-y-1 text-sm">
                    <label htmlFor="photoUrl" className="block dark:text-gray-600">PhotoUrl</label>
                    <input type="text" name="photoUrl" id="photoUrl" placeholder="photoUrl" className="w-full px-4 py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600" />
                </div>
                <div className=" mt-6">
                    {loading ? <button className="w-full px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-lime-700/60 rounded-md hover:bg-sky-500 focus:outline-none focus:bg-sky-600 flex justify-center items-center">
                        <VscLoading className=" animate-spin" size={20} />
                    </button>
                        : <input className="w-full px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-sky-700 rounded-md focus:outline-none focus:bg-sky-600" type="submit" value="Sign In" />}
                </div>
            </form>
            <div className="flex items-center pt-4 space-x-1">
                <div className="flex-1 h-px sm:w-16 dark:bg-gray-300"></div>
                <p className="px-3 text-sm dark:text-gray-600">Login with social accounts</p>
                <div className="flex-1 h-px sm:w-16 dark:bg-gray-300"></div>
            </div>
            <div className="flex justify-center space-x-4">
                <button aria-label="Log in with Google" className="p-3 rounded-sm hover:text-green-500">
                    <FaGoogle size={25} />
                </button>
                <button aria-label="Log in with GitHub" className="p-3 rounded-sm hover:text-gray-500">
                    <FaGithub size={25} />
                </button>
            </div>
            <p className="text-xs text-center sm:px-6 dark:text-gray-600">Don't have an account?
                <Link to={'/login'} rel="noopener noreferrer" href="#" className="underline dark:text-gray-800">Sign up</Link>
            </p>
        </div>
    );
};

export default Register;