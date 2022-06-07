import { MenuIcon, SearchIcon } from "@heroicons/react/solid";
import { useSidebar } from "../context/SidebarContext";

const functionbar_style = 'w-full p-2 flex items-center justify-between pr-12 sticky z-8 top-0 bg-slate-200 bg-opacity-75';

export default function FunctionBar() {

    const { toggleSidebar } = useSidebar();

    return (
        <div className={functionbar_style}>
            <button onClick={toggleSidebar} className='outline-none hover:bg-slate-200 rounded-sm'>
                <MenuIcon className='h-8 w-8 text-blue-500 cursor-pointer' />
            </button>
            <div className='relative'>
                <SearchIcon className='icon absolute left-1.5 top-1.5 bottom-1.5' />
                <input className='pl-9 py-1.5 outline-none rounded-md border-2 transition-colors duration-150 
                    focus:border-blue-400' type="text" placeholder='search task...' />
            </div>
        </div>
    );
}