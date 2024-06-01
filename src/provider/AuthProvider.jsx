import { createContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { GithubAuthProvider, GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateEmail, updatePassword, updateProfile } from "firebase/auth";
import auth from "../firebase/firebase.config";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [status, setStatus] = useState(true);
    const googleProvider = new GoogleAuthProvider();
    const gitHubProvider = new GithubAuthProvider();

    const handleCreateUser = (email, password) => {
        setStatus(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const handleEmailLogin = (email, password) => {
        setStatus(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const handleGoogleLogin = () => {
        setStatus(true);
        return signInWithPopup(auth, googleProvider);
    }
    const handleGitHubLogin = () => {
        setStatus(true);
        return signInWithPopup(auth, gitHubProvider);
    }

    const updateUser = (userName, email, password, url) => {

        console.log("password:",password);
        return updateEmail(auth.currentUser, email)
            .then(
                updateProfile(auth.currentUser, {
                    displayName: userName,
                    photoURL: url
                })
                .then(
                    updatePassword(user, password))
            )
    }

    const logOut = () => {
        setStatus(true);
        return signOut(auth);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setStatus(false);
        });

        return (() => {
            unsubscribe();
        })
    }, []);

    const authInfo = { user, status, handleCreateUser, handleEmailLogin, logOut, handleGoogleLogin, handleGitHubLogin, updateUser };

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