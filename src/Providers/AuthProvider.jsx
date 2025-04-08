import { createUserWithEmailAndPassword, GithubAuthProvider, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import auth from "../Firebase/Firebase.config";
import axios from "axios";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    // observe user
    const [user, setUser] = useState(null);
    //set loading 
    const [loading, setLoading] = useState(true);
    // creating user with email and password 
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };
    // google login
    const googleProvider = new GoogleAuthProvider();
    const googleLogin = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    };
    // login with github
    const githubProvider = new GithubAuthProvider();
    const githubLogin = () => {
        setLoading(true);
        return signInWithPopup(auth, githubProvider);
    }
    // sign in user with email and password
    const signInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };
    // log out
    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    };

    // observe the user
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setLoading(false);
            const userEmail = { email: currentUser?.email || user?.email };
            const loggedUser = { email: userEmail };
            // if user exists then issue a token 
            if (currentUser) {
                axios.post(`${import.meta.env.VITE_SERVER_API}/jwt`, loggedUser, { withCredentials: true })
                    .then(res => {
                        console.log('TOKEN RESPONSE', res.data);
                    });
            }
            else {
                axios.post(`${import.meta.env.VITE_SERVER_API}/logout`, loggedUser, { withCredentials: true })
                    .then(res => {
                        console.log(res.data);
                    })
            };
        });
        return () => {
            unsubscribe();
        };
    });
    //all context value
    const authInfo = { user, createUser, googleLogin, githubLogin, signInUser, logOut, loading, setLoading };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
}
export default AuthProvider;