import { CalendarIcon } from "@heroicons/react/solid";

const styles = 'transition-colors duration-100 hover:bg-blue-100 hover:drop-shadow-sm' +
    'focus:bg-blue-100 focus:drop-shadow-sm py-2 px-3 rounded-md outline-none flex items-center space-x-3';

export default function TodoList({ showDetail }) {
    return (
        <ul className={`space-y-1 flex flex-col ${showDetail ? null : 'items-center'}`}>
            {/* todo list item */}
            <li >
                <button className={`${styles} ${showDetail ? 'w-full' : null}`}>
                    <CalendarIcon className='h-6 w-6 text-blue-500' />
                    {showDetail ? <p>Today</p> : null}
                </button>
            </li>
            <li>
                <button className={`${styles} ${showDetail ? 'w-full' : null}`}>
                    <CalendarIcon className='h-6 w-6 text-blue-500' />
                    {showDetail ? <p>Today</p> : null}
                </button>
            </li>
        </ul>
    );
}