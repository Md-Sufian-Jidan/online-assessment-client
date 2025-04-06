import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import PropTypes from "prop-types";

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) return <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-violet-600"></div>

    if (user) return children;

    return <Navigate state={location?.pathname} to={'/login'} />
};

PrivateRoute.propTypes = {
    children: PropTypes.node.isRequired,
};
export default PrivateRoute;