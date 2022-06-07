import { Transition, Dialog } from "@headlessui/react";
import { doc, setDoc } from "firebase/firestore";
import { useState, Fragment, useRef, useCallback, useEffect } from "react";
import { useDocument } from "react-firebase-hooks/firestore";
import { useNavigate } from "react-router-dom";
import { firestore } from "../firebase";
import useRequireAuth from "../hooks/useRequireAuth";

function NameDisplay({ displayName, setData }) {
    const [inputing, setInputing] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const nameRef = useRef(null);

    const handleClick = () => {
        if (!inputing) {
            setInputing(true);
            setIsSuccess(false);
            return;
        }

        const displayName = nameRef ? nameRef.current.value : null;

        if (!displayName || displayName.trim().length === 0) {
            setInputing(false);
            return;
        }

        setData({ displayName });
        setInputing(false);
        setIsSuccess(true);
    }

    return (
        <div className="space-y-2">
            <h2 className="text-xl font-semibold">Name</h2>
            <div className="space-x-2">
                <input ref={nameRef} type="text" disabled={!inputing} defaultValue={displayName}
                    className="border-2 outline-none rounded-md px-2 py-1" />
                <button onClick={handleClick}
                    className="outline-none bg-blue-300 hover:bg-blue-400 text-white rounded-md px-2 py-1">
                    {inputing ? "Save" : "Change"}
                </button>
                {isSuccess && <span className="text-green-400 text-sm">Saved!</span>}
            </div>
        </div>
    );
}

function EmailDisplay({ email }) {
    return (
        <div className="space-y-2">
            <h2 className="text-xl font-semibold">Email</h2>
            <p>{email}</p>
        </div>
    );
}

function PasswordDisplay({ changePassword }) {
    const [inputing, setInputing] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isFailed, setIsFailed] = useState(false);

    const passwordRef = useRef(null);

    const handleChange = () => {
        setIsSuccess(false);
        setIsFailed(false);
        const password = passwordRef ? passwordRef.current.value.trim() : null;

        if (password && password.length > 6) {
            setInputing(true);
        } else {
            setInputing(false);
        }
    }

    const handleClick = () => {
        changePassword(passwordRef.current.value.trim())
            .then(() => {
                setIsSuccess(true);
            }).catch((error) => {
                setIsFailed(true);
            });
    }

    return (
        <div className="space-y-2">
            <h2 className="text-xl font-semibold">Password</h2>
            <div className="space-x-2">
                <input ref={passwordRef} onChange={handleChange} type="password" placeholder="Enter new password"
                    className="border-2 outline-none rounded-md px-2 py-1" />
                {inputing && <button onClick={handleClick} className="outline-none bg-blue-300 hover:bg-blue-400 text-white rounded-md px-2 py-1">Change</button>}
                {isSuccess && <span className="text-green-400 text-sm">Saved!</span>}
                {isFailed && <span className="text-red-500 tex-sm">Error!</span>}
            </div>
        </div>
    )
}

export default function Settings() {

    const [isOpen, setIsOpen] = useState(true);
    const navigate = useNavigate();

    const { user, changePassword } = useRequireAuth();

    const closeModal = () => {
        setIsOpen(false);
        navigate('/dashboard');
    }

    const setData = useCallback((data) => setDoc(doc(firestore, 'users', user.uid), data, { merge: true }), [user.uid]);
    const getData = useCallback(() => doc(firestore, 'users', user.uid), [user.uid]);

    const [data, loading, error] = useDocument(getData());

    if (loading) {
        return <p>Loading...</p>;
    }

    const displayName = data.data() ? data.data().displayName : "Anonymous";

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as='div' className='relative z-10' onClose={closeModal}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className='flex min-h-full items-center justify-center p-4 text-center'>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className='w-full max-w-lg transform overflow-hidden rounded-xl 
                            bg-white text-left align-middle shadow-xl transition-all space-y-4'>
                                <div className="flex">
                                    <div className="basis-3/4 p-4 space-y-6">
                                        <h1 className="text-3xl font-semibold">Account</h1>
                                        <NameDisplay displayName={displayName} setData={setData} />
                                        <EmailDisplay email={user.email} />
                                        <PasswordDisplay changePassword={changePassword} />
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}