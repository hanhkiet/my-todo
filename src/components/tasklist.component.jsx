import { CollectionIcon } from "@heroicons/react/outline";
import { Link, Navigate, useNavigate } from "react-router-dom";

export default function TaskList({ id, name, showDetail, ...other }) {
    const navigate = useNavigate();
    return (
        <button onClick={() => navigate(id)} {...other}>
            <CollectionIcon className='h-6 w-6 text-blue-500' />
            {showDetail ? <p>{name}</p> : null}
        </button>
    )
}