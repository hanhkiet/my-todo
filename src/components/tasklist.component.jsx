import { CollectionIcon } from "@heroicons/react/outline";
import { useNavigate } from "react-router-dom";

export default function TaskList({ id, name, showSidebar, ...other }) {
    const navigate = useNavigate();
    return (
        <button onClick={() => navigate(id)} {...other}>
            <CollectionIcon className='h-6 w-6 text-blue-500' />
            {showSidebar ? <p>{name}</p> : null}
        </button>
    )
}