import { Transition, Dialog } from "@headlessui/react";
import { useState, Fragment } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CogIcon, UserIcon } from '@heroicons/react/outline';

export default function Settings() {

    const [isOpen, setIsOpen] = useState(true);
    const navigate = useNavigate();

    const closeModal = () => {
        setIsOpen(false);
        navigate('/dashboard');
    }

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
                            <Dialog.Panel className='w-full max-w-2xl transform overflow-hidden rounded-xl 
                            bg-white text-left align-middle shadow-xl transition-all space-y-4'>
                                <div className="flex">
                                    <div className=" basis-1/4 bg-gray-200 p-4">
                                        <ul>
                                            <li>
                                                <button className="flex items-center space-x-2">
                                                    <UserIcon className="h-5 w-5 text-blue-400" />
                                                    <span className="text-lg">Account</span>
                                                </button>
                                            </li>
                                            <li>
                                                <button className="flex items-center space-x-2">
                                                    <CogIcon className="h-5 w-5 text-blue-400" />
                                                    <span className="text-lg">General</span>
                                                </button>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="basis-3/4 p-4 space-y-6">
                                        <h1 className="text-3xl font-semibold">Account</h1>
                                        <div className="space-y-2">
                                            <h2 className="text-xl font-semibold">Name</h2>
                                            <input type="text" value="Kiệt Huỳnh Anh" className="border-2 outline-none rounded-md px-2 py-1" />
                                        </div>
                                        <div className="space-y-2">
                                            <h2 className="text-xl font-semibold">Email</h2>
                                            <p>huynhanhkiet179@gmail.com</p>
                                        </div>
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