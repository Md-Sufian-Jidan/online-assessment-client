import { Link, NavLink } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";

const Navbar = () => {
    const { user } = useAuth();
    const navLinks = <>
        <li><NavLink to={'/'} className={({ isActive }) => isActive === true ? 'text-[#334155] font-extrabold btn mr-2' : 'mr-2 font-medium btn hover:bg-[#38BDF8] hover:text-[#3B82F6'}>Home</NavLink></li>
        <li><NavLink to={'/create-assignment'} className={({ isActive }) => isActive === true ? 'text-[#334155] font-extrabold btn mr-2' : 'mr-2 font-medium btn hover:bg-[#38BDF8] hover:text-[#3B82F6'}>Create Assignment</NavLink></li>
        <li><NavLink to={'/assignments'} className={({ isActive }) => isActive === true ? 'text-[#334155] font-extrabold btn mr-2' : 'mr-2 font-medium btn hover:bg-[#38BDF8] hover:text-[#3B82F6'}>Assignments</NavLink></li>
        <li><NavLink to={'/pending-assignments'} className={({ isActive }) => isActive === true ? 'text-[#334155] font-extrabold btn mr-2' : 'mr-2 font-medium btn hover:bg-[#38BDF8] hover:text-[#3B82F6'}>Pending Assignments</NavLink></li>
    </>;

    return (
        <div className="navbar bg-blue-100 rounded-lg">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        {navLinks}
                    </ul>
                </div>
                <a className="btn btn-ghost text-xl">StudySync</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navLinks}
                </ul>
            </div>
            <div className="navbar-end space-x-2">
                {
                    user && <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img
                                    alt="Tailwind CSS Navbar component"
                                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                            </div>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            <li><a>Profile</a></li>
                            <li><a>Settings</a></li>
                            <li><a>Logout</a></li>
                        </ul>
                    </div>
                }
                <div className="space-x-2">
                    {
                        user ?
                            <Link>
                                <button>Logout</button></Link>
                            :
                            <>
                                <Link to={'/login'}>
                                    <button className="btn btn-success text-white font-semibold">Login</button>
                                </Link>
                                <Link to={'/register'}>
                                    <button className="btn btn-secondary text-white font-semibold">Register</button>
                                </Link>
                            </>
                    }
                </div>
            </div>
        </div>
    );
};

export default Navbar;