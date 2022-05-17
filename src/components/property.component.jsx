export default function Property({ children }) {
    return (
        <div className='absolute z-100 min-w-fit top-2 rounded-md left-full 
            mx-3 bg-slate-100 overflow-hidden'>
            {children}
        </div>
    );
}