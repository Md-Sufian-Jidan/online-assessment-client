import { createBrowserRouter } from "react-router-dom";
import Main from "../Main/Main";
import Home from "../Pages/Home/Home/Home";
import Error from "../Shared/Error/Error";
import Login from "../Authentication/Login/Login";
import Register from "../Authentication/Register/Register";
import CreateAssignment from "../Pages/CreateAssignment/CreateAssignment";
import Assignments from "../Pages/Assignments/Assignments";
import PendingAssignments from "../Pages/PendingAssignments/PendingAssignments";
import PrivateRoute from "../Providers/PrivateRoute";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        errorElement: <Error />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/create-assignment',
                element: <PrivateRoute><CreateAssignment /></PrivateRoute>
            },
            {
                path: '/assignments',
                element: <PrivateRoute><Assignments /></PrivateRoute>
            },
            {
                path: '/pending-assignments',
                element: <PrivateRoute><PendingAssignments /></PrivateRoute>
            },
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/register',
                element: <Register />
            }
        ]
    },
]);