import { CollectionIcon } from "@heroicons/react/outline";
import { Link } from "react-router-dom";

export default function TaskList({ id, name, showDetail, ...other }) {
    return (
        <Link to={id} {...other}>
            <CollectionIcon className='h-6 w-6 text-blue-500' />
            {showDetail ? <p>{name}</p> : null}
        </Link>
    )
}