import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

const provider = new GoogleAuthProvider();


export const loginWithGoogle = () => {
    const auth = getAuth();
    return signInWithPopup(auth, provider);
}
