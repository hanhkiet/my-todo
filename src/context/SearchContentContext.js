import { createContext, useContext, useState } from "react";

const searchContext = createContext();

export function ProvideSearchContent({ children }) {
    const [content, setContent] = useState("");

    return <searchContext.Provider
        value={{ searchContent: content, setSearchContent: setContent }}>
        {children}
    </searchContext.Provider>
}

export const useSearchContent = () => {
    return useContext(searchContext);
}