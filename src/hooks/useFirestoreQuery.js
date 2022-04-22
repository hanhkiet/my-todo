import { firestore } from '../firebase';
import { useReducer, useEffect } from 'react';
import useMemoCompare from './useMemoCompare';

// // Usage
// function ProfilePage({ uid }) {
//     // Subscribe to Firestore document
//     const { data, status, error } = useFirestoreQuery(
//         firestore.collection("profiles").doc(uid)
//     );
//     if (status === "loading") {
//         return "Loading...";
//     }
//     if (status === "error") {
//         return `Error: ${error.message}`;
//     }
//     return (
//         <div>
//             <ProfileHeader avatar={data.avatar} name={data.name} />
//             <Posts posts={data.posts} />
//         </div>
//     );
// }
// Reducer for hook state and actions
const reducer = (state, action) => {
    switch (action.type) {
        case "idle":
            return { status: "idle", data: undefined, error: undefined };
        case "loading":
            return { status: "loading", data: undefined, error: undefined };
        case "success":
            return { status: "success", data: action.payload, error: undefined };
        case "error":
            return { status: "error", data: undefined, error: action.payload };
        default:
            throw new Error("invalid action");
    }
};

// Hook
export function useFirestoreQuery(query) {

    const initialState = {
        status: query ? "loading" : "idle",
        data: undefined,
        error: undefined,
    };

    const [state, dispatch] = useReducer(reducer, initialState);

    const queryCached = useMemoCompare(query, (prevQuery) => {
        return prevQuery && query && query.toString() === prevQuery.toString();
    });

    useEffect(() => {
        if (!queryCached) {
            dispatch({ type: "idle" });
            return;
        }

        dispatch({ type: "loading" });

        return queryCached.then((response) => {
            // Get data for collection or doc
            const data = response;
            dispatch({ type: "success", payload: data });
        }).catch((error) => {
            dispatch({ type: "error", payload: error });
        });
    }, [queryCached]); // Only run effect if queryCached changes
    return state;
}
// Get doc data and merge doc.id
function getDocData(doc) {
    return doc.exists === true ? { id: doc.id, ...doc.data() } : null;
}
// Get array of doc data from collection
function getCollectionData(collection) {
    return collection.docs.map(getDocData);
}