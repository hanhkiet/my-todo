// Hook (use-auth.js)
import React, { useState, useEffect, useContext, createContext } from "react";
import { auth } from "../firebase";
import {
    createUserWithEmailAndPassword, GithubAuthProvider, GoogleAuthProvider, onAuthStateChanged,
    sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut
} from "firebase/auth";

const authContext = createContext();
// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export function ProvideAuth({ children }) {
    const auth = useProvideAuth();
    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = () => {
    return useContext(authContext);
};

// Provider hook that creates auth object and handles state
function useProvideAuth() {
    const [user, setUser] = useState(null);
    // Wrap any Firebase methods we want to use making sure ...
    // ... to save the user to state.
    const signin = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
            .then((response) => {
                setUser(response.user);
                return response.user;
            });
    };
    const signup = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
            .then((response) => {
                setUser(response.user);
                return response.user;
            });
    };
    const signout = () => {
        return signOut(auth)
            .then(() => {
                setUser(false);
            });
    };

    const sendPasswordReset = (email) => {
        return sendPasswordResetEmail(auth, email);
    }

    const signinWithThirdParty = (party) => {
        switch (party) {
            case 'google':
                return signInWithPopup(auth, new GoogleAuthProvider())
                    .then((response) => {
                        setUser(response.user);
                        return response.user;
                    });
            case 'github':
                return signInWithPopup(auth, new GithubAuthProvider())
                    .then((response) => {
                        setUser(response.user);
                        return response.user;
                    });
            default:
                throw new Error('unvalid party');
        }
    }

    // Subscribe to user on mount
    // Because this sets state in the callback it will cause any ...
    // ... component that utilizes this hook to re-render with the ...
    // ... latest auth object.
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(false);
            }
        });
        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, []);
    // Return the user object and auth methods
    return {
        user,
        signin,
        signinWithThirdParty,
        signup,
        signout,
        sendPasswordReset
    };
}
