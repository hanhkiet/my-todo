import { MenuIcon, SearchIcon } from "@heroicons/react/solid";

export default function FunctionBar({ toggleSidebar }) {

    return (
        <div className='w-full p-2 flex items-center justify-between pr-12 sticky z-10 top-0 bg-slate-200 bg-opacity-75'>
            <button onClick={toggleSidebar} className='outline-none hover:bg-slate-200 rounded-sm'>
                <MenuIcon className='h-8 w-8 text-blue-500 cursor-pointer' />
            </button>
            <div className='relative'>
                <SearchIcon className='h-6 w-6 text-blue-500 absolute left-1.5 top-1.5 bottom-1.5' />
                <input className='pl-9 py-1.5 outline-none rounded-md border-2 transition-colors duration-150 
                    focus:border-blue-400' type="text" placeholder='search anything...' />
            </div>
        </div>
    );
}