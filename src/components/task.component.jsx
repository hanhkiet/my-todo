import { CalendarIcon, DotsHorizontalIcon } from '@heroicons/react/outline';
import { MenuAlt2Icon } from '@heroicons/react/outline';

export default function Task({ title, description }) {
    return (
        <div className="group relative border-2 px-4 py-2 rounded-md space-y-2 hover:border-slate-400">
            <DotsHorizontalIcon className='absolute top-1 right-2 text-gray-500 hover:text-gray-700 h-6 w-6 
                        cursor-pointer transition-colors duration-75' />
            <div>
                <h2 className="text-2xl">{title}</h2>
                <p>{description}</p>
            </div>
            <div className='flex space-x-2'>
                <MenuAlt2Icon className='h-4 w-4 text-blue-400 hover:text-blue-600 cursor-pointer' />
                <CalendarIcon className='h-4 w-4 text-red-400 hover:text-red-600 cursor-pointer' />
            </div>
        </div>
    );
}